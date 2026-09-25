import { FaClipboardCheck } from "react-icons/fa6";
import SubmissionReviewPanel from "../components/admin/SubmissionReviewPanel";

const OperationsSubmissions = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-success">// review queue</p>
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl"><FaClipboardCheck /> Submission Review</h1>
      <p className="mt-3 text-base-content/55">Review protected member homework submissions.</p>
    </div>
    <SubmissionReviewPanel />
  </div>
);

export default OperationsSubmissions;
