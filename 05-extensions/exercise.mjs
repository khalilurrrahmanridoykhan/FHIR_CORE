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
  return resource.extension?.find((ext) => ext.url === url);
}

function main() {
  const countryExt = findExtension(
    sampleImmunization,
    "http://smart.who.int/immunizations/StructureDefinition/IMMZCountryOfVaccination"
  );
  console.log("country of vaccination:", countryExt?.valueCode);

  const liveVaccineExt = findExtension(
    sampleImmunization,
    "http://smart.who.int/immunizations/StructureDefinition/IMMZLiveVaccine"
  );
  console.log("is live vaccine:", liveVaccineExt?.valueBoolean);
}

main();
