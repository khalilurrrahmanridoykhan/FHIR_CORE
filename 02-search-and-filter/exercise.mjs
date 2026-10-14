const BASE_URL = "https://r4.smarthealthit.org";

async function main() {
  // TODO 1: fetch(`${BASE_URL}/Immunization?_count=5`) কল করুন

  // TODO 2: response.json() দিয়ে Bundle পড়ুন

  // TODO 3: bundle.entry (array) এর প্রতিটা item-এ .resource থাকে -- forEach দিয়ে ঘুরে
  //         প্রতিটার vaccineCode এবং occurrenceDateTime প্রিন্ট করুন
  // bundle.entry.forEach((entry) => {
  //   const imm = entry.resource
  //   console.log(imm.vaccineCode, imm.occurrenceDateTime)
  // })
}

main();
