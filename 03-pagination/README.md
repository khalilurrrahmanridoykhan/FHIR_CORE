# Step 3: Pagination (following a Bundle's `next` link)

## Concept

If a search matches a lot of resources (thousands of Immunizations, say), the server doesn't send them all at once -- it splits them into pages. Every Bundle's `link` array has a `relation: "next"` entry if more pages exist:

```json
{
  "link": [
    { "relation": "self", "url": "...?_count=5" },
    { "relation": "next", "url": "...?_getpages=abc123&_getpagesoffset=5&_count=5" }
  ]
}
```

To get the next page, `GET` that `next` URL directly -- no need to add any parameters yourself, the URL is already complete.

## A real bug this caught in your own project

Your `dhis2-fhir-sync-console` README documents this: HAPI's `next` link carries no resource-type path at all (`.../baseR4?_getpages=...`, not `.../baseR4/Immunization?...`). Buggy code treated that empty path as "no more pages" and stopped.

**The correct rule:** check for the **presence** of a `next` link to know if more pages exist -- don't rely on what the URL's path looks like.

## Task

In `exercise.mjs`:
1. Search Immunization with `_count=2` (a deliberately small page, so multiple pages are needed)
2. Write a loop: while the Bundle has a `next` link, fetch that URL
3. Print the total number of resources collected across all pages
4. Stop after at most 5 pages as a safety net (an infinite-loop guard)

## Connection to your own project

This exact logic lives in your `dhis2-fhir-sync-console/src/lib/fhirRouteFetch.ts`, and there's a regression test for this bug in `fhirRouteFetch.test.ts`.
