import NotFound from "../components/common/NotFound";
import SiteCreditBar from "../components/SiteCreditBar";

const ErrorPage = () => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-1">
      <NotFound />
    </div>
    <SiteCreditBar />
  </div>
);

export default ErrorPage;
