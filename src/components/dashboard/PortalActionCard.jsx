import { Link } from "react-router";

const PortalActionCard = ({ to, icon, eyebrow, title, description, accent = "primary" }) => {
  const accentMap = {
    primary: "border-primary/20 hover:border-primary/50 text-primary from-primary/15",
    secondary: "border-secondary/20 hover:border-secondary/50 text-secondary from-secondary/15",
    accent: "border-accent/20 hover:border-accent/50 text-accent from-accent/15",
    warning: "border-warning/20 hover:border-warning/50 text-warning from-warning/15",
  };

  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-[1.5rem] border bg-base-100/65 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${accentMap[accent] || accentMap.primary}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent]?.split(" ").find((item) => item.startsWith("from-")) || "from-primary/15"} to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-current/20 bg-current/5 text-2xl">
            {icon}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
            {eyebrow}
          </span>
        </div>
        <h3 className="text-xl font-black text-base-content">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-base-content/60">{description}</p>
        <div className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.18em]">
          Open module →
        </div>
      </div>
    </Link>
  );
};

export default PortalActionCard;
