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

## License

MIT -- see [LICENSE](LICENSE).
