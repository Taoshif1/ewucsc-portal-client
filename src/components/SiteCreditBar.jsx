import { Link } from "react-router";

const SiteCreditBar = ({ compact = false }) => (
  <div className={`border-t border-white/5 bg-base-300/35 px-4 ${compact ? "py-2" : "py-3"}`}>
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-base-content/35 sm:text-[11px]">
      <span>Built & managed by</span>
      <Link to="/credits" className="font-bold text-secondary/80 transition hover:text-secondary">
        Gazi Taoshif
      </Link>
      <span className="opacity-35">•</span>
      <a
        href="https://taoshiflexstudio.me/"
        target="_blank"
        rel="noreferrer"
        className="font-bold text-primary/75 transition hover:text-primary"
      >
        Taoshiflex Studio
      </a>
    </div>
  </div>
);

export default SiteCreditBar;
