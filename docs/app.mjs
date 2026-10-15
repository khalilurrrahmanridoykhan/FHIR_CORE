import { parseProfile } from "./lib/parseProfile.mjs";
import { validate } from "./lib/validateResource.mjs";

const profileText = document.getElementById("profile-text");
const resourceText = document.getElementById("resource-text");
const profileUrl = document.getElementById("profile-url");
const resourceUrl = document.getElementById("resource-url");
const statusEl = document.getElementById("status");
const reportEl = document.getElementById("report");

const WHO_PROFILE_URL =
  "https://worldhealthorganization.github.io/smart-immunizations/StructureDefinition-IMMZ.Immunization.json";

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

async function loadLocalFixture(name) {
  const response = await fetch(`fixtures/${name}`);
  if (!response.ok) throw new Error(`could not load local fixture ${name} (${response.status})`);
  return response.text();
}

document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      setStatus("Loading example...");
      if (button.dataset.example === "profile") {
        profileText.value = await loadLocalFixture("who-immz-profile.json");
        profileUrl.value = WHO_PROFILE_URL;
      } else if (button.dataset.example === "valid") {
        resourceText.value = await loadLocalFixture("valid-immunization.json");
        resourceUrl.value = "";
      } else if (button.dataset.example === "missing") {
        resourceText.value = await loadLocalFixture("missing-required-field.json");
        resourceUrl.value = "";
      }
      setStatus("Example loaded.");
    } catch (err) {
      setStatus(err.message, true);
    }
  });
});

document.querySelectorAll("[data-fetch]").forEach((button) => {
  button.addEventListener("click", async () => {
    const which = button.dataset.fetch;
    const urlInput = which === "profile" ? profileUrl : resourceUrl;
    const textArea = which === "profile" ? profileText : resourceText;
    const url = urlInput.value.trim();
    if (!url) {
      setStatus(`Enter a URL for the ${which} first.`, true);
      return;
    }
    try {
      setStatus(`Fetching ${which}...`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`server responded with ${response.status}`);
      const json = await response.json();
      textArea.value = JSON.stringify(json, null, 2);
      setStatus(`Fetched ${which}.`);
    } catch (err) {
      setStatus(
        `Could not fetch ${which}: ${err.message}. The server may not allow cross-origin requests from a browser.`,
        true
      );
    }
  });
});

function describeRule(rule) {
  return rule.kind === "field"
    ? rule.path
    : `${rule.parentPath ? rule.parentPath + "." : ""}extension[${rule.extensionUrl}]`;
}

function renderReport({ present, missing, skipped }) {
  reportEl.innerHTML = "";

  const summary = document.createElement("div");
  summary.className = "summary";
  summary.innerHTML = `
    <span style="background:var(--ok-bg);color:var(--ok)">present: ${present.length}</span>
    <span style="background:var(--missing-bg);color:var(--missing)">missing: ${missing.length}</span>
    ${skipped.length ? `<span style="background:var(--skip-bg);color:var(--skip)">skipped: ${skipped.length}</span>` : ""}
  `;
  reportEl.appendChild(summary);

  const addList = (title, rules, className, describe) => {
    if (rules.length === 0) return;
    const heading = document.createElement("h3");
    heading.textContent = title;
    heading.style.margin = "4px 0 0";
    heading.style.fontSize = "0.9rem";
    reportEl.appendChild(heading);

    const list = document.createElement("ul");
    list.className = `rule-list ${className}`;
    rules.forEach((rule) => {
      const li = document.createElement("li");
      li.textContent = describe(rule);
      list.appendChild(li);
    });
    reportEl.appendChild(list);
  };

  addList("Present", present, "present", describeRule);
  addList("Missing (required by the profile, not found on the resource)", missing, "missing", describeRule);
  addList("Skipped (not checked by this mini validator)", skipped, "skipped", (r) => `${r.path} (${r.reason})`);
}

document.getElementById("validate-btn").addEventListener("click", () => {
  reportEl.innerHTML = "";
  let profile;
  let resource;

  try {
    profile = JSON.parse(profileText.value);
  } catch (err) {
    setStatus(`Profile is not valid JSON: ${err.message}`, true);
    return;
  }

  try {
    resource = JSON.parse(resourceText.value);
  } catch (err) {
    setStatus(`Resource is not valid JSON: ${err.message}`, true);
    return;
  }

  if (profile.resourceType !== "StructureDefinition") {
    setStatus(`Profile should be a StructureDefinition, got "${profile.resourceType}".`, true);
    return;
  }

  try {
    const rules = parseProfile(profile);
    const result = validate(resource, rules);
    setStatus(
      `Checked ${result.present.length + result.missing.length} required rule(s) against ${resource.resourceType}/${resource.id ?? "?"}.`
    );
    renderReport(result);
  } catch (err) {
    setStatus(`Validation failed: ${err.message}`, true);
  }
});
