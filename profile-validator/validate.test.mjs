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

// A second, independent national IG (Bangladesh DGHS's real bd-immunization
// profile, not WHO's) -- confirms parseProfile/validate generalize to a
// profile from a different publisher, with zero code changes.
{
  const dghsProfile = readFixture("dghs-bd-immunization-profile.json");
  const dghsValid = readFixture("dghs-valid-immunization.json");
  const dghsMissing = readFixture("dghs-missing-required-field.json");

  const dghsRules = parseProfile(dghsProfile);
  assert.equal(dghsRules.length, 2, `expected 2 required rules from the real DGHS profile, got ${dghsRules.length}`);
  assert.ok(dghsRules.some((r) => r.path === "identifier"), "expected 'identifier' to be a required rule");
  assert.ok(dghsRules.some((r) => r.path === "encounter"), "expected 'encounter' to be a required rule");

  const { missing: dghsValidMissing } = validate(dghsValid, dghsRules);
  assert.equal(dghsValidMissing.length, 0, "expected the valid DGHS resource to have 0 missing");

  const { missing: dghsIncompleteMissing } = validate(dghsMissing, dghsRules);
  const dghsMissingPaths = dghsIncompleteMissing.map((r) => r.path);
  assert.ok(dghsMissingPaths.includes("identifier"), "expected the DGHS resource's missing identifier to be flagged");

  console.log("PASS: parseProfile/validate work unmodified against a second, independent national IG (DGHS bd-immunization)");
}

console.log("\nAll profile-validator tests passed.");
