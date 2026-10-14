# ধাপ ১: প্রথম FHIR fetch

## Concept

একটা FHIR resource হলো একটা JSON object। সবচেয়ে সহজ অপারেশন হলো একটা নির্দিষ্ট `id`-এর resource সরাসরি পড়া:

```
GET /{resourceType}/{id}
```

যেমন `GET /Patient/123` মানে `Patient` resource-এর মধ্যে যার `id` হলো `123`, তাকে ফেরত দাও।

## লক্ষ্য করার মতো ফিল্ড

প্রতিটা resource-এ থাকে:
- `resourceType` -- এটা কী ধরনের resource (`"Patient"`, `"Immunization"` ইত্যাদি)
- `id` -- এই resource-এর নিজের identifier
- বাকি ফিল্ড resource-type-নির্দিষ্ট (Patient-এ `name`, `birthDate`; Immunization-এ `vaccineCode`, `occurrenceDateTime`)

## কাজ

`exercise.mjs`-এ TODO পূরণ করুন:
1. HAPI পাবলিক সার্ভার থেকে `Patient` resource (id: `36149`, নাম Robert Smith) fetch করুন
2. `resourceType`, `id`, এবং নাম (`name` array-এর প্রথম entry) প্রিন্ট করুন

**নোট:** এটা একটা পাবলিক community sandbox -- কখনো কখনো পুরনো test data মুছে যায়। `Patient/36149` কাজ না করলে, ব্রাউজারে
`https://hapi.fhir.org/baseR4/Patient?name=smith&_count=1` খুলে অন্য একটা `id` বের করে নিন, কোডে বদলে দিন।

## চালানো

```bash
node exercise.mjs
```

সমাধান এই রিপোতে প্রকাশ করা হয়নি -- নিজে চেষ্টা করুন, বা আটকে গেলে [FHIR spec-এর Resource পরিচিতি](https://hl7.org/fhir/resource.html) দেখুন।
