const BASE_URL = "https://r4.smarthealthit.org";

async function main() {
  // TODO 1: Immunization সার্চ করুন, _count=1, প্রথম entry.resource নিন
  // const bundle = await (await fetch(`${BASE_URL}/Immunization?_count=1`)).json()
  // const immunization = bundle.entry[0].resource

  // TODO 2: immunization.patient.reference প্রিন্ট করুন -- দেখুন কেমন দেখতে
  // console.log("reference string:", immunization.patient.reference)

  // TODO 3: reference string-কে "/" দিয়ে split করুন -- [resourceType, id] পাবেন
  // const [resourceType, id] = immunization.patient.reference.split("/")

  // TODO 4: সেই resourceType/id দিয়ে আসল resource fetch করুন
  // const patient = await (await fetch(`${BASE_URL}/${resourceType}/${id}`)).json()
  // console.log("resolved patient name:", patient.name?.[0])
}

main();
