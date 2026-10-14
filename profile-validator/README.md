# Mini FHIR Profile Validator

Takes any FHIR resource and a StructureDefinition profile, and reports which of the profile's **required** fields and extensions are actually present on that resource.

Extends [step 7](../07-read-a-profile)'s `min >= 1` filtering (which just listed required field names from a hardcoded array) into something that checks a real resource against a real profile.

## Usage

```bash
node validate.mjs <profile.json-or-url> <resource.json-or-url>
```

Both arguments accept either a local file path or an `http(s)://` URL.

```bash
# against local fixtures
node validate.mjs fixtures/who-immz-profile.json fixtures/valid-immunization.json

# against the live WHO IG profile and a live resource
node validate.mjs \
  "https://worldhealthorganization.github.io/smart-immunizations/StructureDefinition-IMMZ.Immunization.json" \
  "https://r4.smarthealthit.org/Immunization/<some-id>"
```

Exit code is `0` if nothing required is missing, `1` otherwise.

**Note on the live example above:** running it against a resource from the public SMART Health IT sandbox reports all 5 rules missing. That's correct, not a bug -- that sandbox's data is synthetic *base* FHIR (Synthea-generated), with none of the WHO IG's own extensions or `protocolApplied` structure. It's a good demonstration that most public FHIR test data isn't IG-conformant; use the local fixtures to see a passing result.

## Running the tests

```bash
node validate.test.mjs
```

## How it works

1. `lib/parseProfile.mjs` reads a `StructureDefinition`'s `differential.element` array and extracts only the elements genuinely required *by this profile* (`min >= 1`), classifying each as a plain field (`{ kind: "field", path }`) or a required extension slice (`{ kind: "extension", parentPath, extensionUrl }`).
2. `lib/resolvePath.mjs` checks whether a dot-path resolves to a value on the actual resource, descending into arrays by checking whether any entry satisfies the remaining path.
3. `lib/resolveExtension.mjs` checks whether a resource (or a nested element inside it, like `location`) carries an extension with a specific canonical URL.
4. `lib/validateResource.mjs` combines the two to produce `{ present, missing, skipped }`.

Running `node validate.test.mjs` against the real WHO IMMZ.Immunization profile (`fixtures/who-immz-profile.json`) extracts exactly 5 required rules:
- 2 root-level extensions (`vaccineBrand`, `marketAuthorizationHolder`)
- 1 nested extension (`location`'s `countryOfVaccination`)
- 2 plain fields (`protocolApplied`, `protocolApplied.series`)

## Scope -- what this does and doesn't check

This is a **mini** validator, not a general-purpose FHIR profile resolver. Real profiles are more layered than step 7's simplified sample suggested -- inspecting the actual WHO profile JSON surfaced slicing, choice types, and fields the profile simply doesn't constrain at all (inherited unchanged from base FHIR). The scope below is deliberately bounded, not silently incomplete.

**Checked:**
- Plain dot-path fields with an explicit `min >= 1` in the differential, including ones nested inside a repeating element (e.g. `protocolApplied.series`)
- Extension slices with an explicit `min >= 1`, matched by their canonical URL (`type[0].profile[0]`), at the root or nested under another element (e.g. `location`)

**Not checked (out of scope for this mini validator):**
- Choice-type fields (e.g. `occurrence[x]`) -- resolving one correctly means trying every permitted type suffix (`occurrenceDateTime`, `occurrenceString`, ...). The parser flags any such element it encounters as `skipped` rather than silently mis-resolving it.
- `max` cardinality violations (too many values) -- only `min` (required/presence) is checked.
- Value set / binding validation -- would require a terminology server `$expand` call.
- General slicing discriminators (`type`/`value`/`exists`) -- this only matches slices by `sliceName` + extension URL, which correctly covers every slice in the real IMMZ profile, but isn't a general-purpose slicing resolver for arbitrary profiles.

## Connection to the rest of this repo

This generalizes directly into the kind of "required field" warnings already sketched in `dhis2-fhir-mapping-studio`'s preview step -- see [the project's own README](../README.md) for that app.

See [`PLAN.md`](PLAN.md) for the full design plan this was built from, including the real profile data that shaped the v1 scope decisions above.
