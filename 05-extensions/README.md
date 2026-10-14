# Step 5: Reading data from an extension

## Concept

The `extension` array is used to carry data outside the base FHIR fields. Each extension has a `url` (to identify which extension it is) and a `value*` field (the name changes depending on the data type -- `valueString`, `valueBoolean`, `valueCode`, etc.):

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

To read this, you look it up by `url`, then take the correct `value*` field -- you need to already know which one is used (from that extension's own definition).

## Why a local fixture instead of a public sandbox

Public test servers' data usually carries no country/IG-specific extensions (it's synthetic, base-FHIR-only data). So this step uses a local JSON fixture instead -- a hand-built example, just like your own `dhis2-fhir-mapping-studio/src/fhir/sampleImmunizationBundle.ts`.

## Task

`exercise.mjs` provides a `sampleImmunization` object with 2 extensions. Fill in the TODOs:
1. Write a function `findExtension(resource, url)` that returns the matching extension object from the `resource.extension` array
2. Find the `countryOfVaccination` extension and print its `valueCode`
3. Find the `liveVaccine` extension and print its `valueBoolean`

## Connection to your own project

This kind of extension lookup is used in `dhis2-fhir-mapping-studio/src/fhir/extractCodeableConcept.ts` to pull out coded values, and the full list of this IG's extensions is defined in `immunizationIgFields.ts` (which we looked at earlier).
