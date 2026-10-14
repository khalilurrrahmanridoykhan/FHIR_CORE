const fhirImmunization = {
  resourceType: "Immunization",
  id: "sample-1",
  status: "completed",
  vaccineCode: {
    coding: [{ system: "http://hl7.org/fhir/sid/cvx", code: "19", display: "BCG" }],
  },
  patient: { reference: "Patient/pt-001" },
  occurrenceDateTime: "2024-03-10",
};

// কোন DHIS2 dataElement কোন FHIR path থেকে ভ্যালু পাবে
const dataElementIds = {
  vaccineType: "DE_vaccineType",
  status: "DE_status",
};

function main() {
  // TODO 1: fhirImmunization.vaccineCode.coding[0].code থেকে vaccine code বের করুন
  // const vaccineCode = fhirImmunization.vaccineCode.coding[0].code

  // TODO 2: দুটো dataValue বানান -- { dataElement, value } আকারে
  // const dataValues = [
  //   { dataElement: dataElementIds.vaccineType, value: vaccineCode },
  //   { dataElement: dataElementIds.status, value: fhirImmunization.status },
  // ]

  // TODO 3: পুরো DHIS2 event object বানান
  // const event = {
  //   program: "IMMZ_PROGRAM",
  //   occurredAt: fhirImmunization.occurrenceDateTime,
  //   dataValues,
  // }

  // TODO 4: console.log(JSON.stringify(event, null, 2)) দিয়ে প্রিন্ট করুন
}

main();
