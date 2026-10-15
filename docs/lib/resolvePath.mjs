// Checks whether a dot-path (already stripped of its leading resource-type
// segment, e.g. "protocolApplied.series") resolves to a present value on a
// resource. Descends into arrays by checking whether ANY entry satisfies the
// remaining path -- this matches the common FHIR case of "this field is
// required within each repeat."

export function hasValueAtPath(resource, path) {
  if (!path) return resource !== undefined && resource !== null;

  const dotIndex = path.indexOf(".");
  const head = dotIndex === -1 ? path : path.slice(0, dotIndex);
  const rest = dotIndex === -1 ? "" : path.slice(dotIndex + 1);

  const value = resource?.[head];
  if (value === undefined || value === null) return false;

  if (Array.isArray(value)) {
    if (value.length === 0) return false;
    return value.some((entry) => hasValueAtPath(entry, rest));
  }

  return hasValueAtPath(value, rest);
}
