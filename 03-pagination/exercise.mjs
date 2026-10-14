const BASE_URL = "https://r4.smarthealthit.org";
const MAX_PAGES = 5;

async function main() {
  let url = `${BASE_URL}/Immunization?_count=2`;
  let allResources = [];
  let pageCount = 0;

  while (url && pageCount < MAX_PAGES) {
    // TODO 1: url fetch করুন, json() পড়ুন
    // const response = await fetch(url)
    // const bundle = await response.json()

    // TODO 2: এই পেজের resource গুলো allResources-এ জমা করুন
    // const resources = bundle.entry?.map((e) => e.resource) ?? []
    // allResources = allResources.concat(resources)

    // TODO 3: bundle.link array-এ relation === "next" এমন entry খুঁজুন
    //         পেলে তার .url-কে পরের loop-এর জন্য `url` ভ্যারিয়েবলে রাখুন,
    //         না পেলে url-কে null করে দিন (loop থেমে যাবে)
    // const nextLink = bundle.link?.find((l) => l.relation === "next")
    // url = nextLink?.url ?? null

    pageCount += 1;
    console.log(`page ${pageCount} fetched`);
  }

  console.log("total resources across all pages:", allResources.length);
}

main();
