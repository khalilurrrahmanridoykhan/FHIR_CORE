# Step 7: Reading a Profile (StructureDefinition)

## Concept

A **Profile** is itself a FHIR resource -- of type `StructureDefinition`. It contains an array called `differential.element`, where each entry states:

- `path` -- which field (e.g. `Immunization.vaccineCode`)
- `min`/`max` -- cardinality (`min: 1, max: "1"` means required, exactly once)

This is the same thing that's hand-written in your `immunizationIgFields.ts` -- except it's actually possible to read it directly from the IG's own machine-readable JSON.

## Task

`exercise.mjs` provides a small, real slice from the WHO Immunization IG's real profile JSON (an example from the `differential.element` array). Fill in the TODOs:
1. Treat any element with `min >= 1` as required
2. Print a list of all required paths

## If you want to fetch the profile from the real server

```bash
curl -s "https://worldhealthorganization.github.io/smart-immunizations/StructureDefinition-IMMZ.Immunization.json" | head -c 500
```

This is the exact source referenced in `immunizationIgFields.ts`'s own comment.

## Connection to your own project

Open `dhis2-fhir-mapping-studio/src/fhir/immunizationIgFields.ts` -- it has this same kind of element data (path, cardinality, required) hand-typed, so the app doesn't have to fetch the live IG every time.
