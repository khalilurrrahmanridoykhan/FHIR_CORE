// Checks whether a resource (or a nested element inside it, like `location`)
// carries an extension with a specific canonical URL.

export function hasExtension(resource, parentPath, extensionUrl) {
  let target = resource;

  if (parentPath) {
    for (const segment of parentPath.split(".")) {
      target = target?.[segment];
      if (target == null) return false;
    }
  }

  const candidates = Array.isArray(target) ? target : [target];
  return candidates.some(
    (obj) => Array.isArray(obj?.extension) && obj.extension.some((ext) => ext.url === extensionUrl)
  );
}
