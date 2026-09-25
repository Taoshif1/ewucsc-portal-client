import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaBookOpen,
  FaBullhorn,
  FaFlag,
  FaGraduationCap,
  FaHouseLaptop,
  FaListCheck,
  FaRankingStar,
  FaTerminal,
  FaTrophy,
  FaUserAstronaut,
} from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import PortalActionCard from "../../components/dashboard/PortalActionCard";
import UpcomingCtfs from "../../components/ctf/UpcomingCtfs";
import {
  ctfEventUrl,
  isExternalHref,
  technicalLearningUrl,
  technicalResourcesUrl,
} from "../../config/siteLinks";

const portalCards = [
  {
    to: "/dashboard/ctf",
    icon: <FaFlag />,
    eyebrow: "Practice",
    title: "CTF Practice Arena",
    description: "Private EWUCSC practice challenges, flags, solves and internal scoring.",
    accent: "secondary",
  },
  {
    to: "/dashboard/leaderboard",
    icon: <FaRankingStar />,
    eyebrow: "Ranking",
    title: "Practice Leaderboard",
    description: "Track member practice standings, points and challenge-solving momentum.",
    accent: "warning",
  },
  {
    to: "/dashboard/homeworks",
    icon: <FaListCheck />,
    eyebrow: "Assignments",
    title: "Homework",
    description: "Member-only tasks, deadlines and submission status.",
    accent: "accent",
  },
  {
    href: technicalLearningUrl,
    icon: <FaGraduationCap />,
    eyebrow: "Technical Hub",
    title: "Learning Path",
    description: "Follow EWUCSC learning tracks and the migrated Arsenal roadmap.",
    accent: "primary",
  },
  {
    href: technicalResourcesUrl,
    icon: <FaBookOpen />,
    eyebrow: "Technical Hub",
    title: "Technical Resources",
    description: "Open the cybersecurity library, tools, references and labs.",
    accent: "secondary",
  },
  {
    to: "/announcements",
    icon: <FaBullhorn />,
    eyebrow: "Updates",
    title: "Announcements",
    description: "Keep up with club notices, events, sessions and member updates.",
    accent: "warning",
  },
];

const MemberDashboard = () => {
  const { backendUser } = useAuth();
  const displayName = backendUser?.name || "EWUCSC Member";
  const firstName = displayName.split(" ")[0];

  const cards = ctfEventUrl
    ? [
        ...portalCards,
        {
          href: ctfEventUrl,
          icon: <FaTrophy />,
          eyebrow: "Public Event",
          title: "CTF Event Platform",
          description: "Open the separate public/inter-university contest platform.",
          accent: "accent",
        },
      ]
    : portalCards;

  return (
    <div className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(6,182,212,0.12),transparent_27%),radial-gradient(circle_at_85%_8%,rgba(37,99,235,0.16),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(34,197,94,0.08),transparent_38%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-base-100/65 px-6 py-10 md:px-10 md:py-14 backdrop-blur-xl"
        >
          <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.06)_1px,transparent_1px)] bg-[size:38px_38px]" />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Member network online
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.05] md:text-6xl">
                Welcome back, {firstName}.
                <br />
                <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                  Your EWUCSC member hub.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-base-content/65">
                Follow assignments, practice privately, track your member ranking and
                jump to the separate technical hub from one approved-member space.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/dashboard/ctf" className="btn btn-primary rounded-full px-7">
                  <FaTerminal /> Open Practice Arena
                </Link>
                {isExternalHref(technicalLearningUrl) ? (
                  <a
                    href={technicalLearningUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-secondary rounded-full px-7"
                  >
                    Technical Hub
                  </a>
                ) : (
                  <Link to={technicalLearningUrl} className="btn btn-outline btn-secondary rounded-full px-7">
                    Technical Hub
                  </Link>
                )}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-secondary/15 bg-base-200/55 p-6 font-mono shadow-2xl">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-base-content/45">
                <span>// member session</span>
                <span className="text-accent">secure</span>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <p className="text-base-content/40">IDENTITY</p>
                  <p className="mt-1 font-bold text-secondary">{backendUser?.studentId || backendUser?.email}</p>
                </div>
                <div>
                  <p className="text-base-content/40">ACCESS LEVEL</p>
                  <p className="mt-1 uppercase font-bold text-primary">{backendUser?.role || "member"}</p>
                </div>
                <div>
                  <p className="text-base-content/40">PRACTICE SCORE</p>
                  <p className="mt-1 text-2xl font-black text-warning">{backendUser?.ctfScore || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">// member operations</p>
              <h2 className="mt-2 text-3xl font-black">Choose your next move.</h2>
            </div>
            <Link to="/" className="btn btn-sm btn-ghost">
              <FaHouseLaptop /> Public site
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => (
              <motion.div
                key={card.href || card.to}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.05 }}
              >
                <PortalActionCard {...card} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <FaFlag className="text-secondary" />
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">Tournament watch</p>
            </div>
            <h2 className="mt-4 text-2xl font-black">Upcoming external CTFs</h2>
            <p className="mt-3 mb-6 text-base-content/60">
              External competitions from CTFtime. EWUCSC member practice stays private,
              while official public contests will use a separate event platform.
            </p>
            <UpcomingCtfs limit={2} compact />
            {ctfEventUrl ? (
              <a href={ctfEventUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-secondary mt-6 rounded-full">
                Open official event platform
              </a>
            ) : (
              <Link to="/dashboard/ctf" className="btn btn-sm btn-outline btn-secondary mt-6 rounded-full">
                Open private practice
              </Link>
            )}
          </div>

          <div className="rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6 md:p-8">
            <FaUserAstronaut className="text-2xl text-primary" />
            <h2 className="mt-4 text-2xl font-black">My profile</h2>
            <p className="mt-3 text-sm text-base-content/60">
              {backendUser?.name}<br />
              {backendUser?.email}
            </p>
            <span className="mt-6 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Approved EWU member
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberDashboard;
