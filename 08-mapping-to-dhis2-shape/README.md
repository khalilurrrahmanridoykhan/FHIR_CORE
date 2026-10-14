# ধাপ ৮: FHIR resource থেকে DHIS2-এর মতো shape-এ ম্যাপ করা

## Concept

এখন পর্যন্ত যা শিখেছেন (resource পড়া, search, pagination, reference, extension, profile) -- সবকিছুর শেষ গন্তব্য এটাই: একটা FHIR resource-কে একটা ভিন্ন সিস্টেমের ডেটা মডেলে রূপান্তর করা। DHIS2-এর Tracker Event-এর shape মূলত এরকম:

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

লক্ষ্য করুন -- FHIR-এর `vaccineCode.coding[0].code` কে DHIS2-এর একটা flat `dataValues` entry-তে রূপান্তর করা হয়েছে। এই রূপান্তরটাই "mapping" -- ঠিক আপনার mapping-studio অ্যাপ যা ব্যবহারকারীকে interactively করতে দেয়।

## কাজ

`exercise.mjs`-এ একটা sample FHIR Immunization resource এবং একটা mapping config দেওয়া আছে (কোন FHIR path কোন DHIS2 dataElement-এ যাবে)। TODO পূরণ করুন:
1. `vaccineCode.coding[0].code` থেকে ভ্যালু নিয়ে একটা dataValue বানান
2. `status` থেকে ভ্যালু নিয়ে আরেকটা dataValue বানান
3. `occurrenceDateTime` থেকে `occurredAt` বানান
4. সবকিছু একটা সম্পূর্ণ DHIS2 event object-এ জোড়া দিন, প্রিন্ট করুন

## এটাই আসলে পুরো journey-র সারাংশ

```
FHIR সার্ভার থেকে fetch (ধাপ ১-৩)
        ↓
reference/extension পড়ে পুরো প্রসঙ্গ বোঝা (ধাপ ৪-৫)
        ↓
profile দিয়ে কোন ফিল্ড লাগবে বোঝা (ধাপ ৭)
        ↓
DHIS2-এর shape-এ ম্যাপ করা (এই ধাপ)
        ↓
POST করে DHIS2-এ লেখা (আপনার আসল অ্যাপ যা করে)
```

## প্রজেক্টের সাথে সংযোগ

এটাই ঠিক আপনার `dhis2-fhir-mapping-studio/src/write/buildTrackerEventPayload.ts` এবং `dhis2-fhir-sync-console`-এর `mapFhirImmunizationToVisit()`-এর কাজ। এই ধাপ শেষ করার পর ওই দুটো ফাইল খুলে পড়ুন -- এখন কোডটা অনেক বেশি পরিচিত লাগবে।
