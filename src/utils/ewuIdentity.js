// Shared EWU portal identity helpers.
export const EWU_STUDENT_ID_PATTERN = /^\d{4}-\d-\d{2}-\d{2,3}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AUTHORIZED_ADMIN_EMAILS = new Set([
  "ewucsc@ewubd.edu",
]);

export const normalizeStudentId = (value = "") =>
  String(value).trim().replace(/\s+/g, "");

export const normalizeEmail = (value = "") =>
  String(value).trim().toLowerCase();

export const isValidStudentId = (value = "") =>
  EWU_STUDENT_ID_PATTERN.test(normalizeStudentId(value));

export const isValidEmail = (value = "") =>
  EMAIL_PATTERN.test(normalizeEmail(value));

export const isAuthorizedAdminEmail = (value = "") =>
  AUTHORIZED_ADMIN_EMAILS.has(normalizeEmail(value));

export const studentIdToEmail = (value = "") =>
  `${normalizeStudentId(value)}@std.ewubd.edu`;

export const resolvePortalIdentity = (value = "") => {
  const raw = String(value).trim();
  if (isValidStudentId(raw)) {
    return {
      type: "student",
      studentId: normalizeStudentId(raw),
      email: studentIdToEmail(raw),
    };
  }

  if (isValidEmail(raw)) {
    return {
      type: "email",
      studentId: null,
      email: normalizeEmail(raw),
    };
  }

  return null;
};
