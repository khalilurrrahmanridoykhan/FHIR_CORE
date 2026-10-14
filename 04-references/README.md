# Step 4: Resolving a reference

## Concept

As mentioned earlier -- a resource doesn't embed another resource directly, it **references** it:

```json
{
  "resourceType": "Immunization",
  "patient": { "reference": "Patient/ebd50853-8a52-423a-8f6d-cb6dda740a1a" }
}
```

`patient.reference`'s value is a string in `"{resourceType}/{id}"` format. To resolve it, you split that string apart and make a plain `GET` call:

```
GET /{resourceType}/{id}
```

FHIR never "joins" this for you (the way SQL does) -- you have to do it yourself, as a separate API call.

## Task

In `exercise.mjs`:
1. Fetch an Immunization resource (search and take the first one, `_count=1`)
2. Pull the string out of its `patient.reference` field (e.g. `"Patient/abc123"`)
3. Split it on `/` to separate resourceType and id
4. Then fetch the actual Patient resource using that id, and print its name

## Connection to your own project

This same reference-parsing idea is used for handling the `patient` field in your mapping-studio -- see `src/write/buildTrackerEventPayload.ts`.
