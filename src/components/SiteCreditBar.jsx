import { Link } from "react-router";

const SiteCreditBar = ({ compact = false }) => (
  <div className={`border-t border-white/5 bg-base-300/35 px-4 ${compact ? "py-2" : "py-3"}`}>
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-base-content/35 sm:text-[11px]">
      <span>Built by</span>
      <a
        href="https://taoshiflexstudio.me/"
        target="_blank"
        rel="noreferrer"
        className="font-bold text-primary/75 transition hover:text-primary"
      >
        Taoshiflex Studio
      </a>
      <span className="opacity-35">•</span>
      <Link
        to="/credits"
        className="transition hover:text-secondary"
      >
        Build & management
      </Link>
    </div>
  </div>
);

export default SiteCreditBar;
