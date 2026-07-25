window.generatedProcedureData = [
  {
    "id": "adrenal-vein-sampling",
    "title": "Adrenal Vein Sampling",
    "category": "IR procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "adrenal-vein-sampling-root",
    "nodes": {
      "adrenal-vein-sampling-root": {
        "title": "Adrenal Vein Sampling",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "adrenal-vein-sampling-pre",
          "adrenal-vein-sampling-intra",
          "adrenal-vein-sampling-post",
          "adrenal-vein-sampling-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "adrenal-vein-sampling-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "adrenal-vein-sampling-indication",
          "adrenal-vein-sampling-labs",
          "adrenal-vein-sampling-anticoag",
          "adrenal-vein-sampling-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "250 mcg IV cosyntropin in 250 ml @ 50 mcg/hour to start 30-60 min prior to procedure. Lay flat after start of infusion.",
          "E-Consult to Endocrinology: Adrenal Disorders – ask patient for consent"
        ]
      },
      "adrenal-vein-sampling-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "adrenal-vein-sampling-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "No pre-procedure labs unless further indicated",
        "details": {
          "PDF lab guidance": [
            "No pre-procedure labs unless further indicated"
          ]
        }
      },
      "adrenal-vein-sampling-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "adrenal-vein-sampling-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "adrenal-vein-sampling-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "adrenal-vein-sampling-intra-placeholder"
        ]
      },
      "adrenal-vein-sampling-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "adrenal-vein-sampling-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "adrenal-vein-sampling-post-orders",
          "adrenal-vein-sampling-restart",
          "adrenal-vein-sampling-follow-up"
        ]
      },
      "adrenal-vein-sampling-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "No diet until lab results are back",
          "Activity – Femoral: 2 hours LE extended",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "Continue cosyntropin and do not order diet until lab results are back and cleared by attending",
          "After labs are reviewed:",
          "Regular diet",
          "Notify RN to turn off cosyntropin",
          "Discharge order (med rec prior) - 2 hours",
          "After visit summary: .IRAVSVENOGRAM"
        ]
      },
      "adrenal-vein-sampling-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "adrenal-vein-sampling-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "adrenal-vein-sampling-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "arteriogram",
    "title": "Arteriogram",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "arteriogram-root",
    "nodes": {
      "arteriogram-root": {
        "title": "Arteriogram",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "arteriogram-pre",
          "arteriogram-intra",
          "arteriogram-post",
          "arteriogram-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "arteriogram-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "arteriogram-indication",
          "arteriogram-labs",
          "arteriogram-anticoag",
          "arteriogram-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care"
        ]
      },
      "arteriogram-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "arteriogram-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "arteriogram-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "arteriogram-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "arteriogram-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "arteriogram-intra-placeholder"
        ]
      },
      "arteriogram-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "arteriogram-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "arteriogram-post-orders",
          "arteriogram-restart",
          "arteriogram-follow-up"
        ]
      },
      "arteriogram-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSARTERIOGRAM",
          "Follow up: PPD1 if admitted or outpatient per MD"
        ]
      },
      "arteriogram-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "arteriogram-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "arteriogram-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "bone-biopsy",
    "title": "Bone Biopsy",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "bone-biopsy-root",
    "nodes": {
      "bone-biopsy-root": {
        "title": "Bone Biopsy",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "bone-biopsy-pre",
          "bone-biopsy-intra",
          "bone-biopsy-post",
          "bone-biopsy-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "bone-biopsy-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "bone-biopsy-indication",
          "bone-biopsy-labs",
          "bone-biopsy-anticoag",
          "bone-biopsy-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "bone-biopsy-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "bone-biopsy-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "bone-biopsy-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "bone-biopsy-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "bone-biopsy-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "bone-biopsy-intra-placeholder"
        ]
      },
      "bone-biopsy-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "bone-biopsy-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "bone-biopsy-post-orders",
          "bone-biopsy-restart",
          "bone-biopsy-follow-up"
        ]
      },
      "bone-biopsy-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – Every 15 minutes x 4",
          "Wound care/treatment",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1 hour",
          "After visit summary: .IRAVSBIOPSYDEEP"
        ]
      },
      "bone-biopsy-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "bone-biopsy-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "bone-biopsy-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "botox-injection",
    "title": "Botox Injection",
    "category": "IR procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "botox-injection-root",
    "nodes": {
      "botox-injection-root": {
        "title": "Botox Injection",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "botox-injection-pre",
          "botox-injection-intra",
          "botox-injection-post",
          "botox-injection-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "botox-injection-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "botox-injection-indication",
          "botox-injection-labs",
          "botox-injection-anticoag",
          "botox-injection-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "botox-injection-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "botox-injection-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated"
          ]
        }
      },
      "botox-injection-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "botox-injection-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "botox-injection-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "botox-injection-intra-placeholder"
        ]
      },
      "botox-injection-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "botox-injection-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "botox-injection-post-orders",
          "botox-injection-restart",
          "botox-injection-follow-up"
        ]
      },
      "botox-injection-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSBOTOXINJ"
        ]
      },
      "botox-injection-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "botox-injection-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "botox-injection-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "breast-ablation",
    "title": "Breast Ablation",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "breast-ablation-root",
    "nodes": {
      "breast-ablation-root": {
        "title": "Breast Ablation",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "breast-ablation-pre",
          "breast-ablation-intra",
          "breast-ablation-post",
          "breast-ablation-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "breast-ablation-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "breast-ablation-indication",
          "breast-ablation-labs",
          "breast-ablation-anticoag",
          "breast-ablation-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation vs local)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "breast-ablation-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "breast-ablation-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated"
          ]
        }
      },
      "breast-ablation-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "breast-ablation-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "breast-ablation-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "breast-ablation-intra-placeholder"
        ]
      },
      "breast-ablation-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "breast-ablation-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "breast-ablation-post-orders",
          "breast-ablation-restart",
          "breast-ablation-follow-up"
        ]
      },
      "breast-ablation-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – Every 15 minutes x 4",
          "Wound care/treatment",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1 hour",
          "After visit summary: .IRAVSBREASTABLATION",
          "Follow up: Mammogram and breast US in 3 months"
        ]
      },
      "breast-ablation-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "breast-ablation-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "breast-ablation-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set",
    "title": "Catheter Directed Thrombolysis (PE/DVT/frostbite) - SEE ORDER SET",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-root",
    "nodes": {
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-root": {
        "title": "Catheter Directed Thrombolysis (PE/DVT/frostbite) - SEE ORDER SET",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-pre",
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-intra",
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-post",
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-indication",
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-labs",
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-anticoag",
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-exam"
        ],
        "checklist": [
          "Admit to ICU (if SICU IR covers)",
          "NPO (moderate sedation)",
          "Anti-Xa Q6 x 24 hrs",
          "APTT Q6 x 24 hrs",
          "CBC Q6 x 24 hrs",
          "Fibrinogen Q6 x 24 hrs",
          "INR includes PT Q6 x 24 hrs",
          "Indwelling Urinary Catheter",
          "Notify MD/LIP - Fibrinogen < 200 mg/dL",
          "Notify MD/LIP - APTT > 50 sec",
          "Notify MD/LIP - INR > 1.7 sec",
          "Notify MD/LIP - Platelets < 100,000/m3",
          "One infusion catheter and sheath:",
          "Heparin (FLAT RATE) at 500 units/hr (1 order)",
          "Sodium chloride infusion 20 mL/hr (1 order)",
          "Alteplase 1 mg/hr (1 order)",
          "Two infusion catheters and sheaths (Site A and Site B):",
          "Heparin (FLAT RATE) at 250 unit/hr (2 orders)",
          "Sodium chloride infusion 20 mL/hr (2 orders)",
          "Alteplase 0.5 mg/hr (2 orders)",
          "Two infusion catheters through one sheath:",
          "Heparin (FLAT RATE) at 500 units/hr (1 order)",
          "Sodium chloride infusion 20 mL/hr (2 orders)",
          "Alteplase 0.5 mg/hr (2 orders)"
        ]
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "No lab guidance was extracted for this procedure.",
        "details": {
          "PDF lab guidance": [
            "No lab guidance extracted; verify local policy."
          ]
        }
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-intra-placeholder"
        ]
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-post-orders",
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-restart",
          "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-follow-up"
        ]
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Do not order diet – sign out to team if okay",
          "Activity:",
          "FEMORAL: Bedrest, LE extended",
          "Monitor Color of Access Site",
          "Neurovascular checks – Q1hr x 6hrs, then Q2hrs for up to 24 hours after completion",
          "Vital signs - Q15 minutes x 4, Q30 minutes x 2, Q1 hour x 2 and then Q2 hours until completion of thrombolytic infusion",
          "Tylenol 650 mg PRN",
          "Notes:",
          "See pre-procedure orders, update to reflect infusion set up at the end of the procedure and lab parameters per attending physician",
          "Sign out to primary team to place IR Venous Intervention Order and NPO at midnight for thrombolysis catheter check/removal the following day"
        ]
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "celiac-plexus-block-neurolysis",
    "title": "Celiac Plexus Block/Neurolysis",
    "category": "IR procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "celiac-plexus-block-neurolysis-root",
    "nodes": {
      "celiac-plexus-block-neurolysis-root": {
        "title": "Celiac Plexus Block/Neurolysis",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "celiac-plexus-block-neurolysis-pre",
          "celiac-plexus-block-neurolysis-intra",
          "celiac-plexus-block-neurolysis-post",
          "celiac-plexus-block-neurolysis-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "celiac-plexus-block-neurolysis-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "celiac-plexus-block-neurolysis-indication",
          "celiac-plexus-block-neurolysis-labs",
          "celiac-plexus-block-neurolysis-anticoag",
          "celiac-plexus-block-neurolysis-exam"
        ],
        "checklist": [
          "Bedded Outpatient",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "celiac-plexus-block-neurolysis-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "celiac-plexus-block-neurolysis-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "celiac-plexus-block-neurolysis-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "celiac-plexus-block-neurolysis-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "celiac-plexus-block-neurolysis-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "celiac-plexus-block-neurolysis-intra-placeholder"
        ]
      },
      "celiac-plexus-block-neurolysis-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "celiac-plexus-block-neurolysis-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "celiac-plexus-block-neurolysis-post-orders",
          "celiac-plexus-block-neurolysis-restart",
          "celiac-plexus-block-neurolysis-follow-up"
        ]
      },
      "celiac-plexus-block-neurolysis-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – Every 15 minutes x 4",
          "Wound care/treatment",
          "Tylenol 650 mg PRN",
          "Admit to inpatient (see work flow sheet)",
          "After visit summary: .IRAVSNEUROLYSIS",
          "Follow up: PPD1 check and 1 month clinic or per MD"
        ]
      },
      "celiac-plexus-block-neurolysis-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "celiac-plexus-block-neurolysis-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "celiac-plexus-block-neurolysis-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "chest-tube-placement",
    "title": "Chest Tube Placement",
    "category": "Drain / tube procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "chest-tube-placement-root",
    "nodes": {
      "chest-tube-placement-root": {
        "title": "Chest Tube Placement",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "chest-tube-placement-pre",
          "chest-tube-placement-intra",
          "chest-tube-placement-post",
          "chest-tube-placement-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "chest-tube-placement-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "chest-tube-placement-indication",
          "chest-tube-placement-labs",
          "chest-tube-placement-anticoag",
          "chest-tube-placement-exam"
        ],
        "checklist": [
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "chest-tube-placement-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "chest-tube-placement-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated"
          ]
        }
      },
      "chest-tube-placement-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "chest-tube-placement-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "chest-tube-placement-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "chest-tube-placement-intra-placeholder"
        ]
      },
      "chest-tube-placement-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "chest-tube-placement-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "chest-tube-placement-post-orders",
          "chest-tube-placement-restart",
          "chest-tube-placement-follow-up"
        ]
      },
      "chest-tube-placement-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Admit to inpatient (if not already admitted)",
          "Follow up: Follow output/CXR for possible removal"
        ]
      },
      "chest-tube-placement-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "chest-tube-placement-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "chest-tube-placement-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "cholecystostomy-biliary-drain-placement-exchange-internalization",
    "title": "Cholecystostomy/Biliary Drain Placement/Exchange/Internalization",
    "category": "Drain / tube procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "cholecystostomy-biliary-drain-placement-exchange-internalization-root",
    "nodes": {
      "cholecystostomy-biliary-drain-placement-exchange-internalization-root": {
        "title": "Cholecystostomy/Biliary Drain Placement/Exchange/Internalization",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "cholecystostomy-biliary-drain-placement-exchange-internalization-pre",
          "cholecystostomy-biliary-drain-placement-exchange-internalization-intra",
          "cholecystostomy-biliary-drain-placement-exchange-internalization-post",
          "cholecystostomy-biliary-drain-placement-exchange-internalization-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "cholecystostomy-biliary-drain-placement-exchange-internalization-indication",
          "cholecystostomy-biliary-drain-placement-exchange-internalization-labs",
          "cholecystostomy-biliary-drain-placement-exchange-internalization-anticoag",
          "cholecystostomy-biliary-drain-placement-exchange-internalization-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation or anesthesia)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Antibiotics per most recent biliary culture, if no recent culture, then per protocol"
        ]
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days for placement; no labs needed for exchange/conversion",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days for placement; no labs needed for exchange/conversion"
          ]
        }
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "cholecystostomy-biliary-drain-placement-exchange-internalization-intra-placeholder"
        ]
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "cholecystostomy-biliary-drain-placement-exchange-internalization-post-orders",
          "cholecystostomy-biliary-drain-placement-exchange-internalization-restart",
          "cholecystostomy-biliary-drain-placement-exchange-internalization-follow-up"
        ]
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Pigtail drain – flush orders",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSCHOLETUBEORBILIARYDRAIN1",
          "Follow up: Routine exchange in 2-3 months or per MD, flush 10 cc NS daily"
        ]
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "cholecystostomy-biliary-drain-placement-exchange-internalization-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "cholangioscopy-with-lithotripsy-and-biliary-stone-removal",
    "title": "Cholangioscopy with Lithotripsy and Biliary Stone Removal",
    "category": "Drain / tube procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-root",
    "nodes": {
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-root": {
        "title": "Cholangioscopy with Lithotripsy and Biliary Stone Removal",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-pre",
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-intra",
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-post",
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-indication",
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-labs",
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-anticoag",
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation or anesthesia)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Antibiotics per most recent biliary culture, if no recent culture, then per protocol"
        ]
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-intra-placeholder"
        ]
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-post-orders",
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-restart",
          "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-follow-up"
        ]
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Pigtail drain – flush orders",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSCHOLETUBEORBILIARYDRAIN1",
          "Follow up: Repeat intervention per MD or drain check/clinic for drain removal"
        ]
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "cholangioscopy-with-lithotripsy-and-biliary-stone-removal-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "drainage-catheter-placement-exchange",
    "title": "Drainage Catheter Placement/Exchange",
    "category": "Drain / tube procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "drainage-catheter-placement-exchange-root",
    "nodes": {
      "drainage-catheter-placement-exchange-root": {
        "title": "Drainage Catheter Placement/Exchange",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "drainage-catheter-placement-exchange-pre",
          "drainage-catheter-placement-exchange-intra",
          "drainage-catheter-placement-exchange-post",
          "drainage-catheter-placement-exchange-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "drainage-catheter-placement-exchange-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "drainage-catheter-placement-exchange-indication",
          "drainage-catheter-placement-exchange-labs",
          "drainage-catheter-placement-exchange-anticoag",
          "drainage-catheter-placement-exchange-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "drainage-catheter-placement-exchange-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "drainage-catheter-placement-exchange-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days for deep placement (pelvic, abdominal, RP); no labs needed for exchange",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days for deep placement (pelvic, abdominal, RP); no labs needed for exchange"
          ]
        }
      },
      "drainage-catheter-placement-exchange-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "drainage-catheter-placement-exchange-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "drainage-catheter-placement-exchange-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "drainage-catheter-placement-exchange-intra-placeholder"
        ]
      },
      "drainage-catheter-placement-exchange-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "drainage-catheter-placement-exchange-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "drainage-catheter-placement-exchange-post-orders",
          "drainage-catheter-placement-exchange-restart",
          "drainage-catheter-placement-exchange-follow-up"
        ]
      },
      "drainage-catheter-placement-exchange-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Pigtail drain – flush orders",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSPERCDRAINAGE1",
          "Follow up: CT and drain check in 2 weeks unless otherwise specified by MD, record output, flush 10cc NS daily"
        ]
      },
      "drainage-catheter-placement-exchange-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "drainage-catheter-placement-exchange-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "drainage-catheter-placement-exchange-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "fallopian-tube-recanalization",
    "title": "Fallopian Tube Recanalization",
    "category": "Drain / tube procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "fallopian-tube-recanalization-root",
    "nodes": {
      "fallopian-tube-recanalization-root": {
        "title": "Fallopian Tube Recanalization",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "fallopian-tube-recanalization-pre",
          "fallopian-tube-recanalization-intra",
          "fallopian-tube-recanalization-post",
          "fallopian-tube-recanalization-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "fallopian-tube-recanalization-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "fallopian-tube-recanalization-indication",
          "fallopian-tube-recanalization-labs",
          "fallopian-tube-recanalization-anticoag",
          "fallopian-tube-recanalization-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Cefazolin (Ancef) 2g if < 120kg, 3g if >120 kg"
        ]
      },
      "fallopian-tube-recanalization-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "fallopian-tube-recanalization-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated Schedule on day 6-10 of menstrual cycle Begin taking doxycycline 100 mg BID 2 days prior to the procedure and continue for 5 days total",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated Schedule on day 6-10 of menstrual cycle Begin taking doxycycline 100 mg BID 2 days prior to the procedure and continue for 5 days total"
          ]
        }
      },
      "fallopian-tube-recanalization-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "fallopian-tube-recanalization-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "fallopian-tube-recanalization-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "fallopian-tube-recanalization-intra-placeholder"
        ]
      },
      "fallopian-tube-recanalization-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "fallopian-tube-recanalization-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "fallopian-tube-recanalization-post-orders",
          "fallopian-tube-recanalization-restart",
          "fallopian-tube-recanalization-follow-up"
        ]
      },
      "fallopian-tube-recanalization-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "AVS: .IRAVSFALLOPIANTUBERECAN",
          "Follow up: GYN for repeat HSG if she does not conceive in 6-7 months"
        ]
      },
      "fallopian-tube-recanalization-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "fallopian-tube-recanalization-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "fallopian-tube-recanalization-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "fistulogram",
    "title": "Fistulogram",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "fistulogram-root",
    "nodes": {
      "fistulogram-root": {
        "title": "Fistulogram",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "fistulogram-pre",
          "fistulogram-intra",
          "fistulogram-post",
          "fistulogram-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "fistulogram-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "fistulogram-indication",
          "fistulogram-labs",
          "fistulogram-anticoag",
          "fistulogram-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "fistulogram-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "fistulogram-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "VBG with lytes (K < 6 without hemolysis) Physical exam – check thrill/pulsatility/bruit",
        "details": {
          "PDF lab guidance": [
            "VBG with lytes (K < 6 without hemolysis) Physical exam – check thrill/pulsatility/bruit"
          ]
        }
      },
      "fistulogram-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "fistulogram-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "fistulogram-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "fistulogram-intra-placeholder"
        ]
      },
      "fistulogram-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "fistulogram-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "fistulogram-post-orders",
          "fistulogram-restart",
          "fistulogram-follow-up"
        ]
      },
      "fistulogram-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSFISTULOGRAM Remove suture device if needed then return to HD"
        ]
      },
      "fistulogram-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "fistulogram-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "fistulogram-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "foreign-body-removal",
    "title": "Foreign Body Removal",
    "category": "IR procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "foreign-body-removal-root",
    "nodes": {
      "foreign-body-removal-root": {
        "title": "Foreign Body Removal",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "foreign-body-removal-pre",
          "foreign-body-removal-intra",
          "foreign-body-removal-post",
          "foreign-body-removal-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "foreign-body-removal-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "foreign-body-removal-indication",
          "foreign-body-removal-labs",
          "foreign-body-removal-anticoag",
          "foreign-body-removal-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "Vital signs: Per routine"
        ]
      },
      "foreign-body-removal-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "foreign-body-removal-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None needed unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None needed unless further indicated"
          ]
        }
      },
      "foreign-body-removal-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "foreign-body-removal-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "foreign-body-removal-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "foreign-body-removal-intra-placeholder"
        ]
      },
      "foreign-body-removal-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "foreign-body-removal-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "foreign-body-removal-post-orders",
          "foreign-body-removal-restart",
          "foreign-body-removal-follow-up"
        ]
      },
      "foreign-body-removal-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - immediate",
          "AVS: .IRAVSFOREIGNBODYREMOVAL"
        ]
      },
      "foreign-body-removal-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "foreign-body-removal-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "foreign-body-removal-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement",
    "title": "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Placement",
    "category": "Drain / tube procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-root",
    "nodes": {
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-root": {
        "title": "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Placement",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-pre",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-intra",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-post",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-indication",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-labs",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-anticoag",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-exam"
        ],
        "checklist": [
          "Bedded outpatient",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Cefazolin (Ancef) 2g if < 120kg, 3g if >120 kg"
        ]
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days",
            "Notes: Barium administered/drank the night prior, NG tube in place for IP"
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-intra-placeholder"
        ]
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-post-orders",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-restart",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-follow-up"
        ]
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "NO DIET – do not use tube or intake PO until cleared by IR on PPD1",
          "Feeding tube: PEG and G tube",
          "Vital signs – per unit routine",
          "Admit to inpatient (see work flow sheet)",
          "AVS: .IRAVSGASTROSTOMY or .IRAVSGJTUBE or .IRAVSJTUBE",
          "PULL TYPE: 500 mg Keflex BID x 5 days",
          "Follow up: PPD1 check and progress note; 6 month routine exchange for balloon retention device ***OF NOTE: when giving signout to admitting team, remind them to place a nutrition consult***"
        ]
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-placement-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange",
    "title": "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Exchange",
    "category": "Drain / tube procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-root",
    "nodes": {
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-root": {
        "title": "Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Exchange",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-pre",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-intra",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-post",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-indication",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-labs",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-anticoag",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (local only)",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated"
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-intra-placeholder"
        ]
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-post-orders",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-restart",
          "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-follow-up"
        ]
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet – tube feeds",
          "Feeding tube: PEG and G tube",
          "Vital signs – per unit routine",
          "Discharge order (med rec prior) - immediate",
          "AVS: .IRAVSGASTROSTOMYTUBEEXCHANGE or .IRAVSGJTUBEEXCHANGE or .IRAVSJTUBEEXCHANGE",
          "Follow up: 6 month routine exchange"
        ]
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "genicular-artery-embolization",
    "title": "Genicular Artery Embolization",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "genicular-artery-embolization-root",
    "nodes": {
      "genicular-artery-embolization-root": {
        "title": "Genicular Artery Embolization",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "genicular-artery-embolization-pre",
          "genicular-artery-embolization-intra",
          "genicular-artery-embolization-post",
          "genicular-artery-embolization-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "genicular-artery-embolization-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "genicular-artery-embolization-indication",
          "genicular-artery-embolization-labs",
          "genicular-artery-embolization-anticoag",
          "genicular-artery-embolization-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "genicular-artery-embolization-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "genicular-artery-embolization-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "genicular-artery-embolization-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "genicular-artery-embolization-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "genicular-artery-embolization-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "genicular-artery-embolization-intra-placeholder"
        ]
      },
      "genicular-artery-embolization-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "genicular-artery-embolization-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "genicular-artery-embolization-post-orders",
          "genicular-artery-embolization-restart",
          "genicular-artery-embolization-follow-up"
        ]
      },
      "genicular-artery-embolization-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: bedrest, 2-6 hours LE extended",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSGAE",
          "Discharge med: Naproxen 500mg BID x 5d PRN",
          "Follow up: 1 month clinic visit"
        ]
      },
      "genicular-artery-embolization-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "genicular-artery-embolization-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "genicular-artery-embolization-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "hemorrhoid-artery-embolization",
    "title": "Hemorrhoid Artery Embolization",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "hemorrhoid-artery-embolization-root",
    "nodes": {
      "hemorrhoid-artery-embolization-root": {
        "title": "Hemorrhoid Artery Embolization",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "hemorrhoid-artery-embolization-pre",
          "hemorrhoid-artery-embolization-intra",
          "hemorrhoid-artery-embolization-post",
          "hemorrhoid-artery-embolization-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "hemorrhoid-artery-embolization-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "hemorrhoid-artery-embolization-indication",
          "hemorrhoid-artery-embolization-labs",
          "hemorrhoid-artery-embolization-anticoag",
          "hemorrhoid-artery-embolization-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care"
        ]
      },
      "hemorrhoid-artery-embolization-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "hemorrhoid-artery-embolization-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "hemorrhoid-artery-embolization-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "hemorrhoid-artery-embolization-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "hemorrhoid-artery-embolization-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "hemorrhoid-artery-embolization-intra-placeholder"
        ]
      },
      "hemorrhoid-artery-embolization-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "hemorrhoid-artery-embolization-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "hemorrhoid-artery-embolization-post-orders",
          "hemorrhoid-artery-embolization-restart",
          "hemorrhoid-artery-embolization-follow-up"
        ]
      },
      "hemorrhoid-artery-embolization-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSHEMORRHOID",
          "Follow up: Clinic visit in 1 month with MD"
        ]
      },
      "hemorrhoid-artery-embolization-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "hemorrhoid-artery-embolization-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "hemorrhoid-artery-embolization-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "inferior-vena-cava-filter-placement",
    "title": "Inferior Vena Cava Filter Placement",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "inferior-vena-cava-filter-placement-root",
    "nodes": {
      "inferior-vena-cava-filter-placement-root": {
        "title": "Inferior Vena Cava Filter Placement",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "inferior-vena-cava-filter-placement-pre",
          "inferior-vena-cava-filter-placement-intra",
          "inferior-vena-cava-filter-placement-post",
          "inferior-vena-cava-filter-placement-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "inferior-vena-cava-filter-placement-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "inferior-vena-cava-filter-placement-indication",
          "inferior-vena-cava-filter-placement-labs",
          "inferior-vena-cava-filter-placement-anticoag",
          "inferior-vena-cava-filter-placement-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (local only vs moderate sedation)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "inferior-vena-cava-filter-placement-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "inferior-vena-cava-filter-placement-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated"
          ]
        }
      },
      "inferior-vena-cava-filter-placement-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "inferior-vena-cava-filter-placement-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "inferior-vena-cava-filter-placement-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "inferior-vena-cava-filter-placement-intra-placeholder"
        ]
      },
      "inferior-vena-cava-filter-placement-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "inferior-vena-cava-filter-placement-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "inferior-vena-cava-filter-placement-post-orders",
          "inferior-vena-cava-filter-placement-restart",
          "inferior-vena-cava-filter-placement-follow-up"
        ]
      },
      "inferior-vena-cava-filter-placement-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Elevate HOB: > 45 degrees for recovery",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSVENOGRAM",
          "Follow up: 3 month clinic visit"
        ]
      },
      "inferior-vena-cava-filter-placement-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "inferior-vena-cava-filter-placement-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "inferior-vena-cava-filter-placement-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "inferior-vena-cava-filter-removal",
    "title": "Inferior Vena Cava Filter Removal",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "inferior-vena-cava-filter-removal-root",
    "nodes": {
      "inferior-vena-cava-filter-removal-root": {
        "title": "Inferior Vena Cava Filter Removal",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "inferior-vena-cava-filter-removal-pre",
          "inferior-vena-cava-filter-removal-intra",
          "inferior-vena-cava-filter-removal-post",
          "inferior-vena-cava-filter-removal-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "inferior-vena-cava-filter-removal-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "inferior-vena-cava-filter-removal-indication",
          "inferior-vena-cava-filter-removal-labs",
          "inferior-vena-cava-filter-removal-anticoag",
          "inferior-vena-cava-filter-removal-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "inferior-vena-cava-filter-removal-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "inferior-vena-cava-filter-removal-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated; CBC and INR within 30 days for complex retrieval ONLY Continue anticoagulation unless complex retrieval",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated; CBC and INR within 30 days for complex retrieval ONLY Continue anticoagulation unless complex retrieval"
          ]
        }
      },
      "inferior-vena-cava-filter-removal-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "inferior-vena-cava-filter-removal-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "inferior-vena-cava-filter-removal-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "inferior-vena-cava-filter-removal-intra-placeholder"
        ]
      },
      "inferior-vena-cava-filter-removal-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "inferior-vena-cava-filter-removal-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "inferior-vena-cava-filter-removal-post-orders",
          "inferior-vena-cava-filter-removal-restart",
          "inferior-vena-cava-filter-removal-follow-up"
        ]
      },
      "inferior-vena-cava-filter-removal-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Elevate HOB: > 45 degrees for recovery",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSVENOGRAM"
        ]
      },
      "inferior-vena-cava-filter-removal-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "inferior-vena-cava-filter-removal-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "inferior-vena-cava-filter-removal-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "kidney-ablation",
    "title": "Kidney Ablation",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "kidney-ablation-root",
    "nodes": {
      "kidney-ablation-root": {
        "title": "Kidney Ablation",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "kidney-ablation-pre",
          "kidney-ablation-intra",
          "kidney-ablation-post",
          "kidney-ablation-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "kidney-ablation-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "kidney-ablation-indication",
          "kidney-ablation-labs",
          "kidney-ablation-anticoag",
          "kidney-ablation-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation vs anesthesia)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "kidney-ablation-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "kidney-ablation-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC day of always, INR and BMP within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC day of always, INR and BMP within 30 days"
          ]
        }
      },
      "kidney-ablation-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "kidney-ablation-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "kidney-ablation-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "kidney-ablation-intra-placeholder"
        ]
      },
      "kidney-ablation-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "kidney-ablation-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "kidney-ablation-post-orders",
          "kidney-ablation-restart",
          "kidney-ablation-follow-up"
        ]
      },
      "kidney-ablation-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 1",
          "Wound care/treatment",
          "Tylenol 650 mg PRN",
          "Oxycodone PRN pain scale",
          "Zofran 4mg IV PRN",
          "Discharge order (med rec prior) - 3 hours",
          "After visit summary: .IRAVSRENALABLATION",
          "Follow up: Clinic in 1 month with CT/MRI renal mass"
        ]
      },
      "kidney-ablation-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "kidney-ablation-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "kidney-ablation-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "kidney-biopsy",
    "title": "Kidney Biopsy",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "kidney-biopsy-root",
    "nodes": {
      "kidney-biopsy-root": {
        "title": "Kidney Biopsy",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "kidney-biopsy-pre",
          "kidney-biopsy-intra",
          "kidney-biopsy-post",
          "kidney-biopsy-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "kidney-biopsy-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "kidney-biopsy-indication",
          "kidney-biopsy-labs",
          "kidney-biopsy-anticoag",
          "kidney-biopsy-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "kidney-biopsy-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "kidney-biopsy-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC day of always, INR and BMP within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC day of always, INR and BMP within 30 days",
            "BP < 160/90",
            "INR < 1.5",
            "Hemoglobin > 9.0",
            "If BUN > 50 give DDAVP Pathology present for non-focal"
          ]
        }
      },
      "kidney-biopsy-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "kidney-biopsy-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "kidney-biopsy-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "kidney-biopsy-intra-placeholder"
        ]
      },
      "kidney-biopsy-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "kidney-biopsy-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "kidney-biopsy-post-orders",
          "kidney-biopsy-restart",
          "kidney-biopsy-follow-up"
        ]
      },
      "kidney-biopsy-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 1",
          "Tylenol 650 mg PRN",
          "Wound care/treatment",
          "Discharge order (med rec prior) - 3 hours",
          "After visit summary: .IRAVSKIDNEYBX",
          "HonShideler – Activity order bedrest x 90 minutes",
          "Daly – Activity order bedrest x 1 hour"
        ]
      },
      "kidney-biopsy-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "kidney-biopsy-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "kidney-biopsy-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "kidney-embolization",
    "title": "Kidney Embolization",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "kidney-embolization-root",
    "nodes": {
      "kidney-embolization-root": {
        "title": "Kidney Embolization",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "kidney-embolization-pre",
          "kidney-embolization-intra",
          "kidney-embolization-post",
          "kidney-embolization-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "kidney-embolization-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "kidney-embolization-indication",
          "kidney-embolization-labs",
          "kidney-embolization-anticoag",
          "kidney-embolization-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care"
        ]
      },
      "kidney-embolization-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "kidney-embolization-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR and BMP within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC, INR and BMP within 30 days"
          ]
        }
      },
      "kidney-embolization-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "kidney-embolization-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "kidney-embolization-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "kidney-embolization-intra-placeholder"
        ]
      },
      "kidney-embolization-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "kidney-embolization-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "kidney-embolization-post-orders",
          "kidney-embolization-restart",
          "kidney-embolization-follow-up"
        ]
      },
      "kidney-embolization-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSRENALARTERYANGIO",
          "Follow up: PPD1 if admitted or outpatient per MD"
        ]
      },
      "kidney-embolization-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "kidney-embolization-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "kidney-embolization-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "liver-ablation",
    "title": "Liver Ablation",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "liver-ablation-root",
    "nodes": {
      "liver-ablation-root": {
        "title": "Liver Ablation",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "liver-ablation-pre",
          "liver-ablation-intra",
          "liver-ablation-post",
          "liver-ablation-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "liver-ablation-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "liver-ablation-indication",
          "liver-ablation-labs",
          "liver-ablation-anticoag",
          "liver-ablation-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation vs anesthesia)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care",
          "Cefazolin (Ancef) 2g if < 120kg, 3g if >120 kg",
          "Metronidazole (Flagyl) 500mg IV"
        ]
      },
      "liver-ablation-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "liver-ablation-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR, CMP, AFP (if HCC) day of always",
        "details": {
          "PDF lab guidance": [
            "CBC, INR, CMP, AFP (if HCC) day of always"
          ]
        }
      },
      "liver-ablation-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "liver-ablation-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "liver-ablation-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "liver-ablation-intra-placeholder"
        ]
      },
      "liver-ablation-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "liver-ablation-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "liver-ablation-post-orders",
          "liver-ablation-restart",
          "liver-ablation-follow-up"
        ]
      },
      "liver-ablation-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 1",
          "Wound care/treatment",
          "Tylenol 650 mg PRN",
          "Oxycodone PRN pain scale",
          "Zofran 4mg IV PRN",
          "Discharge order (med rec prior) - 3 hours",
          "After visit summary: .IRAVSABLATIONLIVER1",
          "Follow up: Clinic visit in 1 month with MRI liver mass and labs (CBC, INR, CMP, AFP if HCC)"
        ]
      },
      "liver-ablation-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "liver-ablation-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "liver-ablation-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "liver-biopsy-fiducial-marker-placement",
    "title": "Liver Biopsy/Fiducial Marker Placement",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "liver-biopsy-fiducial-marker-placement-root",
    "nodes": {
      "liver-biopsy-fiducial-marker-placement-root": {
        "title": "Liver Biopsy/Fiducial Marker Placement",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "liver-biopsy-fiducial-marker-placement-pre",
          "liver-biopsy-fiducial-marker-placement-intra",
          "liver-biopsy-fiducial-marker-placement-post",
          "liver-biopsy-fiducial-marker-placement-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "liver-biopsy-fiducial-marker-placement-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "liver-biopsy-fiducial-marker-placement-indication",
          "liver-biopsy-fiducial-marker-placement-labs",
          "liver-biopsy-fiducial-marker-placement-anticoag",
          "liver-biopsy-fiducial-marker-placement-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "liver-biopsy-fiducial-marker-placement-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "liver-biopsy-fiducial-marker-placement-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "liver-biopsy-fiducial-marker-placement-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "liver-biopsy-fiducial-marker-placement-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "liver-biopsy-fiducial-marker-placement-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "liver-biopsy-fiducial-marker-placement-intra-placeholder"
        ]
      },
      "liver-biopsy-fiducial-marker-placement-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "liver-biopsy-fiducial-marker-placement-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "liver-biopsy-fiducial-marker-placement-post-orders",
          "liver-biopsy-fiducial-marker-placement-restart",
          "liver-biopsy-fiducial-marker-placement-follow-up"
        ]
      },
      "liver-biopsy-fiducial-marker-placement-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Wound care/treatment",
          "Vital signs – Every 15 minutes x 4, then every 30 minutes x 1",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1.5 hours",
          "After visit summary: .IRAVSLIVERBX Liver Embolization – Neuroendocrine Tumor (Bland) Pre-Procedure Post-Procedure",
          "Bedded outpatient",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care",
          "Octreotide 500 mcg subQ",
          "Loratadine 10 mg PO",
          "Pepcid 20 mg IV",
          "Dexamethasone 8 mg IV",
          "Zofran 4 mg IV",
          "Cefazolin (Ancef) 2g if < 120kg, 3g if >120 kg",
          "Metronidazole (Flagyl) 500mg IV",
          "Labs: CBC, INR, CMP day of always See protocol for details",
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Admit to inpatient",
          "AVS: .IRAVSLIVEREMBOBLAND",
          "Follow up: Clinic visit in 1 month with MRI liver mass and labs (INR, CMP, CBC) unless scheduling repeat treatment per performing physician"
        ]
      },
      "liver-biopsy-fiducial-marker-placement-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "liver-biopsy-fiducial-marker-placement-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "liver-biopsy-fiducial-marker-placement-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "lung-biopsy-fiducial-marker-placement",
    "title": "Lung Biopsy/Fiducial Marker Placement",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "lung-biopsy-fiducial-marker-placement-root",
    "nodes": {
      "lung-biopsy-fiducial-marker-placement-root": {
        "title": "Lung Biopsy/Fiducial Marker Placement",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "lung-biopsy-fiducial-marker-placement-pre",
          "lung-biopsy-fiducial-marker-placement-intra",
          "lung-biopsy-fiducial-marker-placement-post",
          "lung-biopsy-fiducial-marker-placement-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "lung-biopsy-fiducial-marker-placement-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "lung-biopsy-fiducial-marker-placement-indication",
          "lung-biopsy-fiducial-marker-placement-labs",
          "lung-biopsy-fiducial-marker-placement-anticoag",
          "lung-biopsy-fiducial-marker-placement-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "lung-biopsy-fiducial-marker-placement-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "lung-biopsy-fiducial-marker-placement-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "lung-biopsy-fiducial-marker-placement-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "lung-biopsy-fiducial-marker-placement-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "lung-biopsy-fiducial-marker-placement-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "lung-biopsy-fiducial-marker-placement-intra-placeholder"
        ]
      },
      "lung-biopsy-fiducial-marker-placement-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "lung-biopsy-fiducial-marker-placement-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "lung-biopsy-fiducial-marker-placement-post-orders",
          "lung-biopsy-fiducial-marker-placement-restart",
          "lung-biopsy-fiducial-marker-placement-follow-up"
        ]
      },
      "lung-biopsy-fiducial-marker-placement-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "CXR STAT and 3 hours post (indicate 1 of 2",
          "and 2 of 2 in order comments)",
          "Diet:",
          "NPO until 1st CXR",
          "After 1st CXR – Clear liquids",
          "After 2nd CXR – Regular diet and discharge",
          "Vital signs – Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 1",
          "Wound care/treatment",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 3 hours",
          "After visit summary: .IRAVSLUNGBX If chest tube placement indicated – place IR Chest",
          "Tube order and admit to inpatient"
        ]
      },
      "lung-biopsy-fiducial-marker-placement-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "lung-biopsy-fiducial-marker-placement-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "lung-biopsy-fiducial-marker-placement-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "lung-ablation",
    "title": "Lung Ablation",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "lung-ablation-root",
    "nodes": {
      "lung-ablation-root": {
        "title": "Lung Ablation",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "lung-ablation-pre",
          "lung-ablation-intra",
          "lung-ablation-post",
          "lung-ablation-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "lung-ablation-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "lung-ablation-indication",
          "lung-ablation-labs",
          "lung-ablation-anticoag",
          "lung-ablation-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge OR bedded",
          "outpatient (no discharge order if admit)",
          "NPO (anesthesia)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care",
          "Cefazolin (Ancef) 2g if < 120kg, 3g if >120 kg"
        ]
      },
      "lung-ablation-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "lung-ablation-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "lung-ablation-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "lung-ablation-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "lung-ablation-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "lung-ablation-intra-placeholder"
        ]
      },
      "lung-ablation-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "lung-ablation-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "lung-ablation-post-orders",
          "lung-ablation-restart",
          "lung-ablation-follow-up"
        ]
      },
      "lung-ablation-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "CXR STAT and 3 hours post (indicate 1 of 2",
          "and 2 of 2 in order comments)",
          "Diet:",
          "NPO until 1st CXR",
          "After 1st CXR – Clear liquids",
          "After 2nd CXR – Regular diet and discharge",
          "Vital signs – Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 1",
          "Tylenol 650 mg PRN",
          "Toradol 15-30 mg IV x 1",
          "Wound care/treatment",
          "Discharge order (med rec prior) - 3 hours",
          "After visit summary: .IRAVSABLATIONLUNG If chest tube placement indicated – place IR Chest",
          "Tube order and admit to inpatient",
          "Follow up: CT Chest without Contrast at 1 and 3 months, PETCT at 6 months Lymph Node Biopsy – DEEP Pre-Procedure Post-Procedure",
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care",
          "Labs: CBC and INR within 30 days Cytology present if requested by MD",
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – Every 15 minutes x 4, then every 30 minutes x 1",
          "Wound care/treatment",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1.5 hours",
          "After visit summary: .IRAVSBIOPSYDEEP Lymph Node Biopsy – SUPERFICIAL Pre-Procedure Post-Procedure",
          "SDC/Outpatient with Discharge",
          "Vital signs: Per routine",
          "Labs: None unless further indicated Cytology present if requested by MD",
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - immediate",
          "After visit summary: .IRAVSBIOPSYSUPERFICIAL"
        ]
      },
      "lung-ablation-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "lung-ablation-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "lung-ablation-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion",
    "title": "Nephrostomy/Nephroureteral Catheter/JJ Stent Placement/Exchange/Conversion",
    "category": "Drain / tube procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-root",
    "nodes": {
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-root": {
        "title": "Nephrostomy/Nephroureteral Catheter/JJ Stent Placement/Exchange/Conversion",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-pre",
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-intra",
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-post",
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-indication",
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-labs",
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-anticoag",
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Antibiotics per most recent urine culture, if no recent culture, then per protocol"
        ]
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days for placement; no labs needed for exchange/conversion",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days for placement; no labs needed for exchange/conversion"
          ]
        }
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-intra-placeholder"
        ]
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-post-orders",
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-restart",
          "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-follow-up"
        ]
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "AVS: .IRAVSPCN1 or .IRAVSPCNEXCHANGE or .IRAVSPCNU or .IRAVSPCNUEXCHANGE or .IRAVSJJSTENTPLACEMENT",
          "Follow up: Routine exchange in 3 months unless otherwise specified per MD"
        ]
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "paracentesis",
    "title": "Paracentesis",
    "category": "Fluid drainage",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "paracentesis-root",
    "nodes": {
      "paracentesis-root": {
        "title": "Paracentesis",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "paracentesis-pre",
          "paracentesis-intra",
          "paracentesis-post",
          "paracentesis-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "paracentesis-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "paracentesis-indication",
          "paracentesis-labs",
          "paracentesis-anticoag",
          "paracentesis-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "Vital signs: Per routine",
          "Peripheral line placement – if cirrhosis with recent large volume paracentesis"
        ]
      },
      "paracentesis-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "paracentesis-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated"
          ]
        }
      },
      "paracentesis-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "paracentesis-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "paracentesis-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "paracentesis-intra-placeholder"
        ]
      },
      "paracentesis-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "paracentesis-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "paracentesis-post-orders",
          "paracentesis-restart",
          "paracentesis-follow-up"
        ]
      },
      "paracentesis-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Albumin for cirrhosis 6-8 g per liter > 5 liters",
          "Discharge order (med rec prior) - immediate",
          "After visit summary: .IRAVSPARACENTESIS"
        ]
      },
      "paracentesis-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "paracentesis-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "paracentesis-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "parathyroid-venous-sampling",
    "title": "Parathyroid Venous Sampling",
    "category": "IR procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "parathyroid-venous-sampling-root",
    "nodes": {
      "parathyroid-venous-sampling-root": {
        "title": "Parathyroid Venous Sampling",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "parathyroid-venous-sampling-pre",
          "parathyroid-venous-sampling-intra",
          "parathyroid-venous-sampling-post",
          "parathyroid-venous-sampling-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "parathyroid-venous-sampling-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "parathyroid-venous-sampling-indication",
          "parathyroid-venous-sampling-labs",
          "parathyroid-venous-sampling-anticoag",
          "parathyroid-venous-sampling-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Foley catheter placement (intraprocedure)"
        ]
      },
      "parathyroid-venous-sampling-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "parathyroid-venous-sampling-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "No pre-procedure labs unless further indicated",
        "details": {
          "PDF lab guidance": [
            "No pre-procedure labs unless further indicated",
            "See full protocol for supplies and workflow"
          ]
        }
      },
      "parathyroid-venous-sampling-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "parathyroid-venous-sampling-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "parathyroid-venous-sampling-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "parathyroid-venous-sampling-intra-placeholder"
        ]
      },
      "parathyroid-venous-sampling-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "parathyroid-venous-sampling-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "parathyroid-venous-sampling-post-orders",
          "parathyroid-venous-sampling-restart",
          "parathyroid-venous-sampling-follow-up"
        ]
      },
      "parathyroid-venous-sampling-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity – Femoral: 2 hours LE extended",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2 hours",
          "After visit summary: .IRAVSVENOGRAM"
        ]
      },
      "parathyroid-venous-sampling-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "parathyroid-venous-sampling-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "parathyroid-venous-sampling-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "picc-placement",
    "title": "PICC Placement",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "picc-placement-root",
    "nodes": {
      "picc-placement-root": {
        "title": "PICC Placement",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "picc-placement-pre",
          "picc-placement-intra",
          "picc-placement-post",
          "picc-placement-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "picc-placement-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "picc-placement-indication",
          "picc-placement-labs",
          "picc-placement-anticoag",
          "picc-placement-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "Vital signs: Per routine"
        ]
      },
      "picc-placement-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "picc-placement-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated"
          ]
        }
      },
      "picc-placement-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "picc-placement-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "picc-placement-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "picc-placement-intra-placeholder"
        ]
      },
      "picc-placement-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "picc-placement-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "picc-placement-post-orders",
          "picc-placement-restart",
          "picc-placement-follow-up"
        ]
      },
      "picc-placement-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Discharge order (med rec prior) - immediate",
          "After visit summary: .IRAVSPICC"
        ]
      },
      "picc-placement-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "picc-placement-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "picc-placement-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "port-placement",
    "title": "Port Placement",
    "category": "Central venous / vascular access",
    "keywords": "chest port mediport implanted port",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "port-placement-root",
    "nodes": {
      "port-placement-root": {
        "title": "Port Placement",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "port-placement-pre",
          "port-placement-intra",
          "port-placement-post",
          "port-placement-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "port-placement-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "port-placement-indication",
          "port-placement-labs",
          "port-placement-anticoag",
          "port-placement-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care"
        ]
      },
      "port-placement-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "port-placement-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC (with diff if on active chemo) and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC (with diff if on active chemo) and INR within 30 days"
          ]
        }
      },
      "port-placement-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "port-placement-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "port-placement-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "port-placement-intra-placeholder"
        ]
      },
      "port-placement-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "port-placement-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "port-placement-post-orders",
          "port-placement-restart",
          "port-placement-follow-up"
        ]
      },
      "port-placement-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "AVS: .IRAVSPORTPLACEMENT"
        ]
      },
      "port-placement-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "port-placement-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "port-placement-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "port-removal",
    "title": "Port Removal",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "port-removal-root",
    "nodes": {
      "port-removal-root": {
        "title": "Port Removal",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "port-removal-pre",
          "port-removal-intra",
          "port-removal-post",
          "port-removal-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "port-removal-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "port-removal-indication",
          "port-removal-labs",
          "port-removal-anticoag",
          "port-removal-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "Vital signs: Per routine"
        ]
      },
      "port-removal-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "port-removal-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None needed unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None needed unless further indicated"
          ]
        }
      },
      "port-removal-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "port-removal-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "port-removal-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "port-removal-intra-placeholder"
        ]
      },
      "port-removal-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "port-removal-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "port-removal-post-orders",
          "port-removal-restart",
          "port-removal-follow-up"
        ]
      },
      "port-removal-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - immediate",
          "AVS: .IRAVSPORTREMOVAL"
        ]
      },
      "port-removal-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "port-removal-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "port-removal-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "portal-vein-embolization",
    "title": "Portal Vein Embolization",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "portal-vein-embolization-root",
    "nodes": {
      "portal-vein-embolization-root": {
        "title": "Portal Vein Embolization",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "portal-vein-embolization-pre",
          "portal-vein-embolization-intra",
          "portal-vein-embolization-post",
          "portal-vein-embolization-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "portal-vein-embolization-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "portal-vein-embolization-indication",
          "portal-vein-embolization-labs",
          "portal-vein-embolization-anticoag",
          "portal-vein-embolization-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Peripheral Line Placement",
          "Vital signs: Per routine",
          "Glucose Point of Care",
          "Ceftriaxone 2 g IV"
        ]
      },
      "portal-vein-embolization-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "portal-vein-embolization-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR, CMP within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC, INR, CMP within 30 days"
          ]
        }
      },
      "portal-vein-embolization-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "portal-vein-embolization-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "portal-vein-embolization-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "portal-vein-embolization-intra-placeholder"
        ]
      },
      "portal-vein-embolization-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "portal-vein-embolization-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "portal-vein-embolization-post-orders",
          "portal-vein-embolization-restart",
          "portal-vein-embolization-follow-up"
        ]
      },
      "portal-vein-embolization-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1.5 hours",
          "Follow up: Confirm imaging and follow up with Surgery is pre-arranged"
        ]
      },
      "portal-vein-embolization-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "portal-vein-embolization-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "portal-vein-embolization-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "prostate-artery-embolization",
    "title": "Prostate Artery Embolization",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "prostate-artery-embolization-root",
    "nodes": {
      "prostate-artery-embolization-root": {
        "title": "Prostate Artery Embolization",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "prostate-artery-embolization-pre",
          "prostate-artery-embolization-intra",
          "prostate-artery-embolization-post",
          "prostate-artery-embolization-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "prostate-artery-embolization-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "prostate-artery-embolization-indication",
          "prostate-artery-embolization-labs",
          "prostate-artery-embolization-anticoag",
          "prostate-artery-embolization-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care",
          "2 days prior to and day of the procedure (order in clinic) x 10 days total",
          "Bactrim 800-160 mg BID x 10 days total (preferred) OR",
          "Ciprofloxacin 500 mg BID x 10 days total If oral antibiotic not taken, given one time dose of IV levofloxacin."
        ]
      },
      "prostate-artery-embolization-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "prostate-artery-embolization-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR and BMP within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC, INR and BMP within 30 days"
          ]
        }
      },
      "prostate-artery-embolization-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "prostate-artery-embolization-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "prostate-artery-embolization-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "prostate-artery-embolization-intra-placeholder"
        ]
      },
      "prostate-artery-embolization-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "prostate-artery-embolization-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "prostate-artery-embolization-post-orders",
          "prostate-artery-embolization-restart",
          "prostate-artery-embolization-follow-up"
        ]
      },
      "prostate-artery-embolization-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Ibuprofen 800 mg Q6 PRN",
          "Nursing communication – due to void before discharge",
          "Discharge order (med rec prior) - 2-6 hours",
          "Discharge medication:",
          "Continue antibiotic (rx pre-procedure)",
          "Ibuprofen 200 mg q6 hrs PRN x 7d (OTC)",
          "Oxybutynin – PRN for bladder spasm (OTC)",
          "Omeprazole/esomeprazole 40 mg qd (OTC)",
          "Docusate 250 mg qd x 7d (OTC)",
          "Phenazopyridine 200 mg TID x 3d (OTC)",
          "Toradol for pain PRN (not routine)",
          "After visit summary: .IRAVSPROSTATE",
          "Follow up: 1 month clinic visit"
        ]
      },
      "prostate-artery-embolization-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "prostate-artery-embolization-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "prostate-artery-embolization-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "pudendal-angiogram",
    "title": "Pudendal Angiogram",
    "category": "IR procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "pudendal-angiogram-root",
    "nodes": {
      "pudendal-angiogram-root": {
        "title": "Pudendal Angiogram",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "pudendal-angiogram-pre",
          "pudendal-angiogram-intra",
          "pudendal-angiogram-post",
          "pudendal-angiogram-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "pudendal-angiogram-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "pudendal-angiogram-indication",
          "pudendal-angiogram-labs",
          "pudendal-angiogram-anticoag",
          "pudendal-angiogram-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care",
          "Place Foley intra-procedure"
        ]
      },
      "pudendal-angiogram-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "pudendal-angiogram-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days"
          ]
        }
      },
      "pudendal-angiogram-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "pudendal-angiogram-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "pudendal-angiogram-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "pudendal-angiogram-intra-placeholder"
        ]
      },
      "pudendal-angiogram-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "pudendal-angiogram-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "pudendal-angiogram-post-orders",
          "pudendal-angiogram-restart",
          "pudendal-angiogram-follow-up"
        ]
      },
      "pudendal-angiogram-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSARTERIOGRAM Discontinue Foley when erection resolves (if erection lasts longer than 2 hours call Urology for phenylephrine IC). Void prior to discharge."
        ]
      },
      "pudendal-angiogram-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "pudendal-angiogram-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "pudendal-angiogram-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "thoracentesis",
    "title": "Thoracentesis",
    "category": "Fluid drainage",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "thoracentesis-root",
    "nodes": {
      "thoracentesis-root": {
        "title": "Thoracentesis",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "thoracentesis-pre",
          "thoracentesis-intra",
          "thoracentesis-post",
          "thoracentesis-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "thoracentesis-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "thoracentesis-indication",
          "thoracentesis-labs",
          "thoracentesis-anticoag",
          "thoracentesis-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "Vital signs: Per routine"
        ]
      },
      "thoracentesis-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "thoracentesis-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None unless further indicated",
        "details": {
          "PDF lab guidance": [
            "None unless further indicated"
          ]
        }
      },
      "thoracentesis-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "thoracentesis-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "thoracentesis-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "thoracentesis-intra-placeholder"
        ]
      },
      "thoracentesis-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "thoracentesis-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "thoracentesis-post-orders",
          "thoracentesis-restart",
          "thoracentesis-follow-up"
        ]
      },
      "thoracentesis-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "CXR STAT per MD",
          "Diet:",
          "NPO until CXR then regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSTHORACENTESIS",
          "If CXR ordered, discharge after CXR cleared by MD"
        ]
      },
      "thoracentesis-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "thoracentesis-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "thoracentesis-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "thyroid-biopsy",
    "title": "Thyroid Biopsy",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "thyroid-biopsy-root",
    "nodes": {
      "thyroid-biopsy-root": {
        "title": "Thyroid Biopsy",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "thyroid-biopsy-pre",
          "thyroid-biopsy-intra",
          "thyroid-biopsy-post",
          "thyroid-biopsy-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "thyroid-biopsy-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "thyroid-biopsy-indication",
          "thyroid-biopsy-labs",
          "thyroid-biopsy-anticoag",
          "thyroid-biopsy-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "Vital signs: Per routine"
        ]
      },
      "thyroid-biopsy-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "thyroid-biopsy-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "None needed unless further indicated Cytology present",
        "details": {
          "PDF lab guidance": [
            "None needed unless further indicated Cytology present"
          ]
        }
      },
      "thyroid-biopsy-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "thyroid-biopsy-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "thyroid-biopsy-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "thyroid-biopsy-intra-placeholder"
        ]
      },
      "thyroid-biopsy-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "thyroid-biopsy-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "thyroid-biopsy-post-orders",
          "thyroid-biopsy-restart",
          "thyroid-biopsy-follow-up"
        ]
      },
      "thyroid-biopsy-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - immediate",
          "AVS: .IRAVSBIOPSYSUPERFICIAL"
        ]
      },
      "thyroid-biopsy-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "thyroid-biopsy-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "thyroid-biopsy-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "transarterial-chemoembolization-tace",
    "title": "Transarterial Chemoembolization (TACE)",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "transarterial-chemoembolization-tace-root",
    "nodes": {
      "transarterial-chemoembolization-tace-root": {
        "title": "Transarterial Chemoembolization (TACE)",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "transarterial-chemoembolization-tace-pre",
          "transarterial-chemoembolization-tace-intra",
          "transarterial-chemoembolization-tace-post",
          "transarterial-chemoembolization-tace-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "transarterial-chemoembolization-tace-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "transarterial-chemoembolization-tace-indication",
          "transarterial-chemoembolization-tace-labs",
          "transarterial-chemoembolization-tace-anticoag",
          "transarterial-chemoembolization-tace-exam"
        ],
        "checklist": [
          "Bedded outpatient",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care",
          "Dexamethasone 8 mg IV 1 hour prior to procedure (pain and less nausea, one time dose)",
          "Ondansetron (Zofran) 4mg IV",
          "Pepcid 20 mg IV",
          "Cefazolin (Ancef) 2g if < 120kg, 3g if >120 kg",
          "Metronidazole (Flagyl) 500mg IV"
        ]
      },
      "transarterial-chemoembolization-tace-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "transarterial-chemoembolization-tace-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR, CMP, AFP if HCC day of always Separate consent for chemo done by attending",
        "details": {
          "PDF lab guidance": [
            "CBC, INR, CMP, AFP if HCC day of always Separate consent for chemo done by attending"
          ]
        }
      },
      "transarterial-chemoembolization-tace-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "transarterial-chemoembolization-tace-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "transarterial-chemoembolization-tace-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "transarterial-chemoembolization-tace-intra-placeholder"
        ]
      },
      "transarterial-chemoembolization-tace-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "transarterial-chemoembolization-tace-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "transarterial-chemoembolization-tace-post-orders",
          "transarterial-chemoembolization-tace-restart",
          "transarterial-chemoembolization-tace-follow-up"
        ]
      },
      "transarterial-chemoembolization-tace-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSTACE1",
          "Discharge medication:",
          "Oxycodone 5mg tablets Q4 hours PRN",
          "Ondansetron (Zofran) 4 mg Q6 hours PRN",
          "Follow up: Clinic visit in 1 month with MRI liver mass and labs (CBC, INR, CMP, AFP if HCC)"
        ]
      },
      "transarterial-chemoembolization-tace-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "transarterial-chemoembolization-tace-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "transarterial-chemoembolization-tace-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "transjugular-intrahepatic-portosystemic-shunt-creation-tips",
    "title": "Transjugular Intrahepatic Portosystemic Shunt Creation (TIPS)",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "transjugular-intrahepatic-portosystemic-shunt-creation-tips-root",
    "nodes": {
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-root": {
        "title": "Transjugular Intrahepatic Portosystemic Shunt Creation (TIPS)",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-pre",
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-intra",
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-post",
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-indication",
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-labs",
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-anticoag",
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-exam"
        ],
        "checklist": [
          "Bedded outpatient",
          "NPO (anesthesia)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Ceftriaxone 2 grams IV"
        ]
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR, CMP day of always",
        "details": {
          "PDF lab guidance": [
            "CBC, INR, CMP day of always"
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-intra-placeholder"
        ]
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-post-orders",
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-restart",
          "transjugular-intrahepatic-portosystemic-shunt-creation-tips-follow-up"
        ]
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Admit to Inpatient (see work flow sheet)",
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity",
          "IJ: Elevate HOB > 45 degrees x 1 hour",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "After visit summary: .IRAVSTIPS",
          "Follow up: Clinic visit in 1 month with TIPS US"
        ]
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-creation-tips-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips",
    "title": "Transjugular Intrahepatic Portosystemic Shunt Check/Revision (TIPS)",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-root",
    "nodes": {
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-root": {
        "title": "Transjugular Intrahepatic Portosystemic Shunt Check/Revision (TIPS)",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-pre",
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-intra",
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-post",
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-indication",
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-labs",
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-anticoag",
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR, CMP day of always",
        "details": {
          "PDF lab guidance": [
            "CBC, INR, CMP day of always"
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-intra-placeholder"
        ]
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-post-orders",
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-restart",
          "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-follow-up"
        ]
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Elevate HOB > 45 degrees x 1 hour",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1 hour",
          "After visit summary: .IRAVSTIPS",
          "Follow up: Clinic visit with TIPS US per MD"
        ]
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "transjugular-intrahepatic-portosystemic-shunt-check-revision-tips-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "transvenous-biopsy",
    "title": "Transvenous Biopsy",
    "category": "Biopsy / ablation",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "transvenous-biopsy-root",
    "nodes": {
      "transvenous-biopsy-root": {
        "title": "Transvenous Biopsy",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "transvenous-biopsy-pre",
          "transvenous-biopsy-intra",
          "transvenous-biopsy-post",
          "transvenous-biopsy-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "transvenous-biopsy-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "transvenous-biopsy-indication",
          "transvenous-biopsy-labs",
          "transvenous-biopsy-anticoag",
          "transvenous-biopsy-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Labs: CBC and INR within 30 days",
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity",
          "Femoral: 2 hours LE extended",
          "IJ: Elevate HOB > 45 degrees x 1 hour",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1-2 hours",
          "After visit summary: .IRAVSTRANSVENOUSBIOPSY"
        ]
      },
      "transvenous-biopsy-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "transvenous-biopsy-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "No lab guidance was extracted for this procedure.",
        "details": {
          "PDF lab guidance": [
            "No lab guidance extracted; verify local policy."
          ]
        }
      },
      "transvenous-biopsy-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "transvenous-biopsy-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "transvenous-biopsy-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "transvenous-biopsy-intra-placeholder"
        ]
      },
      "transvenous-biopsy-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "transvenous-biopsy-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "transvenous-biopsy-post-orders",
          "transvenous-biopsy-restart",
          "transvenous-biopsy-follow-up"
        ]
      },
      "transvenous-biopsy-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Labs: CBC and INR within 30 days",
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity",
          "Femoral: 2 hours LE extended",
          "IJ: Elevate HOB > 45 degrees x 1 hour",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1-2 hours",
          "After visit summary: .IRAVSTRANSVENOUSBIOPSY"
        ]
      },
      "transvenous-biopsy-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "transvenous-biopsy-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "transvenous-biopsy-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "tunneled-line-placement-exchange",
    "title": "Tunneled Line Placement/Exchange",
    "category": "Central venous / vascular access",
    "keywords": "tunneled dialysis catheter tdc permcath tunneled catheter",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "tunneled-line-placement-exchange-root",
    "nodes": {
      "tunneled-line-placement-exchange-root": {
        "title": "Tunneled Line Placement/Exchange",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "tunneled-line-placement-exchange-pre",
          "tunneled-line-placement-exchange-intra",
          "tunneled-line-placement-exchange-post",
          "tunneled-line-placement-exchange-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "tunneled-line-placement-exchange-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "tunneled-line-placement-exchange-indication",
          "tunneled-line-placement-exchange-labs",
          "tunneled-line-placement-exchange-anticoag",
          "tunneled-line-placement-exchange-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "tunneled-line-placement-exchange-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "tunneled-line-placement-exchange-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "HD pts VBG with lytes (K < 6 without hemolysis)",
        "details": {
          "PDF lab guidance": [
            "HD pts VBG with lytes (K < 6 without hemolysis)"
          ]
        }
      },
      "tunneled-line-placement-exchange-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "tunneled-line-placement-exchange-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "tunneled-line-placement-exchange-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "tunneled-line-placement-exchange-intra-placeholder"
        ]
      },
      "tunneled-line-placement-exchange-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "tunneled-line-placement-exchange-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "tunneled-line-placement-exchange-post-orders",
          "tunneled-line-placement-exchange-restart",
          "tunneled-line-placement-exchange-follow-up"
        ]
      },
      "tunneled-line-placement-exchange-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – per unit routine",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 30 min",
          "After visit summary: .IRAVSTUNNELEDCATHPLACEMENT1"
        ]
      },
      "tunneled-line-placement-exchange-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "tunneled-line-placement-exchange-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "tunneled-line-placement-exchange-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "uterine-fibroid-embolization-ufe",
    "title": "Uterine Fibroid Embolization (UFE)",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "uterine-fibroid-embolization-ufe-root",
    "nodes": {
      "uterine-fibroid-embolization-ufe-root": {
        "title": "Uterine Fibroid Embolization (UFE)",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "uterine-fibroid-embolization-ufe-pre",
          "uterine-fibroid-embolization-ufe-intra",
          "uterine-fibroid-embolization-ufe-post",
          "uterine-fibroid-embolization-ufe-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "uterine-fibroid-embolization-ufe-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "uterine-fibroid-embolization-ufe-indication",
          "uterine-fibroid-embolization-ufe-labs",
          "uterine-fibroid-embolization-ufe-anticoag",
          "uterine-fibroid-embolization-ufe-exam"
        ],
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Toradol 30 mg IM (6 hours post 1st dose)",
          "Tylenol 1000 mg PO (6 hours post 1st dose)",
          "Oxycodone 5 mg tab 1 tab PO q4 PRN pain",
          "Dilaudid 0.5-1 mg IV Q2 hrs PRN pain not responding to oral",
          "Ondansetron (Zofran) 4mg IV PRN",
          "Metoclopramide (Reglan) 10 mg IV Q6-8 PRN nausea not responding to Zofran",
          "Promethazine (Phenergan) 25 mg PO/IV Q6 PRN nausea not responding to Reglan",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSUFE",
          "If admitted and requires PCA:",
          "Patient Controlled Analgesia (ADULT) Hydromorphone o Loading dose: 0 mg o PCA dose: 0.2 mg o Lockout interval: 10 min o Continuous infusion rate: 0 mg/hr",
          "One hour dose limit: 1.2 mg",
          "Discharge Meds (Med Rec and confirm pharmacy):",
          "Oxycodone 5 mg PO Q6 hours x 2 days scheduled then Q6 hrs PRN (Disp 24) Prescribe only if needed",
          "Promethazine (Phenergan) 25 mg Q4 hours PRN nausea if Zofran not working (Disp 8)",
          "Follow up: Clinic visit in 1 month with MD"
        ]
      },
      "uterine-fibroid-embolization-ufe-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "uterine-fibroid-embolization-ufe-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "No lab guidance was extracted for this procedure.",
        "details": {
          "PDF lab guidance": [
            "No lab guidance extracted; verify local policy."
          ]
        }
      },
      "uterine-fibroid-embolization-ufe-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "uterine-fibroid-embolization-ufe-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "uterine-fibroid-embolization-ufe-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "uterine-fibroid-embolization-ufe-intra-placeholder"
        ]
      },
      "uterine-fibroid-embolization-ufe-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "uterine-fibroid-embolization-ufe-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "uterine-fibroid-embolization-ufe-post-orders",
          "uterine-fibroid-embolization-ufe-restart",
          "uterine-fibroid-embolization-ufe-follow-up"
        ]
      },
      "uterine-fibroid-embolization-ufe-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "SDC/Outpatient with Discharge vs Bedded Outpatient (see below)",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care",
          "Cefazolin (Ancef) 2g if < 120kg, 3g if >120 kg",
          "Dexamethasone 8 mg IV (HOLD FOR KIM)",
          "Toradol 30 mg once IM",
          "Ondansetron (Zofran) 4mg once IV",
          "Oxycodone 10 mg once PO",
          "Hx severe nausea: Scopolamine patch 1.5 mg apply to skin behind ear prior to procedure and leave in place x 72 hours (may cause anticholinergic side effects including dry mouth; may remove patch if experience these) Prescribe if patient did not take home meds",
          "Pantoprazole 40 mg PO once",
          "Colace 100 mg PO once",
          "Acetaminophen 1000 mg PO once",
          "Labs: CBC and INR within 30 days If pre-surgical, place Foley, no NSAIDs or dexamethasone day of and page GYN (3030) and anesthesia when patient is in pre-op for consent Daly/Bader - hypogastric nerve block Ganguli – admit post procedure Ayyagari – generally admits post-procedure Kim – Hold pre procedure dexamethasone, intra- arterial dexamethasone and lidocaine (FYI)"
        ]
      },
      "uterine-fibroid-embolization-ufe-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "uterine-fibroid-embolization-ufe-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "uterine-fibroid-embolization-ufe-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "venogram",
    "title": "Venogram",
    "category": "Central venous / vascular access",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "venogram-root",
    "nodes": {
      "venogram-root": {
        "title": "Venogram",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "venogram-pre",
          "venogram-intra",
          "venogram-post",
          "venogram-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "venogram-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "venogram-indication",
          "venogram-labs",
          "venogram-anticoag",
          "venogram-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Labs: No pre-procedure labs unless further indicated CBC and INR w/in 30 days ONLY for intrathoracic",
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity",
          "Femoral: 2 hours LE extended",
          "IJ: Elevate HOB > 45 degrees x 1 hour",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1-2 hours",
          "After visit summary: .IRAVSVENOGRAM"
        ]
      },
      "venogram-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "venogram-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "No lab guidance was extracted for this procedure.",
        "details": {
          "PDF lab guidance": [
            "No lab guidance extracted; verify local policy."
          ]
        }
      },
      "venogram-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "venogram-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "venogram-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "venogram-intra-placeholder"
        ]
      },
      "venogram-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "venogram-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "venogram-post-orders",
          "venogram-restart",
          "venogram-follow-up"
        ]
      },
      "venogram-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care",
          "Labs: No pre-procedure labs unless further indicated CBC and INR w/in 30 days ONLY for intrathoracic",
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity",
          "Femoral: 2 hours LE extended",
          "IJ: Elevate HOB > 45 degrees x 1 hour",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1-2 hours",
          "After visit summary: .IRAVSVENOGRAM"
        ]
      },
      "venogram-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "venogram-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "venogram-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "vertebroplasty-kyphoplasty",
    "title": "Vertebroplasty/Kyphoplasty",
    "category": "IR procedure",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "vertebroplasty-kyphoplasty-root",
    "nodes": {
      "vertebroplasty-kyphoplasty-root": {
        "title": "Vertebroplasty/Kyphoplasty",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "vertebroplasty-kyphoplasty-pre",
          "vertebroplasty-kyphoplasty-intra",
          "vertebroplasty-kyphoplasty-post",
          "vertebroplasty-kyphoplasty-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "vertebroplasty-kyphoplasty-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "vertebroplasty-kyphoplasty-indication",
          "vertebroplasty-kyphoplasty-labs",
          "vertebroplasty-kyphoplasty-anticoag",
          "vertebroplasty-kyphoplasty-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (anesthesia)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "vertebroplasty-kyphoplasty-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "vertebroplasty-kyphoplasty-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC and INR within 30 days Schedule in IPP 28 with anesthesia",
        "details": {
          "PDF lab guidance": [
            "CBC and INR within 30 days Schedule in IPP 28 with anesthesia"
          ]
        }
      },
      "vertebroplasty-kyphoplasty-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "vertebroplasty-kyphoplasty-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "vertebroplasty-kyphoplasty-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "vertebroplasty-kyphoplasty-intra-placeholder"
        ]
      },
      "vertebroplasty-kyphoplasty-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "vertebroplasty-kyphoplasty-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "vertebroplasty-kyphoplasty-post-orders",
          "vertebroplasty-kyphoplasty-restart",
          "vertebroplasty-kyphoplasty-follow-up"
        ]
      },
      "vertebroplasty-kyphoplasty-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Vital signs – Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 1",
          "Wound care/treatment",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 3 hours",
          "AVS: IRAVSVERTKYPHOPLASTY",
          "Follow up: XR AP/Lateral and clinic visit in 1 month"
        ]
      },
      "vertebroplasty-kyphoplasty-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "vertebroplasty-kyphoplasty-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "vertebroplasty-kyphoplasty-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "varicocele-embolization",
    "title": "Varicocele Embolization",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "varicocele-embolization-root",
    "nodes": {
      "varicocele-embolization-root": {
        "title": "Varicocele Embolization",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "varicocele-embolization-pre",
          "varicocele-embolization-intra",
          "varicocele-embolization-post",
          "varicocele-embolization-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "varicocele-embolization-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "varicocele-embolization-indication",
          "varicocele-embolization-labs",
          "varicocele-embolization-anticoag",
          "varicocele-embolization-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Vital signs: Per routine",
          "Peripheral Line Placement",
          "Glucose Point of Care"
        ]
      },
      "varicocele-embolization-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "varicocele-embolization-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "No pre-procedure labs unless further indicated",
        "details": {
          "PDF lab guidance": [
            "No pre-procedure labs unless further indicated"
          ]
        }
      },
      "varicocele-embolization-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "varicocele-embolization-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "varicocele-embolization-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "varicocele-embolization-intra-placeholder"
        ]
      },
      "varicocele-embolization-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "varicocele-embolization-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "varicocele-embolization-post-orders",
          "varicocele-embolization-restart",
          "varicocele-embolization-follow-up"
        ]
      },
      "varicocele-embolization-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity",
          "Femoral: 2 hours LE extended",
          "IJ: Elevate HOB > 45 degrees x 1 hour",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 1-2 hours",
          "After visit summary: .IRAVSVENOGRAM"
        ]
      },
      "varicocele-embolization-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "varicocele-embolization-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "varicocele-embolization-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "y90-radioembolization-mapping",
    "title": "Y90 Radioembolization Mapping",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "y90-radioembolization-mapping-root",
    "nodes": {
      "y90-radioembolization-mapping-root": {
        "title": "Y90 Radioembolization Mapping",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "y90-radioembolization-mapping-pre",
          "y90-radioembolization-mapping-intra",
          "y90-radioembolization-mapping-post",
          "y90-radioembolization-mapping-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "y90-radioembolization-mapping-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "y90-radioembolization-mapping-indication",
          "y90-radioembolization-mapping-labs",
          "y90-radioembolization-mapping-anticoag",
          "y90-radioembolization-mapping-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care"
        ]
      },
      "y90-radioembolization-mapping-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "y90-radioembolization-mapping-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR, CMP and AFP if HCC day of always",
        "details": {
          "PDF lab guidance": [
            "CBC, INR, CMP and AFP if HCC day of always"
          ]
        }
      },
      "y90-radioembolization-mapping-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "y90-radioembolization-mapping-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "y90-radioembolization-mapping-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "y90-radioembolization-mapping-intra-placeholder"
        ]
      },
      "y90-radioembolization-mapping-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "y90-radioembolization-mapping-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "y90-radioembolization-mapping-post-orders",
          "y90-radioembolization-mapping-restart",
          "y90-radioembolization-mapping-follow-up"
        ]
      },
      "y90-radioembolization-mapping-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSY90MAPPING",
          "Follow up: Y90 therapy"
        ]
      },
      "y90-radioembolization-mapping-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "y90-radioembolization-mapping-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "y90-radioembolization-mapping-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  },
  {
    "id": "y90-radioembolization-therapy",
    "title": "Y90 Radioembolization Therapy",
    "category": "Vascular intervention",
    "keywords": "",
    "summary": "PDF-derived pre-procedure and post-procedure order draft. Fill indication, focused exam, and anticoagulation details during clinical review.",
    "lastReviewed": "Imported from procedure orders PDF updated 4.15.26",
    "root": "y90-radioembolization-therapy-root",
    "nodes": {
      "y90-radioembolization-therapy-root": {
        "title": "Y90 Radioembolization Therapy",
        "type": "reference",
        "summary": "Start with the pre-procedure checks or jump directly to post-procedure orders.",
        "children": [
          "y90-radioembolization-therapy-pre",
          "y90-radioembolization-therapy-intra",
          "y90-radioembolization-therapy-post",
          "y90-radioembolization-therapy-review"
        ],
        "details": {
          "Source": [
            "Interventional Radiology Procedure Orders updated 4.15.26.pdf"
          ],
          "Import status": [
            "Pre-procedure orders, labs, and post-procedure orders were extracted from the PDF.",
            "Indication, anticoagulation hold timing, and focused exam are intentionally marked for clinical review when the PDF did not specify them."
          ]
        }
      },
      "y90-radioembolization-therapy-pre": {
        "title": "Pre-procedure",
        "type": "action",
        "summary": "Review indication, labs, anticoagulation plan, and focused bedside checks.",
        "children": [
          "y90-radioembolization-therapy-indication",
          "y90-radioembolization-therapy-labs",
          "y90-radioembolization-therapy-anticoag",
          "y90-radioembolization-therapy-exam"
        ],
        "checklist": [
          "SDC/Outpatient with Discharge",
          "NPO (moderate sedation)",
          "Pulse checks",
          "Vital signs: Per routine",
          "Peripheral Line Placement - No IV in LEFT arm",
          "Glucose Point of Care",
          "Dexamethasone 8 mg IV",
          "Ondansetron (Zofran) 4mg IV",
          "Pepcid 20 mg PO",
          "Cefazolin (Ancef) 2g if < 120kg, 3g if >120 kg",
          "Metronidazole (Flagyl) 500mg IV"
        ]
      },
      "y90-radioembolization-therapy-indication": {
        "title": "Indication",
        "type": "decision",
        "summary": "Confirm the clinical reason for the procedure and whether the requested procedure matches the problem.",
        "details": {
          "Needs completion": [
            "The imported PDF does not list indications. Add common indications, contraindications, and escalation triggers during faculty review."
          ]
        }
      },
      "y90-radioembolization-therapy-labs": {
        "title": "Labs",
        "type": "decision",
        "summary": "CBC, INR, CMP and AFP if HCC day of always Separate consent for radiation done by attending No chemotherapy for 2 weeks prior",
        "details": {
          "PDF lab guidance": [
            "CBC, INR, CMP and AFP if HCC day of always Separate consent for radiation done by attending No chemotherapy for 2 weeks prior"
          ]
        }
      },
      "y90-radioembolization-therapy-anticoag": {
        "title": "Anticoagulation",
        "type": "caution",
        "summary": "Use the institutional anticoagulation table for hold and restart timing.",
        "details": {
          "Needs structured table": [
            "Add hold timing by medication, renal function, and procedure bleeding risk.",
            "Document last dose, indication for anticoagulation, and restart owner."
          ]
        }
      },
      "y90-radioembolization-therapy-exam": {
        "title": "Focused exam",
        "type": "decision",
        "summary": "Check patient-specific factors that affect access, sedation, positioning, or discharge.",
        "details": {
          "General checks": [
            "Confirm ability to consent, ability to tolerate positioning, baseline pain, oxygen requirement, and sedation concerns.",
            "Inspect the planned access or treatment site for infection, wounds, prior scars, devices, or anatomy that changes the approach.",
            "Use ultrasound or imaging review when relevant to confirm a safe target."
          ]
        }
      },
      "y90-radioembolization-therapy-intra": {
        "title": "Intraprocedure",
        "type": "reference",
        "summary": "Intraprocedure details are not included in the imported orders PDF.",
        "children": [
          "y90-radioembolization-therapy-intra-placeholder"
        ]
      },
      "y90-radioembolization-therapy-intra-placeholder": {
        "title": "To build",
        "type": "reference",
        "summary": "Add equipment, approach, general steps, and troubleshooting later.",
        "details": {
          "Suggested buckets": [
            "Equipment",
            "Approach",
            "General steps",
            "Troubleshooting",
            "Stop or escalate if"
          ]
        }
      },
      "y90-radioembolization-therapy-post": {
        "title": "Post-procedure",
        "type": "action",
        "summary": "Review post-procedure orders, discharge timing, AVS, and follow-up.",
        "children": [
          "y90-radioembolization-therapy-post-orders",
          "y90-radioembolization-therapy-restart",
          "y90-radioembolization-therapy-follow-up"
        ]
      },
      "y90-radioembolization-therapy-post-orders": {
        "title": "Orders",
        "type": "action",
        "summary": "Post-procedure orders extracted from the PDF.",
        "checklist": [
          "Notify MD/LIP - IR",
          "Regular diet",
          "Activity:",
          "FEMORAL: Bedrest, 2-6 hours LE extended",
          "RADIAL: Activity per JH-HLM mobility goal.",
          "Remove radial artery compression device",
          "Monitor Color of Access Site",
          "Vital signs - Every 15 minutes x 4, then every 30 minutes x 2, then every 1 hour x 4, then every 4 hours (edit to match bedrest)",
          "Tylenol 650 mg PRN",
          "Discharge order (med rec prior) - 2-6 hours",
          "After visit summary: .IRAVSY901",
          "Follow up: Clinic visit in 1 month with MRI liver mass and labs (CBC, INR, CMP, AFP if HCC)"
        ]
      },
      "y90-radioembolization-therapy-restart": {
        "title": "Restart meds",
        "type": "decision",
        "summary": "Medication resumption should be edited in the AVS and reconciled before discharge.",
        "details": {
          "PDF note": [
            "Always edit AVS as needed, including medication resumption; delete medication resumption language if not applicable.",
            "Medication reconciliation needs to be completed before the discharge order is signed."
          ]
        }
      },
      "y90-radioembolization-therapy-follow-up": {
        "title": "Follow-up",
        "type": "reference",
        "summary": "Communicate with the covering PA if follow-up needs to be scheduled.",
        "details": {
          "PDF note": [
            "Follow up: communicate with covering PA if follow up needs to be scheduled."
          ]
        }
      },
      "y90-radioembolization-therapy-review": {
        "title": "Needs review",
        "type": "caution",
        "summary": "This procedure was generated from a PDF extraction and should be checked against local policy.",
        "details": {
          "Review checklist": [
            "Confirm that wrapped lines from the PDF were imported correctly.",
            "Add missing indication, contraindications, focused exam, and anticoagulation details.",
            "Confirm order names match current EHR order set names."
          ]
        }
      }
    }
  }
];
