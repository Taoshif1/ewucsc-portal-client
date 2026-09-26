import { Link } from "react-router";

const SiteCreditBar = ({ compact = false }) => (
  <div className={`border-t border-white/5 bg-base-300/35 px-4 ${compact ? "py-2" : "py-3"}`}>
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-base-content/35 sm:text-[11px]">
      <a
        href="https://taoshiflexstudio.me/"
        target="_blank"
        rel="noreferrer"
        className="transition hover:text-primary"
      >
        Built and managed by <span className="font-bold text-primary/75">Taoshiflex Studio</span>
      </a>

      <span className="opacity-30">•</span>

      <Link
        to="/credits"
        className="font-bold text-secondary/75 transition hover:text-secondary"
      >
        Credits & Contact
      </Link>
    </div>
  </div>
);

export default SiteCreditBar;
