# ধাপ ৩: Pagination (Bundle-এর `next` link ফলো করা)

## Concept

একটা সার্চে যদি অনেক resource মিলে যায় (যেমন হাজার হাজার Immunization), সার্ভার একবারে সব পাঠায় না -- পেজ ভাগ করে পাঠায়। প্রতিটা Bundle-এর `link` array-এ একটা `relation: "next"` entry থাকে, যদি আরও পেজ থাকে:

```json
{
  "link": [
    { "relation": "self", "url": "...?_count=5" },
    { "relation": "next", "url": "...?_getpages=abc123&_getpagesoffset=5&_count=5" }
  ]
}
```

পরের পেজ পেতে এই `next` URL-এ সরাসরি `GET` করতে হবে -- নতুন কোনো parameter নিজে যোগ করার দরকার নেই, URL-টা already সম্পূর্ণ।

## আসল bug, যা আপনার নিজের প্রজেক্টে ধরা পড়েছিল

আপনার `dhis2-fhir-sync-console` README-এ লেখা আছে -- HAPI সার্ভারের `next` link-এর কোনো resource-type path থাকে না (`.../baseR4?_getpages=...`, `.../baseR4/Immunization?...` না)। ভুল কোড এই খালি path-কে "আর পেজ নেই" ধরে নিয়ে থেমে যেত।

**সঠিক নিয়ম:** "আরও পেজ আছে কিনা" বোঝার জন্য `next` link-এর **presence** (অস্তিত্ব) চেক করুন, URL-এর path কেমন দেখতে তার উপর নির্ভর করবেন না।

## কাজ

`exercise.mjs`-এ:
1. `_count=2` দিয়ে Immunization সার্চ করুন (ইচ্ছাকৃতভাবে ছোট পেজ, যাতে একাধিক পেজ লাগে)
2. একটা loop লিখুন: যতক্ষণ Bundle-এ `next` link আছে, সেই URL fetch করুন
3. মোট কতগুলো resource (সব পেজ মিলিয়ে) পেলেন সেটা প্রিন্ট করুন
4. নিরাপত্তার জন্য সর্বোচ্চ ৫ পেজ পর্যন্ত থামুন (একটা infinite loop guard)

## প্রজেক্টের সাথে সংযোগ

এই exact logic আপনার `dhis2-fhir-sync-console/src/lib/fhirRouteFetch.ts`-এ আছে, আর এই bug-টার regression test আছে `fhirRouteFetch.test.ts`-এ।
