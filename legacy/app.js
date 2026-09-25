const sources = {
  aasldAscites:
    "AASLD Liver Fellow Network: Management of Refractory Ascites in Cirrhosis, accessed May 2026. https://www.aasld.org/liver-fellow-network/core-series/clinical-pearls/management-refractory-ascites-cirrhosis",
  acrCvad:
    "ACR Appropriateness Criteria: Central Venous Access Device and Site Selection, 2023. https://pubmed.ncbi.nlm.nih.gov/37236750/",
  asaCva:
    "ASA Practice Guidelines for Central Venous Access, 2020 summary. https://www.guidelinecentral.com/guideline/8969/",
  hrsaMeld:
    "HRSA OPTN MELD Calculator, date last reviewed December 2025. https://www.hrsa.gov/optn/data-calculators/allocation-calculators/meld-calculator",
  meld3:
    "Kim WR et al. MELD 3.0: The Model for End-stage Liver Disease Updated for the Modern Era. Gastroenterology. 2021. https://pmc.ncbi.nlm.nih.gov/articles/PMC8608337/",
  portGuideline:
    "Japanese Society of Interventional Radiology: Guidelines for Central Venous Port Placement and Management, 2023. https://www.jstage.jst.go.jp/article/interventionalradiology/8/2/8_2022-0015/_article",
  sirAnticoagulation:
    "SIR Consensus Guidelines for Periprocedural Management of Thrombotic and Bleeding Risk, Part II: Recommendations. JVIR. 2019;30:1168-1184. https://www.jvir.org/article/S1051-0443(19)30407-5/fulltext",
  sirAnticoagulationStatus:
    "SIR 2025 guidelines and statements topics: update of the 2019 periprocedural management guideline announced May 28, 2025. https://www.sirweb.org/publications/news/announcing-the-2025-guidelines-and-statements-topics/",
};

const procedures = [
  {
    id: "paracentesis",
    title: "Paracentesis",
    category: "Abdominal fluid procedure",
    summary:
      "A quick path for diagnostic or therapeutic ascites drainage, with emphasis on indication, ultrasound pocket selection, fluid studies, albumin planning, and post-procedure monitoring.",
    lastReviewed: "Prototype content, May 2026",
    root: "para-root",
    nodes: {
      "para-root": {
        title: "Paracentesis",
        type: "reference",
        summary: "Pick the phase of care, then drill into the relevant checks or decisions.",
        children: ["para-pre", "para-intra", "para-post", "para-complications"],
        details: {
          "Use case": [
            "Designed for rotators and junior residents preparing for common diagnostic and therapeutic paracentesis workflows.",
            "Institutional thresholds for labs, anticoagulation holds, and albumin dosing should override this draft.",
          ],
        },
      },
      "para-pre": {
        title: "Pre-procedure",
        type: "action",
        summary: "Confirm why the procedure is needed, what labs matter, what meds need a plan, and what to check at bedside.",
        children: ["para-indication", "para-labs", "para-anticoag", "para-exam"],
        checklist: [
          "Confirm diagnostic versus therapeutic intent.",
          "Review recent imaging or bedside ultrasound for safe pocket.",
          "Clarify desired fluid studies before starting.",
          "Check local policy for anticoagulation and lab thresholds.",
        ],
      },
      "para-indication": {
        title: "Indication",
        type: "decision",
        summary: "The workflow changes depending on whether the goal is diagnosis, symptom relief, or both.",
        children: ["para-diagnostic", "para-therapeutic"],
        details: {
          "Common triggers": [
            "New ascites, concern for spontaneous bacterial peritonitis, malignancy workup, or symptomatic tense ascites.",
            "For unstable patients or suspected secondary peritonitis, coordinate with the primary team while avoiding unnecessary delays.",
          ],
        },
      },
      "para-diagnostic": {
        title: "Diagnostic tap",
        type: "action",
        summary: "Plan specimen collection before needle placement so the right tubes reach the lab.",
        details: {
          "Typical fluid studies": [
            "Cell count with differential.",
            "Culture, ideally inoculated into blood culture bottles when infection is suspected.",
            "Albumin and total protein for SAAG calculation when etiology is unclear.",
            "Cytology, triglycerides, amylase, bilirubin, or other tests when clinically indicated.",
          ],
        },
      },
      "para-therapeutic": {
        title: "Therapeutic drainage",
        type: "decision",
        summary: "Estimate expected volume and decide whether albumin replacement will be needed.",
        children: ["para-albumin"],
        details: {
          "Planning points": [
            "Set expectations for maximum volume, symptoms, and when to stop.",
            "Large-volume paracentesis is commonly treated as greater than 5 L removed.",
          ],
        },
      },
      "para-albumin": {
        title: "Albumin plan",
        type: "decision",
        summary:
          "For cirrhotic ascites, many guidance pathways use albumin after large-volume paracentesis; local policy determines exact dosing.",
        details: {
          "Draft guidance": [
            "AASLD educational guidance describes albumin with serial large-volume paracentesis to reduce post-paracentesis circulatory dysfunction.",
            "A commonly cited range is 6 to 8 g albumin per liter removed when more than 5 L is drained.",
            "Confirm dose concentration, rounding, and ordering workflow at your institution.",
          ],
          Sources: [sources.aasldAscites],
        },
      },
      "para-labs": {
        title: "Labs",
        type: "decision",
        summary:
          "Check what your institution requires; paracentesis is often low bleeding risk, but policies vary for coagulopathy and anticoagulants.",
        details: {
          "Useful review": [
            "Platelets and INR if required by local practice or patient-specific bleeding risk.",
            "Hemoglobin if there is concern for active bleeding or recent drop.",
            "Renal function and electrolytes when large-volume drainage or albumin decisions are relevant.",
          ],
          "Local customization needed": [
            "Add your site's specific INR, platelet, and medication hold thresholds here after faculty review.",
          ],
        },
      },
      "para-anticoag": {
        title: "Anticoagulation",
        type: "caution",
        summary: "Identify what is being held, why, last dose, and when local policy says it can be restarted.",
        details: {
          "Medication review": [
            "Warfarin, heparin infusions, LMWH, DOACs, antiplatelets, and recent thrombolytics.",
            "Balance procedure urgency against thrombosis risk with the ordering team.",
            "Document last dose and the plan to restart when applicable.",
          ],
          "Hold timing": [
            "This should become an institution-specific anticoagulation table in the app rather than free text.",
            "For now: route the user to local SIR-derived policy and attending preference.",
          ],
        },
      },
      "para-exam": {
        title: "Focused exam",
        type: "decision",
        summary: "Check the patient and the abdomen before committing to a site.",
        details: {
          "At bedside": [
            "Assess respiratory comfort, ability to lie still, and baseline pain.",
            "Inspect abdomen for scars, ostomy, cellulitis, distention pattern, and prior access sites.",
            "Confirm a safe fluid pocket with ultrasound in the planned position.",
            "Check whether the patient can consent and tolerate local anesthesia or sedation plan.",
          ],
        },
      },
      "para-consent": {
        title: "Consent points",
        type: "reference",
        summary: "Keep the consent script brief but specific to the procedure and patient context.",
        details: {
          "Discuss": [
            "Bleeding, infection, pain, leakage, bowel or organ injury, incomplete drainage, and need for repeat procedure.",
            "For therapeutic procedures, discuss fluid shifts, hypotension, and albumin if large-volume drainage is expected.",
          ],
        },
      },
      "para-fluid-orders": {
        title: "Fluid orders",
        type: "action",
        summary: "Match the specimen set to the clinical question before starting.",
        checklist: [
          "Cell count with differential.",
          "Culture if infection is in the differential.",
          "Albumin and total protein for SAAG when needed.",
          "Add cytology or special studies only when clinically indicated.",
        ],
      },
      "para-intra": {
        title: "Intraprocedure",
        type: "action",
        summary: "Select a safe pocket with ultrasound, maintain sterile technique, and monitor symptoms during drainage.",
        children: ["para-pocket", "para-equipment", "para-steps", "para-stop"],
      },
      "para-pocket": {
        title: "Pocket selection",
        type: "decision",
        summary: "Use ultrasound to confirm a safe fluid window and avoid bowel, abdominal wall vessels, scars, and ostomies.",
        details: {
          "Approach": [
            "Common sites include lower quadrants, but the safest site is the one shown by ultrasound in that patient.",
            "Scan dynamically for bowel loops and abdominal wall vessels.",
            "Mark with the patient positioned as they will be for the procedure.",
          ],
        },
      },
      "para-equipment": {
        title: "Equipment",
        type: "reference",
        summary: "A simple equipment branch prevents the classic room-start delay.",
        checklist: [
          "Ultrasound with sterile probe cover if using real-time guidance.",
          "Prep, drape, sterile gloves, local anesthetic, needles, scalpel if needed.",
          "Paracentesis catheter kit or access needle/catheter system.",
          "Vacuum bottles, tubing, specimen containers, dressings.",
        ],
      },
      "para-steps": {
        title: "General steps",
        type: "action",
        summary: "Use a deliberate, ultrasound-confirmed path and reassess if fluid does not return as expected.",
        details: {
          "Sequence": [
            "Position, timeout, prep, drape, local anesthesia.",
            "Access the selected pocket using kit technique and aspirate fluid.",
            "Connect to drainage system, collect specimens early, and monitor patient comfort.",
            "Remove catheter, hold pressure as needed, and dress the site.",
          ],
        },
      },
      "para-stop": {
        title: "When to stop",
        type: "caution",
        summary: "Stop or pause for pain, hypotension, bloody return, loss of safe drainage, or patient intolerance.",
        details: {
          "Escalate if": [
            "Persistent severe pain, hemodynamic change, suspected bowel injury, or unexpected hemorrhagic fluid.",
            "No safe pocket is found despite the request.",
          ],
        },
      },
      "para-post": {
        title: "Post-procedure",
        type: "action",
        summary: "Close the loop with albumin if needed, specimen delivery, discharge readiness, and medication restart plan.",
        children: ["para-orders", "para-restart", "para-document"],
      },
      "para-orders": {
        title: "Orders",
        type: "action",
        summary: "Post-procedure orders should reflect drainage volume, symptoms, and specimen plan.",
        checklist: [
          "Send ordered fluid studies.",
          "Albumin order if large-volume drainage meets local criteria.",
          "Vitals or observation duration per site policy.",
          "Return precautions for pain, fever, bleeding, leakage, dizziness, or worsening symptoms.",
        ],
      },
      "para-restart": {
        title: "Restart meds",
        type: "decision",
        summary: "Restart anticoagulants and antiplatelets using local policy and patient-specific thrombosis risk.",
        details: {
          "Track": [
            "What was held, last dose, indication, procedural bleeding concern, and who owns restart.",
            "For low-risk uncomplicated procedures, many sites restart sooner than for high-risk interventions, but policy should be explicit.",
          ],
        },
      },
      "para-document": {
        title: "Documentation",
        type: "reference",
        summary: "A consistent note helps rotators remember the pieces.",
        details: {
          "Include": [
            "Indication, consent, ultrasound guidance, site, catheter type if relevant, volume and character of fluid.",
            "Specimens sent, albumin plan, complications, and disposition.",
          ],
        },
      },
      "para-complications": {
        title: "Complications",
        type: "caution",
        summary: "Keep a short rescue list visible for the team.",
        details: {
          "Watch for": [
            "Bleeding or abdominal wall hematoma.",
            "Persistent leak, infection, bowel injury, hypotension, and post-paracentesis circulatory dysfunction.",
            "Escalate new instability promptly and involve senior IR or the primary team.",
          ],
        },
      },
    },
  },
  {
    id: "tdc",
    title: "Tunneled Dialysis Catheter",
    category: "Central venous access",
    summary:
      "A workflow for tunneled hemodialysis catheter placement, from indication and vein planning through cuff tunnel creation, tip positioning, and line-ready post orders.",
    lastReviewed: "Prototype content, May 2026",
    root: "tdc-root",
    nodes: {
      "tdc-root": {
        title: "Tunneled Dialysis Catheter",
        type: "reference",
        summary: "Move through pre-procedure planning, access and tunneling steps, and post-procedure line use.",
        children: ["tdc-pre", "tdc-intra", "tdc-post", "tdc-complications"],
      },
      "tdc-pre": {
        title: "Pre-procedure",
        type: "action",
        summary: "Confirm dialysis need, labs, medication holds, and bedside findings that affect access side or safety.",
        children: ["tdc-indication", "tdc-labs", "tdc-anticoag", "tdc-exam"],
      },
      "tdc-indication": {
        title: "Indication",
        type: "decision",
        summary: "Clarify whether the request is new access, exchange, malfunction, infection-related removal/replacement, or bridge to fistula.",
        details: {
          "Ask before booking": [
            "Urgency of dialysis, current access, blood cultures if infection is suspected, and whether a line holiday is planned.",
            "Whether a temporary catheter is needed first for unstable patients or active bacteremia.",
          ],
        },
      },
      "tdc-vein": {
        title: "Vein and side planning",
        type: "decision",
        summary: "Preserve future access and avoid known stenosis, thrombosis, devices, or infected fields.",
        details: {
          "Review": [
            "Prior catheters, fistula or graft plan, pacemaker or ICD leads, central venous stenosis history, and surgical scars.",
            "Internal jugular access is commonly preferred when suitable; use ultrasound and venography when anatomy is uncertain.",
          ],
          Sources: [sources.acrCvad],
        },
      },
      "tdc-labs": {
        title: "Labs",
        type: "decision",
        summary: "Use institutional thresholds for tunneled central venous access and moderate sedation.",
        details: {
          "Common review": [
            "Platelets, INR, hemoglobin, potassium when dialysis timing or sedation is relevant, and renal status is already known by indication.",
            "Active infection workup and blood cultures if line sepsis is part of the story.",
          ],
        },
      },
      "tdc-anticoag": {
        title: "Anticoagulation",
        type: "caution",
        summary: "Tunneled access needs a deliberate hold and restart plan.",
        details: {
          "Capture": [
            "Medication, last dose, renal function for DOAC clearance, indication for anticoagulation, and whether bridging is needed.",
            "Route decisions through local SIR-derived policy and attending preference.",
          ],
          "Hold timing": [
            "Add your institution's anticoagulation table here, ideally keyed by drug and renal function.",
            "Document who owns restart, especially if dialysis anticoagulation is expected soon after placement.",
          ],
        },
      },
      "tdc-exam": {
        title: "Focused exam",
        type: "decision",
        summary: "Look for findings that change side choice, infection risk, sedation safety, or patient positioning.",
        details: {
          "At bedside": [
            "Inspect neck and chest for existing lines, scars, erythema, tunneled catheter tracts, and skin breakdown.",
            "Check for pacemaker or ICD pocket, dialysis access, arm swelling, or signs of central venous stenosis.",
            "Assess ability to lie flat, airway/sedation risk, oxygen requirement, and baseline mental status.",
            "Use ultrasound to assess target IJ patency before prep when possible.",
          ],
          "Planning tie-in": [
            "Preserve future access and avoid known stenosis, thrombosis, devices, or infected fields.",
            "Internal jugular access is commonly preferred when suitable; use venography when anatomy is uncertain.",
          ],
          Sources: [sources.acrCvad],
        },
      },
      "tdc-consent": {
        title: "Consent points",
        type: "reference",
        summary: "Include central venous access risks plus dialysis catheter-specific complications.",
        details: {
          Discuss: [
            "Bleeding, infection, pneumothorax, arterial injury, arrhythmia, air embolism, malposition, catheter dysfunction, thrombosis, and need for exchange.",
            "Sedation risks when moderate sedation is used.",
          ],
          Sources: [sources.asaCva],
        },
      },
      "tdc-intra": {
        title: "Intraprocedure",
        type: "action",
        summary: "Use maximal sterile technique, ultrasound-guided venous access, fluoroscopic tip positioning, and careful tunnel/cuff placement.",
        children: ["tdc-equipment", "tdc-access", "tdc-tunnel", "tdc-tip", "tdc-lock"],
      },
      "tdc-equipment": {
        title: "Equipment",
        type: "reference",
        summary: "Have catheter length options and tunneling tools ready before prep.",
        checklist: [
          "Ultrasound, sterile cover, micropuncture set, wires, dilators, peel-away sheath.",
          "Tunneled dialysis catheter with appropriate length options.",
          "Tunneler, local anesthetic, flushes, heparin or citrate lock per policy.",
          "Suture, dressing, caps, and fluoroscopy setup.",
        ],
      },
      "tdc-access": {
        title: "Venous access",
        type: "action",
        summary: "Confirm venous entry by ultrasound and fluoroscopy; do not rely on blood color alone.",
        details: {
          "Key moves": [
            "Trendelenburg when appropriate, ultrasound-guided puncture, wire confirmation under fluoroscopy.",
            "If arterial dilation or large-bore catheter placement occurs, leave it in place and get immediate senior/vascular help.",
          ],
          Sources: [sources.asaCva],
        },
      },
      "tdc-tunnel": {
        title: "Tunnel and cuff",
        type: "action",
        summary: "Create a gentle tunnel with the cuff fully subcutaneous and exit site positioned for dressing and patient comfort.",
        details: {
          "Consider": [
            "Avoid sharp bends, contaminated skin, skin folds, and areas that interfere with dialysis access care.",
            "Check catheter orientation before peel-away sheath deployment.",
          ],
        },
      },
      "tdc-tip": {
        title: "Tip position",
        type: "decision",
        summary: "Dialysis catheter function depends heavily on tip position and absence of kinking.",
        details: {
          "Confirm": [
            "Tip position under fluoroscopy according to catheter type and institutional preference.",
            "Both lumens aspirate and flush easily before locking.",
            "No kink at venotomy, tunnel, or catheter hub.",
          ],
        },
      },
      "tdc-lock": {
        title: "Lock and dress",
        type: "action",
        summary: "Lock lumens exactly per catheter volume and local solution policy.",
        checklist: [
          "Aspirate and flush both lumens.",
          "Instill lock solution using labeled lumen volumes.",
          "Secure catheter and apply sterile dressing.",
          "Communicate whether line is ready for use.",
        ],
      },
      "tdc-post": {
        title: "Post-procedure",
        type: "action",
        summary: "Make line availability, medication restart, and complication monitoring explicit.",
        children: ["tdc-orders", "tdc-restart", "tdc-note"],
      },
      "tdc-orders": {
        title: "Orders",
        type: "action",
        summary: "Dialysis teams need a clear answer on whether the catheter can be used now.",
        checklist: [
          "Line ready for immediate use if uncomplicated and tip position/function are confirmed.",
          "Dressing care and catheter lock documentation per dialysis policy.",
          "Chest imaging only if required by local practice or if there was a concern not resolved by fluoroscopy.",
          "Monitor for bleeding, pneumothorax symptoms, arrhythmia symptoms, and infection.",
        ],
      },
      "tdc-restart": {
        title: "Restart meds",
        type: "decision",
        summary: "Restart anticoagulation per local high-bleeding-risk access guidance and the patient's thrombosis risk.",
        details: {
          "Document": [
            "Restart timing owner, any bleeding concern, and whether dialysis anticoagulation is expected soon after placement.",
          ],
        },
      },
      "tdc-note": {
        title: "Documentation",
        type: "reference",
        summary: "The note should make device details and usability unambiguous.",
        details: {
          Include: [
            "Access vein, catheter brand/size/length, tip position, lock solution, complications, and line-ready statement.",
            "Sedation medications and monitoring if applicable.",
          ],
        },
      },
      "tdc-complications": {
        title: "Complications",
        type: "caution",
        summary: "Have an escalation plan for arterial injury, pneumothorax, arrhythmia, air embolism, bleeding, and line dysfunction.",
        details: {
          "Immediate concerns": [
            "Arterial dilation or catheterization: leave device in place and escalate immediately.",
            "Wire-related arrhythmia: withdraw wire/catheter to safer position and reassess.",
            "Poor aspiration: check tip, kink, catheter length, fibrin sheath, or central stenosis.",
          ],
        },
      },
    },
  },
  {
    id: "port",
    title: "Chest Port Placement",
    category: "Central venous access",
    summary:
      "A port placement map for pre-procedure planning, venous access, pocket creation, catheter tip positioning, and post-procedure readiness for therapy.",
    lastReviewed: "Prototype content, May 2026",
    root: "port-root",
    nodes: {
      "port-root": {
        title: "Chest Port Placement",
        type: "reference",
        summary: "Use this as a starter algorithm for oncology or long-term infusion access.",
        children: ["port-pre", "port-intra", "port-post", "port-complications"],
      },
      "port-pre": {
        title: "Pre-procedure",
        type: "action",
        summary: "Confirm therapy need, labs, medication holds, and bedside findings that affect side, pocket, and infection risk.",
        children: ["port-indication", "port-labs", "port-anticoag", "port-exam"],
      },
      "port-indication": {
        title: "Indication",
        type: "decision",
        summary: "Ports are most useful for durable intermittent access such as chemotherapy or long-term infusions.",
        details: {
          "Clarify": [
            "Therapy type, start date, need for power-injectable port, single versus dual lumen, and whether port must be left accessed.",
            "Avoid elective placement in uncontrolled active infection unless benefits clearly outweigh risks.",
          ],
        },
      },
      "port-side": {
        title: "Side and vessel planning",
        type: "decision",
        summary: "Side choice is driven by cancer laterality, surgery/radiation fields, devices, thrombosis, and patient anatomy.",
        details: {
          "Review": [
            "Mastectomy or axillary lymph node dissection history, radiation plan, pacemaker/ICD, prior central lines, thrombosis, and patient preference.",
            "Use ultrasound-guided venous access when feasible.",
          ],
          Sources: [sources.acrCvad, sources.portGuideline],
        },
      },
      "port-labs": {
        title: "Labs",
        type: "decision",
        summary: "Use your local thresholds for tunneled venous access and moderate sedation.",
        details: {
          "Common review": [
            "Platelets, INR, hemoglobin if clinically relevant, and pregnancy testing when applicable by policy.",
            "White count or infection context if placement timing is uncertain.",
          ],
        },
      },
      "port-anticoag": {
        title: "Anticoagulation",
        type: "caution",
        summary: "Port placement needs a planned anticoagulant or antiplatelet hold and restart decision.",
        details: {
          "Capture": [
            "Medication, indication, last dose, renal function when relevant, bridging plan, and restart owner.",
            "Use institutional anticoagulation tables rather than memory.",
          ],
          "Hold timing": [
            "This should become a structured drug-by-drug table in the app.",
            "Pocket hemostasis matters for restart timing because hematoma can threaten the incision and device.",
          ],
        },
      },
      "port-exam": {
        title: "Focused exam",
        type: "decision",
        summary: "Inspect the chest, venous access options, and patient factors before choosing side and pocket.",
        details: {
          "At bedside": [
            "Inspect chest and neck for prior ports, scars, radiation changes, infection, breast surgery, or skin breakdown.",
            "Ask about mastectomy, axillary lymph node dissection, pacemaker or ICD, prior central lines, and thrombosis.",
            "Assess ability to lie flat, airway/sedation risk, oxygen requirement, and baseline mental status.",
            "Use ultrasound to assess venous patency before prep when possible.",
          ],
          "Side planning": [
            "Side choice is driven by cancer laterality, surgery/radiation fields, devices, thrombosis, and patient anatomy.",
          ],
          Sources: [sources.acrCvad, sources.portGuideline],
        },
      },
      "port-antibiotics": {
        title: "Antibiotics",
        type: "decision",
        summary: "Antibiotic prophylaxis varies; make this branch institution-specific after faculty review.",
        details: {
          "Draft note": [
            "Port literature and society guidance vary by population and local infection prevention practice.",
            "Add your institution's default prophylaxis, allergy alternatives, and exceptions here.",
          ],
          Sources: [sources.portGuideline],
        },
      },
      "port-consent": {
        title: "Consent points",
        type: "reference",
        summary: "Consent should include both central venous access risks and pocket/device risks.",
        details: {
          Discuss: [
            "Bleeding, infection, pneumothorax, arterial injury, arrhythmia, air embolism, malposition, thrombosis, port malfunction, wound dehiscence, and need for removal or exchange.",
            "Moderate sedation risks when used.",
          ],
        },
      },
      "port-intra": {
        title: "Intraprocedure",
        type: "action",
        summary: "Build a sterile, ergonomic device path: vein access, pocket, tunnel, tip, port function, and closure.",
        children: ["port-equipment", "port-access", "port-pocket", "port-tip", "port-closure"],
      },
      "port-equipment": {
        title: "Equipment",
        type: "reference",
        summary: "Port setup is much smoother when the room has every component before the prep starts.",
        checklist: [
          "Port kit with catheter, reservoir, tunneler, peel-away sheath, and Huber needle if leaving accessed.",
          "Ultrasound, sterile cover, micropuncture set, wires, dilators.",
          "Local anesthetic, flushes, heparin lock per policy, suture/skin closure, skin adhesive or strips.",
          "Power-injectable labels/cards if relevant.",
        ],
      },
      "port-access": {
        title: "Venous access",
        type: "action",
        summary: "Use ultrasound for venipuncture and fluoroscopy to confirm wire course before dilation.",
        details: {
          "Avoid": [
            "Dilation without confirmed venous wire course.",
            "Pocket or tunnel trajectory that creates sharp bends or tension.",
          ],
        },
      },
      "port-pocket": {
        title: "Pocket",
        type: "action",
        summary: "The pocket should be reachable for access but protected from incision tension and bony pressure points.",
        details: {
          "Consider": [
            "Patient habitus, bra strap or clothing line, planned radiation/surgery, and whether the port will be frequently accessed.",
            "Meticulous hemostasis before closure.",
          ],
        },
      },
      "port-tip": {
        title: "Tip and function",
        type: "decision",
        summary: "Confirm tip position, reservoir orientation, aspiration, and flush before closure is final.",
        details: {
          "Confirm": [
            "Catheter tip position by fluoroscopy per local standard.",
            "Port aspirates and flushes without resistance.",
            "No catheter kink at venotomy, tunnel, or reservoir connection.",
          ],
        },
      },
      "port-closure": {
        title: "Closure",
        type: "action",
        summary: "Close in layers, dress cleanly, and clearly label whether the port is left accessed.",
        checklist: [
          "Layered closure per operator preference.",
          "Skin adhesive, strips, or dressing per local practice.",
          "Huber needle access only if requested and appropriate.",
          "Final flush or lock per port policy.",
        ],
      },
      "port-post": {
        title: "Post-procedure",
        type: "action",
        summary: "State whether the port is ready for use, how to care for incision, and when medications restart.",
        children: ["port-orders", "port-restart", "port-note"],
      },
      "port-orders": {
        title: "Orders",
        type: "action",
        summary: "Post-procedure orders should answer therapy readiness and wound-care questions.",
        checklist: [
          "Port ready for use if uncomplicated and function/tip position are confirmed.",
          "Incision care and showering restrictions per institutional practice.",
          "Monitor for fever, redness, drainage, swelling, bleeding, dyspnea, or chest pain.",
          "If left accessed, specify needle, dressing, and who will de-access.",
        ],
      },
      "port-restart": {
        title: "Restart meds",
        type: "decision",
        summary: "Use the local anticoagulation restart table and document the owner of restart.",
        details: {
          "Think through": [
            "Pocket hemostasis, thrombosis risk, chemotherapy timing, and whether the patient will receive heparinized infusions soon.",
          ],
        },
      },
      "port-note": {
        title: "Documentation",
        type: "reference",
        summary: "Port notes should be detailed enough for oncology nurses to trust the device status.",
        details: {
          Include: [
            "Access vein, port type, catheter tip position, aspirate/flush result, lock solution, whether accessed, complications, and ready-for-use statement.",
          ],
        },
      },
      "port-complications": {
        title: "Complications",
        type: "caution",
        summary: "Pocket hematoma, infection, pneumothorax, arterial injury, malposition, thrombosis, and port dysfunction are the big early concerns.",
        details: {
          "Escalate": [
            "New dyspnea or chest pain, expanding pocket swelling, arterial injury, fever or purulence, inability to aspirate/flush, or suspected catheter malposition.",
          ],
        },
      },
    },
  },
];

if (window.generatedProcedureData && window.generatedProcedureData.length > 0) {
  procedures.splice(0, procedures.length, ...window.generatedProcedureData);
}

const hiddenProcedureTitles = new Set([
  "Arteriogram",
  "Bone Biopsy",
  "Botox Injection",
  "Breast Ablation",
  "Celiac Plexus Block/Neurolysis",
  "Cholangioscopy with Lithotripsy and Biliary Stone Removal",
  "Fallopian Tube Recanalization",
  "Genicular Artery Embolization",
  "Kidney Ablation",
  "Kidney Embolization",
  "Liver Ablation",
  "Lung Ablation",
  "Parathyroid Venous Sampling",
  "Portal Vein Embolization",
  "Pudendal Angiogram",
  "Transvenous Biopsy",
  "Venogram",
  "MELD Score Reference",
  "Moderate Sedation Checklist",
]);

const anticoagulationTableLink = { text: "Open anticoagulation table", href: "#anticoagulation-table" };

const highRiskAnticoagRestartItems = [
  "Warfarin: resume the day after the procedure; bridging requires individualized multidisciplinary planning.",
  "IV unfractionated heparin: 6-8 hours after the procedure.",
  "Enoxaparin: 12 hours after the procedure.",
  "Apixaban, rivaroxaban, dabigatran, and edoxaban: Table 6 lists 24 hours; confirm renal function and local policy before restarting.",
  "Clopidogrel: 6 hours after the procedure for a 75-mg dose or 24 hours for a 300-600-mg loading dose.",
  "Ticagrelor, prasugrel, and aspirin: resume the day after the procedure.",
  "Restart only after procedural bleeding risk is controlled; traumatic, neuraxial, multi-agent, and high-thrombosis-risk cases need individualized review.",
];

const highRiskAnticoagHoldItems = [
  "Warfarin: hold 5 days and confirm INR <= 1.8.",
  "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa level.",
  "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
  "DOAC timing is agent-, dose-, and renal-function-specific; use the anticoagulation table.",
  "Clopidogrel and ticagrelor: hold 5 days; prasugrel: hold 7 days.",
  "Aspirin: hold 3-5 days.",
];

const anticoagulationAgents = [
  {
    id: "warfarin",
    label: "Warfarin",
    high: () => ({
      hold: "Hold 5 days; INR <= 1.8",
      restart: "Resume next day",
      note: "Consider bridging only for high thrombosis risk with multidisciplinary management. Emergent reversal requires a separate plan.",
    }),
  },
  {
    id: "ufh",
    label: "IV UFH",
    high: () => ({
      hold: "Hold 4-6 hours",
      restart: "Restart after 6-8 hours",
      note: "Check aPTT or anti-Xa level before the procedure. Subcutaneous BID/TID heparin has separate timing.",
    }),
  },
  {
    id: "enoxaparin",
    label: "Enoxaparin",
    high: ({ enoxaparinDose, crclBand }) => ({
      hold: enoxaparinDose === "prophylactic" ? "Hold 1 dose" : "Hold 2 doses or 24 hours",
      restart: "Restart after 12 hours",
      note:
        crclBand === "ge50"
          ? `${enoxaparinDose === "prophylactic" ? "Prophylactic" : "Therapeutic"} dosing selected.`
          : `${enoxaparinDose === "prophylactic" ? "Prophylactic" : "Therapeutic"} dosing selected. SIR advises checking anti-Xa activity when renal function is impaired.`,
    }),
  },
  {
    id: "apixaban",
    label: "Apixaban",
    high: ({ crclBand }) => {
      if (crclBand === "ge50") {
        return { hold: "Hold 4 doses", restart: "Restart after 24 hours", note: "CrCl >=50 mL/min selected." };
      }
      if (crclBand === "30to49") {
        return {
          hold: "Hold 6 doses",
          restart: "Restart after 24 hours",
          note: "CrCl 30-49 mL/min selected; consider checking anti-Xa activity or an apixaban level.",
        };
      }
      return {
        hold: "Specialist review",
        restart: "Individualize",
        note: "The SIR table does not give a standard interval for CrCl <30 mL/min or unknown renal function; consider anti-Xa or an apixaban level.",
      };
    },
  },
  {
    id: "rivaroxaban",
    label: "Rivaroxaban",
    high: ({ crclBand }) => {
      if (crclBand === "ge50" || crclBand === "30to49") {
        return {
          hold: "Hold 2 doses",
          restart: "Restart after 24 hours",
          note: `${crclBand === "ge50" ? "CrCl >=50" : "CrCl 30-49"} mL/min selected.`,
        };
      }
      if (crclBand === "15to29") {
        return {
          hold: "Hold 3 doses",
          restart: "Restart after 24 hours",
          note: "CrCl 15-29 mL/min selected; consider checking anti-Xa activity or a rivaroxaban level.",
        };
      }
      return {
        hold: "Specialist review",
        restart: "Individualize",
        note: "The SIR table does not give a standard interval for CrCl <15 mL/min or unknown renal function; consider anti-Xa or a rivaroxaban level.",
      };
    },
  },
  {
    id: "dabigatran",
    label: "Dabigatran",
    high: ({ crclBand }) => {
      if (crclBand === "ge50") {
        return { hold: "Hold 4 doses", restart: "Table 6: 24 hours", note: "CrCl >=50 mL/min selected." };
      }
      if (crclBand === "30to49") {
        return {
          hold: "Hold 6-8 doses",
          restart: "Table 6: 24 hours",
          note: "CrCl 30-49 mL/min selected; consider checking thrombin time or a dabigatran level.",
        };
      }
      return {
        hold: "Specialist review",
        restart: "Individualize",
        note: "The SIR table does not give a standard interval for CrCl <30 mL/min or unknown renal function. Its narrative also cites at least 48 hours before full-dose restart after high-risk procedures; reconcile with local policy.",
      };
    },
    note:
      "SIR Table 6 lists restart at 24 hours, while the accompanying narrative cites at least 48 hours before full-dose dabigatran after high-risk procedures. Reconcile this discrepancy with local policy.",
  },
  {
    id: "edoxaban",
    label: "Edoxaban",
    high: ({ crclBand }) => ({
      hold: "Hold 2 doses",
      restart: "Restart after 24 hours",
      note:
        crclBand === "ge50"
          ? "Confirm dose and indication."
          : "Renal impairment selected; SIR advises considering anti-Xa activity and individualized review.",
    }),
  },
  {
    id: "clopidogrel",
    label: "Clopidogrel",
    high: () => ({
      hold: "Hold 5 days",
      restart: "6 hours at 75 mg; 24 hours if loading",
      note: "Coordinate loading-dose decisions and recent coronary/peripheral stent management with the prescribing team.",
    }),
  },
  {
    id: "ticagrelor",
    label: "Ticagrelor",
    high: () => ({ hold: "Hold 5 days", restart: "Resume next day" }),
  },
  {
    id: "prasugrel",
    label: "Prasugrel",
    high: () => ({ hold: "Hold 7 days", restart: "Resume next day" }),
  },
  {
    id: "aspirin",
    label: "Aspirin",
    high: () => ({ hold: "Hold 3-5 days", restart: "Resume next day" }),
  },
];

