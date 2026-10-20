import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SiteCreditBar = ({ onCreditsClick }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 320);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const handleCreditsClick = (event) => {
    if (!onCreditsClick) return;
    event.preventDefault();
    onCreditsClick();
  };

  return (
    <>
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn btn-circle fixed bottom-14 right-4 z-50 border border-primary/30 bg-base-100/90 text-primary shadow-lg backdrop-blur-xl transition hover:bg-primary hover:text-primary-content sm:right-6"
          aria-label="Back to top"
          title="Back to top"
        >
          <FaArrowUp />
        </button>
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-base-100/90 px-4 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-base-content/50 sm:text-[11px]">
          <a
            href="https://taoshiflexstudio.me/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-primary"
          >
            Built and managed by{" "}
            <span className="font-bold text-primary/80">Taoshiflex Studio</span>
          </a>

          <span className="opacity-30">•</span>

          <a
            href="/credits"
            onClick={handleCreditsClick}
            className="font-bold text-secondary/80 transition hover:text-secondary"
          >
            Credits & Contact
          </a>
        </div>
      </div>
    </>
  );
};

export default SiteCreditBar;
