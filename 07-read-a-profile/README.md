# ধাপ ৭: একটা Profile (StructureDefinition) পড়া

## Concept

একটা **Profile** নিজেও একটা FHIR resource -- টাইপ `StructureDefinition`। এর ভেতরে `differential.element` নামের একটা array থাকে, যেখানে প্রতিটা entry বলে দেয়:

- `path` -- কোন ফিল্ড (যেমন `Immunization.vaccineCode`)
- `min`/`max` -- cardinality (`min: 1, max: "1"` মানে required, ঠিক একবার)

এটাই সেই জিনিস যা আপনার `immunizationIgFields.ts`-এ হাতে লেখা আছে -- কিন্তু আসলে এটা IG-র নিজের machine-readable JSON থেকে সরাসরি পড়া সম্ভব।

## কাজ

`exercise.mjs`-এ WHO Immunization IG-এর real profile JSON থেকে একটা ছোট, বাস্তব অংশ দেওয়া আছে (`differential.element` অ্যারের একটা উদাহরণ)। TODO পূরণ করুন:
1. প্রতিটা element-এ `min >= 1` হলে সেটা required ধরে নিন
2. সব required path-এর একটা লিস্ট প্রিন্ট করুন

## বাস্তব সার্ভার থেকে profile আনতে চাইলে

```bash
curl -s "https://worldhealthorganization.github.io/smart-immunizations/StructureDefinition-IMMZ.Immunization.json" | head -c 500
```

এটাই সেই উৎস যা `immunizationIgFields.ts`-এর কমেন্টে উল্লেখ আছে।

## প্রজেক্টের সাথে সংযোগ

`dhis2-fhir-mapping-studio/src/fhir/immunizationIgFields.ts` খুলে দেখুন -- এটা এই একই ধরনের element তথ্য (path, cardinality, required) হাতে টাইপ করে রেখেছে, যাতে অ্যাপ প্রতিবার লাইভ IG থেকে fetch না করে।