const anticoagulationProcedureRules = [
  {
    procedureTitle: "Adrenal Vein Sampling",
    label: "Adrenal Vein Sampling",
    risk: "Low",
    basis: "Mapped to SIR diagnostic venography/select venous interventions; confirm the local AVS classification.",
  },
  {
    procedureTitle: "Biliary Drain Placement and Internalization/Exchange",
    label: "Biliary drain placement/internalization",
    risk: "High",
    basis: "SIR Table 3: biliary interventions are high bleeding risk.",
  },
  {
    procedureTitle: "Biliary Drain Placement and Internalization/Exchange",
    label: "Biliary drain exchange",
    risk: "Low",
    basis: "SIR Table 3: biliary catheter exchange is low bleeding risk.",
  },
  {
    procedureTitle: "Catheter Directed Thrombolysis - DVT Intervention",
    label: "Catheter Directed Thrombolysis - DVT Intervention",
    risk: "High",
    basis: "SIR Table 3: catheter-directed thrombolysis is high bleeding risk; technical and lytic-agent details still require individual review.",
  },
  {
    procedureTitle: "Chest Tube Placement",
    label: "Chest tube: nontunneled for pleural effusion",
    risk: "Low",
    basis: "This SIR low-risk category is limited to nontunneled chest tube placement for pleural effusion.",
  },
  {
    procedureTitle: "Cholecystostomy Tube Placement/Exchange",
    label: "Cholecystostomy tube placement",
    risk: "High",
    basis: "SIR Table 3 explicitly lists cholecystostomy tube placement as high bleeding risk.",
  },
  {
    procedureTitle: "Cholecystostomy Tube Placement/Exchange",
    label: "Cholecystostomy tube exchange",
    risk: "Low",
    basis: "Mapped to SIR catheter-exchange guidance; confirm local policy if new access or tract manipulation is expected.",
  },
  {
    procedureTitle: "Drainage Catheter Placement/Exchange",
    label: "Deep abscess drain placement",
    risk: "High",
    basis: "SIR Table 3: deep lung, abdominal, pelvic, or retroperitoneal abscess drainage is high bleeding risk.",
  },
  {
    procedureTitle: "Drainage Catheter Placement/Exchange",
    label: "Existing abscess drain exchange",
    risk: "Low",
    basis: "SIR Table 3: abscess catheter exchange is low bleeding risk.",
  },
  {
    procedureTitle: "Fistulogram",
    label: "Fistulogram/dialysis access intervention",
    risk: "Low",
    basis: "SIR Table 3: dialysis access interventions are low bleeding risk.",
  },
  {
    procedureTitle: "Foreign Body Removal",
    label: "Foreign Body Removal",
    risk: "Review",
    basis: "No directly matching procedure category was identified in SIR Table 3; assign risk using site, access, and expected retrieval complexity.",
  },
  {
    procedureTitle: "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Exchange",
    label: "G/GJ/J tube exchange",
    risk: "Low",
    basis: "SIR Table 3: gastrostomy and gastrojejunostomy catheter exchanges are low bleeding risk.",
  },
  {
    procedureTitle: "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Placement",
    label: "Gastrostomy/gastrojejunostomy placement",
    risk: "High",
    basis: "SIR Table 3: gastrostomy/gastrojejunostomy placement is high bleeding risk.",
  },
  {
    procedureTitle: "Hemorrhoid Artery Embolization",
    label: "Hemorrhoid artery embolization",
    risk: "Conditional",
    basis: "SIR lists embolotherapy/peripheral arterial intervention with sheath <6 F as low risk, but pelvic or mesenteric arterial intervention and sheath >7 F as high risk.",
  },
  {
    procedureTitle: "Inferior Vena Cava Filter Placement",
    label: "IVC filter placement",
    risk: "Low",
    basis: "SIR Table 3: IVC filter placement is low bleeding risk.",
  },
  {
    procedureTitle: "Inferior Vena Cava Filter Removal",
    label: "IVC filter removal: uncomplicated",
    risk: "Low",
    basis: "SIR Table 3: uncomplicated IVC filter removal is low bleeding risk.",
  },
  {
    procedureTitle: "Inferior Vena Cava Filter Removal",
    label: "IVC filter removal: complex",
    risk: "High",
    basis: "SIR Table 3: complex IVC filter removal is high bleeding risk; consider tilt, penetration, fracture, dwell time, and planned advanced techniques.",
  },
  {
    procedureTitle: "Kidney Biopsy",
    label: "Kidney Biopsy",
    risk: "High",
    basis: "SIR Table 3: solid-organ biopsies are high bleeding risk.",
  },
  {
    procedureTitle: "Liver Biopsy/Fiducial Marker Placement",
    label: "Percutaneous liver biopsy/fiducial placement",
    risk: "High",
    basis: "Mapped to SIR solid-organ biopsy/deep intervention guidance. Transjugular liver biopsy is a separate low-risk category.",
  },
  {
    procedureTitle: "Lung Biopsy/Fiducial Marker Placement",
    label: "Lung biopsy/fiducial placement",
    risk: "High",
    basis: "Mapped to SIR solid-organ biopsy/deep intervention guidance.",
  },
  {
    procedureTitle: "Nephrostomy to Nephroureteral Stent Conversion",
    label: "Nephrostomy to nephroureteral stent conversion",
    risk: "High",
    basis: "Mapped to SIR urinary-tract intervention guidance because ureteral manipulation/internalization is planned.",
  },
  {
    procedureTitle: "Nephrostomy Tube Exchange",
    label: "Nephrostomy tube exchange",
    risk: "Low",
    basis: "SIR Table 3: nephrostomy catheter exchange is low bleeding risk.",
  },
  {
    procedureTitle: "Nephrostomy Tube Placement",
    label: "Nephrostomy tube placement",
    risk: "High",
    basis: "SIR Table 3: nephrostomy tube placement is high bleeding risk.",
  },
  {
    procedureTitle: "Paracentesis",
    label: "Paracentesis",
    risk: "Low",
    basis: "SIR Table 3: paracentesis is low bleeding risk.",
  },
  {
    procedureTitle: "PICC Placement",
    label: "PICC placement",
    risk: "Low",
    basis: "SIR Table 3: nontunneled venous access, including PICC placement, is low bleeding risk.",
  },
  {
    procedureTitle: "Port Placement",
    label: "Port placement",
    risk: "Low",
    basis: "SIR Table 3: tunneled venous catheter placement, including ports, is low bleeding risk.",
  },
  {
    procedureTitle: "Port Removal",
    label: "Port removal",
    risk: "Low",
    basis: "SIR Table 3: tunneled venous catheter removal, including ports, is low bleeding risk.",
  },
  {
    procedureTitle: "Prostate Artery Embolization",
    label: "Prostate artery embolization",
    risk: "Conditional",
    basis: "SIR lists embolotherapy/peripheral arterial intervention with sheath <6 F as low risk, but pelvic arterial intervention and sheath >7 F as high risk.",
  },
  {
    procedureTitle: "Thoracentesis",
    label: "Thoracentesis",
    risk: "Low",
    basis: "SIR Table 3: thoracentesis is low bleeding risk.",
  },
  {
    procedureTitle: "Thyroid Biopsy",
    label: "Thyroid biopsy",
    risk: "Low",
    basis: "SIR Table 3: superficial biopsy, including thyroid, is low bleeding risk.",
  },
  {
    procedureTitle: "Transjugular Intrahepatic Portosystemic Shunt Check/Revision (TIPS)",
    label: "TIPS check/revision",
    risk: "High",
    basis: "Mapped to SIR TIPS/portal-venous intervention guidance; procedural scope should be confirmed.",
  },
  {
    procedureTitle: "Transjugular Intrahepatic Portosystemic Shunt Creation (TIPS)",
    label: "TIPS creation",
    risk: "High",
    basis: "SIR Table 3: TIPS is high bleeding risk.",
  },
  {
    procedureTitle: "Tunneled Line Placement/Exchange",
    label: "Tunneled venous line placement/exchange",
    risk: "Low",
    basis: "SIR Table 3: tunneled venous catheter placement/removal and catheter exchange are low bleeding risk.",
  },
  {
    procedureTitle: "Uterine Fibroid Embolization (UFE)",
    label: "Uterine fibroid embolization",
    risk: "Conditional",
    basis: "SIR lists embolotherapy/peripheral arterial intervention with sheath <6 F as low risk, but pelvic arterial intervention and sheath >7 F as high risk.",
  },
  {
    procedureTitle: "Y90 Radioembolization Mapping",
    label: "Y90 mapping",
    risk: "Conditional",
    basis: "SIR lists diagnostic arteriography/embolotherapy with sheath <6 F as low risk, but mesenteric arterial intervention and sheath >7 F as high risk.",
  },
  {
    procedureTitle: "Y90 Radioembolization Therapy",
    label: "Y90 therapy",
    risk: "Conditional",
    basis: "SIR lists embolotherapy with sheath <6 F as low risk, but mesenteric arterial intervention and sheath >7 F as high risk.",
  },
];

installReferencePages();

installGastrostomyTubeHeaderPrototype();
installGastrostomyTubeExchangeEdits();
installAdrenalVeinSamplingEdits();
installCatheterDirectedThrombolysisEdits();
installParacentesisEdits();
installThoracentesisEdits();
installDrainageCatheterEdits();
installNephrostomyEdits();
installCholecystostomyEdits();
installBiliaryDrainEdits();
installChestTubeEdits();
installFistulogramEdits();
installIvcFilterPlacementEdits();
installIvcFilterRemovalEdits();
installKidneyBiopsyEdits();
installLiverBiopsyEdits();
installPiccPlacementEdits();
installTunneledLineEdits();
installLungBiopsyEdits();
installForeignBodyRemovalEdits();
installHemorrhoidArteryEmbolizationEdits();
installPortPlacementEdits();
installPortRemovalEdits();
installProstateArteryEmbolizationEdits();
installTipsCreationEdits();
installTipsRevisionEdits();
installThyroidBiopsyEdits();
installNerveBlockPlaceholder();
installUterineArteryEmbolizationPlaceholder();
installUfeEdits();
installY90MappingEdits();
installY90TherapyEdits();
installIntraprocedureSubblocks();
installModerateSedationLinks();
installRestartMedicationGuidance();
installPreProcedureTabs();

const visibleProcedures = procedures.filter((procedure) => !hiddenProcedureTitles.has(procedure.title));

const state = {
  procedureId: visibleProcedures[0].id,
  activeNodeId: visibleProcedures[0].root,
  detailNodeId: visibleProcedures[0].root,
  history: [visibleProcedures[0].root],
  search: "",
};

function installReferencePages() {
  procedures.push({
    id: "moderate-sedation-checklist",
    title: "Moderate Sedation Checklist",
    category: "Reference checklist",
    keywords: "moderate sedation sedation checklist airway npo asa mallampati consent monitoring",
    summary: "Reference checklist for deciding whether a patient can tolerate moderate sedation.",
    lastReviewed: "Draft reference page, June 2026",
    root: "moderate-sedation-checklist-root",
    nodes: {
      "moderate-sedation-checklist-root": {
        title: "Moderate Sedation Screen",
        type: "reference",
        summary: "Screen for patients who need anesthesia support, patients who may need anesthesia, and details to note before moderate sedation.",
        children: [
          "moderate-sedation-screening",
          "moderate-sedation-review",
        ],
      },
      "moderate-sedation-screening": {
        title: "Moderate Sedation Screen",
        type: "caution",
        summary: "Use these buckets to decide whether moderate sedation is appropriate or anesthesia should be involved.",
        details: {
          "Absolute / anesthesia required": [
            "Unstable airway or unable to protect airway.",
            "Obstructing neck/throat mass, stridor, severe airway edema/trismus.",
            "Respiratory failure, severe hypoxia, escalating O2 requirement, BiPAP/vent dependence.",
            "Hemodynamic instability, shock, unstable arrhythmia/angina.",
            "Severe AMS, agitation, or intoxication preventing safe monitoring/cooperation.",
            "Active vomiting/full stomach with high aspiration risk.",
            "Prior severe reaction to planned sedation meds / no safe med option.",
          ],
          "Relative / consider anesthesia": [
            "Known difficult airway, high Mallampati, limited mouth opening/neck extension, C-collar.",
            "Severe OSA, severe COPD/asthma, pulmonary HTN, poor cardiopulmonary reserve.",
            "Severe CHF/valvular disease, significant arrhythmia history, frailty/ASA IV.",
            "Chronic opioid/benzo use or high sedation tolerance.",
            "Not NPO, severe GERD/gastroparesis, pregnancy.",
            "Prior difficult sedation or paradoxical reaction.",
          ],
          "Things to note": [
            "Dentures/partials, loose teeth.",
            "Baseline O2 requirement, CPAP/BiPAP use.",
            "Ability to lie flat/still and follow commands.",
            "Last PO intake.",
            "Allergies and prior sedation/anesthesia issues.",
            "Current opioids, benzos, alcohol, recreational drugs.",
            "Neck immobility/c-collar or positioning limitations.",
          ],
          "Related references": [
            { text: "MELD score reference", procedureId: "meld-score-reference" },
          ],
        },
      },
      "moderate-sedation-review": {
        title: "Needs review",
        type: "caution",
        summary: "Confirm this checklist with local sedation policy.",
        details: {
          "Review checklist": [
            "Confirm language with institutional moderate sedation policy.",
            "Confirm anesthesia escalation criteria.",
            "Confirm NPO and discharge requirements.",
          ],
        },
      },
    },
  });

  procedures.push({
    id: "meld-score-reference",
    title: "MELD Calculator",
    category: "Reference calculator",
    keywords: "meld meld-na meld 3.0 score tips bilirubin inr creatinine sodium albumin dialysis female mortality risk",
    summary: "Calculate MELD-Na and MELD 3.0 for TIPS risk stratification, with bounded inputs and interpretation prompts.",
    lastReviewed: "Formula references checked, September 2026",
    root: "meld-score-reference-root",
    nodes: {
      "meld-score-reference-root": {
        title: "MELD Calculator",
        type: "reference",
        summary: "Enter labs to calculate MELD-Na and MELD 3.0, then use the score to frame TIPS risk review.",
        children: ["meld-score-calculator", "meld-score-risk-bands", "meld-score-formula-notes"],
        calculator: "meld",
      },
      "meld-score-calculator": {
        title: "MELD-Na / MELD 3.0",
        type: "decision",
        summary: "Enter bilirubin, INR, creatinine, sodium, albumin, sex, and dialysis status.",
        calculator: "meld",
      },
      "meld-score-risk-bands": {
        title: "MELD Risk Bands",
        type: "decision",
        summary: "Use MELD risk bands to frame TIPS risk discussions and attending review.",
        details: {
          "Risk bands": [
            "MELD <15: Low risk.",
            "MELD 15-18: Moderate risk.",
            "MELD >18-20: Significantly increased mortality; proceed with caution.",
            "MELD >25-30: Often considered prohibitive except in salvage situations.",
          ],
        },
      },
      "meld-score-formula-notes": {
        title: "Formula Notes",
        type: "reference",
        summary: "The calculator bounds labs before scoring and rounds final scores to the nearest integer.",
        details: {
          "MELD 3.0 bounds": [
            "Bilirubin, INR, and creatinine are set to at least 1.",
            "Creatinine is capped at 3 mg/dL; qualifying dialysis sets creatinine to 3 mg/dL.",
            "Sodium is bounded from 125 to 137 mEq/L.",
            "Albumin is bounded from 1.5 to 3.5 g/dL.",
          ],
          "MELD-Na bounds": [
            "Bilirubin, INR, and creatinine are set to at least 1.",
            "Creatinine is capped at 4 mg/dL; qualifying dialysis sets creatinine to 4 mg/dL.",
            "Sodium is bounded from 125 to 137 mEq/L.",
          ],
          Sources: [sources.hrsaMeld, sources.meld3],
        },
      },
    },
  });

  procedures.push({
    id: "anticoagulation-table",
    title: "Anticoagulation Table",
    category: "Reference table",
    keywords:
      "anticoagulation anticoagulant antiplatelet hold resume restart bleeding risk warfarin heparin enoxaparin apixaban rivaroxaban dabigatran edoxaban clopidogrel ticagrelor prasugrel aspirin SIR",
    summary: "Compare published SIR 2019 hold and restart recommendations by procedure and antithrombotic agent.",
    lastReviewed: "SIR 2019 baseline checked, September 2026",
    root: "anticoagulation-table-root",
    nodes: {
      "anticoagulation-table-root": {
        title: "Anticoagulation Table",
        type: "reference",
        summary: "Find the procedure on the vertical axis and the medication on the horizontal axis, then select a cell for the complete SIR baseline recommendation.",
        calculator: "anticoagulation",
        children: [
          "anticoagulation-table-high-risk-hold",
          "anticoagulation-table-high-risk-restart",
          "anticoagulation-table-low-risk",
          "anticoagulation-table-review",
        ],
      },
      "anticoagulation-table-high-risk-hold": {
        title: "High-risk hold",
        type: "caution",
        summary: "Common high-risk medication holds from SIR Part II, Table 6.",
        details: {
          "High bleeding risk hold": highRiskAnticoagHoldItems,
        },
      },
      "anticoagulation-table-high-risk-restart": {
        title: "High-risk restart",
        type: "decision",
        summary: "Resume only after hemostasis is confirmed and there is no procedure-related bleeding concern.",
        details: {
          "High bleeding risk restart": highRiskAnticoagRestartItems,
        },
      },
      "anticoagulation-table-low-risk": {
        title: "Low-risk procedures",
        type: "reference",
        summary: "SIR Table 6 generally recommends not withholding the listed agents for low-risk procedures.",
        details: {
          "Low bleeding risk": [
            "Do not withhold the listed anticoagulant or antiplatelet agent solely for an uncomplicated low-risk procedure.",
            "For warfarin, SIR Table 6 lists a target INR <= 3.0; arterial-access thresholds may be lower.",
            "Patient bleeding factors, multi-agent therapy, renal or hepatic dysfunction, and unexpected procedural complexity can change the plan.",
          ],
        },
      },
      "anticoagulation-table-review": {
        title: "Needs review",
        type: "caution",
        summary: "Validate the published SIR baseline against the current institutional anticoagulation policy before clinical deployment.",
        details: {
          "Review checklist": [
            "SIR announced an update of the 2019 guideline as a 2025 guideline topic; replace these rules when a published update or approved institutional table is available.",
            "Confirm medication, dose, renal function, indication, thrombotic risk, and procedure category for each patient.",
            "Do not use this table alone for urgent/emergent procedures, neuraxial procedures, active bleeding, recent VTE/stroke, mechanical valves, recent stents, bridging, or combination therapy.",
          ],
          Sources: [sources.sirAnticoagulation, sources.sirAnticoagulationStatus],
        },
      },
    },
  });
}

function installIntraprocedureSubblocks() {
  procedures.forEach((procedure) => {
    if (procedure.category && procedure.category.startsWith("Reference")) return;

    Object.entries(procedure.nodes).forEach(([nodeId, node]) => {
      if (node.title !== "Intraprocedure") return;

      const anatomyId = `${nodeId}-anatomy`;
      const proceduralStepsId = `${nodeId}-procedural-steps`;
      const pitfallsSafetyId = `${nodeId}-pitfalls-safety`;
      const existingChildren = (node.children || []).filter((childId) => {
        return childId !== anatomyId && childId !== proceduralStepsId && childId !== pitfallsSafetyId;
      });

      if (!procedure.nodes[anatomyId]) {
        procedure.nodes[anatomyId] = {
          title: "Anatomy",
          type: "reference",
          summary: "Key anatomy and landmarks for this procedure.",
          details: {
            "To build out": [
              "Add procedure-specific target anatomy, access route anatomy, structures to avoid, and important imaging landmarks.",
            ],
          },
        };
      }

      procedure.nodes[proceduralStepsId] = {
        ...procedure.nodes[proceduralStepsId],
        title: "Procedural steps",
        type: "action",
        summary: [
          "Adrenal Vein Sampling",
          "Catheter Directed Thrombolysis - DVT Intervention",
          "Cholecystostomy Tube Placement/Exchange",
          "Fistulogram",
          "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Exchange",
          "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Placement",
          "Liver Biopsy/Fiducial Marker Placement",
          "Lung Biopsy/Fiducial Marker Placement",
          "Nephrostomy Tube Placement",
          "Paracentesis",
          "PICC Placement",
          "Prostate Artery Embolization",
          "Thoracentesis",
          "Transjugular Intrahepatic Portosystemic Shunt Creation (TIPS)",
          "Transjugular Intrahepatic Portosystemic Shunt Check/Revision (TIPS)",
          "Uterine Fibroid Embolization (UFE)",
        ].includes(procedure.title) ? "" : "Procedure-specific access, device, imaging, and completion steps.",
        children: existingChildren,
      };

      if (!procedure.nodes[pitfallsSafetyId]) {
        procedure.nodes[pitfallsSafetyId] = {
          title: "Pitfalls and safety",
          type: "caution",
          summary: "Procedure-specific pitfalls, structures at risk, and safety checks.",
          details: {
            "To build out": [
              "Add common technical pitfalls, prevention strategies, danger signs, and escalation or abort criteria.",
            ],
          },
        };
      }

      node.children = [anatomyId, proceduralStepsId, pitfallsSafetyId];
    });
  });
}

