# ধাপ ২: Search ও filter

## Concept

একটা নির্দিষ্ট `id` সবসময় জানা থাকে না -- বেশিরভাগ সময় আপনি শর্ত দিয়ে resource খুঁজবেন। এটাই **search**:

```
GET /{resourceType}?{parameter}={value}
```

সার্চের রেজাল্ট সবসময় একটা **Bundle** (type: `searchset`) হয়ে ফেরত আসে, কখনো সরাসরি resource না -- এর ভেতরে `entry` array-এ একাধিক resource থাকে।

## গুরুত্বপূর্ণ parameter

- `_count` -- এক পেজে কতগুলো ফেরত দেবে (ডিফল্ট সার্ভার-ভেদে ভিন্ন, নিজে বেঁধে দেওয়া ভালো)
- resource-নির্দিষ্ট parameter -- যেমন `Immunization?patient=123`, `Patient?name=smith`

## Bundle-এর গঠন

```json
{
  "resourceType": "Bundle",
  "type": "searchset",
  "entry": [
    { "resource": { "resourceType": "Immunization", "id": "1", ... } },
    { "resource": { "resourceType": "Immunization", "id": "2", ... } }
  ]
}
```

আসল resource গুলো `entry[i].resource`-এর ভেতরে, `entry[i]`-এ সরাসরি না -- এটা একটা সাধারণ ভুল যেখানে অনেকে প্রথমবার আটকায়।

## কাজ

`exercise.mjs`-এ:
1. SMART Health IT সার্ভার থেকে `Immunization` resource সার্চ করুন, `_count=5`
2. `entry` array-এর প্রতিটা resource থেকে `vaccineCode` এবং `occurrenceDateTime` প্রিন্ট করুন

## প্রজেক্টের সাথে সংযোগ

আপনার `dhis2-fhir-sync-console/src/lib/fhirRouteFetch.ts`-এ ঠিক এই সার্চ কলটাই হয়, শুধু সরাসরি না -- DHIS2 Route-এর মাধ্যমে প্রক্সি করে।
