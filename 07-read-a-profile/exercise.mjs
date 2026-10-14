// IMMZ.Immunization প্রোফাইলের differential.element-এর একটা বাস্তব, সরলীকৃত অংশ
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
  // TODO 1: differentialElements filter করুন -- min >= 1 মানে required
  // const requiredElements = differentialElements.filter((el) => el.min >= 1)

  // TODO 2: প্রতিটা required element-এর path প্রিন্ট করুন
  // requiredElements.forEach((el) => console.log(el.path))

  // TODO 3: মোট কতগুলো required ফিল্ড, সেটাও প্রিন্ট করুন
  // console.log("total required:", requiredElements.length)
}

main();
