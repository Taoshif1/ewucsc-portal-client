import { FaBullhorn } from "react-icons/fa6";
import ContentManager from "../components/admin/ContentManager";
import ContactInbox from "../components/admin/ContactInbox";

const OperationsContent = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">// publishing desk</p>
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl"><FaBullhorn /> Content & Inbox</h1>
      <p className="mt-3 text-base-content/55">Publish announcements and blogs without editing HTML, then review contact messages.</p>
    </div>
    <ContentManager />
    <ContactInbox />
  </div>
);

export default OperationsContent;
