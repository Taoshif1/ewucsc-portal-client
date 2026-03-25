import { useEffect, useState } from "react";
import Logo from "../Logo";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base-100">
      <div className="animate-pulse">
        <Logo className="h-16 w-16" />
      </div>

      <p className="mt-6 font-mono text-sm text-accent typing-glow tracking-widest">
        INITIALIZING CYBER NODE...
      </p>

      <div className="mt-6 w-52 overflow-hidden rounded-full bg-base-300">
        <div className="h-2 w-full animate-pulse bg-gradient-to-r from-primary via-secondary to-accent"></div>
      </div>
    </div>
  );
};

export default PageLoader;