const BASE_URL = "https://r4.smarthealthit.org";

async function main() {
  // TODO 1: search Immunization, _count=1, take the first entry.resource
  // const bundle = await (await fetch(`${BASE_URL}/Immunization?_count=1`)).json()
  // const immunization = bundle.entry[0].resource

  // TODO 2: print immunization.patient.reference -- see what it looks like
  // console.log("reference string:", immunization.patient.reference)

  // TODO 3: split the reference string on "/" -- you get [resourceType, id]
  // const [resourceType, id] = immunization.patient.reference.split("/")

  // TODO 4: fetch the actual resource using that resourceType/id
  // const patient = await (await fetch(`${BASE_URL}/${resourceType}/${id}`)).json()
  // console.log("resolved patient name:", patient.name?.[0])
}

main();
