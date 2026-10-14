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

// which DHIS2 dataElement gets its value from which FHIR path
const dataElementIds = {
  vaccineType: "DE_vaccineType",
  status: "DE_status",
};

function main() {
  // TODO 1: read the vaccine code from fhirImmunization.vaccineCode.coding[0].code
  // const vaccineCode = fhirImmunization.vaccineCode.coding[0].code

  // TODO 2: build two dataValues -- each shaped as { dataElement, value }
  // const dataValues = [
  //   { dataElement: dataElementIds.vaccineType, value: vaccineCode },
  //   { dataElement: dataElementIds.status, value: fhirImmunization.status },
  // ]

  // TODO 3: build the full DHIS2 event object
  // const event = {
  //   program: "IMMZ_PROGRAM",
  //   occurredAt: fhirImmunization.occurrenceDateTime,
  //   dataValues,
  // }

  // TODO 4: print it with console.log(JSON.stringify(event, null, 2))
}

main();
