import Home from "./Home";
import TechnicalHub from "./TechnicalHub";
import { isExternalHref, technicalHubUrl } from "../config/siteLinks";

const SiteHome = () => {
  const onTechnicalHost =
    typeof window !== "undefined" &&
    isExternalHref(technicalHubUrl) &&
    window.location.origin === new URL(technicalHubUrl).origin;

  return onTechnicalHost ? <TechnicalHub /> : <Home />;
};

export default SiteHome;
