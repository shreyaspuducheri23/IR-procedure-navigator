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
  "Warfarin: 24 hours postop.",
  "Heparin: 6-8 hours postop.",
  "Lovenox: 12 hours postop.",
  "DOACs: 24 hours postop.",
  "Plavix: 6 hours postop (75 mg) or 24 hours postop (300-600 mg).",
  "Aspirin: 24 hours postop.",
  "Confirm no procedure-related bleeding concern and defer to local policy/attending preference.",
];

const highRiskAnticoagHoldItems = [
  "Warfarin: 5 days.",
  "Heparin: 6-8 hours.",
  "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
  "DOACs: 48 hours.",
  "Plavix: 5 days.",
  "Aspirin: 5 days.",
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
installPreProcedureLieFlatChecks();

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
    keywords: "anticoagulation anticoagulant antiplatelet hold resume restart high bleeding risk low bleeding risk warfarin heparin lovenox doac plavix aspirin",
    summary: "Draft medication hold and restart reference for procedure bleeding-risk planning.",
    lastReviewed: "Draft reference page, July 2026",
    root: "anticoagulation-table-root",
    nodes: {
      "anticoagulation-table-root": {
        title: "Anticoagulation Table",
        type: "reference",
        summary: "Use local policy and attending preference; this page collects the app's draft high-risk restart timing in one place.",
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
        summary: "Draft hold timing used by high-bleeding-risk procedure nodes.",
        details: {
          "High bleeding risk hold": [
            "Warfarin: 5 days.",
            "Heparin: 6-8 hours.",
            "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
            "DOACs: 48 hours.",
            "Plavix: 5 days.",
            "Aspirin: 5 days.",
          ],
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
        summary: "Low-risk procedure nodes generally do not require anticoagulation holds.",
        details: {
          "Low bleeding risk": [
            "No routine anticoagulation hold requirement for uncomplicated low-risk procedures.",
            "If anticoagulation was held anyway, resume per local policy once hemostasis is confirmed.",
            "Document who owns restart if there is active bleeding, access-site concern, or patient-specific thrombosis risk.",
          ],
        },
      },
      "anticoagulation-table-review": {
        title: "Needs review",
        type: "caution",
        summary: "Confirm this draft table against the current institutional anticoagulation policy.",
        details: {
          "Review checklist": [
            "Confirm hold and restart times by medication, dose, renal function, and procedural bleeding risk.",
            "Confirm whether aspirin should be held for each high-risk procedure at your institution.",
            "Confirm restart ownership for bridging, high thrombosis risk, active bleeding, or difficult hemostasis.",
          ],
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
      const existingChildren = (node.children || []).filter((childId) => {
        return childId !== anatomyId && childId !== proceduralStepsId;
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
        summary: "Procedure-specific access, device, imaging, and completion steps.",
        children: existingChildren,
      };

      node.children = [anatomyId, proceduralStepsId];
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
        `${id}-physical-exam-v2`,
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
    [`${id}-physical-exam-v2`]: {
      title: "Physical exam",
      type: "decision",
      summary: "Confirm target skin site is usable.",
      details: {
        "Physical exam": [
          "Target skin site without active infection or overlying medical machinery, such as leads, pacers, etc.",
        ],
      },
    },
    [`${id}-checklist-v2`]: {
      title: "Checklist",
      type: "decision",
      summary: "Confirm indication, imaging, labs, access window, NPO status, barium, NG tube if inpatient, and antibiotics.",
      details: {
        Checklist: [
          "Confirm indication and review imaging.",
          "Labs are appropriate.",
          "Appropriate window on imaging.",
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
      summary: "To be built as the gastrostomy/gastrojejunostomy tube placement technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
      summary: "Confirm tract access, exchange tube, and verify intraluminal position before clearing for use.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
  const procedure = procedures.find((item) => item.title === "Catheter Directed Thrombolysis (PE/DVT/frostbite) - SEE ORDER SET");
  if (!procedure) return;

  procedure.title = "Catheter Directed Thrombolysis";
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
      title: "Catheter Directed Thrombolysis",
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
      summary: "Platelets >50k, INR <1.5-1.8, and fibrinogen.",
      details: {
        Labs: [
          "Platelets >50k.",
          "INR <1.5-1.8.",
          "Fibrinogen.",
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
    [`${id}-checklist`]: {
      title: "Checklist",
      type: "checklist",
      summary: "Confirm indication, review imaging, exclude contraindications, and set up lysis infusion orders.",
      checklistSections: {
        Checklist: [
          "Confirm indication.",
          "Labs are appropriate.",
          "Review imaging.",
          "Exclude contraindications.",
        ],
        "Pre-procedure orders": [
          "Anti-Xa q6 x 24 hours.",
          "APTT q6 x 24 hours.",
          "CBC q6 x 24 hours.",
          "Fibrinogen q6 x 24 hours.",
          "INR q5 x 24 hours.",
          "Notify MD/LIP: Fibrinogen <200 mg/dL.",
          "Notify MD/LIP: APTT >50 sec.",
          "Notify MD/LIP: INR >1.7.",
          "Notify MD/LIP: Platelets <100,000/m3.",
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
    [`${id}-intra`]: {
      title: "Intraprocedure",
      type: "workflow",
      summary: "Use the institutional thrombolysis order set and verify all infusion rates with the operator before leaving the room.",
      details: {
        "To build": [
          "Add access approach, catheter positioning, infusion start workflow, and handoff timing after faculty review.",
        ],
      },
    },
    [`${id}-post`]: {
      title: "Post-procedure",
      type: "orders",
      summary: "Monitor access site, neurovascular status, vitals, infusion orders, and next-day return plan.",
      checklistSections: {
        "Routine orders": [
          "Monitor color of access site.",
          "Neurovascular checks q1hr x 6 hours, then q1hr for up to 24 hours.",
          "Vital signs: q15 minutes x 4, q30 minutes x 2, q1 hour x 2, then q2 hours until completion of thrombolytic infusion.",
          "Tylenol 650 mg PRN.",
        ],
        "To note": [
          "Verify that infusion orders are appropriate.",
        ],
        "Sign out to primary team for removal the next day": [
          "Place IR venous intervention order.",
          "NPO at midnight.",
        ],
      },
    },
    [`${id}-review`]: {
      title: "Needs review",
      type: "caution",
      summary: "Confirm CDT order-set details, lab frequency, notification thresholds, monitoring level, and next-day return workflow.",
      details: {
        "Review checklist": [
          "Confirm INR q5 versus q6 timing with the formal order set.",
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
      summary: "To be built as the paracentesis procedural technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common paracentesis problems and first checks.",
      details: {
        "To build": ["No safe pocket.", "Poor drainage.", "Persistent leak.", "Unexpected bloody fluid.", "Patient discomfort."],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Hemodynamic instability.",
          "Peritoneal signs or severe pain.",
          "Concern for bowel injury.",
          "Unexpected hemorrhagic output.",
          "No safe window.",
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
      summary: "To be built as the thoracentesis procedural technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common thoracentesis problems and first checks.",
      details: {
        "To build": ["No safe pocket.", "Dry tap.", "Cough or chest discomfort.", "Persistent air leak concern.", "Unexpected bloody fluid."],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Hemodynamic instability.",
          "Respiratory distress.",
          "New severe chest pain.",
          "Concern for pneumothorax.",
          "Unexpected hemorrhagic output.",
          "No safe window.",
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
            "Warfarin: 24 hours postop.",
            "Heparin: 6-8 hours postop.",
            "Lovenox: 12 hours postop.",
            "DOACs: 24 hours postop.",
            "Plavix: 6 hours postop (75 mg) or 24 hours postop (300-600 mg).",
            "Aspirin: 24 hours postop.",
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
      summary: "To be built as the nephrostomy tube placement technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
            "Warfarin: 24 hours postop.",
            "Heparin: 6-8 hours postop.",
            "Lovenox: 12 hours postop.",
            "DOACs: 24 hours postop.",
            "Plavix: 6 hours postop (75 mg) or 24 hours postop (300-600 mg).",
            "Aspirin: 24 hours postop.",
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "Common nephrostomy tube placement problems and first checks.",
      details: {
        Troubleshooting: [
          "No safe access window.",
          "Difficult collecting system access.",
          "Nondilated collecting system.",
          "Bloody urine.",
          "Tube obstruction.",
          "Tube dislodgement or leakage.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "Findings that should pause the case or prompt urgent escalation.",
      details: {
        "Escalate if": [
          "Sepsis or unstable vitals.",
          "No safe access window.",
          "Uncorrected high-risk anticoagulation issue.",
          "Concern for vascular, bowel, pleural, or solid-organ injury.",
          "Heavy hematuria, clot obstruction, or hemodynamic change after access.",
          "Clinical deterioration after decompression.",
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
    variant.nodes[`${id}-troubleshooting-v2`].summary = "Future edit: add procedure-specific troubleshooting.";
    variant.nodes[`${id}-troubleshooting-v2`].details = {
      "Needs procedure-specific edit": ["Add common problems and first checks."],
    };
    variant.nodes[`${id}-red-flags-v2`].summary = "Future edit: add procedure-specific stop/escalate criteria.";
    variant.nodes[`${id}-red-flags-v2`].details = {
      "Needs procedure-specific edit": ["Add red flags and escalation criteria."],
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
      summary: "To be built as the cholecystostomy technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
            "Warfarin: 24 hours postop.",
            "Heparin: 6-8 hours postop.",
            "Lovenox: 12 hours postop.",
            "DOACs: 24 hours postop.",
            "Plavix: 6 hours postop (75 mg) or 24 hours postop (300-600 mg).",
            "Aspirin: 24 hours postop.",
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
        title: "Labs and Orders",
        type: "decision",
        summary: "CBC, INR <1.5-1.8, platelets >50k, and antibiotics with gram negative coverage.",
        details: {
          Labs: ["CBC.", "INR < 1.5-1.8.", "Platelets >50k."],
          Orders: ["Antibiotics with gram negative coverage."],
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
            "Warfarin: 5 days.",
            "Heparin: 6-8 hours.",
            "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
            "DOACs: 48 hours.",
            "Plavix: 5 days.",
            "Aspirin: 5 days.",
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
            { text: "Can tolerate moderate sedation", href: "#moderate-sedation-checklist" },
          ],
        },
      },
      "biliary-drain-intra-v2": {
        title: "Intraprocedure",
        type: "reference",
        summary: "To be built as the biliary drain placement/exchange/internalization technique section.",
        children: ["biliary-drain-troubleshooting-v2", "biliary-drain-red-flags-v2"],
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
              "Warfarin: 24 hours postop.",
              "Heparin: 6-8 hours postop.",
              "Lovenox: 12 hours postop.",
              "DOACs: 24 hours postop.",
              "Plavix: 6 hours postop (75 mg) or 24 hours postop (300-600 mg).",
              "Aspirin: 24 hours postop.",
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
          "Follow up": ["Confirm exchange/internalization follow-up plan with attending."],
        },
      },
      "biliary-drain-troubleshooting-v2": {
        title: "Troubleshooting",
        type: "decision",
        summary: "To be built as common biliary drain problems and first checks.",
        details: {
          "To build": [
            "No safe access window.",
            "Unable to cross obstruction.",
            "Poor drainage.",
            "Tube obstruction.",
            "Tube dislodgement or leakage.",
          ],
        },
      },
      "biliary-drain-red-flags-v2": {
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
      summary: "To be built as the fistulogram/intervention technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
      summary: "To be built as the percutaneous liver biopsy technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common liver biopsy problems and first checks.",
      details: {
        "To build": [
          "No safe biopsy window.",
          "Ascites affecting access.",
          "Poor lesion visualization.",
          "Insufficient specimen.",
          "Post-biopsy pain or suspected bleeding.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Uncorrected high-risk anticoagulation issue.",
          "No safe window.",
          "Uncontrolled blood pressure.",
          "Ascites or infection that makes percutaneous access unsafe.",
          "Hemodynamic instability, severe abdominal/right shoulder pain, expanding hematoma, or suspected hemorrhage after biopsy.",
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
      summary: "To be built as the PICC placement technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common PICC placement problems and first checks.",
      details: {
        "To build": [
          "No suitable peripheral vein.",
          "Difficult wire passage.",
          "Malpositioned tip.",
          "Arm swelling or suspected central venous stenosis.",
          "Line does not aspirate or flush.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Requested arm has AV fistula/graft or dialysis plan.",
          "Prior axillary surgery, lymphedema, or imaging concern that changes side/access planning.",
          "Active infection at planned insertion site.",
          "Severe arm swelling or suspected central venous occlusion.",
          "Arterial puncture, expanding hematoma, or new chest symptoms.",
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
      summary: "To be built as the lung biopsy technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common lung biopsy problems and first checks.",
      details: {
        "To build": [
          "No safe path to lesion.",
          "Lesion motion or inability to breath-hold.",
          "Pneumothorax on immediate or delayed CXR.",
          "Pulmonary hemorrhage or hemoptysis.",
          "Insufficient specimen.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Poor cardiopulmonary reserve for biopsy risk.",
          "No safe path or unavoidable fissure crossing.",
          "Uncorrected high-risk anticoagulation issue.",
          "Respiratory distress, enlarging pneumothorax, significant hemoptysis, or hemodynamic instability.",
          "Need for chest tube placement after biopsy.",
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
      summary: "To be built as the hemorrhoid artery embolization technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
            "Monitor access site.",
            "Vital signs every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours; edit to match bedrest.",
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
      details: {
        "Follow up": ["1 month clinic follow up."],
      },
    },
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common hemorrhoid artery embolization problems and first checks.",
      details: {
        "To build": [
          "No clear bleeding source or non-internal hemorrhoid indication.",
          "Difficult inferior mesenteric or superior rectal artery catheterization.",
          "Variant rectal arterial anatomy.",
          "Access-site bleeding.",
          "Persistent or recurrent bleeding after embolization.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "External hemorrhoids or alternate bleeding source without internal hemorrhoid target.",
          "Unstable acute hemorrhage requiring resuscitation/escalation.",
          "No GI or colorectal evaluation when diagnosis is uncertain.",
          "Severe pelvic pain, ischemic concern, access-site bleeding, or hemodynamic instability after embolization.",
        ],
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
      summary: "To be built as the prostate artery embolization technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
      summary: "To be built as the TIPS creation technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common TIPS creation problems and first checks.",
      details: {
        "To build": [
          "Difficult portal access.",
          "Portal/hepatic vein patency or anatomy issue.",
          "Need for adjunctive variceal embolization.",
          "Hemodynamic instability or bleeding concern.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "To be built as stop/escalate criteria.",
      details: {
        "To build": [
          "Severe hepatic encephalopathy.",
          "Pulmonary hypertension or heart failure concern.",
          "Acute liver failure.",
          "Active infection.",
          "High MELD outside acceptable range unless emergent/salvage.",
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
          "Warfarin: 5 days.",
          "Heparin: 6-8 hours.",
          "Lovenox: 24 hours; hold 1 dose prior if prophylactic.",
          "DOACs: 48 hours.",
          "Plavix: 5 days.",
          "Aspirin: 5 days.",
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
      summary: "To be built as the TIPS check/revision technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "To be built as common TIPS revision/check problems and first checks.",
      details: {
        "To build": [
          "Unable to cross stenosis or occlusion.",
          "Unexpected gradient findings.",
          "Need for upsizing, relining, extension, or narrowing.",
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
          "Active infection.",
          "Severe encephalopathy or worsening liver failure concern.",
          "Hemodynamic instability or bleeding.",
          "Concern for shunt thrombosis/occlusion with acute decompensation.",
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
      summary: "Future UFE technique section.",
      children: [`${id}-troubleshooting-v2`, `${id}-red-flags-v2`],
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
    [`${id}-troubleshooting-v2`]: {
      title: "Troubleshooting",
      type: "decision",
      summary: "Future edit: add UFE-specific troubleshooting.",
      details: {
        "To build": [
          "Difficult uterine artery selection.",
          "Variant pelvic arterial anatomy.",
          "Non-target embolization concern.",
          "Severe post-embolization pain or nausea.",
          "Access-site bleeding.",
        ],
      },
    },
    [`${id}-red-flags-v2`]: {
      title: "Red Flags",
      type: "caution",
      summary: "Findings that should pause UFE or prompt escalation.",
      details: {
        "Escalate if": [
          "Pregnancy not excluded.",
          "Active infection or malignancy concern.",
          "Patient goals do not align with procedure.",
          "Uncorrected high-risk anticoagulation issue.",
          "Severe uncontrolled post-procedure pain, fever/sepsis concern, access-site bleeding, or hemodynamic instability.",
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

function installPreProcedureLieFlatChecks() {
  const lieFlatCheck = "Confirm sedation plan - patient can lie flat.";

  procedures.forEach((procedure) => {
    Object.values(procedure.nodes).forEach((node) => {
      if (node.title !== "Pre-procedure") return;
      if (JSON.stringify(node).toLowerCase().includes("patient can lie flat")) return;

      if (!Array.isArray(node.checklist)) {
        node.checklist = [];
      }

      node.checklist.push(lieFlatCheck);
    });
  });
}


const els = {
  search: document.querySelector("#procedure-search"),
  procedureList: document.querySelector("#procedure-list"),
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
