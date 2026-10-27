# FHIR Core

A self-built, hands-on curriculum for learning HL7 FHIR fundamentals -- eight progressive exercises, each run against a real public FHIR server, no SDK or framework in between.

Written while working on a pair of DHIS2 apps ([`dhis2-fhir-mapping-studio`](https://github.com/khalilurrrahmanridoykhan/dhis2-fhir-mapping-studio) and [`dhis2-fhir-sync-console`](https://github.com/khalilurrrahmanridoykhan/dhis2-fhir-sync-console)) that bridge FHIR data into DHIS2 Tracker. Each exercise isolates one concept those apps rely on in production, stripped down to plain Node.js so the concept is visible without any app-specific code around it.

## What's covered

| Step | Topic |
|---|---|
| [01-first-fetch](01-first-fetch) | Reading a single resource by id |
| [02-search-and-filter](02-search-and-filter) | Searching a resource type and reading a Bundle |
| [03-pagination](03-pagination) | Following a Bundle's `next` link across pages |
| [04-references](04-references) | Resolving a `Reference` field into its target resource |
| [05-extensions](05-extensions) | Reading data carried in `extension` elements |
| [06-create-resource](06-create-resource) | Create / read-back / delete against a live server |
| [07-read-a-profile](07-read-a-profile) | Deriving required fields from a StructureDefinition |
| [08-mapping-to-dhis2-shape](08-mapping-to-dhis2-shape) | Mapping a FHIR resource into a target system's own data shape |

Each folder has its own `README.md` (concept + the task) and an `exercise.mjs` with `TODO` markers to fill in. Worked solutions are kept locally and aren't published here -- the point of each exercise is to write the code yourself.

## Running

Requires Node.js 18+ (uses the built-in `fetch`, no dependencies, no `npm install`):

```bash
node 01-first-fetch/exercise.mjs
```

Every exercise runs against a public FHIR test sandbox:
- `https://hapi.fhir.org/baseR4` -- supports read and write, safe for test data
- `https://r4.smarthealthit.org` -- read-only examples

No real patient data is used anywhere in this repo.

## Interactive testing with Bruno

Each exercise's HTTP calls are also available as a [Bruno](https://www.usebruno.com) collection under [`bruno/`](bruno) -- open that folder in the Bruno app, select the **Sandbox** environment, and run requests without writing any code first. See [`bruno/README.md`](bruno/README.md) for details.

## What's next

Project ideas that build directly on these eight exercises, roughly ordered from closest-to-this-curriculum to more ambitious:

1. ✅ **A mini FHIR profile validator** -- take any resource plus a StructureDefinition JSON and report which required fields are missing. Extends step 7's `min >= 1` check into something reusable instead of a hardcoded list. Done: [`profile-validator/`](profile-validator), CLI + browser demo, live-verified against the real WHO IG.
2. **Extend a mapping tool to a second resource type** -- e.g. `Observation` (lab results) alongside `Immunization`. Forces reading a new profile and handling a different value shape (`valueQuantity`/`valueCodeableConcept` instead of `vaccineCode`). Planned (real codebase investigated, implementation plan written) but not yet built.
3. ✅ **A FHIR -> DHIS2 aggregate pipeline** -- fetch a batch of resources, count them by category and period, and push totals to DHIS2's Aggregate API (`dataValueSets`) instead of the Tracker API. A genuinely different DHIS2 data model (aggregate vs. individual-level). Done, as its own repo: [`dhis2-fhir-aggregate-pipeline`](https://github.com/khalilurrrahmanridoykhan/dhis2-fhir-aggregate-pipeline), live-verified against a real public DHIS2 instance.
4. **A real SMART on FHIR login flow** -- use a public launcher (e.g. [launch.smarthealthit.org](https://launch.smarthealthit.org)) to build the actual OAuth2 redirect -> token exchange -> authenticated call. Nothing in this curriculum implements auth; this closes that gap. Not started.
5. ✅ **A national-IG conformance checker** -- combine #1 with any country's published IG (fetch its StructureDefinition, validate a sample resource against it). Done: `profile-validator` was already generic, now proven against Bangladesh DGHS's real `bd-immunization` profile with zero code changes -- see [`profile-validator/README.md`](profile-validator/README.md#verified-against-a-second-independent-national-ig).
6. **A minimal FHIR server from scratch** -- implement just `Patient` (`GET`/`POST`/search returning a proper `Bundle`) in a small HTTP server. Everything above is the client side; this is the server side. Not started.

## License

MIT -- see [LICENSE](LICENSE).
