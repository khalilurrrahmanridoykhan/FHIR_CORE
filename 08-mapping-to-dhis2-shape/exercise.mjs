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
  const vaccineCode = fhirImmunization.vaccineCode.coding[0].code;

  const dataValues = [
    { dataElement: dataElementIds.vaccineType, value: vaccineCode },
    { dataElement: dataElementIds.status, value: fhirImmunization.status },
  ];

  const event = {
    program: "IMMZ_PROGRAM",
    occurredAt: fhirImmunization.occurrenceDateTime,
    dataValues,
  };

  console.log(JSON.stringify(event, null, 2));
}

main();
