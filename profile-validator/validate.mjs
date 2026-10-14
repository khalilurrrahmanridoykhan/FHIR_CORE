import { readFileSync } from "node:fs";
import { parseProfile } from "./lib/parseProfile.mjs";
import { validate } from "./lib/validateResource.mjs";

async function loadJson(arg) {
  if (/^https?:\/\//.test(arg)) {
    const response = await fetch(arg);
    return response.json();
  }
  return JSON.parse(readFileSync(arg, "utf8"));
}

function describeRule(rule) {
  return rule.kind === "field" ? rule.path : `${rule.parentPath ? rule.parentPath + "." : ""}extension[${rule.extensionUrl}]`;
}

async function main() {
  const [profileArg, resourceArg] = process.argv.slice(2);
  if (!profileArg || !resourceArg) {
    console.error("Usage: node validate.mjs <profile.json-or-url> <resource.json-or-url>");
    process.exit(1);
  }

  const profile = await loadJson(profileArg);
  const resource = await loadJson(resourceArg);

  const rules = parseProfile(profile);
  const { present, missing, skipped } = validate(resource, rules);

  console.log(
    `Checked ${present.length + missing.length} required rule(s) from "${profile.name ?? profile.id ?? profileArg}" ` +
      `against ${resource.resourceType}/${resource.id ?? "?"}`
  );
  console.log(`  present: ${present.length}`);
  console.log(`  missing: ${missing.length}`);
  if (skipped.length) console.log(`  skipped (unsupported): ${skipped.length}`);

  if (present.length) {
    console.log("\nPresent:");
    present.forEach((rule) => console.log("  OK     ", describeRule(rule)));
  }

  if (missing.length) {
    console.log("\nMissing (required by the profile, not found on the resource):");
    missing.forEach((rule) => console.log("  MISSING", describeRule(rule)));
  }

  if (skipped.length) {
    console.log("\nSkipped (not checked by this mini validator):");
    skipped.forEach((rule) => console.log("  SKIP   ", rule.path, `(${rule.reason})`));
  }

  process.exit(missing.length > 0 ? 1 : 0);
}

main();