function installGastrostomyTubeHeaderPrototype() {
  const procedure = procedures.find(
    (item) => item.title === "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Placement",
  );
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Gastrostomy/gastrojejunostomy tube placement guidance for long-term enteral nutrition, dysphagia, aspiration risk, gastroparesis, and failed gastric feeding.";
  procedure.keywords = `${procedure.keywords || ""} g tube gj tube j tube feeding tube peg`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: procedure.title,
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, labs, high-risk anticoagulation holds, sedation/anesthesia plan, skin site, and tube prep.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Gastrostomy versus gastrojejunostomy indications.",
      details: {
        "Gastrostomy": [
          "Long-term enteral nutrition with inadequate oral intake.",
          "Persistent dysphagia.",
          "Planning for oropharyngeal surgery.",
        ],
        "Gastrojejunostomy": [
          "Gastric feeding not tolerated.",
          "High aspiration risk.",
          "Gastroparesis.",
          "Gastric outlet obstruction.",
          "Failed G-tube.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 1.5-1.8 and platelets >50k.",
      details: {
        Labs: ["INR < 1.5-1.8.", "Platelets >50k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate or general anesthesia; general is common due to dysphagia indication.",
      details: {
        Sedation: [
          "Moderate or General.",
          "More often than others, these patients need general due to placement for dysphagia.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging, labs, access window and skin site, NPO status, barium, NG tube if inpatient, and antibiotics.",
      details: {
        Checklist: [
          "Confirm indication and review imaging.",
          "Labs are appropriate.",
          "Appropriate window on imaging.",
          "Assess the planned abdominal skin site for active infection or overlying medical devices, such as leads or pacers.",
          "Patient is NPO if moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          "Barium order to be administered ENTIRE bottle the night prior.",
          "NG tube in place if inpatient.",
          "Ancef 2 g if <120 kg, 3 g if >120 kg.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy", type: "reference", summary: "",
      details: { "G-tube placement": [
        { strong: "Target:", text: " an accessible anterior gastric body apposed to the abdominal wall." },
        { strong: "Structures to avoid:", text: " transverse colon, small bowel, left hepatic lobe, and abdominal-wall vessels." },
        { strong: "Gastric vessels:", text: " major vessels follow the curvatures; choose a safe body-wall puncture site." },
        { strong: "Pylorus:", text: " keep the retention device inside the stomach without obstructing the outlet." },
        { strong: "Altered anatomy:", text: " prior surgery, ascites, or a high stomach may change or eliminate the safe window." },
      ] },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps", type: "action", summary: "",
      details: { "G-tube placement - direct radiologic technique": [
        { strong: "1. Map a safe window.", text: " Review imaging and identify the stomach, colon, liver, and access trajectory." },
        { strong: "2. Prepare and distend.", text: " Confirm antibiotics and airway plan; insufflate through a verified gastric catheter." },
        { strong: "3. Recheck and appose.", text: " Reassess the window after distention; place gastropexy anchors for the selected technique." },
        { strong: "4. Enter the stomach.", text: " Confirm intragastric needle position, then secure a guidewire in the lumen." },
        { strong: "5. Place the tube.", text: " Dilate over the wire; position and deploy the retention device inside the stomach." },
        { strong: "6. Confirm and secure.", text: " Check contrast filling without leak; avoid excessive tension and document feeding clearance and anchor care." },
      ] },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety", type: "caution", summary: "",
      details: {
        "G-tube placement": [
          { strong: "Bowel or liver interposition:", text: " no safe window means no puncture; reposition or choose another approach." },
          { strong: "Intraperitoneal placement:", text: " confirm access before dilation and tube position before use." },
          { strong: "Bleeding:", text: " avoid visible vessels; promptly assess bloody output, expanding hematoma, or instability." },
          { strong: "Leak or early dislodgement:", text: " stop feeds and urgently assess severe pain, guarding, fever, or displacement. No blind reinsertion." },
          { strong: "Aspiration:", text: " gastric access does not remove aspiration risk; monitor airway and tolerance of insufflation." },
          { strong: "Pressure injury or infection:", text: " avoid overtight bolsters or anchors; assess skin pain, erythema, and purulence." },
        ],
        References: [{ text: "Radiologic gastrostomy techniques and complications", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2989547/" }],
      },
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet hold until IR clearance, vitals, pain control, pull-type antibiotic course, feeding clearance, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "No diet until cleared by IR on POD1.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
            "IF PULL TYPE: 500 mg Keflex BID x 5 days.",
          ],
        },
        {
          title: "Once cleared by IR",
          items: ["Feeding tube: PEG and G Tube diet."],
        },
      ],
      details: {
        "Follow up": [
          "POD1 check with no signs of peritonitis.",
          "Flushes without resistance or pain.",
          "Nutrition consult.",
          "6 month routine exchange for balloon retention device.",
        ],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "Common problems during or after tube placement and what to check first.",
      details: {
        "If no safe window": [
          "Re-review CT/US/fluoro anatomy, reposition patient, insufflate stomach if appropriate, and reassess colon/liver interposition.",
          "Escalate to senior operator if anatomy is unfavorable or if surgical/endoscopic access may be safer.",
        ],
        "If tube position is uncertain": [
          "Do not clear for use until intraluminal position is confirmed.",
          "Use contrast confirmation and review images with the operator if there is concern for malposition.",
        ],
        "If early pain or leakage": [
          "Assess vitals, abdominal exam, tube position, dressing, and output.",
          "Escalate for peritonitis, severe pain, fever, or hemodynamic change.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "Findings that should pause the case or prompt urgent escalation.",
      details: {
        "Before placement": [
          "No safe percutaneous window, uncontrolled coagulopathy per local policy, active abdominal wall infection at access site, inability to consent without surrogate, or unstable patient for planned sedation.",
          "Large-volume ascites, suspected peritonitis, severe ileus/obstruction, or anatomy altered enough that percutaneous access may be unsafe.",
        ],
        "After placement": [
          "Severe or worsening abdominal pain, peritoneal signs, fever, hypotension, bleeding, respiratory deterioration, tube dislodgement, or concern for intraperitoneal placement.",
          "Do not use tube until cleared according to the post-procedure plan.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm anesthesia workflow, barium/NG prep, antibiotic dosing, and POD1 clearance workflow.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification with local policy.",
          "Confirm anticoagulation hold times with the final table.",
          "Confirm barium and NG tube workflow.",
          "Confirm POD1 clearance and nutrition consult workflow.",
        ],
      },
    },
  };
}

function installGastrostomyTubeExchangeEdits() {
  const procedure = procedures.find(
    (item) => item.title === "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Exchange",
  );
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Gastrostomy/gastrojejunostomy/jejunostomy tube exchange guidance for routine exchange, malfunction, clogging, leakage, dislodgement, and tube-feed restart.";
  procedure.keywords = `${procedure.keywords || ""} g tube gj tube j tube feeding tube exchange replacement malfunction clogged dislodged`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: procedure.title,
      type: "reference",
      summary: "Review pre-procedure checks, exchange considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, tract maturity, tube type/size, local-only plan, and discharge readiness.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-physical-exam-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Routine exchange or tube problem requiring replacement/repositioning.",
      details: {
        Indications: [
          "Routine scheduled exchange.",
          "Clogged or poorly flushing tube.",
          "Malpositioned or retracted tube.",
          "Tube fracture, balloon failure, or connector/device issue.",
          "Pericatheter leakage or skin irritation when tube position or fit is part of the problem.",
          "Dislodged tube with a mature tract and appropriate urgency for tract salvage.",
        ],
        "Clarify before booking": [
          "Existing tube type: gastrostomy, gastrojejunostomy, or jejunostomy.",
          "Current tube size and retention type if known.",
          "When the tube was originally placed and whether the tract is mature.",
          "Whether the tube is completely out, partially retracted, clogged, leaking, or due for routine exchange.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "None unless further indicated.",
      details: {
        Labs: ["None unless further indicated."],
        Orders: ["SDC/outpatient with discharge.", "Vital signs per routine.", "Glucose point of care."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk for routine mature-tract exchange; use the anticoagulation table for medication-specific guidance.",
      details: {
        Anticoagulation: [
          "Low bleeding risk for routine exchange through a mature tract.",
          "Escalate to high-risk planning if the tract is immature, access may need to be re-established, or a new puncture is possible.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local only.",
      details: {
        Sedation: ["Local only.", "NPO per local-only exchange workflow."],
      },
    },
    [`${id}-physical-exam-v2`]: {
      title: "Physical exam",
      type: "decision",
      summary: "Inspect tube site and confirm the tube problem before exchange.",
      details: {
        "Tube/site exam": [
          "Inspect stoma for erythema, skin breakdown, leakage, bleeding, purulence, buried bumper concern, or tract disruption.",
          "Check tube position, external length, balloon/retention device if applicable, and whether the tube flushes.",
          "Assess abdominal pain, peritoneal signs, fever, or instability before treating as a routine exchange.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm tube details, tract maturity, labs if needed, local-only plan, glucose POC, and discharge plan.",
      details: {
        Checklist: [
          "Confirm indication and current tube type.",
          "Confirm tube size and replacement device availability.",
          "Confirm tract is mature for routine exchange, or escalate if immature/uncertain.",
          "No labs unless further indicated.",
          "Patient is in SDC/outpatient workflow with discharge plan.",
          "NPO per local-only exchange workflow.",
          "Glucose point of care ordered.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy", type: "reference", summary: "",
      details: { "G-tube exchange": [
        { strong: "Existing tract:", text: " connects skin to stomach; maturity determines whether routine exchange is safe." },
        { strong: "Retention device:", text: " the balloon or bumper belongs inside the stomach, not the tract." },
        { strong: "Tube fit:", text: " match device type, diameter, and stoma length for low-profile tubes." },
        { strong: "Pylorus:", text: " distal tube migration can obstruct gastric emptying." },
      ] },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps", type: "action", summary: "",
      details: { "G-tube exchange": [
        { strong: "1. Confirm the setup.", text: " Check tract maturity, tube type, and reason for exchange." },
        { strong: "2. Confirm gastric access.", text: " Inject contrast gently; a retracted tube may no longer be intragastric." },
        { strong: "3. Preserve the tract.", text: " Secure wire access in the stomach before removal when feasible." },
        { strong: "4. Exchange without force.", text: " Deflate the balloon or release retention per device instructions; advance the replacement." },
        { strong: "5. Seat the device.", text: " Confirm intragastric retention; fill the balloon per manufacturer instructions without excessive tension." },
        { strong: "6. Verify before use.", text: " Confirm gastric contrast filling without leak; document fit, external length, and clearance." },
      ] },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety", type: "caution", summary: "",
      details: {
        "G-tube exchange": [
          { strong: "Immature or uncertain tract:", text: " no blind replacement; early dislodgement needs image-guided or endoscopic planning." },
          { strong: "False passage:", text: " stop for pain, resistance, or extravasation. Do not use until position is confirmed." },
          { strong: "Lost access:", text: " the tract can narrow quickly; arrange prompt assessment, not forceful re-entry." },
          { strong: "Buried bumper:", text: " pain or an immobile tube needs evaluation, not forceful traction." },
          { strong: "Poor fit or leakage:", text: " avoid tight bolsters and routine upsizing; check position, retention, and skin first." },
          { strong: "Peritonitis or bleeding:", text: " worsening pain, guarding, fever, instability, or significant bleeding needs urgent evaluation." },
        ],
        References: [{ text: "Gastrostomy replacement and complication guidance", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10393568/" }],
      },
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Regular diet/tube feeds, routine vitals, immediate discharge if outpatient, AVS selection, and 6-month routine exchange.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Notify MD/LIP - IR.",
            "Regular diet - tube feeds.",
            "Feeding tube: PEG and G tube.",
            "Vital signs per unit routine.",
          ],
        },
        {
          title: "If outpatient",
          items: [
            "Discharge order with medication reconciliation prior - immediate.",
            "After visit summary: .IRAVSGASTROSTOMYTUBEEXCHANGE or .IRAVSGJTUBEEXCHANGE or .IRAVSJTUBEEXCHANGE.",
          ],
        },
      ],
      details: {
        "Follow up": ["6 month routine exchange."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "Common exchange problems and first checks.",
      details: {
        "If tube is clogged": [
          "Confirm whether bedside declogging was attempted and whether the tube can be flushed safely.",
          "Exchange if malfunction persists or tube integrity/position is uncertain.",
        ],
        "If tube is dislodged": [
          "Clarify time out of tract and original placement date.",
          "Do not assume a safe mature tract if early after placement or if the tract course is uncertain.",
        ],
        "If position is uncertain": [
          "Do not clear for use until intraluminal position is confirmed.",
          "Use contrast confirmation and review images with the operator if there is concern for malposition.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "Findings that should pause routine exchange or prompt escalation.",
      details: {
        "Escalate before routine exchange": [
          "Immature tract, unknown original placement date, or tube fully out long enough that tract salvage is uncertain.",
          "Severe abdominal pain, peritoneal signs, fever, hypotension, or concern for intraperitoneal tube position.",
          "Purulent skin infection, bleeding, buried bumper concern, or inability to safely re-establish tract access.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm low-risk classification, local-only NPO wording, tube-feed order language, and exchange follow-up workflow.",
      details: {
        "Review checklist": [
          "Confirm mature-tract exchange bleeding risk classification with local policy.",
          "Confirm anticoagulation hold language with the final table.",
          "Confirm local NPO requirement for local-only tube exchange.",
          "Confirm feeding tube order language for G, GJ, and J tube exchanges.",
          "Confirm 6-month routine exchange scheduling workflow.",
        ],
      },
    },
  };
}

function installCatheterDirectedThrombolysisEdits() {
  const procedure = procedures.find((item) => item.title === "Catheter Directed Thrombolysis - DVT Intervention");
  if (!procedure) return;

  procedure.title = "Catheter Directed Thrombolysis - DVT Intervention";
  procedure.summary =
    "Catheter-directed thrombolysis guidance for acute limb ischemia, threatening iliofemoral DVT symptoms, phlegmasia, and acute thrombosed bypass graft.";
  procedure.keywords = [
    "lysis",
    "thrombolysis",
    "alteplase",
    "heparin",
    "fibrinogen",
    "anti-xa",
    "aptt",
    "acute limb ischemia",
    "dvt",
    "phlegmasia",
    "bypass graft",
  ];
  procedure.bleedRisk = "High";

  const id = procedure.id;
  procedure.nodes = {
    [`${id}-root`]: {
      title: "Catheter Directed Thrombolysis - DVT Intervention",
      type: "overview",
      summary: "Confirm indication, exclude contraindications, verify labs and order-set details, and plan ICU-level thrombolysis monitoring.",
      children: [`${id}-pre`, `${id}-intra`, `${id}-post`, `${id}-review`],
    },
    [`${id}-pre`]: {
      title: "Pre-procedure",
      type: "checklist",
      summary: "Screen for thrombolysis indication, bleeding contraindications, high-risk anticoagulation management, and infusion order setup.",
      children: [
        `${id}-indication`,
        `${id}-contraindications`,
        `${id}-labs`,
        `${id}-anticoag`,
        `${id}-sedation`,
        `${id}-pre-orders`,
        `${id}-checklist`,
      ],
    },
    [`${id}-indication`]: {
      title: "Indication",
      type: "checklist",
      summary: "Use when thrombus acuity and symptoms justify catheter-directed lysis.",
      details: {
        Indications: [
          "Acute limb ischemia.",
          "Acute or subacute iliofemoral DVT with threatening limb symptoms.",
          "Phlegmasia cerulea dolens.",
          "Acute thrombosed bypass graft.",
        ],
      },
    },
    [`${id}-contraindications`]: {
      title: "Contraindications",
      type: "caution",
      summary: "Exclude major bleeding, intracranial, neurologic, and severe hypertension risks before lysis.",
      details: {
        Contraindications: [
          "Active bleeding.",
          "Recent intracranial hemorrhage.",
          "Recent ischemic stroke.",
          "Intracranial neoplasm/AVM.",
          "Recent major intracranial or spinal surgery.",
          "Severe uncontrolled hypertension.",
        ],
      },
    },
    [`${id}-labs`]: {
      title: "Labs",
      type: "orders",
      summary: "Platelets >50k and INR <1.5-1.8.",
      details: {
        Labs: [
          "Platelets >50k.",
          "INR <1.5-1.8.",
        ],
      },
    },
    [`${id}-anticoag`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding-risk procedure. Use the anticoagulation table for hold and restart timing.",
      details: {
        Anticoagulation: [
          "High bleeding-risk procedure.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation`]: {
      title: "Sedation",
      type: "sedation",
      summary: "Moderate sedation or general anesthesia depending on patient acuity and airway/procedure needs.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          "General anesthesia.",
        ],
      },
    },
    [`${id}-pre-orders`]: {
      title: "Pre-operative orders",
      type: "orders",
      summary: "Enter fasting, monitoring, laboratory, notification, urinary catheter, and infusion orders for the planned catheter and sheath configuration.",
      details: {
        "Routine orders": [
          "NPO if moderate sedation is planned.",
          "Anti-Xa q6h x 24 hours.",
          "aPTT q6h x 24 hours.",
          "CBC q6h x 24 hours.",
          "Fibrinogen q6h x 24 hours.",
          "PT/INR q6h x 24 hours.",
          "Indwelling urinary catheter.",
        ],
        "Notification parameters": [
          "Notify MD/LIP: fibrinogen <200 mg/dL.",
          "Notify MD/LIP: aPTT >50 sec.",
          "Notify MD/LIP: INR >1.7.",
          "Notify MD/LIP: platelets <100,000/mm3.",
        ],
        "One infusion catheter and sheath": [
          "Heparin (FLAT RATE) at 500 units/hr: 1 order.",
          "Sodium chloride infusion 20 mL/hr: 1 order.",
          "Alteplase 1 mg/hr: 1 order.",
        ],
        "Two infusion catheters and sheaths (Site A and Site B)": [
          "Heparin (FLAT RATE) at 250 units/hr: 2 orders.",
          "Sodium chloride infusion 20 mL/hr: 2 orders.",
          "Alteplase 0.5 mg/hr: 2 orders.",
        ],
        "Two infusion catheters through one sheath": [
          "Heparin (FLAT RATE) at 500 units/hr: 1 order.",
          "Sodium chloride infusion 20 mL/hr: 2 orders.",
          "Alteplase 0.5 mg/hr: 2 orders.",
        ],
      },
    },
    [`${id}-checklist`]: {
      title: "Checklist",
      type: "checklist",
      summary: "Confirm indication, thrombus anatomy, candidacy for thrombolysis, monitoring, access, and consent.",
      checklist: [
        "Confirm indication and symptom duration.",
        "Review thrombus extent and central outflow.",
        "No major contraindication to thrombolysis.",
        "Labs appropriate: Hgb, platelets, INR/PTT, creatinine, +/- fibrinogen.",
        "Anticoagulation plan confirmed.",
        "Sedation plan confirmed.",
        "Venous access site planned.",
        "Consent completed.",
        "Monitored bed available if overnight lysis is planned.",
      ],
    },
    [`${id}-intra`]: {
      title: "Intraprocedure",
      type: "workflow",
      summary: "Use the institutional thrombolysis order set and verify all infusion rates with the operator before leaving the room.",
    },
    [`${id}-intra-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "Define thrombus extent, venous inflow and outflow, central obstruction, and access anatomy.",
      images: [
        {
          src: "images/deep-venous-anatomy.png",
          alt: "Illustrated deep venous anatomy of the lower extremity from the calf veins through the popliteal, femoral, iliac veins, and inferior vena cava.",
          caption: "Deep venous anatomy relevant to catheter-directed thrombolysis planning. Original educational schematic; not to scale. Confirm anatomy and variants on patient-specific imaging.",
        },
        {
          src: "images/popliteal-access-ultrasound.png",
          alt: "Synthetic transverse posterior popliteal-fossa ultrasound labeling the popliteal vein, popliteal artery, tibial nerve, and femur.",
          caption: "Typical transverse popliteal-fossa relationship for posterior venous access. Synthetic educational ultrasound; confirm structures dynamically before access.",
        },
      ],
      details: {
        Anatomy: [
          {
            label: "Thrombus extent",
            text: "Define involvement from the popliteal/femoral venous system through the iliac veins and into the IVC.",
          },
          {
            label: "Inflow",
            text: "Preserved profunda and femoral venous inflow supports effective thrombus clearance and long-term patency.",
          },
          {
            label: "Outflow",
            text: "Assess the external/common iliac veins and iliocaval junction for central obstruction that may limit treatment success.",
          },
          {
            label: "May-Thurner anatomy",
            text: "The left common iliac vein courses beneath the right common iliac artery and may have significant compression.",
          },
          {
            label: "Access anatomy",
            text: "When using popliteal access, recognize the relationship of the popliteal vein to the adjacent artery and tibial nerve on ultrasound.",
          },
        ],
      },
    },
    [`${id}-intra-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Basic steps": [
          { strong: "1. Plan access and define thrombus extent", text: " using preprocedural imaging and ultrasound." },
          { strong: "2. Obtain venous access", text: " in line with the thrombosed segment." },
          { strong: "3. Cross the thrombus", text: " with a wire and catheter; confirm intraluminal position." },
          { strong: "4. Perform venography", text: " to assess thrombus, inflow, outflow, collaterals, and stenosis." },
          { strong: "5. Position the infusion catheter", text: " with side holes spanning the target thrombus." },
          { strong: "6. Begin thrombolysis", text: " with anticoagulation and monitoring per institutional protocol." },
          { strong: "7. Repeat venography", text: " and address residual thrombus or significant underlying stenosis as appropriate." },
        ],
      },
    },
    [`${id}-intra-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Pitfalls and safety": [
          {
            strong: "Outflow obstruction:",
            text: " Residual iliac stenosis or compression may cause early rethrombosis.",
          },
          {
            strong: "Incomplete coverage:",
            text: " Ensure the infusion segment spans the target thrombus to avoid limiting inflow or outflow.",
          },
          {
            strong: "Catheter malposition:",
            text: " Confirm intraluminal position before starting lysis.",
          },
          {
            strong: "Bleeding:",
            text: " Monitor access sites, clinical status, and labs per institutional protocol.",
          },
          {
            strong: "Embolization:",
            text: " Promptly evaluate new hypoxia, chest pain, or hemodynamic deterioration.",
          },
          {
            strong: "Chronic thrombus:",
            text: " May respond poorly to lysis; consider thrombectomy, recanalization, or an alternative strategy.",
          },
        ],
      },
    },
    [`${id}-post`]: {
      title: "Post-procedure",
      type: "orders",
      summary: "Continue thrombolysis monitoring, apply access-specific bedrest, update infusion orders, and arrange the next-day catheter check or removal.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "No diet.",
            "Tylenol 650 mg PRN.",
            "Neurovascular checks q1h x 6 hours, then q2h for up to 24 hours after completion.",
            "Vital signs q15 minutes x 4, q30 minutes x 2, q1h x 2, then q2h until completion of the thrombolytic infusion.",
            "If femoral access for an arterial case: bedrest for 6 hours, or 2 hours if a closure device was used.",
            "Monitor color of access site.",
          ],
        },
        {
          title: "Follow-up",
          items: [
            "See pre-procedure orders; update them to reflect the infusion setup at the end of the procedure and laboratory parameters specified by the attending physician.",
            "Sign out to the primary team to place the IR Venous Intervention Order and make the patient NPO at midnight for thrombolysis catheter check/removal the following day.",
          ],
        },
      ],
    },
    [`${id}-review`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm CDT order-set details, lab frequency, notification thresholds, monitoring level, and next-day return workflow.",
      details: {
        "Review checklist": [
          "Confirm PT/INR q6h x 24 hours with the formal order set.",
          "Confirm exact heparin, alteplase, and saline defaults.",
          "Confirm required monitoring location and nursing requirements.",
          "Confirm next-day lysis check/removal order naming.",
        ],
      },
    },
  };
}

function installAdrenalVeinSamplingEdits() {
  const procedure = procedures.find((item) => item.title === "Adrenal Vein Sampling");
  if (!procedure) return;

  const id = procedure.id;
  const nodes = procedure.nodes;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Adrenal venous sampling for lateralization of aldosterone secretion in surgically eligible primary hyperaldosteronism.";

  if (nodes[`${id}-root`]) {
    nodes[`${id}-root`].summary =
      "Confirm indication, potassium correction, labs, cosyntropin plan, and low-risk anticoagulation guidance before sampling.";
  }

  if (nodes[`${id}-indication`]) {
    nodes[`${id}-indication`].summary =
      "Biochemically confirmed primary hyperaldosteronism in a patient who is a candidate for adrenalectomy, to lateralize aldosterone secretion.";
    nodes[`${id}-indication`].details = {
      Indication: [
        "Biochemically confirmed primary hyperaldosteronism.",
        "Patient is a candidate for adrenalectomy.",
        "Goal is to lateralize aldosterone secretion before operative planning.",
      ],
    };
  }

  if (nodes[`${id}-labs`]) {
    nodes[`${id}-labs`].title = "Labs and Orders";
    nodes[`${id}-labs`].summary = "Potassium, PT/INR, platelets, routine vitals, PIV, glucose POC, cosyntropin, and endocrine e-consult.";
    nodes[`${id}-labs`].details = {
      "Labs": ["Potassium", "PT/INR", "Platelets"],
      "Orders": [
        "Vital signs: per unit routine.",
        "PIV access.",
        "Glucose POC.",
        "250 mcg IV cosyntropin in 250 ml @ 50 mcg/hour to start 30-60 min prior to procedure. Lay flat after start of infusion.",
        "E-Consult to Endocrinology: Adrenal Disorders - ask patient for consent.",
      ],
    };
  }

  if (nodes[`${id}-anticoag`]) {
    nodes[`${id}-anticoag`].summary = "Low-risk procedure. Use the anticoagulation table for medication-specific hold timing.";
    nodes[`${id}-anticoag`].details = {
      Anticoagulation: [
        "Low-risk procedure.",
        { text: "Open anticoagulation table", href: "#anticoagulation-table" },
      ],
    };
  }

  if (nodes[`${id}-pre`]) {
    delete nodes[`${id}-pre`].checklist;
    delete nodes[`${id}-pre`].details;
    nodes[`${id}-pre`].children = [`${id}-indication`, `${id}-labs`, `${id}-anticoag`, `${id}-sedation`, `${id}-exam`];
  }

  nodes[`${id}-sedation`] = {
    title: "Sedation",
    type: "reference",
    summary: "Local sedation with +/- fentanyl.",
    details: {
      Sedation: ["Local sedation with +/- fentanyl."],
    },
  };

  if (nodes[`${id}-exam`]) {
    nodes[`${id}-exam`].title = "Checklist";
    nodes[`${id}-exam`].summary =
      "Imaging availability, potassium correction, blood pressure control, and cosyntropin plan.";
    nodes[`${id}-exam`].details = {
      Checklist: [
        "Imaging is available, if obtained. Imaging is not required.",
        "Potassium corrected.",
        "Patient has held beta blockers, ACE-I/ARBs, and MRAs for at least 2 weeks.",
        "BP reasonably controlled.",
      ],
    };
  }

  nodes[`${id}-intra`] = {
    title: "Intraprocedure",
    type: "reference",
    summary: "",
    children: [`${id}-intra-anatomy`, `${id}-intra-procedural-steps`, `${id}-intra-pitfalls-safety`],
  };
  delete nodes[`${id}-intra-placeholder`];

  nodes[`${id}-intra-anatomy`] = {
    title: "Anatomy",
    type: "reference",
    summary: "",
    details: {
      "Adrenal vein sampling": [
        { strong: "Right adrenal vein:", text: " short and small; enters the posterolateral IVC, often near T11-T12 and above the right renal vein." },
        { strong: "Left adrenal vein:", text: " usually joins the inferior phrenic vein; their common trunk enters the superior aspect of the left renal vein." },
        { strong: "Hepatic mimics:", text: " small accessory hepatic veins near the right adrenal ostium can look similar on venography." },
        { strong: "Variant drainage:", text: " duplicated adrenal veins or a shared hepatic-adrenal trunk can alter sampling and dilute hormone concentrations." },
        { strong: "Peripheral reference:", text: " an infrarenal IVC or peripheral venous sample provides the comparator for adrenal hormone measurements." },
      ],
    },
  };
  nodes[`${id}-intra-procedural-steps`] = {
    title: "Procedural steps",
    type: "action",
    summary: "",
    details: {
      "Adrenal vein sampling": [
        { strong: "Confirm the sampling plan:", text: " review venous imaging, cosyntropin timing, collection tubes, and the laboratory's labeling and rapid-cortisol workflow." },
        { strong: "Obtain venous access:", text: " use ultrasound-guided femoral access and prepare the IVC/peripheral reference sampling route." },
        { strong: "Select the right adrenal vein:", text: " use gentle, low-volume venography to confirm the ostium; avoid deep wedging. Cone-beam CT can clarify uncertain anatomy." },
        { strong: "Select the left adrenal vein:", text: " enter through the left renal vein and confirm the common adrenal-phrenic trunk." },
        { strong: "Collect matched samples:", text: " clear catheter dead space per protocol, then gently sample both adrenal veins and the reference site for aldosterone and cortisol; record site, time, and stimulation status." },
        { strong: "Confirm selectivity:", text: " use rapid cortisol when available; adrenal/reference cortisol ratio is commonly >=5 with cosyntropin or >=2 without it. Apply local criteria and resample if inadequate." },
        { strong: "Complete and hand off:", text: " verify specimens before sheath removal, obtain hemostasis, and send results for cortisol-corrected aldosterone comparison and endocrine interpretation." },
      ],
    },
  };
  nodes[`${id}-intra-pitfalls-safety`] = {
    title: "Pitfalls and safety",
    type: "caution",
    summary: "",
    details: {
      "Adrenal vein sampling": [
        { strong: "Wrong vein:", text: " an accessory hepatic vein can mimic the right adrenal vein; confirm selectivity rather than trusting the venogram alone." },
        { strong: "Rupture or hemorrhage:", text: " avoid forceful injection and deep wedging; stop and assess new flank/back pain, extravasation, or instability." },
        { strong: "Overly selective sampling:", text: " a deep tributary may miss tumor drainage and falsely suggest the opposite side; sample representative gland outflow." },
        { strong: "Poor blood return:", text: " strong suction can collapse the vein; aspirate gently and reassess catheter position instead of pulling harder." },
        { strong: "Sample mix-ups or dilution:", text: " clear contrast/flush dead space, label tubes immediately, and keep sampling times and cosyntropin status consistent." },
        { strong: "Misleading lateralization:", text: " confirm bilateral selectivity first; compare aldosterone/cortisol ratios, not raw aldosterone. Cortisol cosecretion can confound interpretation." },
      ],
      References: [
        { text: "Australian and New Zealand AVS Working Group recommendations", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11612544/" },
        { text: "Adrenal vein sampling: technique and protocol, a systematic review", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8093361/" },
        { text: "Anatomical variations encountered during adrenal venous sampling", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11009137/" },
      ],
    },
  };

  if (nodes[`${id}-post-orders`]) {
    nodes[`${id}-post-orders`].summary =
      "Post-procedure orders grouped by whether adrenal vein sampling lab results have returned.";
    delete nodes[`${id}-post-orders`].checklist;
    nodes[`${id}-post-orders`].checklistSections = [
      {
        title: "Before lab results have returned",
        items: [
          "Notify MD/LIP - IR",
          "No diet until lab results are back",
          "Activity - Femoral: 2 hours LE extended",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "Continue cosyntropin and do not order diet until lab results are back and cleared by attending",
        ],
      },
      {
        title: "After lab results have returned",
        items: [
          "Regular diet",
          "Notify RN to turn off cosyntropin",
          "Discharge order (med rec prior) - 2 hours",
          "After visit summary: .IRAVSVENOGRAM",
        ],
      },
    ];
  }

  if (nodes[`${id}-post`]) {
    nodes[`${id}-post`].summary = "Review orders and follow-up after adrenal vein sampling.";
    delete nodes[`${id}-post`].children;
    nodes[`${id}-post`].checklistSections = nodes[`${id}-post-orders`]?.checklistSections || [];
    if (nodes[`${id}-post`].checklistSections[1]) {
      nodes[`${id}-post`].checklistSections[1].items = [
        "Regular diet",
        "Notify RN to turn off cosyntropin",
        "Restart antihypertensives",
        "Discharge order (med rec prior) - 2 hours",
        "After visit summary: .IRAVSVENOGRAM",
      ];
    }
    nodes[`${id}-post`].details = {
      "Follow-up": ["Communicate with covering PA if follow-up needs to be scheduled."],
    };
  }

  if (nodes[`${id}-restart`]) {
    nodes[`${id}-restart`].summary = "Restart antihypertensives.";
    nodes[`${id}-restart`].details = {
      "Restart meds": ["Restart antihypertensives."],
    };
  }
}

function installParacentesisEdits() {
  const procedure = procedures.find((item) => item.title === "Paracentesis");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Paracentesis guidance for diagnostic and therapeutic ascites drainage, with labs, anticoagulation, fluid study checks, and post-procedure orders.";
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Paracentesis",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, labs, anticoagulation status, and requested ascites fluid studies.",
      children: [`${id}-indication-v2`, `${id}-labs-v2`, `${id}-anticoag-v2`, `${id}-sedation-v2`, `${id}-checklist-v2`, `${id}-consult-v2`],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Diagnostic or therapeutic paracentesis indications.",
      details: {
        Diagnostic: [
          "New onset ascites.",
          "Hospitalized with known ascites.",
          "Concern for SBP.",
          "Clinical deterioration in the setting of worsening ascites.",
          "Question of hemoperitoneum.",
          "Question of malignant ascites.",
        ],
        Therapeutic: [
          "Symptomatic large volume ascites.",
          "Refractory ascites to medical management.",
          "Pre-procedural decompression.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >50k.",
      details: {
        Labs: ["INR < 2-3.", "Platelets >50k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no requirement to hold anticoagulation.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
          "No requirement to hold anticoagulation.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, labs, and intended fluid studies.",
      details: {
        Checklist: [
          "Indication is appropriate.",
          "Labs are appropriate.",
          "Check what primary team has ordered fluid to be sent for: cell count with differential, albumin + total protein, cultures, cytology, etc.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local.",
      details: {
        Sedation: ["Local."],
      },
    },
    [`${id}-consult-v2`]: {
      title: "Consult Questions",
      type: "decision",
      summary: "None if the pre-procedure indication, labs, anticoagulation, and fluid-study checklist are answered.",
      details: {
        "Consult questions": ["None if above are answered."],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Albumin guidance, routine post-procedure care, and outpatient discharge instructions.",
      children: [`${id}-post-orders-v2`],
    },
    [`${id}-post-orders-v2`]: {
      title: "Orders",
      type: "action",
      summary: "Post-procedure orders for paracentesis.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Albumin: 6-8 g/L for every liter above 5 L.",
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "If outpatient",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSPARACENTESIS.",
          ],
        },
      ],
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        Paracentesis: [
          { strong: "Ascites pocket:", text: " free fluid collects dependently in the lower abdomen and pelvis; choose a pocket with adequate depth and a short abdominal-wall path." },
          { strong: "Bowel and solid organs:", text: " scan in multiple planes to separate fluid from mobile bowel, liver, spleen, and the urinary bladder." },
          { strong: "Abdominal-wall vessels:", text: " use color Doppler to avoid the inferior epigastric vessels, collateral veins, and other vessels along the planned tract." },
          { strong: "Skin and scars:", text: " avoid infected skin, surgical scars, abdominal-wall masses, and prominent varices when possible." },
          { strong: "Position matters:", text: " fluid and bowel shift when the patient moves; mark immediately before access and keep the patient in the same position." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        Paracentesis: [
          { strong: "Confirm the plan:", text: " diagnostic versus therapeutic drainage, requested studies, and the intended volume." },
          { strong: "Find the pocket:", text: " use ultrasound in multiple planes to assess fluid depth, abdominal-wall thickness, and nearby organs." },
          { strong: "Check the tract:", text: " apply color Doppler and select a site without abdominal-wall vessels." },
          { strong: "Prep and anesthetize:", text: " maintain the mapped position and anesthetize through the abdominal wall to the peritoneum." },
          { strong: "Enter the fluid:", text: " use real-time ultrasound for a small or difficult pocket, confirm free return, and advance the catheter without forcing it." },
          { strong: "Collect and drain:", text: " fill the requested specimen tubes first, then drain while monitoring pain, flow, and hemodynamics." },
          { strong: "Finish cleanly:", text: " remove the catheter, dress the site, document volume and appearance, and follow the albumin plan for large-volume drainage." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        Paracentesis: [
          { strong: "No safe pocket:", text: " do not attempt a landmark-only puncture when fluid is small, loculated, or obscured by bowel; reposition or use real-time guidance." },
          { strong: "Bleeding:", text: " avoid abdominal-wall vessels and varices; stop and reassess unexpected bloody return, an enlarging hematoma, hypotension, or increasing pain." },
          { strong: "Bowel or organ injury:", text: " confirm the tract in multiple planes and stop for severe pain, peritoneal signs, or concern for enteric return." },
          { strong: "Poor drainage:", text: " check for catheter kinking, side holes against the wall, loculated fluid, or a shifted pocket before replacing access." },
          { strong: "Persistent leak:", text: " use a small tract, remove the catheter promptly after drainage, and manage ongoing leakage with positioning and an occlusive dressing." },
          { strong: "Post-paracentesis instability:", text: " slow or stop drainage for hypotension or symptoms and follow the albumin protocol after large-volume paracentesis." },
        ],
        References: [
          { text: "Society of Hospital Medicine Position Statement on Ultrasound-Guided Paracentesis", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8021127/" },
          { text: "AASLD Practice Guidance on Ascites and Spontaneous Bacterial Peritonitis", href: "https://aasldpubs.onlinelibrary.wiley.com/doi/full/10.1002/hep.31884" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm thresholds, fluid study defaults, and local albumin ordering practice.",
      details: {
        "Review checklist": [
          "Confirm INR and platelet thresholds with local policy.",
          "Confirm whether anticoagulation language matches local practice.",
          "Confirm albumin dose rounding and order workflow.",
          "Add local defaults for diagnostic fluid studies if desired.",
        ],
      },
    },
  };
}

function installThoracentesisEdits() {
  const procedure = procedures.find((item) => item.title === "Thoracentesis");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Thoracentesis guidance for diagnostic and therapeutic pleural fluid drainage, with labs, anticoagulation, requested studies, and post-procedure CXR workflow.";
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Thoracentesis",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, labs, anticoagulation status, and requested pleural fluid studies.",
      children: [`${id}-indication-v2`, `${id}-labs-v2`, `${id}-anticoag-v2`, `${id}-sedation-v2`, `${id}-checklist-v2`],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Diagnostic or therapeutic thoracentesis indications.",
      details: {
        Diagnostic: [
          "New unknown pleural effusion.",
          "Question infection/empyema.",
          "Question malignant effusion.",
        ],
        Therapeutic: [
          "Large or symptomatic effusion.",
          "Effusion refractory to treatment.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >50k.",
      details: {
        Labs: ["INR < 2-3.", "Platelets >50k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no requirement to hold anticoagulation.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
          "No requirement to hold anticoagulation.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, labs, and intended pleural fluid studies.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Confirm labs.",
          "Check what lab studies primary team requested: cell count with differential, cultures, cytology, LDH, glucose, pH, etc.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local.",
      details: {
        Sedation: ["Local."],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "CXR, diet, vitals, pain control, and outpatient discharge instructions.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "CXR STAT.",
            "NPO until CXR, then regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "If outpatient",
          items: [
            "Discharge order with medication reconciliation prior.",
            "After visit summary: .IRAVSTHORACENTESIS.",
          ],
        },
      ],
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        Thoracentesis: [
          { strong: "Pleural space:", text: " fluid lies between parietal and visceral pleura; confirm a true pocket rather than consolidated lung." },
          { strong: "Lung and diaphragm:", text: " identify lung excursion above and the diaphragm below throughout respiration." },
          { strong: "Below the diaphragm:", text: " the liver is right-sided and the spleen is left-sided; keep both outside the planned tract." },
          { strong: "Intercostal bundle:", text: " the vein, artery, and nerve run along the inferior rib margin; enter over the superior rib margin." },
          { strong: "Complex effusions:", text: " loculations, adhesions, and non-expandable lung can limit drainage and change the expected result." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        Thoracentesis: [
          { strong: "Confirm the plan:", text: " side, diagnostic versus therapeutic goal, specimen studies, and intended drainage volume." },
          { strong: "Map the pocket:", text: " scan in the procedure position and mark fluid depth, lung, diaphragm, and adjacent organs." },
          { strong: "Choose the tract:", text: " typical landmarks are the 6th-8th intercostal spaces at the midaxillary line (supine) or posterior midscapular line (seated). Ultrasound determines the safe site above the diaphragm; use Doppler as needed and enter over the superior rib margin." },
          { strong: "Prep and anesthetize:", text: " extend local anesthesia to the parietal pleura and confirm fluid return." },
          { strong: "Place the catheter:", text: " advance into the pleural space without forcing it and collect diagnostic samples first." },
          { strong: "Drain slowly:", text: " use manual aspiration or gravity rather than vacuum bottles or wall suction." },
          { strong: "Stop for symptoms:", text: " end drainage for chest tightness, pain, persistent cough, or worsening breathlessness; document volume and appearance." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        Thoracentesis: [
          { strong: "No safe pocket:", text: " do not use landmarks alone; reposition or use real-time ultrasound for small or loculated fluid." },
          { strong: "Pneumothorax:", text: " keep the needle tip controlled and reassess new dyspnea, hypoxia, or chest pain." },
          { strong: "Bleeding:", text: " enter over the rib, avoid Doppler-visible vessels, and escalate bloody output with instability or an enlarging hematoma." },
          { strong: "Organ injury:", text: " confirm the diaphragm and abdominal organs before access, especially with a small or subpulmonic effusion." },
          { strong: "Re-expansion symptoms:", text: " drain slowly, generally limit one attempt to 1.5 L, and stop for pain, cough, tightness, or breathlessness." },
          { strong: "Non-expandable lung:", text: " a post-drainage pneumothorax may be ex vacuo; correlate with symptoms and imaging before reflex chest-tube placement." },
        ],
        References: [
          { text: "British Thoracic Society Clinical Statement on Pleural Procedures", href: "https://thorax.bmj.com/content/78/Suppl_3/s43" },
          { text: "British Thoracic Society Guideline for Pleural Disease", href: "https://thorax.bmj.com/content/78/11/1143" },
          { text: "Thoracentesis: anatomy and approach landmarks (StatPearls)", href: "https://www.ncbi.nlm.nih.gov/books/NBK441866/" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm thresholds, CXR workflow, and local pleural fluid study defaults.",
      details: {
        "Review checklist": [
          "Confirm INR and platelet thresholds with local policy.",
          "Confirm whether anticoagulation language matches local practice.",
          "Confirm CXR and diet workflow for outpatient versus inpatient settings.",
          "Add local defaults for pleural fluid studies if desired.",
        ],
      },
    },
  };
}

function installDrainageCatheterEdits() {
  const procedure = procedures.find((item) => item.title === "Drainage Catheter Placement/Exchange");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Drainage catheter placement or exchange guidance for abscess/fluid collection source control, with high-risk anticoagulation holds and drain follow-up.";
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Drainage Catheter Placement/Exchange",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, labs, high-risk anticoagulation holds, sedation readiness, and imaging window.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Drainage for symptomatic collection, source control, obstruction, mass effect, or bridge to surgery.",
      details: {
        Indications: [
          "Symptomatic abscess/fluid collection.",
          "Source control for unknown infection.",
          "Persistent clinical symptoms despite antibiotics.",
          "Collection causing obstruction or mass effect.",
          "Bridge to surgery.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs and Orders",
      type: "decision",
      summary: "INR < 1.5-1.8, platelets >50k, and antibiotics with gram negative coverage if not already ordered.",
      details: {
        Labs: ["INR < 1.5-1.8.", "Platelets >50k."],
        Orders: ["Antibiotics with gram negative coverage, if not already ordered."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, formed collection, labs, anticoagulation holds, imaging window, NPO status, and sedation tolerance.",
      details: {
        Checklist: [
          "Confirm indication and imaging demonstrates formed collection.",
          "Labs are appropriate.",
          "Anticoagulation appropriately held.",
          "Appropriate imaging window.",
          "Patient is NPO.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the drainage catheter technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, vitals, flush orders, pain control, anticoagulation restart, outpatient discharge instructions, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Pigtail drain flush orders: once daily 10 mL.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "Anticoagulation to resume",
          items: [
            "Warfarin: resume the day after the procedure.",
            "IV unfractionated heparin: restart after 6-8 hours.",
            "Enoxaparin: restart after 12 hours.",
            "DOACs: Table 6 generally lists 24 hours; confirm agent, renal function, and local policy.",
            "Clopidogrel: restart after 6 hours at 75 mg or 24 hours if using a 300-600-mg loading dose.",
            "Aspirin: resume the day after the procedure.",
          ],
        },
        {
          title: "If outpatient",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSPERCDRAINAGE1.",
          ],
        },
      ],
      details: {
        "Follow up": ["CT and drain check in 2 weeks."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common drain placement/exchange problems and first checks.",
      details: {
        "To build": [
          "No safe window.",
          "Collection too small or not formed.",
          "Poor drainage.",
          "Thick debris or loculations.",
          "Drain dislodgement or leakage.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Hemodynamic instability.",
          "No safe access window.",
          "Uncorrected high-risk anticoagulation issue.",
          "Concern for bowel, vascular, or solid-organ injury.",
          "Sepsis or clinical deterioration requiring urgent escalation.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm local hold times, drain flush order wording, and drain clinic follow-up workflow.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification with local policy.",
          "Confirm anticoagulation hold times with the final table.",
          "Confirm standard drain flush order wording.",
          "Confirm CT and drain check scheduling workflow.",
        ],
      },
    },
  };
}

function installNephrostomyEdits() {
  const procedure = procedures.find(
    (item) => item.title === "Nephrostomy/Nephroureteral Catheter/JJ Stent Placement/Exchange/Conversion",
  );
  if (!procedure) return;

  const id = procedure.id;
  procedure.title = "Nephrostomy Tube Placement";
  procedure.bleedRisk = "High";
  procedure.keywords = `${procedure.keywords || ""} nephrostomy tube placement pcn percutaneous nephrostomy urinary decompression obstruction pyonephrosis`;
  procedure.summary =
    "Nephrostomy tube placement guidance for renal collecting system decompression, pyonephrosis, obstructive AKI, and high-risk anticoagulation management.";
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: procedure.title,
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm decompression target, infection/obstruction urgency, labs, high-risk anticoagulation holds, sedation readiness, NPO status, and access window.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Percutaneous nephrostomy tube placement for collecting system decompression.",
      details: {
        Indications: [
          "Pyelonephritis with unstable vitals.",
          "Pyonephrosis.",
          "Renal decompression for obstruction with AKI.",
          "Failed, contraindicated, or unavailable retrograde ureteral stent.",
          "Urinary diversion when nephrostomy drainage is the intended endpoint.",
        ],
        "Clarify before booking": [
          "Side and level of obstruction.",
          "Whether nephrostomy tube drainage is the intended endpoint.",
          "Evidence of infection, sepsis, pyonephrosis, or obstructive AKI that changes urgency.",
          "Current ureteral stents, urinary diversion anatomy, and relevant prior urologic surgery.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 1.5-1.8 and platelets >50k.",
      details: {
        Labs: ["INR < 1.5-1.8.", "Platelets >50k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm target side, collecting system access, labs, anticoagulation holds, antibiotics, NPO status, and sedation tolerance.",
      details: {
        Checklist: [
          "Confirm indication, side, and intended nephrostomy tube endpoint.",
          "Review CT/US for hydronephrosis, collecting system target, stone/mass level, and safe posterior calyx access.",
          "Labs are appropriate.",
          "Anticoagulation appropriately held.",
          "Appropriate percutaneous access window.",
          "Antibiotics are ordered when infected/obstructed system, pyonephrosis, or sepsis is suspected.",
          "Patient is NPO if moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, vitals, pain control, urine output/drain care, flush orders, anticoagulation restart, AVS, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
            "Drain flush: 10 mL BID while admitted, 10 mL daily while outpatient.",
          ],
        },
        {
          title: "Anticoagulation to resume",
          items: [
            "Warfarin: resume the day after the procedure.",
            "IV unfractionated heparin: restart after 6-8 hours.",
            "Enoxaparin: restart after 12 hours.",
            "DOACs: Table 6 generally lists 24 hours; confirm agent, renal function, and local policy.",
            "Clopidogrel: restart after 6 hours at 75 mg or 24 hours if using a 300-600-mg loading dose.",
            "Aspirin: resume the day after the procedure.",
          ],
        },
        {
          title: "If outpatient",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSPCN1.",
          ],
        },
      ],
      details: {
        "Drain care": [
          "Confirm tube is to gravity drainage unless the operator gives a different plan.",
          "Track output, urine color, fever, flank pain, and ability to flush before discharge.",
          "Expect transient hematuria; escalate for heavy persistent bleeding, clots with obstruction, hypotension, or falling hemoglobin.",
        ],
        "Follow up": ["Routine exchange/check in 3 months unless infection, malfunction, or urology plan requires earlier follow-up."],
      },
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        "Nephrostomy tube placement": [
          { strong: "Collecting system:", text: " map the posterior calyces, renal pelvis, ureter, and level of obstruction." },
          { strong: "Preferred target:", text: " a posterior mid- or lower-pole calyx provides a straight papillary tract with lower vascular risk." },
          { strong: "Brodel's line:", text: " approach through this relatively avascular posterolateral plane; target the calyceal papilla and avoid direct pelvic or infundibular puncture." },
          { strong: "Adjacent structures:", text: " map the pleura and lung, colon, bowel, right-sided liver, and left-sided spleen." },
          { strong: "Access angle:", text: " favor a subcostal route when feasible; a higher supracostal path carries greater pleural risk." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Nephrostomy tube placement": [
          { strong: "Confirm the plan:", text: " side, obstruction level, urgency, antibiotics, and the intended drainage endpoint." },
          { strong: "Map the kidney:", text: " use ultrasound and Doppler to find a safe posterior calyx and avoid vessels or adjacent organs." },
          { strong: "Access the calyx:", text: " puncture the central papilla under image guidance; confirm urine return before gentle contrast." },
          { strong: "Sample infected urine:", text: " send cultures promptly and avoid pressurizing an infected system." },
          { strong: "Secure wire access:", text: " advance into the pelvis or ureter and stabilize the wire before dilation." },
          { strong: "Place the catheter:", text: " dilate the tract and form the locking loop fully within the collecting system." },
          { strong: "Confirm drainage:", text: " use gentle contrast, connect to gravity, secure the tube, and document the output." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Nephrostomy tube placement": [
          { strong: "Sepsis:", text: " the key acute risk in infected obstruction. Give antibiotics, limit contrast and manipulation, and escalate rigors or hypotension." },
          { strong: "Hemorrhage:", text: " use a posterior calyx; heavy or persistent hematuria with instability suggests vascular injury." },
          { strong: "Pleural or visceral injury:", text: " avoid an unnecessarily high route and keep pleura, colon, bowel, liver, and spleen outside the tract." },
          { strong: "Nondilated system:", text: " optimize ultrasound or CT guidance rather than repeatedly redirecting blindly." },
          { strong: "Wire or tract loss:", text: " stabilize the wire before dilation; never advance against resistance or suspected extravasation." },
          { strong: "Poor drainage:", text: " confirm intrarenal side holes, then check for kinking, clot, malposition, or dislodgement before forceful flushing." },
        ],
        References: [
          { text: "CIRSE Standards of Practice on Nephrostomy and Ureteric Stent Placement and Exchange", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12963180/" },
          { text: "SIR Quality Improvement Guidelines for Percutaneous Nephrostomy", href: "https://pubmed.ncbi.nlm.nih.gov/14514833/" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm local hold/restart times, AVS selection, and drain check scheduling workflow.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification with local policy.",
          "Confirm anticoagulation hold and restart times with the final table.",
          "Confirm AVS selection by device/procedure type.",
          "Confirm 3-month drain check scheduling workflow.",
        ],
      },
    },
  };

  const addFutureNephrostomyProcedure = ({ variantId, title, keywords, summary }) => {
    const variant = JSON.parse(JSON.stringify(procedure));
    variant.id = variantId;
    variant.title = title;
    variant.keywords = `${procedure.keywords || ""} ${keywords}`;
    variant.summary = summary;
    variant.lastReviewed = procedure.lastReviewed;

    const rootNode = variant.nodes[variant.root];
    rootNode.title = title;
    rootNode.summary = "Future procedure-specific content placeholder.";

    const indicationNode = variant.nodes[`${id}-indication-v2`];
    indicationNode.summary = "Future edit: add procedure-specific indications and booking clarifications.";
    indicationNode.details = {
      "Needs procedure-specific edit": [
        "Add indications, contraindications, and escalation triggers during faculty review.",
      ],
    };

    const checklistNode = variant.nodes[`${id}-checklist-v2`];
    checklistNode.summary = "Future edit: add procedure-specific pre-procedure checklist.";
    checklistNode.details = {
      Checklist: [
        "Confirm indication.",
        "Review imaging and current tube/stent details.",
        "Confirm labs and anticoagulation plan with local policy.",
        "Confirm sedation/NPO requirements.",
      ],
    };

    variant.nodes[`${id}-intra-v2`].summary = "Future edit: add procedure-specific technique notes.";
    variant.nodes[`${id}-intra-v2-anatomy`] = {
      title: "Anatomy",
      type: "reference",
      summary: "Future edit: add procedure-specific anatomy and access landmarks.",
      details: {
        "Needs procedure-specific edit": ["Add anatomy, access route, and structures to avoid."],
      },
    };
    variant.nodes[`${id}-intra-v2-procedural-steps`] = {
      title: "Procedural steps",
      type: "action",
      summary: "Future edit: add procedure-specific steps.",
      details: {
        "Needs procedure-specific edit": ["Add the major procedural steps and completion checks."],
      },
    };
    variant.nodes[`${id}-intra-v2-pitfalls-safety`] = {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "Future edit: add procedure-specific pitfalls and escalation criteria.",
      details: {
        "Needs procedure-specific edit": ["Add common problems, safety checks, and escalation criteria."],
      },
    };
    variant.nodes[`${id}-post-v2`].summary = "Future edit: add procedure-specific post-procedure orders, AVS, and follow-up.";
    variant.nodes[`${id}-post-v2`].checklistSections = [
      {
        title: "Routine orders",
        items: ["Future edit: add procedure-specific post-procedure orders."],
      },
    ];
    variant.nodes[`${id}-post-v2`].details = {
      "Follow up": ["Future edit: add follow-up timing and ownership."],
    };
    variant.nodes[`${id}-review-v2`].details["Review checklist"] = [
      "Add procedure-specific pre-procedure guidance.",
      "Add procedure-specific post-procedure guidance.",
      "Confirm anticoagulation and lab thresholds with local policy.",
      "Confirm AVS and follow-up workflow.",
    ];

    procedures.push(variant);
  };

  addFutureNephrostomyProcedure({
    variantId: "nephrostomy-to-nephroureteral-stent-conversion",
    title: "Nephrostomy to Nephroureteral Stent Conversion",
    keywords: "nephrostomy to nephroureteral stent conversion exchange npu nephroureteral catheter internalization ureteral obstruction",
    summary: "Future edit placeholder for conversion from an existing nephrostomy tube to nephroureteral stent/catheter drainage.",
  });

  addFutureNephrostomyProcedure({
    variantId: "nephrostomy-tube-exchange",
    title: "Nephrostomy Tube Exchange",
    keywords: "nephrostomy tube exchange pcn exchange drain check catheter malfunction routine exchange",
    summary: "Future edit placeholder for routine or problem-driven nephrostomy tube exchange.",
  });
}

function installCholecystostomyEdits() {
  const procedure = procedures.find(
    (item) => item.title === "Cholecystostomy/Biliary Drain Placement/Exchange/Internalization",
  );
  if (!procedure) return;

  const id = procedure.id;
  procedure.title = "Cholecystostomy Tube Placement/Exchange";
  procedure.bleedRisk = "High";
  procedure.summary =
    "Cholecystostomy tube guidance for high-risk acute cholecystitis/source control, with high-risk anticoagulation management and drain follow-up.";
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Cholecystostomy Tube Placement/Exchange",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, labs, high-risk anticoagulation holds, sedation plan, NPO status, and imaging window.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "High-risk acute cholecystitis/source control indications.",
      details: {
        Indications: [
          "Acute cholecystitis in a non-surgical/high risk candidate.",
          "Sepsis from cholecystitis.",
          "Failed non-operative management of acute cholecystitis.",
          "Critically ill/septic patient needing source control.",
          "Bridge to delayed cholecystectomy for calculous cholecystitis.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs and Orders",
      type: "decision",
      summary: "CBC, INR < 1.5-1.8, platelets >50k, and antibiotics with gram negative coverage.",
      details: {
        Labs: ["CBC.", "INR < 1.5-1.8.", "Platelets >50k."],
        Orders: ["Antibiotics with gram negative coverage."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation, or local if high sedation risk, unstable, or intubated.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          "Local if high sedation risk, patient unstable, or intubated.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging, labs, anticoagulation holds, access window, NPO status, and sedation tolerance.",
      details: {
        Checklist: [
          "Confirm indication and review imaging.",
          "Labs are appropriate.",
          "Anticoagulation appropriately held.",
          "Appropriate imaging window.",
          "Patient is NPO if moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        "Initial tube placement": [
          { strong: "Gallbladder:", text: " lies along the inferior liver surface; identify the fundus, body, and neck." },
          { strong: "Cystic duct:", text: " connects the gallbladder neck to the extrahepatic biliary tree; neck or duct obstruction can prevent drainage." },
          { strong: "Transhepatic access:", text: " traverses liver before entering the gallbladder; assess intervening hepatic vessels." },
          { strong: "Transperitoneal access:", text: " enters the gallbladder without traversing liver; requires a safe window without intervening bowel." },
          { strong: "Access tradeoff:", text: " transhepatic access carries greater bleeding risk but may help contain bile leakage. Transperitoneal access avoids liver traversal but has a theoretical greater bile-leak/biloma risk; comparative studies have not consistently shown a difference in leakage. Choose the safest patient-specific route." },
          { strong: "Adjacent structures:", text: " map the colon, duodenum, pleura, and vessels along the planned trajectory." },
          { strong: "Respiratory motion:", text: " the gallbladder and liver move with breathing; confirm the access window dynamically." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Initial tube placement - Seldinger technique": [
          { strong: "1. Plan the access route", text: " using ultrasound and prior imaging; choose a safe transhepatic or transperitoneal window." },
          { strong: "2. Prepare and anesthetize", text: " the access site using sterile technique; confirm antibiotic coverage." },
          { strong: "3. Access the gallbladder", text: " under ultrasound guidance, using CT when ultrasound does not provide a safe window." },
          { strong: "4. Confirm intraluminal access", text: " by imaging and bile aspiration; send bile for culture." },
          { strong: "5. Coil a guidewire", text: " within the gallbladder and dilate the tract while maintaining access." },
          { strong: "6. Place a locking pigtail drain", text: " with the loop and all drainage side holes inside the gallbladder." },
          { strong: "7. Confirm position and drainage", text: " with imaging and gentle contrast injection if needed; lock, secure, and connect to gravity drainage." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Initial tube placement": [
          { strong: "Unsafe trajectory:", text: " avoid bowel, pleura, and vessels; reassess guidance or drainage strategy if no safe window exists." },
          { strong: "Loss of access:", text: " maintain wire purchase during dilation; avoid excessive manipulation or premature decompression." },
          { strong: "Bile leak or perforation:", text: " avoid forceful wire advancement and confirm all side holes are intraluminal." },
          { strong: "Bleeding:", text: " assess new bloody output, worsening pain, or instability for vascular injury." },
          { strong: "Sepsis:", text: " avoid forceful injection or overdistention; promptly assess rigors, hypotension, or clinical deterioration." },
          { strong: "Poor drainage or dislodgement:", text: " check kinking, obstruction, and catheter position; secure the tube and avoid blind reinsertion through an immature tract." },
        ],
      },
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, vitals, drain flush orders, pain control, anticoagulation restart, outpatient exchange discharge, AVS, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
            "Pigtail drain - flush orders 10 mL daily.",
          ],
        },
        {
          title: "Anticoagulation to resume",
          items: [
            "Warfarin: resume the day after the procedure.",
            "IV unfractionated heparin: restart after 6-8 hours.",
            "Enoxaparin: restart after 12 hours.",
            "DOACs: Table 6 generally lists 24 hours; confirm agent, renal function, and local policy.",
            "Clopidogrel: restart after 6 hours at 75 mg or 24 hours if using a 300-600-mg loading dose.",
            "Aspirin: resume the day after the procedure.",
          ],
        },
        {
          title: "If outpatient exchange",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRCHOLETUBEBILIARYDRAIN1.",
          ],
        },
      ],
      details: {
        "Follow up": [],
        "Calculous cholecystitis": ["Surgery manages and tube comes out with cholecystectomy."],
        "Acalculous cholecystitis": [
          "Drain check in 2-3 months.",
          "Tract is mature.",
          "Passed capping trial/tube check.",
          "Clinical improvement.",
        ],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common cholecystostomy tube problems and first checks.",
      details: {
        "To build": [
          "No safe access window.",
          "Gallbladder decompressed or difficult to target.",
          "Poor drainage.",
          "Tube obstruction.",
          "Tube dislodgement or leakage.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Sepsis or unstable vitals.",
          "No safe access window.",
          "Uncorrected high-risk anticoagulation issue.",
          "Concern for bowel, vascular, liver, or pleural injury.",
          "Clinical deterioration after drainage.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm local hold/restart times, drain flush order wording, and follow-up workflow.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification with local policy.",
          "Confirm anticoagulation hold and restart times with the final table.",
          "Confirm flush order wording.",
          "Confirm 2-3 month drain check scheduling workflow.",
        ],
      },
    },
  };
}

function installBiliaryDrainEdits() {
  const procedure = {
    id: "biliary-drain-placement-internalization-exchange",
    title: "Biliary Drain Placement and Internalization/Exchange",
    category: "Drain / tube procedure",
    keywords: "biliary drain placement exchange internalization cholangitis obstruction jaundice biliary obstruction biliary tube pbd ptbd internal external drain",
    summary:
      "Biliary drain placement, exchange, and internalization guidance for biliary obstruction, cholangitis/source control, jaundice, and drain dysfunction.",
    lastReviewed: "Draft procedure-specific override, July 2026",
    bleedRisk: "High",
    root: "biliary-drain-root-v2",
    nodes: {
      "biliary-drain-root-v2": {
        title: "Biliary Drain Placement and Internalization/Exchange",
        type: "reference",
        summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
        children: ["biliary-drain-pre-v2", "biliary-drain-intra-v2", "biliary-drain-post-v2", "biliary-drain-review-v2"],
      },
      "biliary-drain-pre-v2": {
        title: "Pre-procedure",
        type: "action",
        summary: "Confirm indication, labs, high-risk anticoagulation holds, antibiotics, sedation plan, NPO status, and imaging/access plan.",
        children: [
          "biliary-drain-indication-v2",
          "biliary-drain-labs-v2",
          "biliary-drain-anticoag-v2",
          "biliary-drain-sedation-v2",
          "biliary-drain-checklist-v2",
        ],
      },
      "biliary-drain-indication-v2": {
        title: "Indication",
        type: "decision",
        summary: "Biliary obstruction, cholangitis/source control, jaundice, or existing biliary drain exchange/internalization need.",
        details: {
          Indications: [
            "Biliary obstruction requiring decompression.",
            "Cholangitis or sepsis requiring source control.",
            "Obstructive jaundice requiring biliary drainage.",
            "Existing biliary drain dysfunction, exchange, or internalization.",
            "Need for internal/external biliary drainage or conversion/internalization when clinically appropriate.",
          ],
        },
      },
      "biliary-drain-labs-v2": {
        title: "Labs",
        type: "decision",
        summary: "CBC, INR <1.5-1.8, and platelets >50k.",
        details: {
          Labs: ["CBC.", "INR < 1.5-1.8.", "Platelets >50k."],
        },
      },
      "biliary-drain-anticoag-v2": {
        title: "Anticoagulation",
        type: "caution",
        summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
        details: {
          Anticoagulation: [
            "High bleeding risk.",
            { text: "Open anticoagulation table", href: "#anticoagulation-table" },
          ],
          Hold: [
            "Warfarin: hold 5 days and confirm INR <= 1.8.",
            "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
            "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
            "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
            "Clopidogrel: hold 5 days.",
            "Aspirin: hold 3-5 days.",
          ],
        },
      },
      "biliary-drain-sedation-v2": {
        title: "Sedation",
        type: "reference",
        summary: "Moderate sedation, or local if high sedation risk, unstable, or intubated.",
        details: {
          Sedation: [
            "Moderate sedation.",
            { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
            "Local if high sedation risk, patient unstable, or intubated.",
          ],
        },
      },
      "biliary-drain-checklist-v2": {
        title: "Checklist",
        type: "decision",
        summary: "Confirm indication, imaging/access plan, labs, antibiotics, anticoagulation holds, NPO status, and sedation tolerance.",
        details: {
          Checklist: [
            "Confirm indication and review imaging.",
            "Labs are appropriate.",
            "Antibiotics with gram negative coverage are ordered.",
            "Anticoagulation appropriately held.",
            "Review biliary anatomy and access plan.",
            "Patient is NPO if moderate sedation.",
            "Confirm patient can lie flat.",
            { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          ],
        },
      },
      "biliary-drain-intra-v2": {
        title: "Intraprocedure",
        type: "reference",
        summary: "Review anatomy, procedural steps, and safety considerations for initial biliary drain placement and subsequent internalization or exchange.",
        children: [
          "biliary-drain-intra-v2-anatomy",
          "biliary-drain-intra-v2-procedural-steps",
          "biliary-drain-intra-v2-pitfalls-safety",
        ],
      },
      "biliary-drain-intra-v2-anatomy": {
        title: "Anatomy",
        type: "reference",
        summary: "Review hilar ductal anatomy, portal triad relationships, peripheral access targets, the obstruction, and the existing transhepatic tract when present.",
        images: [
          {
            src: "images/biliary-anatomy.png",
            alt: "Illustrated biliary anatomy labeling the right anterior and posterior sectoral ducts, right and left hepatic ducts, hilar confluence, common hepatic duct, cystic duct, common bile duct, ampulla, gallbladder, and duodenum.",
            caption: "Biliary anatomy relevant to percutaneous drain placement. AI-generated educational schematic; simplified and not to scale. Confirm ductal anatomy and variants on patient-specific imaging.",
          },
        ],
        details: {
          "Initial biliary drain placement": [
            { strong: "Right and left hepatic ducts:", text: " converge at the hilum." },
            { strong: "Right anterior and posterior ducts:", text: " have variable confluence." },
            { strong: "Portal vein and hepatic artery:", text: " run closely with the bile ducts in the portal triads." },
            { strong: "Peripheral ducts:", text: " are preferred for access when feasible." },
            { strong: "CBD to ampulla to duodenum:", text: " is the route for internal drainage if the obstruction can be crossed." },
            { strong: "Right-sided access:", text: " usually lateral intercostal or subcostal; assess pleural proximity and intercostal vessels." },
            { strong: "Left-sided access:", text: " usually anterior subxiphoid or epigastric; assess for intervening stomach or bowel." },
            { strong: "Target selection:", text: " both approaches are transhepatic. Hilar obstruction may isolate the right and left systems, requiring separate drainage." },
          ],
          "Biliary drain internalization or exchange": [
            { strong: "Existing transhepatic tract:", text: " is the access route and should be preserved." },
            { strong: "Obstruction level:", text: " determines whether the drain can be internalized." },
            { strong: "CBD and duodenum:", text: " are the distal targets for internal-external drainage." },
            { strong: "Side-hole position:", text: " must span the obstructed segment without draining into the peritoneal tract." },
            { strong: "Portal and hepatic arterial branches:", text: " remain adjacent to the biliary tract." },
          ],
        },
      },
      "biliary-drain-intra-v2-procedural-steps": {
        title: "Procedural steps",
        type: "action",
        summary: "Establish or preserve biliary access, define the obstruction, cross it when feasible, and position the drainage catheter for effective decompression.",
        details: {
          "Initial biliary drain placement": [
            { strong: "1. Plan right- or left-sided access", text: " based on the ducts requiring drainage and a safe imaging window, then access a peripheral intrahepatic duct with ultrasound and fluoroscopic guidance." },
            { strong: "2. Perform cholangiography", text: " to define ductal anatomy and the obstruction." },
            { strong: "3. Advance the wire and catheter centrally", text: " toward the obstruction." },
            { strong: "4. Cross the obstruction", text: " into the distal CBD and duodenum when possible." },
            { strong: "5. Dilate the tract", text: " as needed." },
            { strong: "6. Place an external or internal-external drain", text: " with the side holes appropriately positioned." },
            { strong: "7. Confirm drainage and secure the catheter.", text: "" },
          ],
          "Biliary drain internalization or exchange": [
            { strong: "1. Inject the existing drain gently", text: " to confirm its position and the biliary anatomy." },
            { strong: "2. Advance a wire through the drain", text: " and secure intrabiliary access." },
            { strong: "3. Remove the old catheter over the wire.", text: "" },
            { strong: "4. Cross the obstruction into the bowel", text: " if internalization is needed." },
            { strong: "5. Advance the new drain", text: " over the wire." },
            { strong: "6. Position the side holes across the obstruction", text: " with the distal loop in the duodenum." },
            { strong: "7. Confirm drainage and secure the catheter", text: "; then determine external versus capped drainage." },
          ],
        },
      },
      "biliary-drain-intra-v2-pitfalls-safety": {
        title: "Pitfalls and safety",
        type: "caution",
        summary: "Protect ductal access, avoid vascular or pleural injury and high-pressure injection, and verify effective catheter positioning and decompression.",
        details: {
          "Initial biliary drain placement": [
            { strong: "No duct access:", text: " target a more peripheral or dilated duct, or adjust the trajectory." },
            { strong: "Vascular entry or hemobilia:", text: " stop manipulation and assess for portal or hepatic arterial injury." },
            { strong: "High-pressure cholangiography:", text: " avoid forceful injection in an obstructed or infected system." },
            { strong: "Cannot cross the obstruction:", text: " leave external drainage and reattempt after decompression." },
            { strong: "Pleural transgression:", text: " avoid unnecessarily high right-sided access." },
            { strong: "Poor drainage:", text: " check catheter position, kinking, occlusion, and side-hole location." },
          ],
          "Biliary drain internalization or exchange": [
            { strong: "Loss of access:", text: " maintain stable wire position before removing the old catheter." },
            { strong: "Wire dislodgement:", text: " regain biliary access before proceeding with the exchange." },
            { strong: "Cannot cross the obstruction:", text: " avoid forceful manipulation and leave external drainage if needed." },
            { strong: "Incorrect side-hole position:", text: " reposition if holes lie outside the ducts or fail to span the obstruction." },
            { strong: "Catheter kinking or occlusion:", text: " assess with gentle injection and exchange if needed." },
            { strong: "Post-exchange cholangitis or sepsis:", text: " minimize high-pressure injection and ensure adequate decompression." },
          ],
        },
      },
      "biliary-drain-post-v2": {
        title: "Post-procedure",
        type: "action",
        summary: "Diet, vitals, drain flush orders, pain control, anticoagulation restart, outpatient exchange discharge, AVS, and follow-up.",
        checklistSections: [
          {
            title: "Routine orders",
            items: [
              "Regular diet.",
              "Vital signs per unit routine.",
              "Tylenol 650 mg PRN.",
              "Pigtail drain - flush orders 10 mL daily.",
            ],
          },
          {
            title: "Anticoagulation to resume",
            items: [
              "Warfarin: resume the day after the procedure.",
              "IV unfractionated heparin: restart after 6-8 hours.",
              "Enoxaparin: restart after 12 hours.",
              "DOACs: Table 6 generally lists 24 hours; confirm agent, renal function, and local policy.",
              "Clopidogrel: restart after 6 hours at 75 mg or 24 hours if using a 300-600-mg loading dose.",
              "Aspirin: resume the day after the procedure.",
            ],
          },
          {
            title: "If outpatient exchange",
            items: [
              "Discharge order with medication reconciliation.",
              "After visit summary: .IRCHOLETUBEBILIARYDRAIN1.",
            ],
          },
        ],
        afterChecklistDetails: {
          "Follow up": ["Confirm exchange/internalization follow-up plan with attending."],
        },
      },
      "biliary-drain-review-v2": {
        title: "Needs review",
        type: "caution",
        summary: "Confirm biliary-specific indications, drain flush wording, AVS wording, and follow-up workflow.",
        details: {
          "Review checklist": [
            "Confirm biliary drain placement/exchange/internalization indications with local workflow.",
            "Confirm high bleeding risk classification with local policy.",
            "Confirm anticoagulation hold and restart times with the final table.",
            "Confirm flush order wording.",
            "Confirm follow-up scheduling workflow.",
          ],
        },
      },
    },
  };

  procedures.push(procedure);
}

function installChestTubeEdits() {
  const procedure = procedures.find((item) => item.title === "Chest Tube Placement");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Chest tube placement guidance for pneumothorax, pleural fluid drainage, empyema, hemothorax, and posttraumatic or postoperative collections.";
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Chest Tube Placement",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, labs, anticoagulation considerations, sedation plan, and imaging window.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Pneumothorax or pleural collection requiring continuous drainage.",
      details: {
        Indications: [
          "Symptomatic pneumothorax.",
          "Large pneumothorax.",
          "Pleural effusion requiring continuous drainage.",
          "Empyema/complicated parapneumonic effusion.",
          "Hemothorax.",
          "Postoperative/posttraumatic pleural collection.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 3 and platelets >20k.",
      details: {
        Labs: ["INR < 3.", "Platelets >20k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk, with case-specific features that may make it high risk.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          "Consider making this high risk for complexity of collection, difficult access to collection, or large-bore surgical-type tube.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold if INR is not < 3.",
          "Heparin: no holding requirement.",
          "Lovenox: no holding requirement.",
          "DOACs: no holding requirement.",
          "Plavix: no holding requirement.",
          "Aspirin: no holding requirement.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local; can add moderate sedation for tolerance, large tubes, or difficult positioning.",
      details: {
        Sedation: [
          "Local.",
          "Can add moderate sedation for tolerance, large tubes, or difficult positioning.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging, labs, access window, and NPO status if moderate sedation is planned.",
      details: {
        Checklist: [
          "Confirm indication and review imaging.",
          "Labs are appropriate.",
          "Appropriate imaging window.",
          "Patient is NPO if moderate sedation.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the chest tube placement technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, vitals, pain control, and follow-up imaging consideration.",
      checklistSections: [
        {
          title: "Routine orders",
          items: ["Regular diet.", "Vital signs per unit routine.", "Tylenol 650 mg PRN."],
        },
      ],
      details: {
        "Follow up": ["+/- CXR."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common chest tube problems and first checks.",
      details: {
        "To build": ["No safe window.", "Poor drainage.", "Tube kink/occlusion.", "Air leak.", "Tube malposition."],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Respiratory distress.",
          "Hemodynamic instability.",
          "Concern for tension pneumothorax.",
          "Unexpected hemorrhagic output.",
          "Concern for lung, vascular, or abdominal injury.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm low-risk classification exceptions and local post-procedure CXR workflow.",
      details: {
        "Review checklist": [
          "Confirm when chest tube placement should be treated as high bleeding risk.",
          "Confirm INR and platelet thresholds with local policy.",
          "Confirm whether post-procedure CXR is routine or case-dependent.",
        ],
      },
    },
  };
}

function installFistulogramEdits() {
  const procedure = procedures.find((item) => item.title === "Fistulogram");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Fistulogram guidance for dialysis access dysfunction, cannulation problems, prolonged bleeding, and abnormal access exam findings.";
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Fistulogram",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm dialysis access indication, labs, anticoagulation, sedation readiness, access exam, and imaging.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-physical-exam-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Dialysis access dysfunction, cannulation problems, prolonged bleeding, or abnormal exam.",
      details: {
        Indications: [
          "Poor dialysis function: low flow, high venous pressures, incomplete dialysis.",
          "Cannulation problems: difficult access or failed fistula maturity.",
          "Prolonged bleeding after dialysis.",
          "Physical exam findings: swelling, absent thrill/pulse.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >20k.",
      details: {
        Labs: ["INR < 2-3.", "Platelets >20k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no routine anticoagulation holding requirement.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: no holding requirement.",
          "Heparin: no holding requirement.",
          "Lovenox: no holding requirement.",
          "DOACs: no holding requirement.",
          "Plavix: no holding requirement.",
          "Aspirin: no holding requirement.",
        ],
        Caveat: [
          "Consider holding only if significant intervention is anticipated—large-bore access, thrombectomy/thrombolysis—or the patient has additional bleeding risks.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-physical-exam-v2`]: {
      title: "Physical exam",
      type: "decision",
      summary: "Evaluate fistula exam and access patency before the procedure.",
      details: {
        "Physical exam": [
          "Evaluate fistula for thrill/pulse.",
          "POC ultrasound to evaluate patency.",
          "Formal vascular ultrasound to evaluate flows.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging, labs, NPO status if sedated, and moderate sedation tolerance.",
      details: {
        Checklist: [
          "Confirm indication and review imaging.",
          "Labs are appropriate.",
          "Patient is NPO if moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        Anatomy: [
          { strong: "The circuit:", text: " artery > anastomosis > fistula/graft > outflow veins > SVC." },
          { strong: "Know the configuration:", text: " radiocephalic, brachiocephalic, transposed brachiobasilic, or graft. Confirm flow direction; loop shape can mislead." },
          { strong: "Stenosis hotspots:", text: " radiocephalic: near the anastomosis; brachiocephalic: cephalic arch; graft: graft-vein junction." },
          { strong: "Central veins:", text: " axillary > subclavian > brachiocephalic > SVC. Collaterals may signal obstruction." },
          { strong: "Before puncture:", text: " locate aneurysms, thrombus, stents, and usable access segments." },
          { strong: "Check the hand:", text: " a patent access does not guarantee adequate distal perfusion." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Basic steps": [
          { strong: "1. Define the problem.", text: " Match dialysis symptoms with exam, ultrasound, and prior interventions." },
          { strong: "2. Access with a plan.", text: " Use ultrasound; choose a site and direction that reach the suspected lesion." },
          { strong: "3. Image the whole circuit.", text: " Include arterial inflow, anastomosis, access, and central outflow." },
          { strong: "4. Find the cause.", text: " Stenosis, clot, poor maturation, or hand ischemia? Treat what explains the dysfunction." },
          { strong: "5. Treat selectively.", text: " Angioplasty for culprit stenosis; declot plus lesion treatment for thrombosis. Escalate to stent-graft or surgery when appropriate." },
          { strong: "6. Confirm the result.", text: " Check completion imaging, thrill, and hand perfusion; exclude residual obstruction, leak, or clot." },
          { strong: "7. Close and hand off.", text: " Preserve flow during hemostasis. Tell dialysis staff about usability, puncture restrictions, and suture removal." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Pitfalls and safety": [
          { strong: "Bleeding:", text: " avoid compromised skin and pseudoaneurysms; stop bleeding without eliminating the thrill." },
          { strong: "Rupture:", text: " avoid oversized balloons and forceful wires. New leak or expanding swelling: assess promptly; preserve wire access." },
          { strong: "Thrombosis:", text: " avoid prolonged occlusion or excessive compression. Lost thrill needs immediate reassessment." },
          { strong: "Declot embolization:", text: " never force-inject clot. New cold/painful hand, neurologic deficit, hypoxia, or chest pain needs urgent evaluation." },
          { strong: "Wrong target:", text: " check inflow and central outflow. Treat the clinical problem, not every narrowing." },
          { strong: "Future access:", text: " do not let a stent-graft compromise key veins, cannulation zones, or surgical options." },
          { strong: "Infection:", text: " avoid infected skin and routine declotting of infected access; coordinate an infection/access plan." },
        ],
        References: [
          { text: "KDOQI vascular access guidelines and clinical tools", href: "https://www.kidney.org/professionals/kdoqi/guidelines-and-commentaries/vascular-access" },
          { text: "Reported complications of dialysis access intervention (Kim et al.)", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2685043/" },
        ],
      },
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, vitals, pain control, outpatient discharge, AVS, and suture device follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: ["Regular diet.", "Vital signs per unit routine.", "Tylenol 650 mg PRN."],
        },
        {
          title: "If outpatient procedure",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSFISTULOGRAM.",
          ],
        },
      ],
      details: {
        "Follow up": ["Remove suture device on POD1 if inpatient."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common fistulogram problems and first checks.",
      details: {
        "To build": ["Poor access flow.", "Central venous stenosis.", "Difficult cannulation.", "Thrombosis.", "Prolonged bleeding."],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Absent thrill/pulse with concern for thrombosis.",
          "Severe arm swelling or suspected central venous occlusion.",
          "Access site bleeding not controlled with pressure.",
          "Signs of access infection.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm low-risk anticoagulation language and local suture removal workflow.",
      details: {
        "Review checklist": [
          "Confirm anticoagulation hold language with local policy.",
          "Confirm INR and platelet thresholds with local policy.",
          "Confirm outpatient AVS and POD1 suture removal workflow.",
        ],
      },
    },
  };
}

function installIvcFilterPlacementEdits() {
  const procedure = procedures.find((item) => item.title === "Inferior Vena Cava Filter Placement");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "IVC filter placement guidance for acute DVT/PE with anticoagulation contraindication or failure, high-risk anticoagulation interruption, and selected prophylaxis cases.";
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Inferior Vena Cava Filter Placement",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, imaging, labs, anticoagulation, sedation readiness, and NPO status.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Acute DVT/PE with anticoagulation contraindication/failure or high-risk anticoagulation interruption.",
      details: {
        Indications: [
          "Acute DVT/PE with contraindication for anticoagulation.",
          "Acute DVT/PE with failed anticoagulation trial.",
          "Stopping anticoagulation in high-risk VTE patient.",
          "+/- prophylaxis in high-risk patients: trauma, pregnancy, surgical.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >20k.",
      details: {
        Labs: ["INR < 2-3.", "Platelets >20k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no routine anticoagulation holding requirement.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: no holding requirement.",
          "Heparin: no holding requirement.",
          "Lovenox: no holding requirement.",
          "DOACs: no holding requirement.",
          "Plavix: no holding requirement.",
          "Aspirin: no holding requirement.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging, labs, NPO status, and moderate sedation tolerance.",
      details: {
        Checklist: [
          "Confirm indication and review imaging.",
          "Labs are appropriate.",
          "Patient is NPO if moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the IVC filter placement technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, vitals, pain control, head-of-bed order, outpatient discharge, AVS, and retrieval follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
            "Elevate HOB >45 degrees.",
          ],
        },
        {
          title: "If outpatient procedure",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSVENOGRAM.",
          ],
        },
      ],
      details: {
        "Follow up": ["3 month clinic visit.", "Tentative plan for removal."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common IVC filter placement problems and first checks.",
      details: {
        "To build": ["Difficult caval access.", "Filter tilt.", "Unexpected caval anatomy.", "Renal vein level uncertainty."],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "No appropriate indication or no retrieval plan when needed.",
          "Duplicated/interrupted IVC anatomy not understood.",
          "Concern for caval thrombus or occlusion.",
          "Access site bleeding or hemodynamic instability.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm indication criteria, retrieval follow-up workflow, and local AVS choice.",
      details: {
        "Review checklist": [
          "Confirm prophylactic placement criteria with local policy.",
          "Confirm retrieval clinic workflow.",
          "Confirm AVS wording and follow-up owner.",
        ],
      },
    },
  };
}

function installIvcFilterRemovalEdits() {
  const procedure = procedures.find((item) => item.title === "Inferior Vena Cava Filter Removal");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "IVC filter removal guidance for retrievable filters that are no longer needed, PE risk has resolved, anticoagulation has resumed, or filter-related complications are present.";
  procedure.keywords = `${procedure.keywords || ""} ivc filter removal retrieval retrieve anticoagulation resumed filter complication dwell time`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Inferior Vena Cava Filter Removal",
      type: "reference",
      summary: "Review removal indication, filter type and dwell time, anticoagulation, sedation, procedural planning, and post-procedure monitoring.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, filter type, dwell time, imaging, labs, anticoagulation plan, and moderate sedation readiness.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Remove when the temporary PE risk has resolved, anticoagulation has resumed, the filter is no longer needed, or there is a filter-related complication.",
      details: {
        Indications: [
          "Temporary PE risk resolved.",
          "Anticoagulation resumed.",
          "Filter-related complication.",
          "Retrievable filter no longer needed.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >20k; if complicated removal, CBC and INR within 30 days.",
      details: {
        Labs: ["INR < 2-3.", "Platelets >20k."],
        "If complicated removal": ["CBC and INR within 30 days."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no routine anticoagulation holding requirement.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: no holding requirement.",
          "Heparin: no holding requirement.",
          "Lovenox: no holding requirement.",
          "DOACs: no holding requirement.",
          "Plavix: no holding requirement.",
          "Aspirin: no holding requirement.",
        ],
        "If complicated removal": [
          "Higher bleeding risk procedure.",
          "Discuss with attending regarding holding anticoagulation.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, filter type, dwell time, imaging/procedural plan, labs, and NPO status if moderate sedation.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Review type of filter and dwell time.",
          "Review imaging and procedural planning.",
          "Labs are appropriate.",
          "NPO if moderate sedation.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the IVC filter removal technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Regular diet, routine vitals, Tylenol, discharge after 30 minutes, and venogram AVS.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
            "Discharge order: 30 min.",
            "After visit summary: .IRAVSVENOGRAM.",
          ],
        },
      ],
      details: {
        "Follow up": ["No specifics."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common IVC filter removal problems and first checks.",
      details: {
        "To build": [
          "Long dwell time or embedded hook.",
          "Filter tilt.",
          "Strut penetration.",
          "Caval thrombus or occlusion.",
          "Need for advanced retrieval technique.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Large thrombus in or around the filter.",
          "Concern for caval injury.",
          "Severe filter tilt, fracture, migration, or penetration requiring advanced planning.",
          "Access-site bleeding or hemodynamic instability.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm local filter removal criteria, low-risk anticoagulation language, and post-removal monitoring.",
      details: {
        "Review checklist": [
          "Confirm filter removal indications with local policy.",
          "Confirm anticoagulation language with the final table.",
          "Confirm whether 2-hour bleeding monitoring is standard for all access routes.",
        ],
      },
    },
  };
}

function installKidneyBiopsyEdits() {
  const procedure = procedures.find((item) => item.title === "Kidney Biopsy");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Kidney biopsy guidance for renal dysfunction, nephrotic syndrome, glomerulonephritis workup, systemic renal disease, renal mass characterization, or transplant dysfunction.";
  procedure.keywords = `${procedure.keywords || ""} renal biopsy native transplant proteinuria hematuria nephrotic glomerulonephritis lupus vasculitis amyloidosis rejection`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Kidney Biopsy",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, imaging window, labs, high-risk anticoagulation holds, BP control, infection screen, kidney size, and specimen plan.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Renal dysfunction, proteinuria, hematuria with renal findings, systemic renal disease, mass characterization, or transplant dysfunction.",
      details: {
        Indications: [
          "Unexplained AKI or progressive renal dysfunction.",
          "Nephrotic syndrome or significant/persistent proteinuria.",
          "Hematuria with proteinuria, impaired renal function, or suspected glomerulonephritis.",
          "Suspected systemic renal disease, such as lupus, vasculitis, or amyloidosis.",
          "Renal mass characterization or transplant dysfunction, including suspected rejection or recurrent disease.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 1.5-1.8 and platelets >50k.",
      details: {
        Labs: ["INR < 1.5-1.8.", "Platelets >50k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local, mostly.",
      details: {
        Sedation: ["Local, mostly."],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging window, labs, blood pressure, infection screen, kidney size, and specimen requests.",
      details: {
        Checklist: [
          "Confirm indication and review imaging with appropriate window.",
          "Labs are appropriate.",
          "Blood pressure is under control.",
          "No active UTI/pyelonephritis or skin infection over site.",
          "Kidneys are at least 9 cm, recommended.",
          "Specimen requests confirmed.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the kidney biopsy technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, vitals, pain control, bedrest, outpatient discharge instructions, AVS, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Tylenol 650 mg PRN.",
            "Vital signs every 15 minutes x 4, then every 30 minutes x 2, then every hour x 1.",
            "Bedrest order: varies per attending, however typically 1-2 hours.",
          ],
        },
        {
          title: "If outpatient procedure",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSKIDNEYBX.",
          ],
        },
      ],
      details: {
        "Follow up": ["No specifics."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common kidney biopsy problems and first checks.",
      details: {
        "To build": [
          "No safe biopsy window.",
          "Poor blood pressure control.",
          "Insufficient specimen.",
          "Post-biopsy pain.",
          "Hematuria or suspected bleeding.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Uncontrolled hypertension.",
          "Uncorrected high-risk anticoagulation issue.",
          "Active UTI/pyelonephritis or skin infection over the site.",
          "No safe window or kidney size concern.",
          "Hemodynamic instability, severe flank pain, expanding hematoma, or gross hematuria after biopsy.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm BP threshold, kidney size recommendation, bedrest duration, and local specimen handling workflow.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification with local policy.",
          "Confirm anticoagulation hold times with the final table.",
          "Confirm local BP threshold before biopsy.",
          "Confirm native versus transplant biopsy specimen handling and requested studies.",
          "Confirm attending-specific bedrest duration and discharge criteria.",
        ],
      },
    },
  };
}

function installLiverBiopsyEdits() {
  const procedure = procedures.find((item) => item.title === "Liver Biopsy/Fiducial Marker Placement");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Percutaneous liver biopsy guidance for focal liver lesion characterization, suspected malignancy, abnormal liver enzymes, diffuse liver disease, fibrosis staging, and suspected autoimmune, infiltrative, metabolic, or infectious disease.";
  procedure.keywords = `${procedure.keywords || ""} percutaneous liver biopsy hepatic biopsy focal liver lesion malignancy abnormal liver enzymes fibrosis cirrhosis steatohepatitis hepatitis autoimmune infiltrative metabolic infectious`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Percutaneous Liver Biopsy",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm target versus non-target indication, imaging window, labs, high-risk anticoagulation holds, BP control, ascites/infection screen, and specimen plan.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Targeted lesion biopsy or non-target parenchymal biopsy for diffuse liver disease workup/staging.",
      details: {
        Indications: [
          "Characterize a focal liver lesion or suspected malignancy.",
          "Evaluate unexplained abnormal liver enzymes or diffuse liver disease.",
          "Diagnose or stage fibrosis, cirrhosis, steatohepatitis, or hepatitis.",
          "Evaluate suspected autoimmune, infiltrative, metabolic, or infectious disease.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 1.5-1.8 and platelets >50k.",
      details: {
        Labs: ["INR < 1.5-1.8.", "Platelets >50k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local mostly; moderate sedation when needed.",
      details: {
        Sedation: [
          "Local, mostly.",
          "Moderate sedation when needed.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm target versus non-target indication, imaging window, labs, BP control, ascites/infection screen, and specimen requests.",
      details: {
        Checklist: [
          "Confirm indication: target versus non-target.",
          "Review imaging with appropriate window.",
          "Labs are appropriate.",
          "Blood pressure is under control.",
          "Assess for ascites/infection.",
          "Specimen requests confirmed.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, vitals, pain control, bedrest on right side, outpatient discharge instructions, AVS, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Tylenol 650 mg PRN.",
            "Vital signs every 15 minutes x 4, then every 30 minutes x 2.",
            "Bedrest order: varies per attending, however typically 2 hours laying on right side.",
          ],
        },
        {
          title: "If outpatient procedure",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSLIVERBX.",
          ],
        },
      ],
      details: {
        "Follow up": ["No specifics."],
      },
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        "Liver biopsy": [
          { strong: "Biopsy target:", text: " distinguish a focal-lesion biopsy from a non-targeted parenchymal biopsy before choosing the route and specimen plan." },
          { strong: "Portal structures:", text: " portal veins, hepatic arteries, and bile ducts travel together; keep the biopsy path away from visible central branches." },
          { strong: "Hepatic veins:", text: " map the major hepatic veins and IVC before advancing into a deep or central target." },
          { strong: "Access route:", text: " right-lobe access is often intercostal, while left-lobe access may be subcostal or epigastric; choose the shortest safe route with a parenchymal margin when feasible." },
          { strong: "Structures to avoid:", text: " lung and pleura, gallbladder, bowel, kidney, and abdominal-wall vessels. For an intercostal route, enter over the superior rib margin." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Liver biopsy": [
          { strong: "Confirm the biopsy plan:", text: " targeted versus non-targeted, required cores, and pathology or microbiology containers." },
          { strong: "Map a safe trajectory:", text: " use ultrasound or CT to identify the target, capsule, vessels, adjacent organs, and a reproducible breath-hold." },
          { strong: "Anesthetize the tract:", text: " extend local anesthesia through the skin, abdominal wall, and liver capsule." },
          { strong: "Advance the biopsy system:", text: " place the coaxial introducer under image guidance and confirm the tip before sampling." },
          { strong: "Obtain the cores:", text: " sample viable tissue, limit passes, and avoid the necrotic center of a lesion when possible." },
          { strong: "Confirm specimen adequacy:", text: " inspect the cores and route them to the correct studies before ending the procedure." },
          { strong: "Complete safely:", text: " withdraw with tract management as indicated, then assess for immediate bleeding or adjacent-organ injury." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Liver biopsy": [
          { strong: "Hemorrhage:", text: " the major complication. Avoid visible vessels and escalate severe or increasing abdominal/right-shoulder pain, tachycardia, hypotension, or a falling hemoglobin." },
          { strong: "No safe percutaneous route:", text: " do not force a window through lung, bowel, gallbladder, large vessels, or substantial ascites; consider an alternate target or transvenous approach." },
          { strong: "Nondiagnostic tissue:", text: " confirm the exact target and specimen plan; sample the viable solid edge rather than necrosis when feasible." },
          { strong: "Pleural transgression:", text: " avoid an unnecessarily high intercostal path and confirm the lung base before puncture." },
          { strong: "Biliary injury or hemobilia:", text: " avoid central portal structures and evaluate new biliary pain, jaundice, or gastrointestinal bleeding." },
          { strong: "Too many passes:", text: " balance tissue needs against rising bleeding risk and stop when the diagnostic goal is met." },
        ],
        References: [
          { text: "ACR-SIR-SPR Practice Parameter for Image-Guided Percutaneous Needle Biopsy", href: "https://gravitas.acr.org/PPTS/GetDocumentView?docId=3" },
          { text: "BSG/RCR/RCP Guidelines on Liver Biopsy in Clinical Practice", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7398479/" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm BP threshold, ascites pathway, bedrest duration, and local specimen handling workflow.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification with local policy.",
          "Confirm anticoagulation hold times with the final table.",
          "Confirm local BP threshold before biopsy.",
          "Confirm target versus non-target specimen handling and requested studies.",
          "Confirm attending-specific right-side bedrest duration and discharge criteria.",
        ],
      },
    },
  };
}

function installPiccPlacementEdits() {
  const procedure = procedures.find((item) => item.title === "PICC Placement");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "PICC placement guidance for prolonged IV therapy, TPN or irritant/vesicant infusions, poor peripheral access, frequent blood draws, and reliable intermediate- to long-term central venous access.";
  procedure.keywords = `${procedure.keywords || ""} picc central venous access antibiotics chemotherapy tpn vesicant peripheral access lumens av fistula graft lymphedema`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "PICC Placement",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, location, expected duration, lumen needs, arm restrictions, imaging history, labs, and blood pressure.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Intermediate- to long-term central venous access for infusions, access difficulty, blood draws, or recurrent IV therapy.",
      details: {
        Indications: [
          "Prolonged IV therapy, such as antibiotics or chemotherapy.",
          "TPN or other irritant/vesicant infusions.",
          "Poor peripheral venous access.",
          "Frequent blood draws or recurrent IV medication administration.",
          "Need for reliable intermediate- to long-term central venous access.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 3.0 and platelets >20k.",
      details: {
        Labs: ["INR < 3.0.", "Platelets >20k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no routine anticoagulation holding requirement.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: no holding requirement.",
          "Heparin: no holding requirement.",
          "Lovenox: no holding requirement.",
          "DOACs: no holding requirement.",
          "Plavix: no holding requirement.",
          "Aspirin: no holding requirement.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local.",
      details: {
        Sedation: ["Local."],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm location, duration, lumen number, arm restrictions, prior surgery/lymphedema imaging context, labs, and blood pressure.",
      details: {
        Checklist: [
          "Confirm location.",
          "Confirm duration and number of lumens.",
          "DO NOT place in arm with AV fistula/graft or dialysis plan.",
          "Review imaging with any prior axillary surgery or lymphedema.",
          "Labs are appropriate.",
          "Blood pressure is under control.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, routine vitals, no bedrest, outpatient discharge instructions, AVS, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "No bedrest time needed.",
          ],
        },
        {
          title: "If outpatient procedure",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSPICC.",
          ],
        },
      ],
      details: {
        "Follow up": ["No specifics."],
      },
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        "PICC placement": [
          { strong: "Upper-arm veins:", text: " assess the basilic, paired brachial, and cephalic veins; choose a patent vein large enough for the smallest suitable catheter." },
          { strong: "Nearby structures:", text: " brachial veins travel close to the brachial artery and median nerve; identify all three before puncture." },
          { strong: "Central course:", text: " the catheter passes through the axillary, subclavian, and brachiocephalic veins into the SVC." },
          { strong: "Target tip:", text: " the lower SVC or cavoatrial junction provides high flow without placing the tip deep in the heart." },
          { strong: "Vein preservation:", text: " protect potential dialysis-access veins and avoid an arm with an AV access, active lymphedema, or significant venous obstruction." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "PICC placement": [
          { strong: "Confirm the device plan:", text: " indication, duration, required lumens, catheter size, and preferred arm." },
          { strong: "Survey the veins:", text: " use ultrasound to confirm patency, size, depth, and separation from the artery and nerve." },
          { strong: "Prep with full barrier:", text: " maintain maximal sterile technique and anesthetize the selected site." },
          { strong: "Obtain venous access:", text: " puncture with real-time ultrasound, pass the wire gently, and confirm its central course." },
          { strong: "Advance the catheter:", text: " measure the required length and guide the catheter centrally with fluoroscopy, ECG, or approved tip-navigation technology." },
          { strong: "Confirm function and tip:", text: " verify lower-SVC/cavoatrial position, then aspirate and flush every lumen." },
          { strong: "Secure and document:", text: " apply the stabilization device and sterile dressing; record vein, length, tip position, and readiness for use." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "PICC placement": [
          { strong: "Artery or nerve injury:", text: " identify the brachial artery and median nerve before access; stop for arterial blood, severe pain, or paresthesia." },
          { strong: "Thrombosis:", text: " use the smallest adequate catheter in a sufficiently large vein and avoid unnecessary lumens." },
          { strong: "Tip malposition:", text: " check for internal-jugular, contralateral, azygos, or high-SVC placement before clearing the line." },
          { strong: "Tip too deep:", text: " ectopy during advancement suggests right-atrial or ventricular entry; withdraw and reconfirm position." },
          { strong: "Vein loss:", text: " avoid arms needed for dialysis access and reconsider placement with severe swelling, thrombosis, or central stenosis." },
          { strong: "Infection or dislodgement:", text: " use maximal sterile barriers, secure without tension, and document the external length for later comparison." },
        ],
        References: [
          { text: "Association of Anaesthetists Guidelines: Safe Vascular Access 2025", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12519924/" },
          { text: "Society of Hospital Medicine Position Statement on Ultrasound-Guided Vascular Access", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10193861/" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm arm restriction workflow, lab thresholds, and outpatient discharge/AVS process.",
      details: {
        "Review checklist": [
          "Confirm low bleeding risk classification with local policy.",
          "Confirm anticoagulation hold language with the final table.",
          "Confirm dialysis access planning restrictions and escalation workflow.",
          "Confirm whether BP control should remain in the PICC checklist.",
          "Confirm outpatient AVS and discharge workflow.",
        ],
      },
    },
  };
}

function installTunneledLineEdits() {
  const procedure = procedures.find((item) => item.title === "Tunneled Line Placement/Exchange");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Tunneled line placement and exchange guidance for long-term central access, tunneled dialysis/apheresis access, poor peripheral access, catheter dysfunction, malposition, damage, or size/type conversion.";
  procedure.keywords = `${procedure.keywords || ""} tunneled line tunneled catheter tdc permcath dialysis catheter apheresis antibiotics chemotherapy tpn transfusions fibrin sheath catheter exchange malposition bacteremia line infection`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Tunneled Line Placement/Exchange",
      type: "reference",
      summary: "Review indication, placement versus exchange pathway, labs, low-risk anticoagulation guidance, sedation plan, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, placement versus exchange plan, infection status, labs, anticoagulation, sedation plan, and ability to lie flat.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Long-term central access, dialysis/apheresis access, poor peripheral access, or exchange for dysfunction, malposition, damage, leakage, or type conversion.",
      details: {
        Indications: [
          "Long-term central access for antibiotics, chemotherapy, TPN, transfusions, or frequent infusions.",
          "Hemodialysis or apheresis when permanent access is unavailable, immature, or malfunctioning.",
          "Poor peripheral access or when a PICC is unsuitable.",
          "Exchange for catheter dysfunction, occlusion/fibrin sheath, damage, or leakage.",
          "Exchange for malposition, retraction, partial dislodgment, or catheter-size/type conversion.",
        ],
        "Do not": [
          "DO NOT exchange over wire if bacteremia/line infection.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3, platelets >20k, and potassium if TDC placement.",
      details: {
        Labs: [
          "INR < 2-3.",
          "Platelets >20k.",
          "Potassium if TDC placement.",
        ],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; use the anticoagulation table for medication-specific guidance.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local anesthesia; moderate sedation for special situations.",
      details: {
        Sedation: [
          "Local.",
          "Moderate sedation for special situations.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Use the placement pathway for new lines and the replacement pathway for exchanges.",
      details: {
        "For placement": [
          "Confirm indication, expected duration, and required catheter: dialysis versus small-bore; single versus double lumen.",
          "Determine new placement.",
          "Review imaging; assess for central venous stenosis/thrombosis and implanted hardware.",
          "Confirm no bacteremia/no active infection.",
          "Labs are appropriate.",
          "Confirm sedation plan and that patient can lie flat.",
        ],
        "For replacement": [
          "Document the reason for exchange.",
          "For dysfunction: check for kink/retraction, inability to aspirate versus flush, prior alteplase attempt, and suspected fibrin sheath.",
          "Assess for fever, bacteremia, blood cultures, exit-site erythema, drainage, or tunnel tenderness; avoid over-wire exchange with tunnel infection.",
          "Labs are appropriate.",
          "Confirm sedation plan and that patient can lie flat.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "Future technique section for tunneled line placement/exchange.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Regular diet, routine vitals, pain control, outpatient discharge timing, and AVS.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs - per unit routine.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "If outpatient",
          items: [
            "Discharge order - 30 min.",
            ".IRAVSTUNNELEDCATHPLACEMENT1.",
          ],
        },
      ],
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "Future edit: add common tunneled line placement/exchange problems and first checks.",
      details: {
        "To build": [
          "No suitable access site.",
          "Central venous stenosis or thrombosis.",
          "Difficult aspiration/flush after placement or exchange.",
          "Suspected fibrin sheath.",
          "Malposition or retraction.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "Findings that should pause over-wire exchange or prompt escalation.",
      details: {
        "Escalate if": [
          "Bacteremia or line infection: do not exchange over wire.",
          "Tunnel infection, exit-site drainage, tunnel tenderness, or uncontrolled active infection.",
          "No safe access site or suspected central venous occlusion.",
          "Arterial puncture, expanding hematoma, pneumothorax symptoms, arrhythmia, or hemodynamic instability.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm local tunneled line exchange infection rules, sedation workflow, potassium threshold, AVS wording, and follow-up ownership.",
      details: {
        "Review checklist": [
          "Confirm low bleeding risk classification with local policy.",
          "Confirm anticoagulation language with the final table.",
          "Confirm potassium threshold for TDC placement.",
          "Confirm when exchange over wire is prohibited for bacteremia/line infection.",
          "Confirm tunneled catheter AVS and follow-up workflow.",
        ],
      },
    },
  };
}

function installLungBiopsyEdits() {
  const procedure = procedures.find((item) => item.title === "Lung Biopsy/Fiducial Marker Placement");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Lung biopsy guidance for pulmonary nodules, masses, persistent focal opacities, suspected lung cancer or metastatic disease, molecular testing, infection/inflammatory workup, and selected pleural, chest-wall, or mediastinal lesions.";
  procedure.keywords = `${procedure.keywords || ""} lung biopsy pulmonary nodule mass opacity lung cancer metastasis molecular testing pleural chest wall mediastinal pneumothorax cxr`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Lung Biopsy",
      type: "reference",
      summary: "Review pre-procedure checks, procedural considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, imaging window, high-risk anticoagulation holds, BP control, cardiopulmonary reserve, and specimen plan.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Pulmonary, pleural, chest-wall, or mediastinal tissue diagnosis when biopsy will guide management.",
      details: {
        Indications: [
          "Characterize a pulmonary nodule, mass, or persistent focal opacity.",
          "Diagnose or stage suspected primary lung cancer or metastatic disease.",
          "Obtain tissue for molecular testing when it will guide treatment.",
          "Evaluate suspected infection or inflammatory disease when noninvasive workup is insufficient.",
          "Biopsy an accessible pleural, chest-wall, or mediastinal lesion when appropriate.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 1.5-1.8 and platelets >50k.",
      details: {
        Labs: ["INR < 1.5-1.8.", "Platelets >50k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local mostly; moderate sedation is typically avoided to allow breath-holds.",
      details: {
        Sedation: [
          "Local, mostly.",
          "Moderate sedation typically avoided to allow for breath-holds.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, safe imaging path, labs, BP control, cardiopulmonary reserve, and specimen requests.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Review imaging with appropriate window: no fissures, shortest path to lesion.",
          "Labs are appropriate.",
          "Blood pressure is under control.",
          "Assess cardiopulmonary reserve.",
          "Specimen requests confirmed.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "CXR sequence, staged diet advancement, vitals, pain control, outpatient discharge, and chest tube escalation plan.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "CXR STAT and 3 hours post; indicate 1 of 2 and 2 of 2 in order comments.",
            "Vital signs every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 1.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "Diet",
          items: [
            "NPO until 1st CXR.",
            "After 1st CXR: clear liquids.",
            "After 2nd CXR: regular diet and discharge.",
          ],
        },
        {
          title: "If outpatient procedure",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSLUNGBX.",
          ],
        },
        {
          title: "If chest tube placement indicated",
          items: [
            "Place IR chest tube order and admit to inpatient.",
            { text: "See chest tube section", procedureId: "chest-tube-placement" },
          ],
        },
      ],
      details: {
        "Follow up": ["No specifics."],
      },
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        "Lung biopsy": [
          { strong: "Target:", text: " define the viable solid component and its relationship to the pleura, fissures, bronchi, and pulmonary vessels." },
          { strong: "Pleural path:", text: " favor the shortest route through aerated lung and cross the pleura once when feasible." },
          { strong: "Structures to avoid:", text: " fissures, bullae, emphysematous lung, visible vessels, central airways, and the diaphragm." },
          { strong: "Intercostal bundle:", text: " the vein, artery, and nerve run along the inferior rib margin; enter over the superior rib margin." },
          { strong: "Respiratory motion:", text: " lower-lobe and juxtadiaphragmatic targets move most; use a repeatable respiratory phase throughout the biopsy." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Lung biopsy": [
          { strong: "Confirm the biopsy plan:", text: " target, required tissue, molecular testing, microbiology, and specimen containers." },
          { strong: "Position the patient:", text: " create the shortest stable path and rehearse a consistent breath-hold or quiet-breathing instruction." },
          { strong: "Plan the trajectory:", text: " use CT to avoid fissures, bullae, vessels, major bronchi, and the diaphragm." },
          { strong: "Anesthetize to the pleura:", text: " then advance the coaxial introducer incrementally with imaging confirmation." },
          { strong: "Sample the target:", text: " place the tip in viable tissue, minimize pleural passes, and obtain only the cores needed." },
          { strong: "Confirm specimen adequacy:", text: " inspect and route tissue before removing access, especially when molecular testing is required." },
          { strong: "Check for complications:", text: " inspect the needle tract and obtain immediate imaging for pneumothorax and pulmonary hemorrhage." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Lung biopsy": [
          { strong: "Pneumothorax:", text: " the most common complication. Minimize aerated-lung distance, fissure or bulla crossing, and repeated pleural passes; treat according to size, symptoms, and cardiopulmonary reserve." },
          { strong: "Pulmonary hemorrhage or hemoptysis:", text: " avoid visible vessels, monitor oxygenation, place the biopsy side down when appropriate, and escalate significant bleeding." },
          { strong: "Air embolism:", text: " rare but critical. Keep the biopsy system closed and treat sudden neurologic or cardiovascular change as an emergency." },
          { strong: "Target motion:", text: " inconsistent breathing can move the lesion off-axis; repeat the same respiratory instruction before every advancement." },
          { strong: "Nondiagnostic tissue:", text: " target viable solid tissue, avoid necrosis, and confirm specimen requirements before ending access." },
          { strong: "No safe path:", text: " reconsider the approach when a fissure, bulla, central vessel, or poor cardiopulmonary reserve makes the planned route unsafe." },
        ],
        References: [
          { text: "ACR-SIR-SPR Practice Parameter for Image-Guided Percutaneous Needle Biopsy", href: "https://gravitas.acr.org/PPTS/GetDocumentView?docId=3" },
          { text: "Korean Society of Thoracic Radiology Guideline for Percutaneous Transthoracic Needle Biopsy", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7817630/" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm CXR timing, diet advancement, discharge criteria, and chest tube admission workflow.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification with local policy.",
          "Confirm anticoagulation hold times with the final table.",
          "Confirm CXR timing and order-comment wording.",
          "Confirm diet advancement and outpatient discharge workflow.",
          "Confirm chest tube order/admission workflow.",
        ],
      },
    },
  };
}

function installForeignBodyRemovalEdits() {
  const procedure = procedures.find((item) => item.title === "Foreign Body Removal");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Foreign body removal guidance for retained or embolized intravascular device fragments, with emphasis on location, what the consulting team has already attempted, access planning, and retrieval tools.";
  procedure.keywords = `${procedure.keywords || ""} foreign body removal retrieval embolized retained catheter guidewire port fragment filter fragment snare intravascular intracardiac pulmonary artery arrhythmia migration`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Foreign Body Removal",
      type: "reference",
      summary: "Review pre-procedure checks, retrieval considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm location, what the consulting team has tried, labs, anticoagulation, sedation plan, access approach, and retrieval equipment.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Retained or embolized intravascular foreign body, especially if symptomatic or high-risk by location.",
      details: {
        "Initial evaluation": [
          "Evaluate for location and what consulting team has done on their own.",
        ],
        Indications: [
          "Retained or embolized intravascular foreign body.",
          "Fractured catheter, guidewire, port fragment, filter fragment, or other device component.",
          "Particularly important if intracardiac, in the pulmonary arteries, symptomatic, infected, thrombosed, causing arrhythmia, or at risk of migration.",
          "Usually retrieve when technically feasible, even if incidentally discovered.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >20k.",
      details: {
        Labs: ["INR < 2-3.", "Platelets >20k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no requirement to hold anticoagulation.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
          "No requirement to hold anticoagulation.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local mostly; moderate sedation in some cases.",
      details: {
        Sedation: [
          "Local, mostly.",
          "Moderate sedation in some cases.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging/access, labs, access approach, and retrieval tools.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Review imaging with access.",
          "Labs are appropriate.",
          "Confirm access approach.",
          "If venous, have snare/retrieval tools available.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the foreign body retrieval technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, routine vitals, pain control, outpatient discharge instructions, AVS, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "If outpatient procedure",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSFOREIGNBODYREMOVAL.",
          ],
        },
      ],
      details: {
        "Follow up": ["No specifics."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common foreign body retrieval problems and first checks.",
      details: {
        "To build": [
          "Foreign body not visible or location uncertain.",
          "Fragment migrates during retrieval.",
          "Snare cannot engage fragment.",
          "Access approach does not provide a workable angle.",
          "Fragment is adherent, thrombosed, or fractured further.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Intracardiac or pulmonary arterial location with arrhythmia, hemodynamic change, or respiratory symptoms.",
          "Infected or thrombosed foreign body.",
          "High migration risk or interval migration on imaging.",
          "Vascular injury, uncontrolled access-site bleeding, or inability to safely retrieve.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm low-risk anticoagulation language, retrieval equipment defaults, and escalation workflow.",
      details: {
        "Review checklist": [
          "Confirm low bleeding risk classification with local policy.",
          "Confirm anticoagulation language with the final table.",
          "Confirm standard retrieval tools by access route and object type.",
          "Confirm when cardiac anesthesia, surgery, or advanced support should be involved.",
        ],
      },
    },
  };
}

function installHemorrhoidArteryEmbolizationEdits() {
  const procedure = procedures.find((item) => item.title === "Hemorrhoid Artery Embolization");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Hemorrhoid artery embolization guidance for symptomatic internal hemorrhoids, chronic/recurrent bleeding, persistent symptoms despite conservative or office-based therapy, and high-risk surgical candidates.";
  procedure.keywords = `${procedure.keywords || ""} hemorrhoid artery embolization internal hemorrhoids bleeding rectal bleeding superior rectal artery emborrhoid elderly anticoagulated femoral radial`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Hemorrhoid Artery Embolization",
      type: "reference",
      summary: "Review pre-procedure checks, embolization considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm internal hemorrhoid indication, prior GI/colorectal evaluation, imaging, labs, anticoagulation plan, sedation tolerance, access, and embolic choice.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Symptomatic internal hemorrhoids with bleeding or persistent symptoms, especially when surgery is undesirable or high-risk.",
      details: {
        Indications: [
          "Symptomatic internal hemorrhoids.",
          "Chronic or recurrent hemorrhoidal bleeding.",
          "Persistent symptoms despite conservative therapy.",
          "Failure of, or recurrence following office-based therapies.",
          "Patient wishes to avoid surgery.",
          "Surgery undesirable or high-risk in elderly or anticoagulated patient.",
        ],
        "Conservative therapy": [
          "Increased fiber/hydration.",
          "Bowel-habit optimization.",
          "Topical or medical therapy.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "CBC and INR within 30 days; INR < 2-3 and platelets >20k.",
      details: {
        Labs: ["CBC and INR within 30 days.", "INR < 2-3.", "Platelets >20k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; acute hemorrhage should be treated differently from elective indications.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        "If indication is acute hemorrhage": [
          "Patient should be holding all anticoagulation if indication is acute hemorrhage.",
        ],
        "If for other indication": ["No need to hold anticoagulation."],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm internal hemorrhoid indication, prior GI/colorectal workup, imaging/CTA, labs, sedation tolerance, access, and embolic choice.",
      details: {
        Checklist: [
          "Confirm indication is INTERNAL hemorrhoids.",
          "Review prior evaluation with GI or colorectal surgery.",
          "Review imaging.",
          "CTA if acute.",
          "Labs are appropriate.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          "Access approach and embolic choice.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "Review rectal arterial anatomy, embolize the superior rectal artery targets, and assess collateral supply.",
      children: [
        `${id}-intra-v2-anatomy`,
        `${id}-intra-v2-procedural-steps`,
        `${id}-intra-v2-pitfalls-safety`,
      ],
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      defaultOpen: true,
      summary: "Understand the superior rectal artery target and the extensive collateral supply from the internal iliac system.",
      images: [
        {
          src: "images/rectal-arterial-supply.png",
          alt: "Anterior pelvic anatomy illustration labeling the inferior mesenteric, superior rectal, middle rectal, internal pudendal, and inferior rectal arteries.",
          caption: "Arterial supply to the rectum. Original AI-generated educational illustration; confirm patient-specific anatomy and variants on procedural imaging.",
        },
        {
          src: "images/inferior-mesenteric-superior-rectal-schematic.png",
          alt: "Simplified angiographic-style illustration labeling the inferior mesenteric artery, superior rectal artery, and right and left terminal branches.",
          caption: "Simplified IMA and superior rectal artery branching pattern. AI-generated teaching illustration, not a patient angiogram; it omits normal variation and fine angiographic detail.",
        },
        {
          src: "images/internal-iliac-rectal-supply-schematic.png",
          alt: "Simplified angiographic-style illustration labeling internal iliac contributions to the middle and inferior rectal arteries.",
          caption: "Simplified internal iliac contribution to rectal arterial supply. AI-generated teaching illustration, not a patient angiogram; it omits normal variation and fine angiographic detail.",
        },
      ],
      details: {
        Anatomy: [
          { strong: "IMA:", text: " commonly arises from the anterior aorta at approximately L3." },
          { strong: "Superior rectal artery (SRA):", text: " terminal branch of the IMA and primary supply to internal hemorrhoids." },
          { strong: "SRA terminal branches:", text: " divide into right and left branches supplying the hemorrhoidal plexus." },
          { strong: "Middle rectal arteries:", text: " variable branches of the internal iliac system that may provide important collateral supply." },
          { strong: "Inferior rectal arteries:", text: " arise from the internal pudendal arteries and supply the distal anal canal." },
          { strong: "Rectal arterial anastomoses:", text: " provide extensive collateral perfusion between superior, middle, and inferior rectal territories." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "Select the IMA, embolize the distal SRA targets, and reassess for residual or collateral supply.",
      details: {
        "Basic steps": [
          { strong: "1. Obtain arterial access", text: " and select the IMA." },
          { strong: "2. Perform IMA angiography", text: " to define SRA anatomy and target branches." },
          { strong: "3. Microcatheterize the SRA", text: " and advance into the distal hemorrhoidal branches." },
          { strong: "4. Confirm target supply", text: " with selective angiography." },
          { strong: "5. Embolize the target branches", text: " to near-stasis using the chosen embolic." },
        ],
        "Step 5: embolic selection": [
          { strong: "Elective symptomatic hemorrhoids:", text: " most commonly microcoils, with particles used by some operators." },
          { strong: "Emergent hemorrhoidal bleeding:", text: " commonly coils for focal bleeding; particles or Gelfoam may be used for more diffuse bleeding." },
        ],
        Completion: [
          { strong: "6. Repeat angiography", text: " to assess residual hemorrhoidal supply." },
          { strong: "7. Evaluate or treat collateral supply", text: " if significant persistent filling remains." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "Prevent missed collateral supply, nontarget embolization, incomplete treatment, reflux, and rectal ischemia.",
      details: {
        "Pitfalls and safety": [
          { strong: "Missed collateral supply:", text: " persistent filling may arise from middle or inferior rectal arteries; reassess pelvic collaterals." },
          { strong: "Nontarget embolization:", text: " confirm distal catheter position and exclude unintended branches before embolizing." },
          { strong: "Vasospasm:", text: " can obscure true supply; pause, reposition, or use a vasodilator as appropriate before assuming treatment is complete." },
          { strong: "Incomplete bilateral treatment:", text: " residual contralateral SRA supply can lead to persistent symptoms or bleeding." },
          { strong: "Catheter instability or reflux:", text: " embolize slowly and maintain stable distal position to avoid proximal or nontarget delivery." },
          { strong: "Rectal ischemia:", text: " uncommon because of rich collaterals, but avoid overly aggressive embolization of multiple rectal arterial territories." },
        ],
      },
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, routine vitals, access-site care, timed vitals, outpatient discharge instructions, AVS, and clinic follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
            "Monitor access site.",
            "Vital signs every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours; edit to match bedrest.",
          ],
        },
        {
          title: "Femoral access",
          items: ["Bedrest 2 hours with closure device; 6 hours with manual compression."],
        },
        {
          title: "Radial access",
          items: [
            "Remove radial artery compression device within 2 hours post procedure.",
            "Activity per JH-HLM mobility goal.",
          ],
        },
        {
          title: "If outpatient procedure",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSHEMORRHOID.",
          ],
        },
      ],
      afterChecklistDetails: {
        "Follow up": ["1 month clinic follow up."],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm anticoagulation branching, access-specific recovery workflow, embolic choice, and clinic follow-up process.",
      details: {
        "Review checklist": [
          "Confirm low bleeding risk classification with local policy.",
          "Confirm anticoagulation language for acute hemorrhage versus elective indications.",
          "Confirm femoral and radial recovery wording.",
          "Confirm embolic choice defaults and documentation.",
          "Confirm 1-month clinic follow-up workflow.",
        ],
      },
    },
  };
}

function installPortPlacementEdits() {
  const procedure = procedures.find((item) => item.title === "Port Placement");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Port placement guidance for outpatient long-term chemotherapy, transfusions or blood draws, long-term IV antibiotics, TPN, or intermittent central access.";
  procedure.keywords = `${procedure.keywords || ""} port placement chest port mediport chemotherapy transfusions blood draws antibiotics tpn central access outpatient`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Port Placement",
      type: "reference",
      summary: "Review pre-procedure checks, port placement considerations, post-orders, and review items.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm outpatient workflow, indication, imaging/access, labs, anticoagulation, sedation requirements, and access approach.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
      details: {
        Workflow: ["ALWAYS DONE AS OUTPATIENT."],
        Indications: [
          "Long term chemotherapy.",
          "Frequent blood transfusions/draw.",
          "Long term IV antibiotics or TPN.",
          "Softer indication for need for intermittent central access.",
        ],
        Labs: ["INR < 2-3.", "Platelets >20k."],
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
          "No requirement to hold anticoagulation.",
        ],
        Sedation: [
          "Mostly moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
        Checklist: [
          "Confirm indication.",
          "Review imaging with access.",
          "Labs are appropriate.",
          "Access approach.",
          "Sedation requirements.",
        ],
      },
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Outpatient long-term or intermittent central venous access, most commonly for chemotherapy.",
      details: {
        Workflow: ["ALWAYS DONE AS OUTPATIENT."],
        Indications: [
          "Long term chemotherapy.",
          "Frequent blood transfusions/draw.",
          "Long term IV antibiotics or TPN.",
          "Softer indication for need for intermittent central access.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >20k.",
      details: {
        Labs: ["INR < 2-3.", "Platelets >20k."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no requirement to hold anticoagulation.",
      details: {
        Anticoagulation: [
          "Low bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
          "No requirement to hold anticoagulation.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Mostly moderate sedation.",
      details: {
        Sedation: ["Mostly moderate sedation."],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging/access, labs, access approach, and sedation requirements.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Review imaging with access.",
          "Labs are appropriate.",
          "Access approach.",
          "Sedation requirements.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the port placement technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Diet, routine vitals, pain control, outpatient discharge instructions, AVS, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "Outpatient discharge",
          items: [
            "Discharge order with medication reconciliation.",
            "After visit summary: .IRAVSPORTPLACEMENT.",
          ],
        },
      ],
      details: {
        "Follow up": ["No specifics."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common port placement problems and first checks.",
      details: {
        "To build": [
          "No suitable venous access.",
          "Difficult wire passage or central venous stenosis.",
          "Pocket site issue.",
          "Tip position uncertainty.",
          "Port does not aspirate or flush.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Active infection or bacteremia concern before elective placement.",
          "No safe access or pocket site.",
          "Severe coagulopathy outside low-risk thresholds.",
          "Arterial puncture, expanding hematoma, pneumothorax symptoms, or unstable vitals.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm outpatient-only workflow, low-risk anticoagulation language, sedation workflow, and discharge timing.",
      details: {
        "Review checklist": [
          "Confirm port placement is always outpatient in local workflow.",
          "Confirm low bleeding risk classification with local policy.",
          "Confirm anticoagulation language with the final table.",
          "Confirm moderate sedation workflow and discharge timing.",
          "Confirm AVS wording and follow-up owner.",
        ],
      },
    },
  };
}

function installPortRemovalEdits() {
  const procedure = procedures.find((item) => item.title === "Port Removal");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Port removal guidance for completed therapy, ports no longer needed, infection, malfunction, thrombosis, fracture, or migration.";
  procedure.keywords = `${procedure.keywords || ""} port removal chest port explant infection malfunction thrombosis fracture migration catheter tip culture`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Port Removal",
      type: "reference",
      summary: "Review indication, labs, low-risk anticoagulation, sedation options, infection assessment, and discharge orders.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, port location, prior imaging, labs, anticoagulation plan, sedation plan, and whether catheter-tip culture is needed.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Remove when therapy is complete, the port is no longer needed, or there is infection, malfunction, thrombosis, fracture, or migration.",
      details: {
        Indications: [
          "Therapy completed.",
          "Port no longer needed.",
          "Infection.",
          "Malfunction.",
          "Thrombosis, fracture, or migration.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >20k.",
      details: {
        Labs: ["Platelets >20,000/uL.", "INR < 2-3."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding risk; no routine anticoagulation holding requirement.",
      details: {
        Anticoagulation: [
          "Low bleeding-risk procedure.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: no holding requirement.",
          "Heparin: no holding requirement.",
          "Lovenox: no holding requirement.",
          "DOACs: no holding requirement.",
          "Plavix: no holding requirement.",
          "Aspirin: no holding requirement.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local anesthesia; moderate sedation optional; general anesthesia for select pediatric or complex removals.",
      details: {
        Sedation: [
          "Local anesthesia.",
          "Moderate sedation, optional.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          "General anesthesia for select pediatric or complex removals.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, port location/imaging, infection or bacteremia concern, labs, and catheter-tip culture plan.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Review port location and prior imaging.",
          "Assess for pocket infection or bacteremia.",
          "Labs are appropriate.",
          "Determine whether catheter-tip culture is needed.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the port removal technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Regular diet, routine vitals, pain control, immediate discharge, AVS, and no specific follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per routine.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "Discharge",
          items: [
            "Discharge order: immediate.",
            "After visit summary: .IRAVSPORTREMOVAL.",
          ],
        },
      ],
      details: {
        "Follow up": ["No specific follow up."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common port removal problems and first checks.",
      details: {
        "To build": [
          "Port catheter is adherent or difficult to remove.",
          "Catheter fracture or retained fragment.",
          "Pocket infection or purulence.",
          "Bleeding from pocket or venotomy tract.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Bacteremia or pocket infection requiring culture and antibiotics coordination.",
          "Catheter fracture, migration, or retained fragment.",
          "Uncontrolled pocket bleeding or expanding hematoma.",
          "Hemodynamic instability or concern for vascular injury.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm low-risk anticoagulation language, culture workflow, and immediate-discharge criteria.",
      details: {
        "Review checklist": [
          "Confirm low bleeding risk classification with local policy.",
          "Confirm catheter-tip culture indications.",
          "Confirm immediate-discharge workflow after hemostasis.",
          "Confirm AVS wording.",
        ],
      },
    },
  };
}

function installProstateArteryEmbolizationEdits() {
  const procedure = procedures.find((item) => item.title === "Prostate Artery Embolization");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Prostate artery embolization guidance for medically refractory LUTS from BPH, large prostate or poor surgical candidacy, desire to preserve sexual function, and refractory hematuria of prostatic origin.";
  procedure.keywords = `${procedure.keywords || ""} prostate artery embolization pae bph luts hematuria prostatic origin psa urinalysis urine culture bactrim ciprofloxacin levofloxacin`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Prostate Artery Embolization",
      type: "reference",
      summary: "Review indication, labs, high-risk anticoagulation, sedation, BPH versus hematuria workflows, post-orders, discharge medications, and follow-up.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, urology workup when for LUTS/BPH, labs, anticoagulation, sedation/NPO status, antibiotics, IV placement, and imaging approach.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Medically refractory LUTS from BPH, large prostate or poor surgical candidacy, desire to preserve sexual function, or refractory hematuria of prostatic origin.",
      details: {
        Indications: [
          "Medically refractory LUTS from BPH and intolerance of BPH medications.",
          "Large prostate / poor surgical candidate.",
          "Desire to preserve sexual function.",
          "Refractory hematuria of prostatic origin.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "Platelets >50k, INR <1.5-1.8, and CBC/INR/BMP within 30 days.",
      details: {
        Labs: [
          "Platelets >50,000/uL.",
          "INR < 1.5-1.8.",
          "CBC, INR, and BMP within 30 days.",
        ],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding-risk procedure; use institutional anticoagulation table for hold timing.",
      details: {
        Anticoagulation: [
          "High bleeding-risk procedure.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation; general anesthesia rarely required.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          "General anesthesia rarely required.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication and follow either the LUTS/BPH workflow or refractory hematuria workflow.",
      details: {
        Checklist: ["Confirm indication."],
        "If for LUTS from BPH": [
          "Urology evaluation completed.",
          "Exclude prostate cancer as appropriate.",
          "Review prostate size and pelvic arterial anatomy.",
          "Check PSA and urinalysis/urine culture.",
          "Labs are appropriate.",
          "Treat active UTI before procedure.",
          "NPO for moderate sedation.",
          "Vital signs per routine.",
          "Peripheral IV placement, NOT in left arm.",
        ],
        "To be ordered in clinic": [
          "Bactrim 800-160 mg BID x 10 days total starting 2 days prior to procedure.",
          "OR ciprofloxacin 500 mg BID x 10 days total.",
          "If oral antibiotic not taken, give 1x dose of IV levofloxacin.",
        ],
        "If for refractory hematuria of prostatic origin": [
          "Review indication.",
          "Labs are appropriate.",
          "NPO for moderate sedation.",
          "Resuscitation per primary team.",
          "Review imaging and approach.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [`${id}-intra-v2-anatomy`, `${id}-intra-v2-procedural-steps`, `${id}-intra-v2-pitfalls-safety`],
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        Anatomy: [
          { strong: "Variable origins:", text: " prostatic arteries commonly arise from the internal pudendal, obturator, or a shared superior vesical trunk." },
          { strong: "Gland supply:", text: " anteromedial branches supply the central gland; posterolateral branches supply the peripheral gland and capsule." },
          { strong: "BPH target:", text: " transition-zone enlargement surrounds the prostatic urethra, just below the bladder neck." },
          { strong: "Dangerous connections:", text: " bladder, rectal, and penile collaterals can carry embolic outside the prostate." },
          { strong: "Bilateral supply:", text: " accessory feeders and cross-midline connections can sustain symptoms or bleeding after incomplete treatment." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Basic steps": [
          { strong: "1. Obtain arterial access", text: " via radial or femoral approach; select the internal iliac artery." },
          { strong: "2. Map the prostatic supply", text: " with selective angiography; identify accessory feeders and pelvic collaterals." },
          { strong: "3. Microcatheterize the target", text: " and confirm prostate perfusion with selective angiography and cone-beam CT when needed." },
          { strong: "4. Protect nontarget branches", text: " by advancing beyond unsafe connections or selectively protecting them when appropriate." },
          { strong: "5. Embolize slowly", text: " using the indication-specific plan below; reassess flow and stop for reflux." },
          { strong: "6. Assess the opposite side", text: " and treat remaining prostatic supply when safely accessible." },
          { strong: "7. Confirm the endpoint", text: " with final angiography; document residual supply and obtain access-site hemostasis." },
        ],
        "If for LUTS from BPH": [
          { strong: "Elective gland treatment:", text: " deliver particles to the prostatic bed to near-stasis per protocol; aim for bilateral treatment when safe." },
        ],
        "If for refractory hematuria of prostatic origin": [
          { strong: "Hemostasis first:", text: " target the bleeding supply; extravasation may be absent. Diffuse prostatic bleeding often needs bilateral embolization; focal arterial injury may need coils or another targeted agent." },
          { strong: "Continue supportive care:", text: " coordinate resuscitation and bladder drainage/clot management with the primary and urology teams." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Pitfalls and safety": [
          { strong: "Nontarget ischemia:", text: " exclude bladder, rectal, and penile supply before embolization; reassess if flow changes." },
          { strong: "Spasm or dissection:", text: " avoid forceful wire advancement or injection; poor flow is not always a true embolization endpoint." },
          { strong: "Missed feeders:", text: " reassess accessory and contralateral supply, but do not pursue unsafe catheterization." },
          { strong: "Post-embolization symptoms:", text: " mild pelvic pain and dysuria are expected; severe pain, fever, or retention needs evaluation for ischemia, infection, or obstruction." },
        ],
        "If for LUTS from BPH": [
          { strong: "Delayed benefit:", text: " symptom improvement takes time; edema can temporarily worsen obstruction. Confirm a voiding/catheter plan." },
        ],
        "If for refractory hematuria of prostatic origin": [
          { strong: "Persistent bleeding:", text: " reassess the source, residual feeders, and coagulopathy; a quiet angiogram does not prove clinical hemostasis." },
        ],
        References: [
          { text: "PAE anatomy, technique, and complications (Radiographics)", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9394104/" },
          { text: "Standardized PAE technique: Delphi consensus", href: "https://pubmed.ncbi.nlm.nih.gov/41173451/" },
          { text: "Embolization for refractory hematuria of prostatic origin", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9349008/" },
        ],
      },
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Routine orders, access recovery, monitoring, discharge instructions, discharge medications, and hematuria-specific orders.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Tylenol 650 mg PRN.",
            "Ibuprofen 800 mg Q6 PRN.",
            "Nursing communication: due to void before discharge.",
          ],
        },
        {
          title: "Femoral access",
          items: ["Bedrest 2 hours with closure device; 6 hours with manual compression."],
        },
        {
          title: "Radial access",
          items: [
            "Remove radial artery compression device within 2 hours post procedure.",
            "Activity per JH-HLM mobility goal.",
          ],
        },
        {
          title: "Monitoring",
          items: [
            "Monitor color of access site.",
            "Vital signs every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours; edit to match bedrest.",
          ],
        },
        {
          title: "Discharge",
          items: [
            "Discharge order with medication reconciliation prior: 2-6 hour.",
            "After visit summary: .IRAVSPROSTATE.",
          ],
        },
        {
          title: "If for refractory hematuria of prostatic origin",
          items: [
            "Regular diet.",
            "Vital signs per routine.",
            "Tylenol 650 mg PRN.",
            "If retention: Foley.",
          ],
        },
        {
          title: "Discharge medications if procedure for LUTS secondary to BPH",
          items: [
            "Continue antibiotic prescribed pre-procedure.",
            "Ibuprofen 200 mg q6 hrs PRN x 7 days (OTC).",
            "Oxybutynin PRN for bladder spasm (OTC).",
            "Omeprazole/esomeprazole 40 mg daily (OTC).",
            "Docusate 250 mg daily x 7 days (OTC).",
            "Phenazopyridine 200 mg TID x 3 days (OTC).",
            "Toradol for pain PRN; not routine.",
          ],
        },
      ],
      details: {
        "Follow up": ["1 month clinic visit."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common prostate artery embolization problems and first checks.",
      details: {
        "To build": [
          "Difficult prostatic artery selection or variant pelvic arterial anatomy.",
          "Nontarget embolization concern.",
          "Urinary retention or severe post-embolization symptoms.",
          "Access-site bleeding.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Active untreated UTI before elective LUTS/BPH procedure.",
          "Inadequate prostate cancer exclusion when clinically indicated.",
          "Unstable hematuria patient requiring resuscitation/escalation.",
          "Severe pelvic pain, ischemic symptoms, urinary retention, access-site bleeding, or hemodynamic instability.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm antibiotic protocol, discharge medication defaults, access recovery timing, and urology workup requirements.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification and anticoagulation hold timing with local policy.",
          "Confirm antibiotic selection and timing with local protocol.",
          "Confirm discharge medication package and which medications require prescriptions.",
          "Confirm left-arm IV restriction rationale and whether it is universal.",
          "Confirm follow-up clinic workflow.",
        ],
      },
    },
  };
}

function installTipsCreationEdits() {
  const procedure = procedures.find(
    (item) => item.title === "Transjugular Intrahepatic Portosystemic Shunt Creation (TIPS)",
  );
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "TIPS creation guidance for refractory variceal bleeding, refractory ascites, hepatic hydrothorax, Budd-Chiari syndrome, and selected portal vein thrombosis patients.";
  procedure.keywords = `${procedure.keywords || ""} tips transjugular intrahepatic portosystemic shunt variceal bleeding ascites hydrothorax budd chiari portal vein thrombosis meld child pugh echocardiogram embolization`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "TIPS Creation",
      type: "reference",
      summary: "Review indication, labs/MELD, high-risk anticoagulation, anesthesia plan, contraindications, and inpatient post-procedure orders.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, imaging, MELD/Child-Pugh class, echo, labs, anticoagulation plan, anesthesia plan, and contraindications.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Refractory variceal bleeding, ascites, hepatic hydrothorax, Budd-Chiari syndrome, or selected portal vein thrombosis.",
      details: {
        Indications: [
          "Refractory variceal bleeding.",
          "Refractory ascites.",
          "Hepatic hydrothorax.",
          "Budd-Chiari syndrome.",
          "Portal vein thrombosis, selected patients.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "Platelets >50k, INR <1.5-1.8, CBC, MELD score <18 unless emergent, and type & screen/crossmatch.",
      details: {
        Labs: [
          "Platelets >50,000/uL.",
          "INR < 1.5-1.8.",
          "CBC.",
          { text: "MELD score <18 unless emergent.", procedureId: "meld-score-reference" },
          "Type & screen/crossmatch.",
        ],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding-risk procedure; use institutional anticoagulation table for hold timing.",
      details: {
        Anticoagulation: [
          "High bleeding-risk procedure.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "General anesthesia preferred; moderate sedation in select patients.",
      details: {
        Sedation: [
          "General anesthesia, preferred.",
          "Moderate sedation in select patients.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging, MELD/Child-Pugh, echo, BUN, possible embolization consent, and absence of major contraindications.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Review imaging: portal/hepatic vein patency, anatomy, and access.",
          { text: "Review MELD score/Child-Pugh class.", procedureId: "meld-score-reference" },
          "Review echocardiogram.",
          "Review BUN.",
          "Consent for possible embolization.",
        ],
        "No contraindications": [
          "Severe hepatic encephalopathy.",
          "Pulmonary hypertension.",
          "Heart failure.",
          "Acute liver failure.",
          "Active infection.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [
        `${id}-intra-v2-anatomy`,
        `${id}-intra-v2-procedural-steps`,
        `${id}-intra-v2-pitfalls-safety`,
      ],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Inpatient admission, regular diet, cirrhosis-adjusted Tylenol maximum, IJ access recovery, monitoring, and AVS.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Admit to inpatient.",
            "Regular diet.",
            "Tylenol 650 mg PRN; 2 g daily max if patient has cirrhosis.",
            "Vital signs every 15 minutes x 4, then every 30 minutes x 2.",
          ],
        },
        {
          title: "IJ access",
          items: [
            "Elevate HOB >45 degrees x 1 hour.",
            "Monitor color of access site.",
          ],
        },
        {
          title: "Femoral access",
          items: [
            "Bedrest for 2 hours with leg flat.",
            "Monitor color of access site.",
          ],
        },
        {
          title: "Discharge",
          items: ["After visit summary: .AVSTIPS."],
        },
      ],
      details: {
        "Follow up": ["Clinic visit in 1 month with TIPS ultrasound."],
      },
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        "TIPS creation": [
          { strong: "Systemic access route:", text: " the right internal jugular vein provides a direct path through the SVC, right atrium, and IVC to the hepatic veins." },
          { strong: "Hepatic veins:", text: " the right hepatic vein is the usual launch point; the middle or left hepatic vein may be used when patency or puncture geometry is better." },
          { strong: "Portal target:", text: " a right portal vein branch is commonly selected to create a short, straight, fully intrahepatic tract with reliable inflow." },
          { strong: "Puncture geometry:", text: " the right portal branch usually lies anterior and caudal to the right hepatic vein, but cirrhosis and anatomic variation can distort this relationship." },
          { strong: "Portal triad:", text: " portal veins travel with hepatic arteries and bile ducts, which are the key structures at risk during needle passes." },
          { strong: "Liver capsule:", text: " keep the needle and tract within hepatic parenchyma; extrahepatic portal access or capsular transgression can cause major hemoperitoneum." },
          { strong: "Shunt endpoints:", text: " with a dedicated partially covered stent, the uncovered portal segment sits in the portal vein, the covered segment begins at the parenchymal entry, and the hepatic end reaches the hepatic vein-IVC junction." },
          { strong: "Portosystemic collaterals:", text: " coronary, short gastric, paraesophageal, and other varices may persist after decompression and sometimes require embolization." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "TIPS creation": [
          { strong: "1. Confirm the route:", text: " review cross-sectional imaging, then choose the hepatic vein, portal target, and backup strategy." },
          { strong: "2. Obtain venous access:", text: " use right IJ access in most cases; obtain a second venous access if needed for IVUS." },
          { strong: "3. Record systemic pressures:", text: " document right atrial and free hepatic vein or IVC pressures before creating the shunt." },
          { strong: "4. Select the hepatic vein:", text: " advance the TIPS set into the chosen vein and perform venography to confirm position and patency." },
          { strong: "5. Align the puncture:", text: " orient the needle toward the planned portal branch using fluoroscopy plus US, IVUS, CO2, or another available targeting method." },
          { strong: "6. Access the portal vein:", text: " use controlled needle passes and confirm true portal position before advancing the wire or dilating the tract." },
          { strong: "7. Secure portal access:", text: " advance a catheter and stable wire into the main portal vein, SMV, or splenic vein, then perform portography." },
          { strong: "8. Measure the baseline gradient:", text: " record portal pressure and calculate the portosystemic gradient against the free hepatic vein or IVC pressure." },
          { strong: "9. Size the tract:", text: " measure the hepatic-to-portal course and mark portal and hepatic landing zones before stent deployment." },
          { strong: "10. Create the shunt:", text: " dilate as needed and deploy a controlled-expansion covered stent across the intrahepatic tract." },
          { strong: "11. Optimize flow:", text: " balloon incrementally and remeasure after each expansion. For variceal bleeding, a common goal is a post-TIPS gradient <12 mmHg or at least a 20% reduction; ascites treatment often targets about 8 mmHg, but the ideal endpoint is patient-specific." },
          { strong: "12. Complete the study:", text: " assess shunt inflow and outflow, embolize persistent high-risk varices when indicated, and exclude extravasation before removing access." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Portal puncture": [
          { strong: "Repeated or uncertain passes:", text: " re-check the trajectory and add US or IVUS guidance; confirm portal position before dilation." },
          { strong: "Capsular injury:", text: " hypotension, abdominal distention, or extravasation suggests hemoperitoneum; stop and evaluate." },
          { strong: "Arterial or biliary injury:", text: " watch for arterial extravasation, hemobilia, biliary-shunt fistula, or unexpected sepsis." },
        ],
        "Stent position": [
          { strong: "Portal end:", text: " covered stent in the main portal vein can block branch inflow; uncovered stent left in the tract promotes stenosis or thrombosis." },
          { strong: "Hepatic end too short:", text: " stopping before the hepatic vein-IVC junction invites outflow stenosis and shunt occlusion." },
          { strong: "Hepatic end too long or misplaced:", text: " avoid covering nearby hepatic-vein drainage or extending unnecessarily into the IVC or right atrium." },
        ],
        "Hemodynamics and completion": [
          { strong: "Over-shunting:", text: " <5 mmHg is a warning threshold. A 5-8 mmHg gradient may be intentional, but reassess encephalopathy, liver, and cardiac risk before further expansion." },
          { strong: "Under-shunting or poor flow:", text: " persistent pressure or varices may reflect underexpansion, kink, thrombosis, poor inflow or outflow, or a collateral needing selective embolization." },
        ],
        References: [
          { text: "North American Practice-Based Recommendations for TIPS in Portal Hypertension", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8760361/" },
          { text: "CIRSE Standards of Practice on TIPS", href: "https://pubmed.ncbi.nlm.nih.gov/39550753/" },
          { text: "AASLD Practice Guidance on TIPS", href: "https://www.aasld.org/practice-guidelines/transjugular-intrahepatic-portosystemic-shunt-tips" },
          { text: "Comprehensive Review of TIPS-Related Complications", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159729/" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm MELD thresholds, contraindication criteria, anesthesia defaults, and post-TIPS inpatient order set.",
      details: {
        "Review checklist": [
          "Confirm MELD and Child-Pugh thresholds with local policy.",
          "Confirm echo and pulmonary hypertension screening workflow.",
          "Confirm high bleeding risk anticoagulation guidance.",
          "Confirm post-procedure inpatient admission and AVS wording.",
        ],
      },
    },
  };
}

function installTipsRevisionEdits() {
  const procedure = procedures.find(
    (item) => item.title === "Transjugular Intrahepatic Portosystemic Shunt Check/Revision (TIPS)",
  );
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "TIPS check/revision guidance for stenosis or occlusion, recurrent variceal bleeding or ascites, elevated portosystemic gradient, shunt dysfunction on Doppler ultrasound, and over-correction.";
  procedure.keywords = `${procedure.keywords || ""} tips revision check stenosis occlusion recurrent variceal bleeding ascites portosystemic gradient shunt dysfunction doppler ultrasound over correction narrowing upsizing`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "TIPS Revision",
      type: "reference",
      summary: "Review indication, Doppler/prior TIPS imaging, stent details, high-risk anticoagulation, sedation plan, and access recovery orders.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, Doppler and prior TIPS imaging, stent type/size, labs, anticoagulation, sedation, contraindications, and whether upsizing or narrowing is planned.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "TIPS stenosis/occlusion, recurrent bleeding or ascites, elevated gradient, Doppler shunt dysfunction, or over-correction.",
      details: {
        Indications: [
          "TIPS stenosis/occlusion.",
          "Recurrent variceal bleeding.",
          "Recurrent ascites.",
          "Elevated portosystemic gradient.",
          "Shunt dysfunction on Doppler US.",
          "Over-correction now causing heart failure, hepatic encephalopathy, or hepatic failure.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "Platelets >50k, INR <1.5-1.8, CBC, CMP, and type & screen.",
      details: {
        Labs: [
          "Platelets >50,000/uL.",
          "INR < 1.5-1.8.",
          "CBC.",
          "CMP: bilirubin and creatinine.",
          "Type & screen.",
        ],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding-risk procedure; use institutional anticoagulation table for hold timing.",
      details: {
        Anticoagulation: [
          "High bleeding-risk procedure.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: hold 5 days and confirm INR <= 1.8.",
          "IV unfractionated heparin: hold 4-6 hours and check aPTT or anti-Xa.",
          "Enoxaparin: hold 1 dose if prophylactic; hold 2 doses or 24 hours if therapeutic.",
          "DOACs: use agent- and CrCl-specific timing in the anticoagulation table.",
          "Clopidogrel: hold 5 days.",
          "Aspirin: hold 3-5 days.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "General anesthesia preferred; moderate sedation in select patients.",
      details: {
        Sedation: [
          "General anesthesia, preferred.",
          "Moderate sedation in select patients.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, Doppler/prior TIPS imaging, stent details, labs, contraindications, infection status, and whether upsizing or narrowing changes the plan.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Review imaging: Doppler and prior TIPS.",
          "Review what size/type stent was used.",
          "Labs are appropriate.",
          "Consider changes depending on if upsizing or narrowing.",
        ],
        Contraindications: [
          "Contraindications depend on revision goal.",
          "Right heart failure.",
          "Active infection.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [
        `${id}-intra-v2-anatomy`,
        `${id}-intra-v2-procedural-steps`,
        `${id}-intra-v2-pitfalls-safety`,
      ],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Regular diet, timed vitals, Tylenol, IJ and femoral access recovery, 1-hour discharge, AVS, and TIPS ultrasound/clinic follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs every 15 minutes x 4.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "IJ access",
          items: ["Elevate HOB >45 degrees x 1 hour."],
        },
        {
          title: "Femoral access",
          items: ["Bedrest with leg flat for 2 hours."],
        },
        {
          title: "Discharge",
          items: [
            "Discharge order: 1 hour.",
            "After visit summary: .IRAVSTIPS.",
          ],
        },
      ],
      details: {
        "Follow up": ["Clinic visit with TIPS ultrasound per MD."],
      },
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        "Failure map": [
          { strong: "Portal inflow:", text: " assess portal-vein patency, the uncovered portal end, and inflow into the shunt." },
          { strong: "Shunt body:", text: " look for underexpansion, kink, focal stenosis, thrombus, or incomplete tract coverage." },
          { strong: "Hepatic outflow:", text: " the hepatic vein-IVC junction is a common site of edge stenosis and intimal hyperplasia." },
          { strong: "Pressure circuit:", text: " calculate the gradient from main portal pressure to a consistent systemic reference at the free hepatic vein or IVC." },
          { strong: "Collateral pathways:", text: " persistent varices can maintain bleeding risk; large spontaneous shunts can worsen encephalopathy." },
          { strong: "Rescue routes:", text: " chronic occlusion or severe angulation may require transhepatic or transsplenic access for through-and-through control." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Diagnostic pass": [
          { strong: "1. Define the problem:", text: " review symptoms, Doppler and prior imaging, stent type and diameter, and earlier gradients." },
          { strong: "2. Access and cross the shunt:", text: " select the hepatic end from the IJ and secure a wire in the portal system." },
          { strong: "3. Map the shunt:", text: " perform venography from portal inflow through the stent and hepatic outflow; identify focal lesions and collaterals." },
          { strong: "4. Measure the gradient:", text: " record portal and free hepatic vein or IVC pressures before treatment using one systemic reference." },
        ],
        "Match treatment to failure": [
          { strong: "Stenosis:", text: " angioplasty a focal lesion; reline or extend recurrent, resistant, intrastent, or edge disease." },
          { strong: "Occlusion:", text: " clear thrombus, then fix the stenosis, kink, or uncovered segment that caused it." },
          { strong: "Under-shunting:", text: " expand incrementally, improve inflow or outflow, and selectively embolize persistent high-risk varices when indicated." },
          { strong: "Over-shunting:", text: " after medical optimization, use a controlled hourglass, parallel, or tapered reduction rather than routine complete occlusion." },
        ],
        Completion: [
          { strong: "5. Recheck the endpoint:", text: " repeat portography and pressures; document final flow, gradient, branch preservation, and no extravasation." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Revision-specific pitfalls": [
          { strong: "Treating Doppler alone:", text: " abnormal velocity raises suspicion but is not the final diagnosis; correlate with symptoms, venography, and direct pressure measurements." },
          { strong: "Inconsistent pressure reference:", text: " switching between right atrial, free hepatic, and IVC pressure can create a false gradient change; use the same reference before and after revision." },
          { strong: "False passage or lost access:", text: " confirm the wire is intraluminal and maintain stable portal purchase before ballooning, thrombectomy, or relining." },
          { strong: "Clearing thrombus without fixing the cause:", text: " untreated edge stenosis, kink, underexpansion, or poor inflow and outflow invites rapid rethrombosis." },
          { strong: "Unsafe stent extension:", text: " avoid covering major portal branches or adjacent hepatic-vein drainage and avoid unnecessary extension into the IVC or right atrium." },
          { strong: "Embolization during thrombectomy:", text: " liberated thrombus can pass directly to the pulmonary circulation; monitor hemodynamics and use an appropriate clot-management strategy." },
          { strong: "Reduction imbalance:", text: " too much narrowing restores bleeding or ascites; too little may not improve encephalopathy or cardiac overload. Recheck flow and gradient after each adjustment." },
          { strong: "Alternative-access injury:", text: " transhepatic or transsplenic rescue adds capsular bleeding risk; plan tract closure and confirm hemostasis." },
        ],
        References: [
          { text: "North American Practice-Based Recommendations for TIPS in Portal Hypertension", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8760361/" },
          { text: "Australian Best Practice Recommendations for TIPS", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13121398/" },
          { text: "TIPS Dysfunction: Doppler, Clinical Findings, and Shunt Venography", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4977976/" },
          { text: "TIPS Reduction Techniques", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159697/" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm revision/narrowing workflow, contraindications, follow-up ultrasound timing, and post-procedure discharge timing.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk anticoagulation guidance.",
          "Confirm discharge timing for TIPS check/revision.",
          "Confirm TIPS ultrasound and clinic follow-up workflow.",
          "Confirm AVS wording.",
        ],
      },
    },
  };
}

function installThyroidBiopsyEdits() {
  const procedure = procedures.find((item) => item.title === "Thyroid Biopsy");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "Low";
  procedure.summary =
    "Thyroid biopsy guidance for nodules meeting TI-RADS/ATA criteria, suspicious cervical lymph nodes, PET-avid thyroid nodules, and re-biopsy after nondiagnostic or concerning cytology.";
  procedure.keywords = `${procedure.keywords || ""} thyroid biopsy fna core biopsy tirads ata pet avid cervical lymph node cytology pathology superficial biopsy`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Thyroid Biopsy",
      type: "reference",
      summary: "Review indication, labs, low-risk anticoagulation, local anesthesia plan, cytology/pathology needs, and immediate discharge orders.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm indication, imaging target, labs, anticoagulation, cytology/pathology plan, biopsy type, and positioning.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Nodule meeting TI-RADS/ATA criteria, suspicious cervical lymph node, PET-avid nodule, or re-biopsy after nondiagnostic/concerning cytology.",
      details: {
        Indications: [
          "Nodule meeting TI-RADS/ATA criteria.",
          "Suspicious cervical lymph node.",
          "PET-avid thyroid nodule.",
          "Re-biopsy after nondiagnostic or concerning cytology.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "INR < 2-3 and platelets >20k.",
      details: {
        Labs: ["Platelets >20,000/uL.", "INR < 2-3."],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "Low bleeding-risk procedure; no routine anticoagulation holding requirement.",
      details: {
        Anticoagulation: [
          "Low bleeding-risk procedure.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: [
          "Warfarin: no holding requirement.",
          "Heparin: no holding requirement.",
          "Lovenox: no holding requirement.",
          "DOACs: no holding requirement.",
          "Plavix: no holding requirement.",
          "Aspirin: no holding requirement.",
        ],
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Local anesthesia; no sedation typically required.",
      details: {
        Sedation: ["Local anesthesia.", "No sedation typically required."],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging target, labs, cytology/pathology, FNA versus core biopsy, and positioning.",
      details: {
        Checklist: [
          "Confirm indication.",
          "Review imaging and target.",
          "Labs are appropriate.",
          "Confirm cytology/pathology.",
          "Confirm FNA vs core biopsy.",
          "Confirm positioning.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "To be built as the thyroid biopsy technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Regular diet, routine vitals, Tylenol, immediate discharge, and superficial biopsy AVS.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs per unit routine.",
            "Tylenol 650 mg PRN.",
          ],
        },
        {
          title: "Discharge",
          items: [
            "Discharge order: immediate.",
            "After visit summary: .IRAVSBIOPSYSUPERFICIAL.",
          ],
        },
      ],
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common thyroid biopsy problems and first checks.",
      details: {
        "To build": [
          "Target difficult to visualize.",
          "Need to switch FNA/core approach.",
          "Specimen adequacy concern.",
          "Small hematoma or local bleeding.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Expanding neck hematoma.",
          "Airway symptoms, voice change, dyspnea, or dysphagia.",
          "Uncontrolled bleeding.",
          "Vasovagal episode or hemodynamic instability.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm TI-RADS/ATA threshold language, cytology workflow, and superficial biopsy AVS wording.",
      details: {
        "Review checklist": [
          "Confirm indication criteria with local thyroid biopsy workflow.",
          "Confirm FNA versus core biopsy defaults.",
          "Confirm pathology/cytology collection process.",
          "Confirm AVS wording.",
        ],
      },
    },
  };
}

function installNerveBlockPlaceholder() {
  procedures.push({
    id: "nerve-block",
    title: "Nerve Block",
    category: "Pain control",
    keywords: "nerve block hypogastric nerve block superior hypogastric block pain control pelvic pain ufe",
    summary: "Future edit placeholder for nerve block planning, technique, medications, monitoring, and follow-up.",
    lastReviewed: "Future edit placeholder, July 2026",
    root: "nerve-block-root",
    nodes: {
      "nerve-block-root": {
        title: "Nerve Block",
        type: "reference",
        summary: "Future procedure-specific content placeholder.",
        children: ["nerve-block-pre", "nerve-block-intra", "nerve-block-post", "nerve-block-review"],
      },
      "nerve-block-pre": {
        title: "Pre-procedure",
        type: "action",
        summary: "Future edit: add indication, anticoagulation, medication, sedation, and consent planning.",
      },
      "nerve-block-intra": {
        title: "Intraprocedure",
        type: "reference",
        summary: "Future edit: add approach, medications, imaging guidance, and troubleshooting.",
      },
      "nerve-block-post": {
        title: "Post-procedure",
        type: "action",
        summary: "Future edit: add monitoring, expected effect, complications, and follow-up.",
      },
      "nerve-block-review": {
        title: "Needs review",
        type: "caution",
        summary: "Build and review this procedure-specific pathway before clinical use.",
      },
    },
  });
}

function installUterineArteryEmbolizationPlaceholder() {
  procedures.push({
    id: "uterine-artery-embolization",
    title: "Uterine Artery Embolization",
    category: "Embolization",
    keywords: "uterine artery embolization UAE uterine bleeding postpartum hemorrhage pelvic bleeding gynecologic embolization",
    summary: "Future edit placeholder for uterine artery embolization indications, pre-procedure planning, post-procedure orders, and follow-up.",
    lastReviewed: "Future edit placeholder, July 2026",
    root: "uterine-artery-embolization-root",
    nodes: {
      "uterine-artery-embolization-root": {
        title: "Uterine Artery Embolization",
        type: "reference",
        summary: "Future procedure-specific content placeholder.",
        children: [
          "uterine-artery-embolization-pre",
          "uterine-artery-embolization-intra",
          "uterine-artery-embolization-post",
          "uterine-artery-embolization-review",
        ],
      },
      "uterine-artery-embolization-pre": {
        title: "Pre-procedure",
        type: "action",
        summary: "Future edit: add indications, labs, anticoagulation, imaging, pregnancy/gynecology context, and sedation planning.",
        details: {
          "Needs procedure-specific edit": [
            "Add indication-specific pathways before clinical use.",
          ],
        },
      },
      "uterine-artery-embolization-intra": {
        title: "Intraprocedure",
        type: "reference",
        summary: "Future edit: add approach, embolic selection, endpoints, and troubleshooting.",
      },
      "uterine-artery-embolization-post": {
        title: "Post-procedure",
        type: "action",
        summary: "Future edit: add post-procedure orders, pain/nausea plan, discharge criteria, AVS, and follow-up.",
      },
      "uterine-artery-embolization-review": {
        title: "Needs review",
        type: "caution",
        summary: "Build and review this procedure-specific pathway before clinical use.",
        details: {
          "Review checklist": [
            "Add indication-specific pre-procedure guidance.",
            "Add post-procedure medication and monitoring orders.",
            "Confirm anticoagulation and lab thresholds with local policy.",
            "Confirm gynecology/OB coordination and follow-up workflow.",
          ],
        },
      },
    },
  });
}

function installUfeEdits() {
  const procedure = procedures.find((item) => item.title === "Uterine Fibroid Embolization (UFE)");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Uterine fibroid embolization guidance for fibroid-related bleeding, anemia, bulk symptoms, pelvic pain, refractory symptoms, fertility-preservation goals, or non-surgical candidates.";
  procedure.keywords = `${procedure.keywords || ""} uterine fibroid embolization ufe fibroids menorrhagia heavy menstrual bleeding anemia bulk symptoms dysmenorrhea dyspareunia hypogastric nerve block pca`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Uterine Fibroid Embolization (UFE)",
      type: "reference",
      summary: "Review indication, labs, high-risk anticoagulation holds, sedation/nerve block plan, pre-medication orders, arrival orders, post-op orders, discharge/admission pathway, and follow-up.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm fibroid-related symptoms, prior interventions, imaging, pregnancy exclusion, labs, high-risk anticoagulation holds, sedation/nerve block plan, and pre-procedure meds.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
        `${id}-pre-meds-v2`,
        `${id}-arrival-orders-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Symptomatic uterine fibroids with bleeding, anemia, bulk symptoms, pain, refractory symptoms, fertility-preservation goals, or non-surgical candidacy.",
      details: {
        Indications: [
          "Heavy menstrual bleeding causing anemia or impaired quality of life.",
          "Bulk symptoms: pressure, fullness, urinary frequency, constipation, hydronephrosis.",
          "Dysmenorrhea, pelvic pain, dyspareunia.",
          "Above symptoms refractory to conservative therapy.",
          "Above symptoms and desire to preserve fertility or non-surgical candidate.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "Needed within 30 days: CBC, creatinine/GFR, INR <1.5-1.8, and platelets >50k.",
      details: {
        "Labs within 30 days": [
          "CBC.",
          "Creatinine/GFR.",
          "INR < 1.5-1.8.",
          "Platelets >50k.",
        ],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: highRiskAnticoagHoldItems,
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Usually moderate sedation with hypogastric nerve block; rarely general anesthesia.",
      details: {
        Sedation: [
          "Usually moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          { text: "Hypogastric nerve block", procedureId: "nerve-block" },
          "Rarely done general.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging, pregnancy exclusion, labs, infection/malignancy screen, goals, sedation plan, and embolic agent.",
      details: {
        Checklist: [
          "Confirm indication and review prior interventions.",
          "Review imaging on number, size, location of fibroids.",
          "EXCLUDE pregnancy.",
          "Labs are appropriate.",
          "No active infection or malignancy.",
          "Ensure patient goals align with procedure.",
          "Confirm sedation plan, patient can lie flat.",
          "Embolic agent.",
        ],
      },
    },
    [`${id}-pre-meds-v2`]: {
      title: "Pre-procedure meds",
      type: "action",
      summary: "Start 1 day prior to procedure; to be ordered in clinic.",
      checklist: [
        "Naproxen 500 mg BID (Disp 16).",
        "Omeprazole 20 mg PO daily (Disp 8).",
        "Hydroxyzine 25 mg PO nightly (Disp 8).",
        "Colace 100 mg PO BID (Disp 16).",
        "Tylenol 1000 mg PO Q6H begin at night (Disp 58).",
        "Zofran 4 mg PO Q6H PRN for nausea post (Disp 8).",
      ],
    },
    [`${id}-arrival-orders-v2`]: {
      title: "Arrival orders",
      type: "action",
      summary: "Orders when patient arrives.",
      checklistSections: [
        {
          title: "When patient arrives",
          items: [
            "SDC/Outpatient with Discharge vs Bedded Outpatient.",
            "NPO (moderate sedation).",
            "Pulse checks.",
            "Vital signs - Per unit routine.",
            "Peripheral Line Placement - No IV in LEFT arm.",
            "Glucose Point of Care.",
            "Cefazolin (Ancef) 2g if <120kg, 3g if >120 kg.",
            "Dexamethasone 8 mg IV (HOLD FOR Dr. KIM).",
            "Toradol 30 mg once IM.",
            "Ondansetron (Zofran) 4 mg once IV.",
            "Oxycodone 10 mg once PO.",
            "Hx severe nausea: Scopolamine patch 1.5 mg apply to skin behind ear prior to procedure and leave in place x 72 hours; may cause anticholinergic side effects including dry mouth; may remove patch if these occur.",
          ],
        },
        {
          title: "If patient did not take home meds or if pre-surgical",
          items: [
            "Pantoprazole 40 mg PO once.",
            "Colace 100 mg PO once.",
            "Acetaminophen 1000 mg PO once.",
          ],
        },
        {
          title: "If pre-surgical",
          items: [
            "Place Foley.",
            "No NSAIDs or dexamethasone.",
            "Page GYN at #3030 when patient is in pre-op for consent.",
          ],
        },
      ],
    },
    [`${id}-presurgical-v2`]: {
      title: "If pre-surgical",
      type: "caution",
      summary: "Pre-surgical UFE has a separate order branch.",
      checklist: [
        "Place Foley.",
        "No NSAIDs or dexamethasone.",
        "Page GYN at #3030 when patient is in pre-op for consent.",
      ],
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "",
      children: [
        `${id}-intra-v2-anatomy`,
        `${id}-intra-v2-procedural-steps`,
        `${id}-intra-v2-pitfalls-safety`,
      ],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Routine orders, access recovery, pain/nausea plan, discharge prescriptions, admission PCA pathway, and follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Vital signs every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours; edit to match bedrest.",
            "Toradol 30 mg IM (6 hours post 1st dose).",
            "Tylenol 1000 mg PO (6 hours post 1st dose).",
            "Oxycodone 5 mg tab x 1 PO q4 PRN pain.",
            "Dilaudid 0.5-1 mg IV Q2 hrs PRN pain not responding to oral.",
            "Antiemetic order set (ondansetron, metoclopramide, and promethazine).",
          ],
        },
        {
          title: "Anticoagulation to resume",
          items: highRiskAnticoagRestartItems,
        },
        {
          title: "Femoral access",
          items: ["Bedrest, 2-6 hours with LE extended."],
        },
        {
          title: "Radial access",
          items: [
            "Activity per JH-HLM mobility goal.",
            "Remove radial artery compression device.",
            "Monitor color of access site.",
          ],
        },
        {
          title: "If being discharged",
          items: [
            "Oxycodone 5 mg PO Q6 hours x 2 days scheduled then Q6 hrs PRN (Disp 24).",
            "Optional: promethazine 25 mg Q4 hours PRN if nausea not responding to Zofran.",
            "Discharge order 2-6 hours prior.",
            "After visit summary: .IRAVSUFE.",
          ],
        },
        {
          title: "If patient admitted - PCA adult order",
          items: [
            "Hydromorphone - one hour dose limit: 1.2 mg.",
            "Loading dose: 0 mg.",
            "PCA dose: 0.2 mg.",
            "Lockout interval: 10 min.",
            "Continuous infusion rate: 0 mg/hr.",
          ],
        },
      ],
      details: {
        "Follow up": ["Clinic visit in 1 month."],
      },
    },
    [`${id}-intra-v2-anatomy`]: {
      title: "Anatomy",
      type: "reference",
      summary: "",
      details: {
        "Uterine fibroid embolization": [
          { strong: "Pelvic arterial route:", text: " the uterine artery usually arises from the anterior division of the internal iliac artery, but its origin and branching pattern are highly variable." },
          { strong: "Uterine artery branches:", text: " the descending segment supplies the cervix and vagina; transverse and ascending branches supply the uterine body and fibroids." },
          { strong: "Fibroid supply:", text: " hypertrophied bilateral uterine arteries form tortuous perifibroid vessels and a characteristic fibroid blush." },
          { strong: "Uterine-ovarian connection:", text: " ovarian arteries arise near the renal arteries and commonly anastomose with uterine branches, creating both collateral supply and a route for nontarget embolization." },
          { strong: "Structures to protect:", text: " identify cervicovaginal and ovarian supply plus less common bladder, rectal, muscular, external-iliac, or mesenteric collaterals." },
        ],
      },
    },
    [`${id}-intra-v2-procedural-steps`]: {
      title: "Procedural steps",
      type: "action",
      summary: "",
      details: {
        "Uterine fibroid embolization": [
          { strong: "1. Confirm the plan:", text: " review MRI or pelvic imaging for fibroid burden, vascularity, necrosis, adenomyosis, and possible ovarian supply." },
          { strong: "2. Obtain access and map the pelvis:", text: " use radial or femoral access, then define the internal iliac, anterior division, uterine origin, and variant branches." },
          { strong: "3. Select the first uterine artery:", text: " advance a microcatheter into the transverse segment beyond cervicovaginal supply when feasible." },
          { strong: "4. Confirm the target:", text: " verify fibroid blush, catheter stability, uterine-ovarian anastomoses, and absence of concerning AV shunting." },
          { strong: "5. Embolize to near-stasis:", text: " inject slowly under fluoroscopy; 500-700 micrometer microspheres are common. Aim for a pruned-tree appearance and contrast persisting about five heartbeats, then pause 2-5 minutes and recheck." },
          { strong: "6. Treat the other side:", text: " embolize the contralateral uterine artery to a matched endpoint." },
          { strong: "7. Complete the study:", text: " confirm bilateral reduction of fibroid blush and selectively evaluate ovarian or other collateral supply if treatment appears incomplete." },
        ],
      },
    },
    [`${id}-intra-v2-pitfalls-safety`]: {
      title: "Pitfalls and safety",
      type: "caution",
      summary: "",
      details: {
        "Uterine fibroid embolization": [
          { strong: "Unilateral or incomplete treatment:", text: " untreated contralateral uterine or ovarian supply is a common reason for persistent symptoms or recurrence." },
          { strong: "Vasospasm:", text: " can mimic stasis and produce undertreatment; pause, reduce manipulation, and treat spasm before accepting the endpoint." },
          { strong: "Reflux and nontarget embolization:", text: " inject slowly and stop with reflux, loss of antegrade flow, or catheter instability." },
          { strong: "Uterine-ovarian anastomosis:", text: " particles reaching the ovarian bed can impair ovarian function; define flow direction and adjust position, particle strategy, or treatment plan." },
          { strong: "AV shunting:", text: " rapid venous filling raises systemic particle-embolization risk; stop and reassess the embolic strategy." },
          { strong: "Overembolization:", text: " do not chase complete uterine arterial occlusion; excessive ischemia increases uterine necrosis, infection, and sepsis risk." },
        ],
        References: [
          { text: "Japanese Society of Interventional Radiology UAE Guidelines", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12460036/" },
          { text: "Australia and New Zealand Quality Care Guidelines for UAE", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9545349/" },
          { text: "Uterine Artery Embolization Technique and Safety Review", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3036449/" },
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm medication protocol, admitting attendings, access recovery, discharge meds, PCA pathway, and follow-up workflow.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification and hold times with local policy.",
          "Confirm UFE pre-medication dispense quantities.",
          "Confirm Dr. Kim dexamethasone hold language.",
          "Confirm pre-surgical pathway and GYN #3030 workflow.",
          "Confirm discharge timing wording and outpatient prescriptions.",
          "Confirm PCA settings and admission criteria.",
        ],
      },
    },
  };
}

function installY90MappingEdits() {
  const procedure = procedures.find((item) => item.title === "Y90 Radioembolization Mapping");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Y90 mapping guidance for treatment planning before radioembolization, including hepatic arterial anatomy, lung shunt evaluation, non-target embolization risk, and dosimetry data.";
  procedure.keywords = `${procedure.keywords || ""} y90 mapping radioembolization hepatic arterial anatomy lung shunt non-target embolization dosimetry spect ct nuclear medicine cone beam ct`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Y90 Radioembolization Mapping",
      type: "reference",
      summary: "Review indication, labs, high-risk anticoagulation holds, sedation plan, mapping checklist, post-orders, SPECT/CT, and Y90 therapy follow-up.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm Y90 candidacy, hepatic arterial imaging, nuclear medicine coordination, labs, high-risk anticoagulation holds, and moderate sedation readiness.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Required planning before Y90 radioembolization.",
      details: {
        Indications: [
          "Required planning before Y90 embolization.",
          "Define hepatic arterial anatomy.",
          "Evaluate for shunts to the lungs.",
          "Evaluate non-target embolization.",
          "Obtain data for Y90 dosimetry.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "CBC, INR, CMP, and AFP on day of arrival; platelets >50k and INR <1.5-1.8.",
      details: {
        Labs: [
          "CBC on day of arrival.",
          "INR on day of arrival.",
          "CMP on day of arrival.",
          "AFP on day of arrival.",
          "Platelets >50k.",
          "INR < 1.5-1.8.",
        ],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: highRiskAnticoagHoldItems,
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, candidacy, imaging, labs, nuclear medicine coordination, and cone-beam CT availability.",
      details: {
        Checklist: [
          "Confirm indication and candidacy.",
          "Review imaging for hepatic arterial anatomy.",
          "Labs are appropriate.",
          "Coordination with nuclear medicine.",
          "Cone-beam CT available.",
        ],
      },
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "Future Y90 mapping technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Routine orders, access recovery, anticoagulation restart, discharge, SPECT/CT, and Y90 therapy follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Tylenol 650 mg PRN.",
            "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours; edit to match bedrest.",
          ],
        },
        {
          title: "Femoral access",
          items: ["Bedrest for 2 hours with leg flat."],
        },
        {
          title: "Radial access",
          items: [
            "Activity per JH-HLM mobility goal.",
            "Remove radial artery compression device.",
          ],
        },
        {
          title: "Anticoagulation to resume",
          items: highRiskAnticoagRestartItems,
        },
        {
          title: "Discharge / next step",
          items: [
            "Discharge order with medication reconciliation prior - 2-6 hours.",
            "After visit summary: .IRAVSY90MAPPING.",
            "Patient to be sent to SPECT/CT.",
          ],
        },
      ],
      details: {
        "Follow up": [
          { text: "Y90 Radioembolization Therapy", procedureId: "y90-radioembolization-therapy" },
        ],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "Future edit: add Y90 mapping-specific troubleshooting.",
      details: {
        "To build": [
          "Variant hepatic arterial anatomy.",
          "Extrahepatic/non-target branches.",
          "Unexpected lung shunt concern.",
          "Unable to complete cone-beam CT or nuclear medicine coordination.",
          "Access-site bleeding.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "Findings that should pause mapping or prompt escalation.",
      details: {
        "Escalate if": [
          "Y90 candidacy is uncertain.",
          "Uncorrected high-risk anticoagulation issue.",
          "Non-target embolization risk cannot be addressed.",
          "Nuclear medicine or SPECT/CT pathway is not available.",
          "Access-site bleeding or hemodynamic instability.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm mapping workflow, lab timing, cone-beam CT availability, nuclear medicine handoff, SPECT/CT transport, and therapy scheduling.",
      details: {
        "Review checklist": [
          "Confirm high bleeding risk classification and hold times with local policy.",
          "Confirm whether AFP is required for all patients or HCC-specific workflow.",
          "Confirm nuclear medicine coordination and SPECT/CT handoff.",
          "Confirm radial/femoral recovery wording.",
          "Confirm Y90 therapy scheduling workflow.",
        ],
      },
    },
  };
}

function installY90TherapyEdits() {
  const procedure = procedures.find((item) => item.title === "Y90 Radioembolization Therapy");
  if (!procedure) return;

  const id = procedure.id;
  procedure.bleedRisk = "High";
  procedure.summary =
    "Y90 radioembolization therapy guidance for hepatic malignancy treatment, radiation lobectomy, bridge therapy, and palliative disease control.";
  procedure.keywords = `${procedure.keywords || ""} y90 therapy radioembolization hcc metastatic liver disease radiation lobectomy hypertrophy transplant resection palliative lung shunt sir-spheres therasphere`;
  procedure.root = `${id}-root-v2`;
  procedure.nodes = {
    [`${id}-root-v2`]: {
      title: "Y90 Radioembolization Therapy",
      type: "reference",
      summary: "Review indication, mapping anatomy, high-risk anticoagulation holds, labs, sedation plan, lung shunt thresholds, post-orders, and follow-up imaging/labs.",
      children: [`${id}-pre-v2`, `${id}-intra-v2`, `${id}-post-v2`, `${id}-review-v2`],
    },
    [`${id}-pre-v2`]: {
      title: "Pre-procedure",
      type: "action",
      summary: "Confirm treatment indication, mapping anatomy, labs, nuclear medicine scheduling, cone-beam CT availability, lung shunt limits, and moderate sedation readiness.",
      children: [
        `${id}-indication-v2`,
        `${id}-labs-v2`,
        `${id}-anticoag-v2`,
        `${id}-sedation-v2`,
        `${id}-checklist-v2`,
      ],
    },
    [`${id}-indication-v2`]: {
      title: "Indication",
      type: "decision",
      summary: "Hepatic malignancy treatment, bridge therapy, radiation lobectomy, or palliation.",
      details: {
        Indications: [
          "Unresectable or recurrent HCC.",
          "Metastatic disease to the liver.",
          "Radiation lobectomy to treat tumor and induce contralateral hypertrophy.",
          "Bridge to transplant/resection.",
          "Palliative disease control.",
        ],
      },
    },
    [`${id}-labs-v2`]: {
      title: "Labs",
      type: "decision",
      summary: "CBC, INR, CMP, AFP; platelets >50k and INR <1.5-1.8.",
      details: {
        Labs: [
          "CBC.",
          "INR.",
          "CMP.",
          "AFP.",
          "Platelets >50k.",
          "INR < 1.5-1.8.",
        ],
      },
    },
    [`${id}-anticoag-v2`]: {
      title: "Anticoagulation",
      type: "caution",
      summary: "High bleeding risk; hold anticoagulants/antiplatelets per policy.",
      details: {
        Anticoagulation: [
          "High bleeding risk.",
          { text: "Open anticoagulation table", href: "#anticoagulation-table" },
        ],
        Hold: highRiskAnticoagHoldItems,
      },
    },
    [`${id}-sedation-v2`]: {
      title: "Sedation",
      type: "reference",
      summary: "Moderate sedation.",
      details: {
        Sedation: [
          "Moderate sedation.",
          { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, mapping anatomy, labs, cone-beam CT, nuclear medicine scheduling, and lung shunt thresholds.",
      checklistSections: [
        {
          title: "Core checklist",
          items: [
            "Confirm indication.",
            "Review anatomy from Y90 mapping study.",
            "Labs are appropriate.",
            "CT cone beam available.",
            "Nuclear medicine aware and scheduled.",
          ],
        },
        {
          title: "Lung shunt fraction from Tc-99m mapping scan",
          items: [
            "< 10% - acceptable.",
            "10-20% - elevated; calculate predicted lung dose and potentially reduce Y90 activity.",
            "> 20% - contraindication for SIR-Sphere resin microspheres.",
          ],
        },
        {
          title: "TheraSphere glass microspheres",
          items: [
            "No percentage cutoff for TheraSphere glass microspheres; lung dose is the metric.",
            "< 30 Gy per treatment.",
            "< 50 Gy cumulative.",
          ],
        },
      ],
    },
    [`${id}-intra-v2`]: {
      title: "Intraprocedure",
      type: "reference",
      summary: "Future Y90 therapy technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
    },
    [`${id}-post-v2`]: {
      title: "Post-procedure",
      type: "action",
      summary: "Routine orders, access recovery, anticoagulation restart, discharge, AVS, and one-month follow-up.",
      checklistSections: [
        {
          title: "Routine orders",
          items: [
            "Regular diet.",
            "Tylenol 650 mg PRN.",
            "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours; edit to match bedrest.",
          ],
        },
        {
          title: "Femoral access",
          items: [
            "Bedrest for 2 hours with leg flat.",
            "Monitor color of access site.",
          ],
        },
        {
          title: "Radial access",
          items: [
            "Activity per JH-HLM mobility goal.",
            "Monitor color of access site.",
            "Remove radial artery compression device.",
          ],
        },
        {
          title: "Anticoagulation to resume",
          items: highRiskAnticoagRestartItems,
        },
        {
          title: "Discharge",
          items: [
            "Discharge order with medication reconciliation prior - 2-6 hours.",
            "After visit summary: .IRAVSY901.",
          ],
        },
        {
          title: "Follow up",
          items: [
            "Clinic visit in 1 month with MRI liver mass and labs: CBC, INR, CMP, AFP.",
          ],
        },
      ],
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "Future edit: add Y90 therapy-specific troubleshooting.",
      details: {
        "To build": [
          "Variant hepatic arterial anatomy from mapping study.",
          "Unexpected non-target flow.",
          "Activity/dose delivery issue.",
          "Cone-beam CT or nuclear medicine coordination issue.",
          "Access-site bleeding.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "Findings that should pause therapy or prompt escalation.",
      details: {
        "Escalate if": [
          "Treatment indication or target anatomy is uncertain.",
          "Uncorrected high-risk anticoagulation issue.",
          "Lung shunt/lung dose exceeds acceptable threshold.",
          "Nuclear medicine schedule or Y90 activity is not confirmed.",
          "Access-site bleeding or hemodynamic instability.",
        ],
      },
    },
    [`${id}-review-v2`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm activity/dosimetry workflow, lung dose thresholds, nuclear medicine handoff, recovery orders, AVS phrase, and follow-up imaging/lab timing.",
      details: {
        "Review checklist": [
          "Confirm local Y90 activity and dosimetry workflow.",
          "Confirm SIR-Sphere and TheraSphere lung shunt/lung dose policy.",
          "Confirm nuclear medicine handoff and scheduling workflow.",
          "Confirm radial/femoral recovery wording.",
          "Confirm .IRAVSY901 after visit summary phrase.",
          "Confirm one-month MRI liver mass and lab workflow.",
        ],
      },
    },
  };
}

function installModerateSedationLinks() {
  const sedationLink = { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" };

  procedures.forEach((procedure) => {
    Object.values(procedure.nodes).forEach((node) => {
      if (node.title !== "Sedation") return;

      const searchableText = [
        node.summary,
        ...Object.values(node.details || {}).flat().map((item) => (typeof item === "string" ? item : item?.text || "")),
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes("moderate sedation")) return;

      node.details = node.details || {};
      node.details.Sedation = node.details.Sedation || [];
      const hasSedationLink = node.details.Sedation.some((item) => item && typeof item === "object" && item.href === sedationLink.href);
      if (!hasSedationLink) {
        node.details.Sedation.push(sedationLink);
      }
    });
  });
}

function installRestartMedicationGuidance() {
  const hasGuidanceText = (node, text) => JSON.stringify(node).toLowerCase().includes(text.toLowerCase());

  procedures.forEach((procedure) => {
    if (procedure.bleedRisk === "High") {
      Object.values(procedure.nodes).forEach((node) => {
        if (node.title !== "Post-procedure" || hasGuidanceText(node, "Anticoagulation to resume")) return;

        if (!Array.isArray(node.checklistSections)) {
          node.checklistSections = [];
        }

        node.checklistSections.push({
          title: "Anticoagulation to resume",
          items: highRiskAnticoagRestartItems,
        });
      });
    }

    Object.values(procedure.nodes).forEach((node) => {
      if (node.title !== "Restart meds") return;

      const existingText = [
        node.summary,
        ...Object.values(node.details || {}).flat().map((item) => (typeof item === "string" ? item : item?.text || "")),
      ]
        .join(" ")
        .toLowerCase();

      if (existingText.includes("antihypertensive")) return;

      if (procedure.bleedRisk === "High") {
        node.summary = "Restart anticoagulation using high-bleeding-risk guidance once hemostasis is confirmed.";
        node.details = {
          "High bleeding risk restart": [
            anticoagulationTableLink,
            ...highRiskAnticoagRestartItems,
          ],
        };
        return;
      }

      if (procedure.bleedRisk === "Low") {
        node.summary = "For low-bleeding-risk procedures, anticoagulation usually does not need to be held; resume if held once hemostasis is confirmed.";
        node.details = {
          "Low bleeding risk restart": [
            anticoagulationTableLink,
            "No routine anticoagulation hold requirement for uncomplicated low-risk procedures.",
            "If anticoagulation was held anyway, resume per local policy once hemostasis is confirmed.",
            "Document who owns restart if there is active bleeding, access-site concern, or patient-specific thrombosis risk.",
          ],
        };
        return;
      }

      node.summary = "Assign procedure bleeding risk before using restart guidance.";
      node.details = {
        "Needs bleeding risk": [
          "This procedure does not yet have a high/low bleeding-risk override.",
          "Use the anticoagulation table and local policy until the procedure-specific content is reviewed.",
        ],
      };
    });
  });
}

function installPreProcedureTabs() {
  const lieFlatCheck = "Confirm sedation plan - patient can lie flat.";
  const orderTitles = new Set(["Pre-procedure orders", "Pre-operative orders", "Pre-procedure meds", "Arrival orders"]);
  const orderItems = new Set([
    "NPO if moderate sedation.",
    "NPO for moderate sedation.",
    "NPO per local-only exchange workflow.",
    "Patient is NPO.",
    "Patient is NPO if moderate sedation.",
    "Barium order to be administered ENTIRE bottle the night prior.",
    "NG tube in place if inpatient.",
    "Ancef 2 g if <120 kg, 3 g if >120 kg.",
    "Antibiotics with gram negative coverage are ordered.",
    "Antibiotics are ordered when infected/obstructed system, pyonephrosis, or sepsis is suspected.",
    "Vital signs per routine.",
    "Peripheral IV placement, NOT in left arm.",
    "Glucose point of care ordered.",
  ]);

  const appendDetails = (node, title, items) => {
    if (!items.length) return;
    node.details = node.details || {};
    const existing = node.details[title] || [];
    const seen = new Set(existing.map((item) => JSON.stringify(item)));
    node.details[title] = [...existing, ...items.filter((item) => {
      const key = JSON.stringify(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })];
  };

  procedures.forEach((procedure) => {
    const nodes = procedure.nodes;
    const pre = Object.values(nodes).find((node) => node.title === "Pre-procedure");
    if (!pre) return;
    const originalChildren = [...(pre.children || [])];
    const findOrCreate = (slug, title, aliases = []) => {
      const id = originalChildren.find((childId) => [title, ...aliases].includes(nodes[childId].title))
        || `${procedure.id}-pre-${slug}`;
      nodes[id] = nodes[id] || { title, type: "reference", summary: "" };
      nodes[id].title = title;
      return id;
    };
    const indicationId = findOrCreate("indication", "Indication");
    const anticoagId = findOrCreate("anticoagulation", "Anticoagulation");
    const labsId = findOrCreate("labs", "Labs", ["Labs and Orders"]);
    const ordersId = findOrCreate("orders", "Pre-procedure orders", ["Pre-operative orders"]);
    const sedationId = findOrCreate("sedation", "Sedation");
    const checklistId = findOrCreate("checklist", "Checklist", ["Focused exam"]);
    const orderedIds = [indicationId, anticoagId, labsId, ordersId, sedationId, checklistId];
    const orders = nodes[ordersId];
    const checklist = nodes[checklistId];

    // Keep nested headings and cautions while presenting the same six tabs.
    originalChildren.filter((id) => !orderedIds.includes(id)).forEach((id) => {
      const title = nodes[id].title;
      let target;
      if (orderTitles.has(title)) target = orders;
      else if (title === "Contraindications") target = nodes[indicationId];
      else if (["Physical exam", "Focused exam", "Consult Questions"].includes(title)) target = checklist;
      else throw new Error(`Unmapped pre-procedure topic: ${procedure.title}: ${title}`);
      target.children = [...(target.children || []), id];
    });

    const parentTargets = {
      Workflow: indicationId,
      Indication: indicationId,
      Indications: indicationId,
      Labs: labsId,
      Anticoagulation: anticoagId,
      Sedation: sedationId,
      Checklist: checklistId,
    };
    Object.entries(pre.details || {}).forEach(([title, items]) => {
      appendDetails(nodes[parentTargets[title] || checklistId], title, items);
    });
    const parentChecks = pre.checklist || [];
    appendDetails(orders, "Orders", parentChecks.filter((item) => item !== lieFlatCheck));
    if (pre.checklistSections) {
      const sections = Array.isArray(pre.checklistSections)
        ? pre.checklistSections
        : Object.entries(pre.checklistSections).map(([title, items]) => ({ title, items }));
      orders.checklistSections = [...(orders.checklistSections || []), ...sections];
    }
    if (!originalChildren.length && pre.summary) checklist.summary = pre.summary;
    delete pre.details;
    delete pre.checklist;
    delete pre.checklistSections;

    // Move explicitly identified order groups and items without rewriting doses.
    [nodes[labsId], nodes[sedationId], checklist].forEach((node) => {
      Object.entries(node.details || {}).forEach(([title, items]) => {
        const isOrderGroup = title === "Orders" || title === "To be ordered in clinic";
        const moving = isOrderGroup ? items : items.filter((item) => orderItems.has(item));
        if (!moving.length) return;
        const orderHeading = title === "To be ordered in clinic"
          ? "If for LUTS from BPH - to be ordered in clinic"
          : ["Checklist", "Sedation"].includes(title) ? "Orders" : title;
        appendDetails(orders, orderHeading, moving);
        node.details[title] = items.filter((item) => !moving.includes(item));
        if (!node.details[title].length) delete node.details[title];
        node.summary = "";
      });
    });

    if (!JSON.stringify(checklist).toLowerCase().includes("lie flat")) {
      if (checklist.details?.Checklist) appendDetails(checklist, "Checklist", [lieFlatCheck]);
      else checklist.checklist = [...(checklist.checklist || []), lieFlatCheck];
    }

    orderedIds.forEach((id) => {
      const node = nodes[id];
      if (!node.summary && !Object.keys(node.details || {}).length && !node.checklist?.length
        && !node.checklistSections?.length && !node.children?.length) {
        node.summary = id === ordersId
          ? "Procedure-specific pre-procedure orders have not yet been documented in this guide."
          : `${node.title} guidance has not yet been documented in this guide.`;
      }
    });
    pre.children = orderedIds;
  });
}


const els = {
  search: document.querySelector("#procedure-search"),
  procedureList: document.querySelector("#procedure-list"),
  canvas: document.querySelector(".canvas-layout"),
  category: document.querySelector("#procedure-category"),
  title: document.querySelector("#procedure-title"),
  summary: document.querySelector("#procedure-summary"),
  review: document.querySelector("#review-chip"),
  bleedRisk: document.querySelector("#bleed-risk-chip"),
  breadcrumb: document.querySelector("#breadcrumb"),
  focus: document.querySelector("#node-focus"),
  bubbles: document.querySelector("#bubble-grid"),
  detailTitle: document.querySelector("#detail-title"),
  detailBody: document.querySelector("#detail-body"),
  detailSections: document.querySelector("#detail-sections"),
  back: document.querySelector("#back-button"),
  reset: document.querySelector("#reset-button"),
};

function currentProcedure() {
  return procedures.find((procedure) => procedure.id === state.procedureId);
}

function currentNode() {
  const procedure = currentProcedure();
  return procedure.nodes[state.activeNodeId];
}

function detailNode() {
  const procedure = currentProcedure();
  return procedure.nodes[state.detailNodeId] || currentNode();
}

function nodeTypeLabel(type) {
  const labels = {
    action: "Action",
    decision: "Decision",
    caution: "Caution",
    reference: "Reference",
  };
  return labels[type] || "Step";
}

function renderProcedureList() {
  const query = state.search.trim().toLowerCase();
  const matches = visibleProcedures.filter((procedure) => {
    return `${procedure.title} ${procedure.category} ${procedure.summary} ${procedure.keywords || ""}`.toLowerCase().includes(query);
  });

  els.procedureList.innerHTML = "";

  if (matches.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No procedures found.";
    els.procedureList.append(empty);
    return;
  }

  matches.forEach((procedure) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `procedure-button${procedure.id === state.procedureId ? " active" : ""}`;
    button.innerHTML = `<strong>${procedure.title}</strong><span>${procedure.category}</span>`;
    button.addEventListener("click", () => {
      state.procedureId = procedure.id;
      state.activeNodeId = procedure.root;
      state.detailNodeId = procedure.root;
      state.history = [procedure.root];
      render();
    });
    els.procedureList.append(button);
  });
}

function renderHeader() {
  const procedure = currentProcedure();
  els.category.textContent = procedure.category;
  els.title.textContent = procedure.title;
  els.summary.textContent = procedure.summary;
  els.review.textContent = procedure.lastReviewed;
  if (procedure.bleedRisk) {
    els.bleedRisk.hidden = false;
    els.bleedRisk.textContent = `Bleed Risk: ${procedure.bleedRisk}`;
  } else {
    els.bleedRisk.hidden = true;
    els.bleedRisk.textContent = "";
  }
}

function renderBreadcrumb() {
  const procedure = currentProcedure();
  els.breadcrumb.innerHTML = "";

  state.history.forEach((nodeId, index) => {
    const node = procedure.nodes[nodeId];
    const crumb = document.createElement("button");
    crumb.type = "button";
    crumb.textContent = node.title;
    crumb.addEventListener("click", () => {
      state.history = state.history.slice(0, index + 1);
      state.activeNodeId = nodeId;
      render();
    });
    els.breadcrumb.append(crumb);

    if (index < state.history.length - 1) {
      const separator = document.createElement("span");
      separator.textContent = "/";
      els.breadcrumb.append(separator);
    }
  });
}

function renderFocus() {
  const node = currentNode();
  els.focus.innerHTML = `
    <span class="node-type ${node.type}">${nodeTypeLabel(node.type)}</span>
    <h3>${node.title}</h3>
    <p>${node.summary}</p>
  `;
}

function renderBubbles() {
  const procedure = currentProcedure();
  const node = currentNode();
  const children = node.children || [];
  els.bubbles.innerHTML = "";
  const showAnticoagulationMatrix = procedure.id === "anticoagulation-table" && state.activeNodeId === procedure.root;
  els.bubbles.classList.toggle("anticoagulation-matrix-host", showAnticoagulationMatrix);

  if (showAnticoagulationMatrix) {
    els.bubbles.append(renderAnticoagulationMatrix());
    return;
  }

  if (state.activeNodeId === procedure.root) {
    children.forEach((phaseId) => {
      const phase = procedure.nodes[phaseId];
      const section = document.createElement("section");
      section.className = `phase-card ${phase.type}`;

      const phaseButton = document.createElement("button");
      phaseButton.type = "button";
      phaseButton.className = "phase-heading";
      phaseButton.dataset.nodeId = phaseId;
      phaseButton.dataset.mode = phase.children && phase.children.length > 0 ? "drill" : "detail";
      phaseButton.innerHTML = `<span class="node-type ${phase.type}">${nodeTypeLabel(phase.type)}</span><strong>${phase.title}</strong><small>${phase.summary}</small>`;
      phaseButton.addEventListener("click", () => selectNode(phaseId, phaseButton.dataset.mode));
      section.append(phaseButton);

      const phaseChildren = phase.children || [];
      if (phaseChildren.length > 0) {
        const topicList = document.createElement("div");
        topicList.className = "topic-list";
        phaseChildren.forEach((topicId) => {
          const topic = procedure.nodes[topicId];
          const topicButton = document.createElement("button");
          topicButton.type = "button";
          topicButton.className = `topic-pill ${topic.type}${state.detailNodeId === topicId ? " active" : ""}`;
          topicButton.dataset.nodeId = topicId;
          topicButton.dataset.mode = "detail";
          topicButton.textContent = topic.title;
          topicButton.addEventListener("click", () => selectNode(topicId, "detail"));
          topicList.append(topicButton);
        });
        section.append(topicList);
      }

      els.bubbles.append(section);
    });
    return;
  }

  if (children.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "End of this branch. Use the breadcrumb or Back to return.";
    els.bubbles.append(empty);
    return;
  }

  children.forEach((childId) => {
    const child = procedure.nodes[childId];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `bubble ${child.type}`;
    button.dataset.nodeId = childId;
    button.dataset.mode = child.children && child.children.length > 0 ? "drill" : "detail";
    button.innerHTML = `<strong>${child.title}</strong><span>${child.summary}</span>`;
    button.addEventListener("click", () => {
      selectNode(childId, child.children && child.children.length > 0 ? "drill" : "detail");
    });
    els.bubbles.append(button);
  });
}

function selectNode(nodeId, mode) {
  const procedure = currentProcedure();
  const node = procedure.nodes[nodeId];
  if (!node) return;

  state.detailNodeId = nodeId;
  if (mode === "drill") {
    state.activeNodeId = nodeId;
    state.history = state.activeNodeId === procedure.root ? [procedure.root] : [procedure.root, nodeId];
  }
  render();
}

function openProcedure(procedureId) {
  const procedure = procedures.find((item) => item.id === procedureId);
  if (!procedure) return;

  state.procedureId = procedure.id;
  state.activeNodeId = procedure.root;
  state.detailNodeId = procedure.root;
  state.history = [procedure.root];
  render();
}

function appendListItemContent(container, item) {
  if (typeof item === "object" && item !== null && item.label && item.text) {
    const label = document.createElement("strong");
    label.textContent = `${item.label}: `;
    container.append(label, document.createTextNode(item.text));
    return;
  }

  if (typeof item === "object" && item !== null && item.procedureId) {
    const link = document.createElement("a");
    link.href = `#${item.procedureId}`;
    link.textContent = item.text || item.procedureId;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openProcedure(item.procedureId);
    });
    container.append(link);
    return;
  }

  if (typeof item === "object" && item !== null && item.href) {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.text || item.href;
    if (item.href === "#anticoagulation-table") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openProcedure("anticoagulation-table");
      });
      container.append(link);
      return;
    }
    if (item.href === "#moderate-sedation-checklist") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openProcedure("moderate-sedation-checklist");
      });
      container.append(link);
      return;
    }
    if (item.href.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    container.append(link);
    return;
  }

  if (String(item).startsWith("http")) {
    const link = document.createElement("a");
    link.href = item;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = item;
    container.append(link);
    return;
  }

  container.textContent = item;
}

function renderDetailSection(title, items) {
  const section = document.createElement("section");
  section.className = "detail-section";
  const heading = document.createElement("h4");
  heading.textContent = title;
  section.append(heading);

  const list = document.createElement("ul");
  items.forEach((item) => {
    const li = document.createElement("li");
    appendListItemContent(li, item);
    list.append(li);
  });
  section.append(list);
  return section;
}

function renderChecklist(items) {
  const section = document.createElement("section");
  section.className = "detail-section";
  const heading = document.createElement("h4");
  heading.textContent = "Checklist";
  section.append(heading);

  items.forEach((item) => {
    const label = document.createElement("label");
    label.className = "check-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const span = document.createElement("span");
    appendListItemContent(span, item);
    label.append(checkbox, span);
    section.append(label);
  });
  return section;
}

function renderChecklistSection(title, items) {
  const section = renderChecklist(items);
  section.querySelector("h4").textContent = title;
  return section;
}

function anticoagulationRecommendation(procedureRule, agent, context) {
  const highRecommendation = agent.high(context);
  const sharedRestartNote =
    "Restart timing assumes procedural bleeding risk is controlled and no patient-specific factor requires a longer interruption.";

  if (procedureRule.risk === "High") {
    return {
      hold: highRecommendation.hold,
      restart: highRecommendation.restart,
      note: [procedureRule.basis, highRecommendation.note, agent.note, sharedRestartNote].filter(Boolean).join(" "),
    };
  }

  if (procedureRule.risk === "Low") {
    const lowNote =
      agent.id === "warfarin"
        ? "SIR Table 6 lists a target INR <= 3.0; low-risk arterial access has separate INR thresholds."
        : "SIR Table 6 lists no routine interruption for this agent in uncomplicated low-risk procedures.";
    return {
      hold: "Do not withhold",
      restart: "No interruption planned",
      note: `${procedureRule.basis} ${lowNote} Reassess if patient bleeding risk, combination therapy, or technical complexity is increased.`,
    };
  }

  if (procedureRule.risk === "Conditional") {
    return {
      hold: "Confirm risk category",
      restart: "Then apply low/high rule",
      note: `${procedureRule.basis} If low risk, SIR generally says do not withhold. If high risk: ${highRecommendation.hold}; ${highRecommendation.restart}. ${highRecommendation.note || agent.note || sharedRestartNote}`,
    };
  }

  return {
    hold: "Not categorized",
    restart: "Use local policy",
    note: `${procedureRule.basis} Do not infer a hold or restart interval from another procedure without attending or institutional review.`,
  };
}

function renderAnticoagulationMatrix() {
  const section = document.createElement("section");
  section.className = "anticoag-matrix";

  const sourceNotice = document.createElement("div");
  sourceNotice.className = "anticoag-source";
  const sourceHeading = document.createElement("strong");
  sourceHeading.textContent = "Published baseline: SIR 2019 Part II, Tables 3 and 6";
  const sourceText = document.createElement("p");
  sourceText.textContent =
    "SIR announced an update in May 2025, but this navigator does not treat an unpublished update as a clinical rule. Validate against the approved institutional table before deployment.";
  const sourceLinks = document.createElement("div");
  const guidelineLink = document.createElement("a");
  guidelineLink.href = "https://www.jvir.org/article/S1051-0443(19)30407-5/fulltext";
  guidelineLink.target = "_blank";
  guidelineLink.rel = "noreferrer";
  guidelineLink.textContent = "SIR guideline";
  const statusLink = document.createElement("a");
  statusLink.href = "https://www.sirweb.org/publications/news/announcing-the-2025-guidelines-and-statements-topics/";
  statusLink.target = "_blank";
  statusLink.rel = "noreferrer";
  statusLink.textContent = "Update status";
  sourceLinks.append(guidelineLink, statusLink);
  sourceNotice.append(sourceHeading, sourceText, sourceLinks);
  section.append(sourceNotice);

  const controls = document.createElement("div");
  controls.className = "anticoag-controls";

  const searchLabel = document.createElement("label");
  searchLabel.className = "anticoag-search";
  const searchText = document.createElement("span");
  searchText.textContent = "Find procedure";
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Search this table";
  searchInput.autocomplete = "off";
  searchLabel.append(searchText, searchInput);

  const riskFilter = document.createElement("fieldset");
  riskFilter.className = "anticoag-risk-filter";
  const riskLegend = document.createElement("legend");
  riskLegend.textContent = "Bleeding risk";
  riskFilter.append(riskLegend);

  const riskOptions = ["All", "High", "Low", "Conditional", "Review"];
  riskOptions.forEach((option, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "anticoag-risk-filter";
    input.value = option;
    input.checked = index === 0;
    const span = document.createElement("span");
    span.textContent = option;
    label.append(input, span);
    riskFilter.append(label);
  });

  const contextControls = document.createElement("div");
  contextControls.className = "anticoag-context-controls";

  const renalLabel = document.createElement("label");
  const renalText = document.createElement("span");
  renalText.textContent = "Creatinine clearance";
  const renalSelect = document.createElement("select");
  [
    ["ge50", "CrCl >=50 mL/min"],
    ["30to49", "CrCl 30-49 mL/min"],
    ["15to29", "CrCl 15-29 mL/min"],
    ["unknown", "CrCl <15 or unknown"],
  ].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    renalSelect.append(option);
  });
  renalLabel.append(renalText, renalSelect);

  const enoxaparinLabel = document.createElement("label");
  const enoxaparinText = document.createElement("span");
  enoxaparinText.textContent = "Enoxaparin dose";
  const enoxaparinSelect = document.createElement("select");
  [
    ["therapeutic", "Therapeutic"],
    ["prophylactic", "Prophylactic"],
  ].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    enoxaparinSelect.append(option);
  });
  enoxaparinLabel.append(enoxaparinText, enoxaparinSelect);
  contextControls.append(renalLabel, enoxaparinLabel);

  controls.append(searchLabel, riskFilter, contextControls);
  section.append(controls);

  const selection = document.createElement("div");
  selection.className = "anticoag-selection";
  selection.setAttribute("aria-live", "polite");
  const selectionLabel = document.createElement("span");
  selectionLabel.textContent = "Selected recommendation";
  const selectionTitle = document.createElement("strong");
  selectionTitle.textContent = "Choose a procedure and medication cell";
  const selectionBody = document.createElement("p");
  selectionBody.textContent = "The source-based hold, restart, and procedure-mapping notes will appear here.";
  selection.append(selectionLabel, selectionTitle, selectionBody);
  section.append(selection);

  const status = document.createElement("p");
  status.className = "anticoag-status";
  section.append(status);

  const tableWrap = document.createElement("div");
  tableWrap.className = "anticoag-table-wrap";
  const table = document.createElement("table");
  table.className = "anticoag-table";
  table.setAttribute("aria-label", "Procedure anticoagulation hold and restart recommendations");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const procedureHeader = document.createElement("th");
  procedureHeader.scope = "col";
  procedureHeader.textContent = "Procedure";
  headerRow.append(procedureHeader);
  anticoagulationAgents.forEach((agent) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = agent.label;
    headerRow.append(th);
  });
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement("tbody");
  table.append(tbody);
  tableWrap.append(table);
  section.append(tableWrap);

  const caveat = document.createElement("p");
  caveat.className = "anticoag-caveat";
  caveat.textContent =
    "Educational reference, not a patient-specific order. Confirm dose, indication, renal and hepatic function, thrombotic risk, co-medications, hemostasis, and the current institutional policy before acting.";
  section.append(caveat);

  const tableProcedures = anticoagulationProcedureRules
    .filter((rule) => procedures.some((procedure) => procedure.title === rule.procedureTitle))
    .sort((a, b) => a.label.localeCompare(b.label));

  function renderRows() {
    tbody.replaceChildren();
    const context = {
      crclBand: renalSelect.value,
      enoxaparinDose: enoxaparinSelect.value,
    };

    tableProcedures.forEach((procedureRule) => {
      const row = document.createElement("tr");
      row.dataset.search = `${procedureRule.label} ${procedureRule.procedureTitle}`.toLowerCase();
      row.dataset.risk = procedureRule.risk;

      const rowHeader = document.createElement("th");
      rowHeader.scope = "row";
      const procedureName = document.createElement("strong");
      procedureName.textContent = procedureRule.label;
      const riskBadge = document.createElement("span");
      riskBadge.className = `anticoag-risk-badge ${procedureRule.risk.toLowerCase()}`;
      riskBadge.textContent = procedureRule.risk === "Review" ? "Needs review" : `${procedureRule.risk} risk`;
      rowHeader.append(procedureName, riskBadge);
      row.append(rowHeader);

      anticoagulationAgents.forEach((agent) => {
        const recommendation = anticoagulationRecommendation(procedureRule, agent, context);
        const cell = document.createElement("td");
        const button = document.createElement("button");
        button.type = "button";
        button.className = `anticoag-cell ${procedureRule.risk.toLowerCase()}`;
        button.setAttribute(
          "aria-label",
          `${procedureRule.label}, ${agent.label}: ${recommendation.hold}; ${recommendation.restart}`,
        );
        const hold = document.createElement("strong");
        hold.textContent = recommendation.hold;
        const restart = document.createElement("span");
        restart.textContent = recommendation.restart;
        button.append(hold, restart);
        button.addEventListener("click", () => {
          table.querySelectorAll(".anticoag-cell.active").forEach((activeCell) => activeCell.classList.remove("active"));
          button.classList.add("active");
          selectionTitle.textContent = `${procedureRule.label} + ${agent.label}`;
          selectionBody.textContent = `${recommendation.hold}. ${recommendation.restart}. ${recommendation.note}`;
        });
        cell.append(button);
        row.append(cell);
      });

      tbody.append(row);
    });

    selectionTitle.textContent = "Choose a procedure and medication cell";
    selectionBody.textContent = "The source-based hold, restart, and procedure-mapping notes will appear here.";
    updateRows();
  }

  function updateRows() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedRisk = riskFilter.querySelector("input:checked").value;
    let visibleCount = 0;

    tbody.querySelectorAll("tr").forEach((row) => {
      const matchesSearch = !query || row.dataset.search.includes(query);
      const matchesRisk = selectedRisk === "All" || row.dataset.risk === selectedRisk;
      row.hidden = !(matchesSearch && matchesRisk);
      if (!row.hidden) visibleCount += 1;
    });

    status.textContent = `${visibleCount} procedure${visibleCount === 1 ? "" : "s"} shown`;
  }

  searchInput.addEventListener("input", updateRows);
  riskFilter.addEventListener("change", updateRows);
  renalSelect.addEventListener("change", renderRows);
  enoxaparinSelect.addEventListener("change", renderRows);
  renderRows();

  return section;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundScore(value) {
  return clampNumber(Math.round(value), 6, 40);
}

function formatScore(value) {
  return Number.isFinite(value) ? String(value) : "--";
}

function meldInterpretation(score) {
  if (!Number.isFinite(score)) return "Enter all required labs to calculate risk.";
  if (score < 15) return "Lower TIPS risk band; still confirm indication and liver reserve.";
  if (score <= 18) return "Moderate risk band; attending review is appropriate.";
  if (score <= 25) return "High risk band; weigh urgency, alternatives, and anesthesia/post-procedure monitoring.";
  return "Very high risk band; often prohibitive unless salvage or emergent context.";
}

function meldSurvivalEstimate(score) {
  if (!Number.isFinite(score)) {
    return {
      survival: "--",
      mortality: "--",
      band: "Enter labs",
    };
  }
  if (score < 9) {
    return {
      survival: "93.3-99.4%",
      mortality: "0.6-6.7%",
      band: "MELD 3.0 <9",
    };
  }
  if (score <= 19) {
    return {
      survival: "96.0-98.8%",
      mortality: "1.2-4.0%",
      band: "MELD 3.0 10-19",
    };
  }
  if (score <= 29) {
    return {
      survival: "80.0-95.3%",
      mortality: "4.7-20%",
      band: "MELD 3.0 20-29",
    };
  }
  if (score <= 39) {
    return {
      survival: "52.0-88.5%",
      mortality: "11.5-48%",
      band: "MELD 3.0 30-39",
    };
  }
  return {
    survival: "40.0-75.0%",
    mortality: "25-60%",
    band: "MELD 3.0 >=40",
  };
}

function calculateMeldScores(values) {
  const bilirubin = Number(values.bilirubin);
  const inr = Number(values.inr);
  const creatinine = Number(values.creatinine);
  const sodium = Number(values.sodium);
  const albumin = Number(values.albumin);

  if ([bilirubin, inr, creatinine, sodium, albumin].some((value) => !Number.isFinite(value) || value <= 0)) {
    return null;
  }

  const biliBound = Math.max(bilirubin, 1);
  const inrBound = Math.max(inr, 1);
  const sodiumBound = clampNumber(sodium, 125, 137);
  const albuminBound = clampNumber(albumin, 1.5, 3.5);
  const meldNaCreatinine = values.dialysis ? 4 : clampNumber(creatinine, 1, 4);
  const meld3Creatinine = values.dialysis ? 3 : clampNumber(creatinine, 1, 3);

  const baseMeld =
    9.57 * Math.log(meldNaCreatinine) +
    3.78 * Math.log(biliBound) +
    11.2 * Math.log(inrBound) +
    6.43;
  const meldNaRaw = baseMeld + 1.32 * (137 - sodiumBound) - 0.033 * baseMeld * (137 - sodiumBound);
  const meld3Raw =
    (values.female ? 1.33 : 0) +
    4.56 * Math.log(biliBound) +
    0.82 * (137 - sodiumBound) -
    0.24 * (137 - sodiumBound) * Math.log(biliBound) +
    9.09 * Math.log(inrBound) +
    11.14 * Math.log(meld3Creatinine) +
    1.85 * (3.5 - albuminBound) -
    1.83 * (3.5 - albuminBound) * Math.log(meld3Creatinine) +
    6;

  const meldNa = roundScore(meldNaRaw);
  const meld3 = roundScore(meld3Raw);

  return {
    meldNa,
    meld3,
    baseMeld: roundScore(baseMeld),
    interpretation: meldInterpretation(Math.max(meldNa, meld3)),
    bounds: {
      bilirubin: biliBound,
      inr: inrBound,
      sodium: sodiumBound,
      albumin: albuminBound,
      meldNaCreatinine,
      meld3Creatinine,
    },
  };
}

function createMeldInput(labelText, id, value, step, min) {
  const label = document.createElement("label");
  label.className = "meld-input";
  label.setAttribute("for", id);

  const span = document.createElement("span");
  span.textContent = labelText;

  const input = document.createElement("input");
  input.id = id;
  input.type = "number";
  input.inputMode = "decimal";
  input.step = step;
  input.min = min;
  input.value = value;

  label.append(span, input);
  return { label, input };
}

function renderMeldCalculator() {
  const section = document.createElement("section");
  section.className = "detail-section meld-calculator";

  const heading = document.createElement("h4");
  heading.textContent = "Calculator";
  section.append(heading);

  const grid = document.createElement("div");
  grid.className = "meld-input-grid";

  const inputs = [
    createMeldInput("Bilirubin (mg/dL)", "meld-bilirubin", "2.0", "0.1", "0"),
    createMeldInput("INR", "meld-inr", "1.5", "0.1", "0"),
    createMeldInput("Creatinine (mg/dL)", "meld-creatinine", "1.0", "0.1", "0"),
    createMeldInput("Sodium (mEq/L)", "meld-sodium", "135", "1", "0"),
    createMeldInput("Albumin (g/dL)", "meld-albumin", "3.0", "0.1", "0"),
  ];
  inputs.forEach((item) => grid.append(item.label));
  section.append(grid);

  const toggles = document.createElement("div");
  toggles.className = "meld-toggle-row";

  const femaleLabel = document.createElement("label");
  femaleLabel.className = "meld-toggle";
  const femaleInput = document.createElement("input");
  femaleInput.type = "checkbox";
  femaleLabel.append(femaleInput, document.createTextNode("Female"));

  const dialysisLabel = document.createElement("label");
  dialysisLabel.className = "meld-toggle";
  const dialysisInput = document.createElement("input");
  dialysisInput.type = "checkbox";
  dialysisLabel.append(dialysisInput, document.createTextNode("Dialysis criterion met"));

  toggles.append(femaleLabel, dialysisLabel);
  section.append(toggles);

  const results = document.createElement("div");
  results.className = "meld-results";
  section.append(results);

  const survival = document.createElement("div");
  survival.className = "meld-survival-card";
  section.append(survival);

  const referenceBlock = document.createElement("div");
  referenceBlock.className = "meld-reference-block";
  const referenceHeading = document.createElement("strong");
  referenceHeading.textContent = "For reference";
  const dialysisCriterion = document.createElement("p");
  dialysisCriterion.textContent =
    "Dialysis criterion: dialysis at least twice in the last 7 days, or 24 hours of continuous veno-venous hemodialysis in the last 7 days.";
  referenceBlock.append(referenceHeading, dialysisCriterion);
  section.append(referenceBlock);

  function updateCalculator() {
    const values = {
      bilirubin: inputs[0].input.value,
      inr: inputs[1].input.value,
      creatinine: inputs[2].input.value,
      sodium: inputs[3].input.value,
      albumin: inputs[4].input.value,
      female: femaleInput.checked,
      dialysis: dialysisInput.checked,
    };
    const scores = calculateMeldScores(values);

    if (!scores) {
      results.innerHTML = `
        <div class="meld-result-card"><span>MELD-Na</span><strong>--</strong></div>
        <div class="meld-result-card"><span>MELD 3.0</span><strong>--</strong></div>
      `;
      survival.innerHTML = `
        <span>Estimated 3-month survival</span>
        <strong>--</strong>
        <small>Enter labs to estimate survival by MELD 3.0 band.</small>
      `;
      return;
    }

    const survivalEstimate = meldSurvivalEstimate(scores.meld3);
    results.innerHTML = `
      <div class="meld-result-card"><span>MELD-Na</span><strong>${formatScore(scores.meldNa)}</strong></div>
      <div class="meld-result-card"><span>MELD 3.0</span><strong>${formatScore(scores.meld3)}</strong></div>
    `;
    survival.innerHTML = `
      <span>Estimated 3-month survival</span>
      <strong>${survivalEstimate.survival}</strong>
      <small>${survivalEstimate.band}; mortality ${survivalEstimate.mortality}. Population estimate, not patient-specific prediction.</small>
    `;
  }

  [...inputs.map((item) => item.input), femaleInput, dialysisInput].forEach((input) => {
    input.addEventListener("input", updateCalculator);
    input.addEventListener("change", updateCalculator);
  });
  updateCalculator();

  return section;
}

function renderDetails() {
  const node = detailNode();
  els.detailTitle.textContent = node.title;
  els.detailBody.textContent = node.summary;
  els.detailSections.innerHTML = "";

  if (node.calculator === "meld") {
    els.detailSections.append(renderMeldCalculator());
  }

  if (node.checklist) {
    els.detailSections.append(renderChecklist(node.checklist));
  }

  if (node.checklistSections) {
    node.checklistSections.forEach((section) => {
      els.detailSections.append(renderChecklistSection(section.title, section.items));
    });
  }

  if (node.details) {
    Object.entries(node.details).forEach(([title, items]) => {
      els.detailSections.append(renderDetailSection(title, items));
    });
  }
}

function renderControls() {
  els.back.disabled = state.history.length <= 1;
  els.reset.disabled = state.activeNodeId === currentProcedure().root;
}

function render() {
  const procedure = currentProcedure();
  const showAnticoagulationMatrix = procedure.id === "anticoagulation-table" && state.activeNodeId === procedure.root;
  els.canvas.classList.toggle("anticoagulation-view", showAnticoagulationMatrix);
  renderProcedureList();
  renderHeader();
  renderBreadcrumb();
  renderFocus();
  renderBubbles();
  renderDetails();
  renderControls();
}

els.search.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProcedureList();
});

els.bubbles.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-node-id]");
  if (!button || !els.bubbles.contains(button)) return;

  selectNode(button.dataset.nodeId, button.dataset.mode);
});

els.back.addEventListener("click", () => {
  if (state.history.length <= 1) return;
  state.history = state.history.slice(0, -1);
  state.activeNodeId = state.history[state.history.length - 1];
  state.detailNodeId = state.activeNodeId;
  render();
});

els.reset.addEventListener("click", () => {
  const procedure = currentProcedure();
  state.activeNodeId = procedure.root;
  state.detailNodeId = procedure.root;
  state.history = [procedure.root];
  render();
});

render();
