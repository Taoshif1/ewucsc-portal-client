import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[100] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_12px_rgba(34,197,94,0.55)] transition-all duration-150"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
};

export default ScrollProgress;