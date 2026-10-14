const BASE_URL = "https://hapi.fhir.org/baseR4";

const testPatient = {
  resourceType: "Patient",
  name: [{ use: "official", family: "FHIR Learning", given: ["TEST -"] }],
  gender: "unknown",
};

async function main() {
  // TODO 1: POST দিয়ে testPatient তৈরি করুন
  // fetch করার সময় method: "POST", headers: { "Content-Type": "application/fhir+json" },
  // body: JSON.stringify(testPatient) দিতে হবে
  // const createResponse = await fetch(`${BASE_URL}/Patient`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/fhir+json" },
  //   body: JSON.stringify(testPatient),
  // })
  // const created = await createResponse.json()
  // console.log("created with id:", created.id)

  // TODO 2: created.id দিয়ে GET করে আবার পড়ুন
  // const readBack = await (await fetch(`${BASE_URL}/Patient/${created.id}`)).json()
  // console.log("read back name:", readBack.name)

  // TODO 3: created.id দিয়ে DELETE করে পরিষ্কার করুন
  // const deleteResponse = await fetch(`${BASE_URL}/Patient/${created.id}`, { method: "DELETE" })
  // console.log("delete status:", deleteResponse.status)
}

main();
