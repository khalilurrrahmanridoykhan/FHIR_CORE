const BASE_URL = "https://r4.smarthealthit.org";
const MAX_PAGES = 5;

async function main() {
  let url = `${BASE_URL}/Immunization?_count=2`;
  let allResources = [];
  let pageCount = 0;

  while (url && pageCount < MAX_PAGES) {
    // TODO 1: fetch url, read json()
    // const response = await fetch(url)
    // const bundle = await response.json()

    // TODO 2: collect this page's resources into allResources
    // const resources = bundle.entry?.map((e) => e.resource) ?? []
    // allResources = allResources.concat(resources)

    // TODO 3: look in bundle.link for an entry with relation === "next"
    //         if found, put its .url into `url` for the next loop iteration,
    //         otherwise set url to null (the loop will stop)
    // const nextLink = bundle.link?.find((l) => l.relation === "next")
    // url = nextLink?.url ?? null

    pageCount += 1;
    console.log(`page ${pageCount} fetched`);
  }

  console.log("total resources across all pages:", allResources.length);
}

main();
