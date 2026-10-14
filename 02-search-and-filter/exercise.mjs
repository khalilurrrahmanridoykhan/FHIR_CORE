const BASE_URL = "https://r4.smarthealthit.org";

async function main() {
  const response = await fetch(`${BASE_URL}/Immunization?_count=5`);
  const bundle = await response.json();

  console.log("total entries on this page:", bundle.entry?.length ?? 0);

  bundle.entry?.forEach((entry) => {
    const imm = entry.resource;
    console.log(imm.vaccineCode, imm.occurrenceDateTime);
  });
}

main();
