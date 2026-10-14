const BASE_URL = "https://r4.smarthealthit.org";

async function main() {
  // TODO 1: call fetch(`${BASE_URL}/Immunization?_count=5`)

  // TODO 2: read the Bundle with response.json()

  // TODO 3: bundle.entry (an array) has .resource on each item -- use forEach
  //         to print each one's vaccineCode and occurrenceDateTime
  // bundle.entry.forEach((entry) => {
  //   const imm = entry.resource
  //   console.log(imm.vaccineCode, imm.occurrenceDateTime)
  // })
}

main();
