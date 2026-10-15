import { hasValueAtPath } from "./resolvePath.mjs";
import { hasExtension } from "./resolveExtension.mjs";

export function validate(resource, rules) {
  const present = [];
  const missing = [];
  const skipped = [];

  for (const rule of rules) {
    if (rule.kind === "skipped") {
      skipped.push(rule);
      continue;
    }

    const ok =
      rule.kind === "field"
        ? hasValueAtPath(resource, rule.path)
        : hasExtension(resource, rule.parentPath, rule.extensionUrl);

    (ok ? present : missing).push(rule);
  }

  return { present, missing, skipped };
}
