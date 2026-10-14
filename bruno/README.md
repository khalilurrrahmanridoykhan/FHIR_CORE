# Bruno collection -- interactive testing

Every exercise's HTTP call is also available here as a [Bruno](https://www.usebruno.com) request -- see the response by clicking a button, without writing any code. If something's hard to follow from the code alone, run it in Bruno first to see the response with your own eyes, then write the code in `exercise.mjs` -- the same thing, seen two ways.

## Installing

Download the free desktop app (Mac/Windows/Linux) from [usebruno.com/downloads](https://www.usebruno.com/downloads).

## Opening the collection

1. Open Bruno -- click "Open Collection"
2. Select the `bruno/` folder inside this repo
3. From the environment dropdown in the top right, select **"Sandbox"** (this sets the `hapiBaseUrl`/`smartBaseUrl` variables -- without selecting an environment, the URLs will be empty)

## Folder layout

Folders are numbered to match the exercises -- match each folder's number to the corresponding `exercise.mjs`.

| Folder | What's there |
|---|---|
| `01-first-fetch` | A single GET |
| `02-search-and-filter` | A search GET |
| `03-pagination` | Two requests, run in order (1 -> 2) |
| `04-references` | Two requests, run in order (1 -> 2) |
| `06-create-resource` | Three requests, run in order (1 -> 2 -> 3) |
| `07-read-a-profile` | A single GET (directly from the WHO IG) |

`05-extensions` and `08-mapping-to-dhis2-shape` make no network calls (they only work with local data), so there are no requests for them here.

## How the ordered requests work

Some requests remember a value from the previous request's response (such as a newly created resource's `id`) and use it in the next request -- this is written in Bruno's **"script:post-response"** section, which saves a variable with `bru.setVar(...)`. Each request's "Docs" tab explains this, and the filenames are numbered (`1-...`, `2-...`) to show the order to run them in.

## A warning

The requests in `06-create-resource` are **real write operations** -- they genuinely create a test Patient on the public `hapi.fhir.org` sandbox. Always run the third request (Delete) to clean up afterward.
