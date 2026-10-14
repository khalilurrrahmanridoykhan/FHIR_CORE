const sampleImmunization = {
  resourceType: "Immunization",
  id: "sample-1",
  status: "completed",
  extension: [
    {
      url: "http://smart.who.int/immunizations/StructureDefinition/IMMZCountryOfVaccination",
      valueCode: "BD",
    },
    {
      url: "http://smart.who.int/immunizations/StructureDefinition/IMMZLiveVaccine",
      valueBoolean: true,
    },
  ],
};

function findExtension(resource, url) {
  // TODO 1: return the entry in resource.extension (array) whose .url === url
  // return resource.extension?.find((ext) => ext.url === url)
}

function main() {
  const countryExt = findExtension(
    sampleImmunization,
    "http://smart.who.int/immunizations/StructureDefinition/IMMZCountryOfVaccination"
  );
  // TODO 2: print countryExt.valueCode
  // console.log("country of vaccination:", countryExt?.valueCode)

  const liveVaccineExt = findExtension(
    sampleImmunization,
    "http://smart.who.int/immunizations/StructureDefinition/IMMZLiveVaccine"
  );
  // TODO 3: print liveVaccineExt.valueBoolean
  // console.log("is live vaccine:", liveVaccineExt?.valueBoolean)
}

main();
