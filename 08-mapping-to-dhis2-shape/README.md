# Step 8: Mapping a FHIR resource into a DHIS2-like shape

## Concept

Everything learned so far (reading resources, search, pagination, references, extensions, profiles) leads here: turning a FHIR resource into a different system's data model. DHIS2's Tracker Event shape looks roughly like this:

```json
{
  "program": "progId",
  "programStage": "stageId",
  "orgUnit": "orgUnitId",
  "occurredAt": "2024-03-10",
  "dataValues": [
    { "dataElement": "vaccineTypeDataElementId", "value": "BCG" },
    { "dataElement": "statusDataElementId", "value": "completed" }
  ]
}
```

Notice -- FHIR's `vaccineCode.coding[0].code` is turned into a flat `dataValues` entry on the DHIS2 side. This transformation is "mapping" -- exactly what your mapping-studio app lets a user do interactively.

## Task

`exercise.mjs` provides a sample FHIR Immunization resource and a mapping config (which FHIR path maps to which DHIS2 dataElement). Fill in the TODOs:
1. Build a dataValue using the value from `vaccineCode.coding[0].code`
2. Build another dataValue using the value from `status`
3. Build `occurredAt` from `occurrenceDateTime`
4. Combine everything into a full DHIS2 event object and print it

## This is really the summary of the whole journey

```
Fetch from a FHIR server (steps 1-3)
        ↓
Read references/extensions to understand full context (steps 4-5)
        ↓
Use a profile to know which fields are needed (step 7)
        ↓
Map into DHIS2's shape (this step)
        ↓
POST to write it into DHIS2 (what your real app does)
```

## Connection to your own project

This is exactly the job of your `dhis2-fhir-mapping-studio/src/write/buildTrackerEventPayload.ts` and `dhis2-fhir-sync-console`'s `mapFhirImmunizationToVisit()`. After finishing this step, open those two files -- the code should feel a lot more familiar now.
