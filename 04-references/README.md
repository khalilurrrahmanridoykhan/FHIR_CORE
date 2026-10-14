# ধাপ ৪: Reference resolve করা

## Concept

আগে বলেছিলাম -- একটা resource অন্য resource-কে সরাসরি embed করে না, বরং **reference** করে:

```json
{
  "resourceType": "Immunization",
  "patient": { "reference": "Patient/ebd50853-8a52-423a-8f6d-cb6dda740a1a" }
}
```

`patient.reference`-এর মান হলো `"{resourceType}/{id}"` ফরম্যাটে একটা string। এটা resolve করতে হলে সেটাকে ভেঙে একটা সাধারণ `GET` কল করতে হয়:

```
GET /{resourceType}/{id}
```

FHIR নিজে থেকে "join" করে দেয় না (যেমন SQL করে) -- এটা আপনাকে নিজে, একটা আলাদা API কলে করতে হয়।

## কাজ

`exercise.mjs`-এ:
1. একটা Immunization resource fetch করুন (search করে প্রথমটা নিন, `_count=1`)
2. তার `patient.reference` ফিল্ড থেকে string বের করুন (যেমন `"Patient/abc123"`)
3. সেটা `/` দিয়ে split করে resourceType আর id আলাদা করুন
4. তারপর সেই id দিয়ে আসল Patient resource fetch করুন, তার নাম প্রিন্ট করুন

## প্রজেক্টের সাথে সংযোগ

এই একই reference-parsing ধারণা আপনার mapping-studio-তে `patient` ফিল্ড হ্যান্ডলিংয়ে ব্যবহৃত হয় -- `src/write/buildTrackerEventPayload.ts` দেখুন।
