# Step 1: First FHIR fetch

## Concept

A FHIR resource is a JSON object. The simplest operation is reading a resource with a specific `id` directly:

```
GET /{resourceType}/{id}
```

For example `GET /Patient/123` means "give me back the `Patient` resource whose `id` is `123`".

## Fields worth noticing

Every resource has:
- `resourceType` -- what kind of resource this is (`"Patient"`, `"Immunization"`, etc.)
- `id` -- this resource's own identifier
- the rest of the fields are resource-type-specific (`name`, `birthDate` on Patient; `vaccineCode`, `occurrenceDateTime` on Immunization)

## Task

Fill in the TODOs in `exercise.mjs`:
1. Fetch the `Patient` resource (id: `36149`, named Robert Smith) from the HAPI public server
2. Print `resourceType`, `id`, and the name (the first entry of the `name` array)

**Note:** this is a public community sandbox -- old test data sometimes gets cleared out. If `Patient/36149` doesn't work, open
`https://hapi.fhir.org/baseR4/Patient?name=smith&_count=1` in a browser, grab a different `id`, and swap it into the code.

## Running

```bash
node exercise.mjs
```

The solution isn't published in this repo -- try it yourself, or if you get stuck, see [the FHIR spec's Resource overview](https://hl7.org/fhir/resource.html).
