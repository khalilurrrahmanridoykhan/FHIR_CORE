const BASE_URL = "https://r4.smarthealthit.org";
const MAX_PAGES = 5;

async function main() {
  let url = `${BASE_URL}/Immunization?_count=2`;
  let allResources = [];
  let pageCount = 0;

  while (url && pageCount < MAX_PAGES) {
    const response = await fetch(url);
    const bundle = await response.json();

    const resources = bundle.entry?.map((e) => e.resource) ?? [];
    allResources = allResources.concat(resources);

    const nextLink = bundle.link?.find((l) => l.relation === "next");
    url = nextLink?.url ?? null;

    pageCount += 1;
    console.log(`page ${pageCount} fetched, next url present: ${Boolean(url)}`);
  }

  console.log("total resources across all pages:", allResources.length);
}


main();
