import MemberDashboard from "./MemberDashboard";
import SubmissionReviewPanel from "../../components/admin/SubmissionReviewPanel";

const SubExecutiveDashboard = () => (
  <>
    <MemberDashboard />
    <div className="mx-auto -mt-14 max-w-7xl px-4 pb-20 md:px-6 lg:px-8">
      <SubmissionReviewPanel />
    </div>
  </>
);

export default SubExecutiveDashboard;
