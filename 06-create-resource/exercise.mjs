const BASE_URL = "https://hapi.fhir.org/baseR4";

const testPatient = {
  resourceType: "Patient",
  name: [{ use: "official", family: "FHIR Learning", given: ["TEST -"] }],
  gender: "unknown",
};

async function main() {
  // TODO 1: create testPatient via POST
  // when calling fetch, pass method: "POST", headers: { "Content-Type": "application/fhir+json" },
  // body: JSON.stringify(testPatient)
  // const createResponse = await fetch(`${BASE_URL}/Patient`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/fhir+json" },
  //   body: JSON.stringify(testPatient),
  // })
  // const created = await createResponse.json()
  // console.log("created with id:", created.id)

  // TODO 2: GET it back using created.id
  // const readBack = await (await fetch(`${BASE_URL}/Patient/${created.id}`)).json()
  // console.log("read back name:", readBack.name)

  // TODO 3: DELETE it using created.id, to clean up
  // const deleteResponse = await fetch(`${BASE_URL}/Patient/${created.id}`, { method: "DELETE" })
  // console.log("delete status:", deleteResponse.status)
}

main();
