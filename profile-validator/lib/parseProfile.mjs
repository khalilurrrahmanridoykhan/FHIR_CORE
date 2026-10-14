// Turns a StructureDefinition's differential.element array into a flat list
// of "required by this profile" rules. See profile-validator/README.md for
// exactly which patterns this does and doesn't handle (it's a mini validator,
// not a general-purpose FHIR profile resolver).

function stripResourceTypePrefix(path) {
  const dotIndex = path.indexOf(".");
  return dotIndex === -1 ? "" : path.slice(dotIndex + 1);
}

export function parseProfile(structureDefinition) {
  const elements = structureDefinition.differential?.element ?? [];
  const rules = [];

  for (const el of elements) {
    if (el.min == null || el.min < 1) continue; // not required by this profile
    if (el.slicing) continue; // a slicing/discriminator declaration, not an actual rule

    if (el.path.includes("[x]")) {
      rules.push({ kind: "skipped", path: el.path, reason: "choice-type field, not supported by this mini validator" });
      continue;
    }

    const lastSegment = el.path.split(".").pop();
    const extensionUrl = el.type?.[0]?.profile?.[0];

    if (lastSegment === "extension") {
      if (!el.sliceName || !extensionUrl) continue; // generic/unsliced extension container, no specific rule to check
      const parentPath = stripResourceTypePrefix(el.path.replace(/\.extension$/, ""));
      rules.push({ kind: "extension", parentPath, extensionUrl, label: el.sliceName });
      continue;
    }

    const path = stripResourceTypePrefix(el.path);
    if (!path) continue; // the resource-type root element itself
    rules.push({ kind: "field", path, label: el.id });
  }

  return rules;
}
