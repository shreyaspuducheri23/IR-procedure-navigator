import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMeldScores, roundScore } from '../src/calculators/meld.ts';

const sample = { bilirubin: 2, inr: 1.5, creatinine: 1, sodium: 135, albumin: 3, female: false, dialysis: false };
// Kim et al. Table 4, low/intermediate/high risk cases (independent published outputs).
const cases = [
  [2.5, 131, 1, 1.2, 3.8, false, 18, 16],
  [2.5, 131, 1, 1.2, 3.8, true, 18, 17],
  [6, 131, 1.5, 1.5, 3.5, false, 26, 25],
  [6, 131, 1.5, 1.5, 2.2, false, 26, 26],
  [6, 131, 1.5, 1.5, 2.2, true, 26, 27],
  [12, 128, 2.2, 1.8, 2, false, 33, 34],
  [12, 128, 2.2, 2.8, 2, false, 36, 38],
  [12, 128, 2.2, 2.8, 2, true, 36, 39],
];
for (const [index, [bilirubin, sodium, inr, creatinine, albumin, female, meldNa, meld3]] of cases.entries()) {
  test(`published example ${index + 1}`, () => {
    const result = calculateMeldScores({ bilirubin, sodium, inr, creatinine, albumin, female, dialysis: false });
    assert.equal(result.meldNa, meldNa);
    assert.equal(result.meld3, meld3);
  });
}
test('initial example and female toggle', () => {
  assert.equal(calculateMeldScores(sample).meldNa, 16);
  assert.equal(calculateMeldScores(sample).meld3, 15);
  assert.equal(calculateMeldScores({ ...sample, female: true }).meld3, 16);
});
test('invalid labs clear both scores, including when dialysis is selected', () => {
  for (const key of ['bilirubin', 'inr', 'creatinine', 'sodium', 'albumin']) {
    for (const value of ['', ' ', 'bad', 0, -1, NaN, Infinity, -Infinity]) {
      assert.equal(calculateMeldScores({ ...sample, [key]: value, dialysis: true }), null);
    }
  }
});
test('lab bounds and model-specific dialysis overrides', () => {
  const result = calculateMeldScores({ ...sample, bilirubin: 0.2, inr: 0.5, creatinine: 8, sodium: 120, albumin: 1 });
  assert.deepEqual(result.bounds, { bilirubin: 1, inr: 1, meldNaCreatinine: 4, meld3Creatinine: 3, sodium: 125, albumin: 1.5 });
  assert.deepEqual(result, calculateMeldScores({ ...sample, bilirubin: 1, inr: 1, creatinine: 4, sodium: 125, albumin: 1.5 }));
  assert.deepEqual(calculateMeldScores({ ...sample, dialysis: true }), calculateMeldScores({ ...sample, creatinine: 4 }));
  const upper = calculateMeldScores({ ...sample, sodium: 160, albumin: 5, creatinine: 0.1 });
  assert.equal(upper.bounds.sodium, 137);
  assert.equal(upper.bounds.albumin, 3.5);
  assert.equal(upper.bounds.meld3Creatinine, 1);
});
test('MELD-Na uses rounded initial MELD and threshold of 11', () => {
  const withBase = (raw) => calculateMeldScores({ ...sample, bilirubin: Math.exp((raw - 6.43) / 3.78), inr: 1, creatinine: 1, sodium: 125 });
  assert.equal(withBase(11.49).baseMeld, 11);
  assert.equal(withBase(11.49).meldNa, 11);
  assert.equal(withBase(11.51).baseMeld, 12);
  assert.equal(withBase(11.51).meldNa, 23);
});
test('integer score bounds', () => {
  assert.equal(roundScore(5), 6);
  assert.equal(roundScore(15.49), 15);
  assert.equal(roundScore(15.5), 16);
  assert.equal(roundScore(60), 40);
  const low = calculateMeldScores({ ...sample, bilirubin: 1, inr: 1, creatinine: 1, sodium: 137, albumin: 3.5 });
  assert.equal(low.meldNa, 6);
  assert.equal(low.meld3, 6);
  const high = calculateMeldScores({ ...sample, bilirubin: 100, inr: 10, creatinine: 10, sodium: 125, albumin: 1.5 });
  assert.equal(high.meldNa, 40);
  assert.equal(high.meld3, 40);
});
