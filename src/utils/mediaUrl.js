import { API_BASE_URL } from "../services/api";

const INTERNAL_UPLOAD_PREFIX = "/api/uploads/";

const extractInternalUploadPath = (value = "") => {
  const raw = String(value || "").trim();
  if (!raw) return "";

  if (raw.startsWith(INTERNAL_UPLOAD_PREFIX)) {
    return raw;
  }

  if (raw.startsWith("/uploads/")) {
    return "/api" + raw;
  }

  try {
    const parsed = new URL(raw);

    if (parsed.pathname.startsWith(INTERNAL_UPLOAD_PREFIX)) {
      return parsed.pathname + parsed.search + parsed.hash;
    }

    if (parsed.pathname.startsWith("/uploads/")) {
      return "/api" + parsed.pathname + parsed.search + parsed.hash;
    }
  } catch {
    // External/non-URL values are returned unchanged below.
  }

  return "";
};

export const resolveMediaUrl = (value = "") => {
  const raw = String(value || "").trim();
  if (!raw) return "";

  const internalPath = extractInternalUploadPath(raw);
  if (!internalPath) return raw;

  // Resolve internal media through the configured API host, not the frontend
  // host. Otherwise images on a separate frontend origin hit its /api path.
  try {
    return new URL(internalPath, API_BASE_URL).toString();
  } catch {
    // Keep the old relative behavior only if the API URL cannot be parsed.
    return internalPath;
  }
};
