# Step 2: Search and filter

## Concept

You don't always know a specific `id` -- most of the time you'll look for resources by condition. That's **search**:

```
GET /{resourceType}?{parameter}={value}
```

A search result always comes back as a **Bundle** (type: `searchset`), never a resource directly -- it holds multiple resources inside an `entry` array.

## Important parameters

- `_count` -- how many to return per page (the default varies by server, so it's good practice to set your own)
- resource-specific parameters -- e.g. `Immunization?patient=123`, `Patient?name=smith`

## Shape of a Bundle

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

The actual resources live inside `entry[i].resource`, not directly on `entry[i]` -- this is a common trip-up the first time around.

## Task

In `exercise.mjs`:
1. Search for `Immunization` resources on the SMART Health IT server, `_count=5`
2. Print `vaccineCode` and `occurrenceDateTime` from every resource in the `entry` array

## Connection to your own project

Your `dhis2-fhir-sync-console/src/lib/fhirRouteFetch.ts` makes exactly this same search call, just not directly -- it's proxied through a DHIS2 Route.
