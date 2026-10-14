// A real, simplified slice of the IMMZ.Immunization profile's differential.element
const differentialElements = [
  { path: "Immunization.status", min: 1, max: "1" },
  { path: "Immunization.vaccineCode", min: 1, max: "1" },
  { path: "Immunization.patient", min: 1, max: "1" },
  { path: "Immunization.occurrenceDateTime", min: 1, max: "1" },
  { path: "Immunization.statusReason", min: 0, max: "1" },
  { path: "Immunization.protocolApplied", min: 1, max: "*" },
  { path: "Immunization.protocolApplied.series", min: 1, max: "1" },
];

function main() {
  const requiredElements = differentialElements.filter((el) => el.min >= 1);

  requiredElements.forEach((el) => console.log(el.path));
  console.log("total required:", requiredElements.length);
}

main();
