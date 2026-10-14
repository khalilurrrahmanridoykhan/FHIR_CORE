# ধাপ ৬: Create, read-back, delete (write operation)

## Concept

এতক্ষণ শুধু পড়া (`GET`) হয়েছে। এখন লেখা শিখব:

```
POST /{resourceType}        -- নতুন resource তৈরি (id সার্ভার দেয়)
GET  /{resourceType}/{id}   -- তৈরি হওয়া resource পড়ে নিশ্চিত হওয়া
DELETE /{resourceType}/{id} -- পরিষ্কার করা (টেস্ট সার্ভারে ভদ্রতা)
```

`POST`-এর response-এ তৈরি resource-টা ফেরত আসে, যার মধ্যে সার্ভার-দেওয়া `id` থাকে -- এটা মনে রাখতে হবে, কারণ পরের read/delete কলে এই id লাগবে।

## নিয়মাবলী -- এটা একটা সত্যিকারের, শেয়ার করা পাবলিক সার্ভার

`hapi.fhir.org` সবার জন্য উন্মুক্ত একটা community test server -- সত্যিকারের ব্যক্তির ডেটা এখানে রাখা উচিত না, এবং তৈরি করা টেস্ট ডেটা পরে পরিষ্কার করা ভদ্রতা (ঠিক আপনার নিজের প্রজেক্টের README-এ যেমন লেখা আছে -- "TEST"/"verification" নামে ডেটা তৈরি করে পরে সব মুছে ফেলা হয়েছিল)।

## কাজ

`exercise.mjs`-এ:
1. একটা টেস্ট `Patient` object বানান (নামে `"TEST - FHIR Learning"` লিখুন, যাতে চেনা যায় এটা টেস্ট ডেটা)
2. `POST`-এর মাধ্যমে তৈরি করুন, response থেকে নতুন `id` বের করুন
3. সেই `id` দিয়ে `GET` করে resource-টা আবার পড়ুন, নিশ্চিত করুন নামটা ঠিক আছে
4. `DELETE` করে পরিষ্কার করুন

## প্রজেক্টের সাথে সংযোগ

আপনার `dhis2-fhir-sync-console` README-এর "Live-verified against a real DHIS2 instance" অংশে ঠিক এই প্যাটার্নটাই ব্যাখ্যা করা আছে -- টেস্ট ডেটা তৈরি, verify, এবং পরিষ্কার করা।
