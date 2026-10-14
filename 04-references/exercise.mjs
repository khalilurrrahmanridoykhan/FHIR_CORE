const BASE_URL = "https://r4.smarthealthit.org";

async function main() {
  const bundle = await (await fetch(`${BASE_URL}/Immunization?_count=1`)).json();
  const immunization = bundle.entry[0].resource;

  console.log("reference string:", immunization.patient.reference);

  const [resourceType, id] = immunization.patient.reference.split("/");

  const patient = await (await fetch(`${BASE_URL}/${resourceType}/${id}`)).json();
  console.log("resolved patient name:", patient.name?.[0]);
  console.log("resolved patient resource:", patient);
}

main();
