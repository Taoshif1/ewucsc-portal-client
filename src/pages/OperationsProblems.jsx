import { FaFlag } from "react-icons/fa6";
import CyberOperationsManager from "../components/admin/CyberOperationsManager";

const OperationsProblems = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">// challenge operations</p>
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl"><FaFlag /> Create Problem</h1>
      <p className="mt-3 text-base-content/55">Create, publish and manage protected CTF challenges and homework.</p>
    </div>
    <CyberOperationsManager />
  </div>
);

export default OperationsProblems;
