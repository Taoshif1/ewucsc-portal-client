const normalizeConfiguredUrl = (value = "") => String(value || "").trim().replace(/\/$/, "");

export const technicalHubUrl =
  normalizeConfiguredUrl(import.meta.env.VITE_TECHNICAL_HUB_URL) || "/learning";

export const ctfEventUrl =
  normalizeConfiguredUrl(import.meta.env.VITE_CTF_EVENT_URL) || "";

export const isExternalHref = (value = "") => /^https?:\/\//i.test(value);

export const technicalLearningUrl = isExternalHref(technicalHubUrl)
  ? technicalHubUrl + "/learning"
  : "/learning";

export const technicalResourcesUrl = isExternalHref(technicalHubUrl)
  ? technicalHubUrl + "/resources"
  : "/resources";
