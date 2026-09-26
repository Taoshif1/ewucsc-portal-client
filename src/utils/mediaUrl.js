import { API_BASE_URL } from "../services/api";

const INTERNAL_UPLOAD_PREFIX = "/api/uploads/";

const extractInternalUploadPath = (value = "") => {
  const raw = String(value || "").trim();
  if (!raw) return "";

  if (raw.startsWith(INTERNAL_UPLOAD_PREFIX)) {
    return raw;
  }

  try {
    const parsed = new URL(raw);
    if (parsed.pathname.startsWith(INTERNAL_UPLOAD_PREFIX)) {
      return parsed.pathname + parsed.search + parsed.hash;
    }
  } catch {
    // Non-URL values are handled below.
  }

  return "";
};

export const resolveMediaUrl = (value = "") => {
  const raw = String(value || "").trim();
  if (!raw) return "";

  const internalPath = extractInternalUploadPath(raw);

  if (internalPath) {
    const suffix = internalPath.replace(/^\/api/, "");
    return API_BASE_URL.replace(/\/$/, "") + suffix;
  }

  return raw;
};
