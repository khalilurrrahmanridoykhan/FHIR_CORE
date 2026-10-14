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
  // TODO 1: resource.extension (array) থেকে যার .url === url তাকে ফেরত দিন
  // return resource.extension?.find((ext) => ext.url === url)
}

function main() {
  const countryExt = findExtension(
    sampleImmunization,
    "http://smart.who.int/immunizations/StructureDefinition/IMMZCountryOfVaccination"
  );
  // TODO 2: countryExt.valueCode প্রিন্ট করুন
  // console.log("country of vaccination:", countryExt?.valueCode)

  const liveVaccineExt = findExtension(
    sampleImmunization,
    "http://smart.who.int/immunizations/StructureDefinition/IMMZLiveVaccine"
  );
  // TODO 3: liveVaccineExt.valueBoolean প্রিন্ট করুন
  // console.log("is live vaccine:", liveVaccineExt?.valueBoolean)
}

main();
