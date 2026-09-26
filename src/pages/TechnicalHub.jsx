import { Link } from "react-router";
import {
  FaBookOpen,
  FaCalendarDays,
  FaCode,
  FaFlask,
  FaFlag,
  FaFolderTree,
  FaGraduationCap,
  FaLaptopCode,
  FaScrewdriverWrench,
  FaUsers,
  FaGift,
} from "react-icons/fa6";

const groups = [
  {
    label: "Learning",
    tone: "primary",
    description: "Role-based learning paths, field guides and the club knowledge base.",
    links: [
      { to: "/learning-paths", title: "Learning Paths", icon: <FaGraduationCap /> },
      { to: "/wiki", title: "Wiki & Cheatsheets", icon: <FaBookOpen /> },
      { to: "/vp-collection", title: "A Gift from the VP", icon: <FaGift /> },
    ],
  },
  {
    label: "Practice",
    tone: "secondary",
    description: "CTF discovery, practice references and lab environments.",
    links: [
      { to: "/ctf", title: "CTF", icon: <FaFlag /> },
      { to: "/labs", title: "Labs", icon: <FaFlask /> },
      { to: "/tools", title: "Tools", icon: <FaScrewdriverWrench /> },
    ],
  },
  {
    label: "Community",
    tone: "accent",
    description: "Technical work produced by members and club activities.",
    links: [
      { to: "/writeups", title: "Writeups", icon: <FaCode /> },
      { to: "/events", title: "Events", icon: <FaCalendarDays /> },
      { to: "/projects", title: "Projects", icon: <FaLaptopCode /> },
    ],
  },
];

const toneClass = {
  primary: "border-primary/20 bg-primary/5 text-primary",
  secondary: "border-secondary/20 bg-secondary/5 text-secondary",
  accent: "border-accent/20 bg-accent/5 text-accent",
};

const TechnicalHub = () => (
  <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 md:px-6 lg:px-8">
    <section className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-base-100/70 p-8 md:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(6,182,212,0.12),transparent_25%)]" />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
          // resources.ewucsc
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          EWUCSC <span className="text-primary">Technical Hub</span>
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-base-content/60 md:text-lg">
          A structured technical library for learning paths, tools, CTF practice,
          writeups, labs, wiki references, events and member-built projects.
        </p>
      </div>
    </section>

    <section className="grid gap-6 lg:grid-cols-3">
      {groups.map((group) => (
        <article
          key={group.label}
          className={`rounded-[1.75rem] border p-6 ${toneClass[group.tone]}`}
        >
          <div className="flex items-center gap-3">
            <FaFolderTree />
            <h2 className="text-2xl font-black text-base-content">{group.label}</h2>
          </div>
          <p className="mt-3 min-h-12 text-sm leading-relaxed text-base-content/55">
            {group.description}
          </p>
          <div className="mt-6 space-y-3">
            {group.links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-base-100/50 px-4 py-3 font-bold text-base-content transition hover:-translate-y-0.5 hover:border-current/20"
              >
                <span className="flex items-center gap-3">
                  <span className="text-current">{item.icon}</span>
                  {item.title}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </article>
      ))}
    </section>

    <section className="rounded-[1.75rem] border border-primary/15 bg-primary/5 p-7 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3 text-primary">
            <FaGift className="text-2xl" />
            <p className="font-mono text-xs uppercase tracking-[0.22em]">// VP technical references</p>
          </div>
          <h2 className="mt-3 text-2xl font-black md:text-3xl">A Gift from the VP ✦</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-base-content/60">
            Open the Admin-managed collection of technical references contributed by the Vice President (Technical).
            Published additions from Content & Inbox appear here automatically.
          </p>
        </div>
        <Link to="/vp-collection" className="btn btn-primary shrink-0 rounded-full">
          Open Collection →
        </Link>
      </div>
    </section>

    <section className="grid gap-5 md:grid-cols-2">
      <Link
        to="/learning-paths"
        className="rounded-[1.5rem] border border-primary/15 bg-primary/5 p-7 transition hover:-translate-y-1"
      >
        <FaGraduationCap className="text-3xl text-primary" />
        <h2 className="mt-4 text-2xl font-black">Start with a learning path</h2>
        <p className="mt-2 text-sm text-base-content/55">
          Beginner → Web Security → Pwn/RE → Forensics → Cryptography → OSINT.
        </p>
      </Link>
      <Link
        to="/projects"
        className="rounded-[1.5rem] border border-accent/15 bg-accent/5 p-7 transition hover:-translate-y-1"
      >
        <FaUsers className="text-3xl text-accent" />
        <h2 className="mt-4 text-2xl font-black">See what members build</h2>
        <p className="mt-2 text-sm text-base-content/55">
          Showcase tools, research and club projects for learning, portfolio and recruiting.
        </p>
      </Link>
    </section>
  </div>
);

export default TechnicalHub;
