import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import {
  anticoagulationAgents as agents,
  anticoagulationProcedureRules as rules,
  anticoagulationRecommendation as recommend,
} from "../src/calculators/anticoagulation.ts";
const source = readFileSync(
  new URL("./fixtures/anticoagulation-parent.js.txt", import.meta.url),
  "utf8",
);
const parent = vm.runInNewContext(
  source +
    "\n({agents: anticoagulationAgents, rules: anticoagulationProcedureRules, recommend: anticoagulationRecommendation})",
);
const plain = (value) => JSON.parse(JSON.stringify(value));
test("all original procedures and medications are retained in order", () => {
  assert.equal(rules.length, 36);
  assert.equal(agents.length, 11);
  assert.deepEqual(rules, plain(parent.rules));
  assert.deepEqual(
    agents.map(({ id, label }) => ({ id, label })),
    plain(parent.agents.map(({ id, label }) => ({ id, label }))),
  );
});
for (const crclBand of ["ge50", "30to49", "15to29", "unknown"]) {
  for (const enoxaparinDose of ["therapeutic", "prophylactic"]) {
    test(`all 396 recommendations match pinned parent: ${crclBand}, ${enoxaparinDose}`, () => {
      const context = { crclBand, enoxaparinDose };
      for (const [i, rule] of rules.entries())
        for (const [j, agent] of agents.entries()) {
          assert.deepEqual(
            recommend(rule, agent, context),
            plain(parent.recommend(parent.rules[i], parent.agents[j], context)),
            `${rule.label}: ${agent.label}`,
          );
        }
    });
  }
}
