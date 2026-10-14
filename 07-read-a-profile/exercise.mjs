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
  // TODO 1: filter differentialElements -- min >= 1 means required
  // const requiredElements = differentialElements.filter((el) => el.min >= 1)

  // TODO 2: print the path of each required element
  // requiredElements.forEach((el) => console.log(el.path))

  // TODO 3: also print how many required fields there are in total
  // console.log("total required:", requiredElements.length)
}

main();
