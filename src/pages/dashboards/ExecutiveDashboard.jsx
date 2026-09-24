import MemberDashboard from "./MemberDashboard";
import CyberOperationsManager from "../../components/admin/CyberOperationsManager";
import ContentManager from "../../components/admin/ContentManager";
import SubmissionReviewPanel from "../../components/admin/SubmissionReviewPanel";
import ContactInbox from "../../components/admin/ContactInbox";

const ExecutiveDashboard = () => (
  <>
    <MemberDashboard />
    <div className="mx-auto -mt-14 max-w-7xl px-4 pb-20 md:px-6 lg:px-8">
      <CyberOperationsManager />
      <ContentManager />
      <SubmissionReviewPanel />
    </div>
  </>
);

export default ExecutiveDashboard;
