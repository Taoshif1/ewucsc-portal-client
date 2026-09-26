const normalizeConfiguredUrl = (value = "") =>
  String(value || "").trim().replace(/\/$/, "");

export const technicalHubUrl =
  normalizeConfiguredUrl(import.meta.env.VITE_TECHNICAL_HUB_URL) || "/learning";

export const authPortalUrl =
  normalizeConfiguredUrl(import.meta.env.VITE_AUTH_PORTAL_URL) || "";

export const ctfEventUrl =
  normalizeConfiguredUrl(import.meta.env.VITE_CTF_EVENT_URL) || "";

export const isExternalHref = (value = "") => /^https?:\/\//i.test(value);

const appendPath = (base, path) => {
  if (!base) return path;
  if (!isExternalHref(base)) return path;
  return base + path;
};

export const authLoginUrl = appendPath(authPortalUrl, "/login");
export const authRegisterUrl = appendPath(authPortalUrl, "/register");

export const technicalLearningUrl = isExternalHref(technicalHubUrl)
  ? technicalHubUrl + "/learning"
  : "/learning";

export const technicalResourcesUrl = isExternalHref(technicalHubUrl)
  ? technicalHubUrl + "/resources"
  : "/resources";
