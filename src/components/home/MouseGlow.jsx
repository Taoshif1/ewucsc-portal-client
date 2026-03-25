import { useEffect, useState } from "react";

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      aria-hidden="true"
    >
      <div
        className="absolute h-72 w-72 rounded-full bg-primary/10 blur-3xl transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${position.x - 144}px, ${position.y - 144}px)`,
        }}
      />
    </div>
  );
};

export default MouseGlow;