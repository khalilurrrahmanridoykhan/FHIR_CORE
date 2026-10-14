const BASE_URL = "https://hapi.fhir.org/baseR4";

const testPatient = {
  resourceType: "Patient",
  name: [{ use: "nickname", family: "Khalilur", given: ["Khan"] }],
  gender: "male",
};

async function main() {
  const createResponse = await fetch(`${BASE_URL}/Patient`, {
    method: "POST",
    headers: { "Content-Type": "application/fhir+json" },
    body: JSON.stringify(testPatient),
  });
  const created = await createResponse.json();

  if (!createResponse.ok) {
    console.error("create failed, status:", createResponse.status);
    console.error("server message:", created.issue?.[0]?.diagnostics ?? created);
    return;
  }

  console.log("created with id:", created.id);

  const readBack = await (await fetch(`${BASE_URL}/Patient/${created.id}`)).json();
  console.log("read back name:", readBack.name);

  const deleteResponse = await fetch(`${BASE_URL}/Patient/${created.id}`, {
    method: "DELETE",
  });
  console.log("delete status:", deleteResponse.status);
}
main();
