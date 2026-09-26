import { Link } from "react-router";
import {
  FaArrowRight,
  FaBullhorn,
  FaChartLine,
  FaClipboardCheck,
  FaEnvelopeOpenText,
  FaFlag,
  FaRankingStar,
  FaImages,
  FaFileCsv,
  FaShieldHalved,
  FaUsersGear,
} from "react-icons/fa6";

const ACTIONS = {
  admin: [
    { to: "/dashboard/manage/users", title: "Manage Users", description: "Approve memberships, assign roles and suspend access.", icon: <FaUsersGear />, tone: "primary" },
    { to: "/dashboard/manage/problems", title: "Create Problem", description: "Create, publish and manage CTF challenges and homework.", icon: <FaFlag />, tone: "secondary" },
    { to: "/dashboard/manage/analytics", title: "Analytics", description: "Monitor registrations, solves, submissions and content activity.", icon: <FaChartLine />, tone: "warning" },
    { to: "/dashboard/manage/content", title: "Content & Inbox", description: "Publish announcements/blogs and review contact messages.", icon: <FaBullhorn />, tone: "accent" },
    { to: "/dashboard/manage/gallery", title: "Gallery Admin", description: "Upload, publish, archive and manage club photos.", icon: <FaImages />, tone: "primary" },
    { to: "/dashboard/manage/forms", title: "Form Data", description: "Export future EWUCSC form submissions as CSV.", icon: <FaFileCsv />, tone: "success" },
    { to: "/dashboard/manage/submissions", title: "Submission Review", description: "Review member homework submissions from one queue.", icon: <FaClipboardCheck />, tone: "success" },
    { to: "/dashboard/leaderboard", title: "Leaderboard", description: "Open the protected CTF standings.", icon: <FaRankingStar />, tone: "warning" },
  ],
  executive: [
    { to: "/dashboard/manage/problems", title: "Create Problem", description: "Create and publish CTF challenges and homework.", icon: <FaFlag />, tone: "secondary" },
    { to: "/dashboard/manage/analytics", title: "Analytics", description: "Monitor portal and competition activity.", icon: <FaChartLine />, tone: "warning" },
    { to: "/dashboard/manage/content", title: "Content & Inbox", description: "Manage club posts and incoming messages.", icon: <FaEnvelopeOpenText />, tone: "accent" },
    { to: "/dashboard/manage/gallery", title: "Gallery Admin", description: "Upload and maintain the public club gallery.", icon: <FaImages />, tone: "primary" },
    { to: "/dashboard/manage/submissions", title: "Submission Review", description: "Review member homework submissions.", icon: <FaClipboardCheck />, tone: "success" },
    { to: "/dashboard/ctf", title: "CTF Arena", description: "Open the protected challenge arena.", icon: <FaFlag />, tone: "secondary" },
    { to: "/dashboard/leaderboard", title: "Leaderboard", description: "View current CTF standings.", icon: <FaRankingStar />, tone: "warning" },
  ],
  "sub-executive": [
    { to: "/dashboard/manage/submissions", title: "Submission Review", description: "Review assigned homework submissions.", icon: <FaClipboardCheck />, tone: "success" },
    { to: "/dashboard/ctf", title: "CTF Arena", description: "Open the protected challenge arena.", icon: <FaFlag />, tone: "secondary" },
    { to: "/dashboard/leaderboard", title: "Leaderboard", description: "View current CTF standings.", icon: <FaRankingStar />, tone: "warning" },
  ],
};

const toneClass = {
  primary: "border-primary/20 bg-primary/5 text-primary",
  secondary: "border-secondary/20 bg-secondary/5 text-secondary",
  warning: "border-warning/20 bg-warning/5 text-warning",
  accent: "border-accent/20 bg-accent/5 text-accent",
  success: "border-success/20 bg-success/5 text-success",
};

const StaffDashboardHome = ({ role = "admin" }) => {
  const actions = ACTIONS[role] || ACTIONS["sub-executive"];
  const label = role === "admin" ? "Admin" : role === "executive" ? "Executive" : "Sub-Executive";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-base-100/70 p-7 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(37,99,235,0.16),transparent_30%),radial-gradient(circle_at_90%_12%,rgba(6,182,212,0.12),transparent_28%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-error/20 bg-error/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-error">
            <FaShieldHalved /> {label} operations
          </div>
          <h1 className="mt-5 text-4xl font-black md:text-6xl">
            EWUCSC <span className="text-primary">Control Center</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base-content/60">
            Use the operational modules below instead of editing source code or MongoDB manually.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="group rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6 transition hover:-translate-y-1 hover:border-primary/25"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl ${toneClass[action.tone]}`}>
              {action.icon}
            </div>
            <h2 className="mt-5 text-xl font-black">{action.title}</h2>
            <p className="mt-2 min-h-12 text-sm leading-relaxed text-base-content/55">{action.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-primary">
              Open module <FaArrowRight />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default StaffDashboardHome;
