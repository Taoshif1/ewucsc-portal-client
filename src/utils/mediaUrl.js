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

  // Always use the current browser origin for EWUCSC uploads.
  // Vite proxies /api locally and Vercel rewrites /api in production.
  return internalPath || raw;
};
