const SiteCreditBar = ({ compact = false }) => (
  <div className={`border-t border-white/5 bg-base-300/35 px-4 ${compact ? "py-2" : "py-3"}`}>
    <div className="mx-auto flex max-w-7xl items-center justify-center text-center font-mono text-[10px] uppercase tracking-[0.16em] text-base-content/35 sm:text-[11px]">
      <a
        href="https://taoshiflexstudio.me/"
        target="_blank"
        rel="noreferrer"
        className="transition hover:text-primary"
      >
        Built and managed by <span className="font-bold text-primary/75">Taoshiflex Studio</span>.
      </a>
    </div>
  </div>
);

export default SiteCreditBar;
