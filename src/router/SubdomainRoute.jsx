import { useEffect, useMemo } from "react";
import { isExternalHref } from "../config/siteLinks";

const SubdomainRoute = ({ href, preservePath = false, children }) => {
  const target = useMemo(() => {
    if (!isExternalHref(href) || typeof window === "undefined") return href;

    if (!preservePath) return href;

    const base = new URL(href);
    return new URL(
      window.location.pathname + window.location.search + window.location.hash,
      base.origin,
    ).toString();
  }, [href, preservePath]);

  const shouldRedirect =
    isExternalHref(href) &&
    typeof window !== "undefined" &&
    window.location.origin !== new URL(href).origin;

  useEffect(() => {
    if (shouldRedirect) {
      window.location.replace(target);
    }
  }, [shouldRedirect, target]);

  if (shouldRedirect) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-base-content/45">
            Moving to the correct EWUCSC subdomain...
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default SubdomainRoute;
