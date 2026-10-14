import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseProfile } from "./lib/parseProfile.mjs";
import { validate } from "./lib/validateResource.mjs";

const readFixture = (name) => JSON.parse(readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf8"));

const profile = readFixture("who-immz-profile.json");
const validResource = readFixture("valid-immunization.json");
const missingFieldResource = readFixture("missing-required-field.json");

const rules = parseProfile(profile);
assert.equal(rules.length, 5, `expected 5 required rules from the real WHO profile, got ${rules.length}`);
console.log("PASS: parseProfile extracts exactly 5 required rules from the real WHO profile");

{
  const { missing } = validate(validResource, rules);
  assert.equal(missing.length, 0, `expected a fully valid resource to have 0 missing, got ${missing.length}`);
  console.log("PASS: a fully valid resource reports 0 missing rules");
}

{
  const { missing } = validate(missingFieldResource, rules);
  const missingPaths = missing.map((rule) => rule.path);
  assert.ok(missingPaths.includes("protocolApplied"), "expected protocolApplied to be reported missing");
  console.log("PASS: a resource missing protocolApplied entirely is correctly flagged");
}

{
  // Clone the valid resource but strip `series` from its one protocolApplied entry --
  // exercises the array-walking branch of resolvePath specifically, not just top-level fields.
  const resource = JSON.parse(JSON.stringify(validResource));
  delete resource.protocolApplied[0].series;
  const { missing } = validate(resource, rules);
  const missingPaths = missing.map((rule) => rule.path);
  assert.ok(missingPaths.includes("protocolApplied.series"), "expected protocolApplied.series to be reported missing");
  console.log("PASS: a missing field nested inside a repeating element (protocolApplied.series) is correctly flagged");
}

{
  // Clone the valid resource and remove specifically the vaccineBrand extension.
  const resource = JSON.parse(JSON.stringify(validResource));
  resource.extension = resource.extension.filter(
    (ext) => ext.url !== "http://smart.who.int/immunizations/StructureDefinition/IMMZVaccineBrand"
  );
  const { missing } = validate(resource, rules);
  const missingUrls = missing.map((rule) => rule.extensionUrl);
  assert.ok(
    missingUrls.includes("http://smart.who.int/immunizations/StructureDefinition/IMMZVaccineBrand"),
    "expected the vaccineBrand extension to be reported missing"
  );
  console.log("PASS: a missing required extension (vaccineBrand) is correctly flagged");
}

console.log("\nAll profile-validator tests passed.");
