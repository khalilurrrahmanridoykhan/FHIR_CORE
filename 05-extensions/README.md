# ধাপ ৫: Extension থেকে ডেটা পড়া

## Concept

base FHIR ফিল্ডের বাইরে অতিরিক্ত ডেটা রাখতে `extension` array ব্যবহার হয়। প্রতিটা extension-এর একটা `url` (কোন extension এটা চেনার জন্য) আর একটা `value*` ফিল্ড থাকে (ডেটা টাইপ অনুযায়ী নাম বদলায় -- `valueString`, `valueBoolean`, `valueCode`, ইত্যাদি):

```json
{
  "resourceType": "Immunization",
  "extension": [
    {
      "url": "http://smart.who.int/immunizations/StructureDefinition/IMMZCountryOfVaccination",
      "valueCode": "BD"
    }
  ]
}
```

এটা পড়তে হলে `url` দিয়ে খুঁজে বের করতে হয়, তারপর সঠিক `value*` ফিল্ডটা নিতে হয় -- কারণ কোনটা ব্যবহার হবে তা আগে থেকে জানতে হয় (extension-এর নিজের definition থেকে)।

## পাবলিক sandbox-এ কেন local fixture ব্যবহার করছি

পাবলিক টেস্ট সার্ভারের ডেটায় সাধারণত কোনো দেশ/IG-নির্দিষ্ট extension থাকে না (সেগুলো synthetic, base FHIR data)। তাই এই ধাপে একটা local JSON fixture ব্যবহার করা হয়েছে -- এটা ঠিক আপনার `dhis2-fhir-mapping-studio/src/fhir/sampleImmunizationBundle.ts`-এর মতোই একটা hand-built উদাহরণ।

## কাজ

`exercise.mjs`-এ `sampleImmunization` object দেওয়া আছে, যার মধ্যে ২টা extension আছে। TODO পূরণ করুন:
1. একটা ফাংশন লিখুন `findExtension(resource, url)` যা `resource.extension` array থেকে মিলে যাওয়া extension object ফেরত দেয়
2. `countryOfVaccination` extension খুঁজে তার `valueCode` প্রিন্ট করুন
3. `liveVaccine` extension খুঁজে তার `valueBoolean` প্রিন্ট করুন

## প্রজেক্টের সাথে সংযোগ

এই ধরনের extension lookup আপনার `dhis2-fhir-mapping-studio/src/fhir/extractCodeableConcept.ts`-এ coded value বের করার জন্য ব্যবহার হয়, এবং `immunizationIgFields.ts`-এ পুরো IG-এর extension লিস্ট সংজ্ঞায়িত আছে (আগের আলোচনায় যা দেখেছি)।
