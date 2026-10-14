// Step 1: fetch a single FHIR resource

const BASE_URL = "https://hapi.fhir.org/baseR4";

async function main() {
  const response = await fetch(`${BASE_URL}/Patient/nhanes-120412`);
  const patient = await response.json();

  console.log("Fetched Patient:", patient);
  // console.log("resourceType:", patient.resourceType);
  // console.log("id:", patient.id);
  // console.log("name:", patient.name?.[0]);
}
main();
