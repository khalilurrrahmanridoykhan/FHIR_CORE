# Mini FHIR Profile Validator — Implementation Plan

## Context

This is project idea #1 from the FHIR_CORE repo's "What's next" list: a mini FHIR profile validator. It extends step 7's `min >= 1` filtering logic (which only listed required field *names* from a hardcoded array) into something that actually checks a *real resource* against a *real profile* and reports what's missing. The eventual payoff: this logic generalizes directly into the "required field" warnings already sketched in the user's production app, `dhis2-fhir-mapping-studio`.

Branch `feature/profile-validator` has already been created off `main` in the FHIR_CORE repo and is checked out.

## What the real profile data actually looks like (grounds the scope below)

Before planning the parser, I fetched and inspected the real WHO IMMZ.Immunization `StructureDefinition` (`differential.element`, 33 entries) rather than assuming step 7's simplified sample generalizes. Key findings:

- **Plain nested fields with explicit cardinality**: `protocolApplied` (`min: 1, max: "*"`), and nested inside it, `protocolApplied.series` (`min: 1`). Resolving these requires walking into an array.
- **Fields with no `min`/`max` at all** in the differential: `status`, `vaccineCode`, `patient`, `occurrence[x]`. This profile simply doesn't restate their cardinality — they're unconstrained *by this profile* (inherited from base FHIR R4), which matches a comment already in the user's own `immunizationIgFields.ts`. These must be excluded from "required by this profile" checks, not treated as optional-by-omission.
- **Choice-type fields**: `occurrence[x]` — resolves to `occurrenceDateTime`, `occurrenceString`, etc. in an actual instance. Correctly resolving these means trying every permitted suffix.
- **Slicing**: extension slices like `Immunization.extension:vaccineBrand` (`min: 1, max: "1"`, with `type[0].profile[0]` giving the extension's canonical URL) and *nested* slices like `Immunization.protocolApplied:immzProtocol.series`. The bare `path` field is ambiguous under slicing — `id` is the reliable unique key (`Immunization.extension:vaccineBrand` vs. the unsliced `Immunization.extension`).

A fully general, fully correct validator for arbitrary profiles (full slicing discriminators, choice types, max-cardinality, value set bindings) is a large undertaking — it's the hard part of real FHIR validators. Since this is explicitly a **mini** project, v1's scope below is deliberately bounded, with everything left out stated explicitly rather than silently skipped (matching the "Not yet done — real, not deferred quietly" style already used in the user's other project READMEs).

## V1 scope

Checks exactly two kinds of "required by this profile" rules — chosen because together they cover the two most common real patterns and are both tractable:

1. **Plain dot-path fields with an explicit `min >= 1`** in the differential (e.g. `protocolApplied`, `protocolApplied.series`). Resolved by walking the resource object segment by segment, descending into arrays by checking whether *any* entry satisfies the remaining path.
2. **Extension slices with an explicit `min >= 1`** (e.g. `extension:vaccineBrand`, `location.extension:countryOfVaccination`). Resolved by locating the parent object (root resource, or a nested one like `location`) and checking its `extension` array for an entry whose `url` matches the slice's canonical extension URL (`type[0].profile[0]`).

Explicitly **out of scope for v1** (documented in the README, not hidden):
- Choice-type fields (`occurrence[x]`) — skipped with a note; resolving needs trying every permitted type suffix.
- `max` cardinality violations (too many values) — v1 only checks `min` (presence/required).
- Value set / binding validation (would need a terminology server `$expand` call).
- General slicing discriminators (`type`/`value`/`exists`) — v1 only matches slices by `sliceName` + extension URL, which correctly covers every slice in the real IMMZ profile but isn't a general-purpose slicing resolver.

## File layout

New top-level folder in the repo, sibling to `01-first-fetch` … `08-mapping-to-dhis2-shape` (not numbered — this is a standalone tool, not a tutorial step):

```
profile-validator/
  README.md                    -- what it does, usage, the v1/out-of-scope split above
  validate.mjs                 -- CLI entry point
  lib/
    parseProfile.mjs           -- StructureDefinition -> RequiredRule[]
    resolvePath.mjs            -- hasValueAtPath(resource, path) -> boolean
    resolveExtension.mjs       -- hasExtension(resource, parentPath, extensionUrl) -> boolean
    validateResource.mjs       -- validate(resource, rules) -> { missing, present }
  fixtures/
    who-immz-profile.json      -- the real WHO profile, saved once (network-independent tests)
    valid-immunization.json    -- satisfies every v1 rule
    missing-required-field.json -- deliberately missing `protocolApplied`
  validate.test.mjs            -- assert-based tests, no framework (matches repo's existing no-dependency style)
```

### `lib/parseProfile.mjs`
`parseProfile(structureDefinitionJson) -> RequiredRule[]`. Filters `differential.element` down to entries with `min >= 1`, classifying each as:
- `{ kind: "field", path }` for a plain element (no `sliceName`)
- `{ kind: "extension", parentPath, extensionUrl }` for a slice with a `type[0].profile[0]` — `parentPath` is the path with the trailing `.extension` stripped (`""` for root, `"location"` for nested).

### `lib/resolvePath.mjs`
`hasValueAtPath(resource, path)` — splits `path` on `.`, drops the leading resource-type segment (profiles use `Immunization.protocolApplied.series`, resources don't repeat the type name), then walks the object. At each segment, if the current value is an array, recurse into *each* entry and return true if any satisfies the rest of the path — this matches the common case of "this field is required within each repeat."

### `lib/resolveExtension.mjs`
`hasExtension(resource, parentPath, extensionUrl)` — resolves `parentPath` to an object (root resource if empty, else walks dot-segments), then checks `.extension` array (if present) for any entry with `.url === extensionUrl`.

### `lib/validateResource.mjs`
`validate(resource, rules)` — applies `resolvePath`/`resolveExtension` per rule kind, returns `{ missing: Rule[], present: Rule[] }`.

### `validate.mjs` (CLI)
```bash
node validate.mjs <profile.json-or-url> <resource.json-or-url>
```
Accepts either a local file path or an `http(s)://` URL for both arguments (fetch if URL, `fs.readFileSync` if not). Prints a clear report: how many rules checked, which passed, which are missing (with path/extension URL), exit code 1 if anything is missing.

## Verification

1. `node profile-validator/validate.test.mjs` — exercises three cases: a fully valid resource, one missing a plain nested field (`protocolApplied.series`), one missing a required extension (`vaccineBrand`). All three must report correctly.
2. Run the CLI against the real, live WHO IG profile URL plus a real resource fetched from `r4.smarthealthit.org` (same sandbox used throughout the rest of this repo) — confirms it works end-to-end over the network, not just against local fixtures.
3. Confirm the array-walking path in `resolvePath.mjs` is actually exercised (not just top-level fields) by testing specifically against `protocolApplied.series`, which lives one level inside a repeating element.
