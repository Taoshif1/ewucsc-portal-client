import { Link, useLocation } from "react-router";
import {
  FaBookOpen,
  FaCalendarDays,
  FaCode,
  FaFlask,
  FaFlag,
  FaLaptopCode,
  FaScrewdriverWrench,
} from "react-icons/fa6";
import UpcomingCtfs from "../components/ctf/UpcomingCtfs";
import { authCtfUrl, isExternalHref } from "../config/siteLinks";

const DATA = {
  tools: {
    title: "Tools",
    icon: <FaScrewdriverWrench />,
    intro: "Categorized tooling for reconnaissance, exploitation, forensics, OSINT and related security work.",
    items: [
      "Categorized tool directory",
      "Description, install guidance and practical references",
      "EWUCSC recommended toolkit",
    ],
    links: [["Open EWUCSC Toolkit", "/vp-resources/ewucsc-toolkit.html"]],
  },
  writeups: {
    title: "Writeups",
    icon: <FaCode />,
    intro: "A future home for member-authored CTF and lab writeups.",
    items: [
      "Filter by category: web, pwn, crypto, forensics and misc",
      "Difficulty tags and author credit",
      "Markdown-ready structure for searchable technical writeups",
    ],
    links: [],
  },
  labs: {
    title: "Labs",
    icon: <FaFlask />,
    intro: "Practice environments and setup guides for authorized hands-on learning.",
    items: [
      "Vulnerable VM / Docker lab references",
      "DVWA, Juice Shop and club-hosted lab links when available",
      "Home-lab setup guides",
    ],
    links: [],
  },
  wiki: {
    title: "Wiki",
    icon: <FaBookOpen />,
    intro: "Lightweight reference material for commands, terminology and repeatable workflows.",
    items: [
      "Linux commands and common flags",
      "Nmap and tooling cheat sheets",
      "Security glossary and quick-reference notes",
    ],
    links: [
      ["Linux & Security Field Guide", "/vp-resources/linux-security-field-guide.html"],
      ["Arsenal", "/arsenal/index.html"],
    ],
  },
  events: {
    title: "Technical Events",
    icon: <FaCalendarDays />,
    intro: "Workshop schedules, recordings, slides and speaker resources.",
    items: [
      "Upcoming workshop schedule",
      "Past event recordings/slides archive",
      "Speaker bios and technical session notes",
    ],
    links: [],
  },
  projects: {
    title: "Member Projects",
    icon: <FaLaptopCode />,
    intro: "A showcase for member-built security tools, research and technical projects.",
    items: [
      "Club and member tools",
      "Research/project showcases",
      "Portfolio and recruiting visibility",
    ],
    links: [],
  },
};

const TechnicalSection = () => {
  const { pathname } = useLocation();
  const key = pathname.split("/").filter(Boolean)[0];
  const item = DATA[key] || DATA.tools;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-primary/15 bg-base-100/70 p-7 md:p-10">
        <div className="text-3xl text-primary">{item.icon}</div>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-primary">
          // technical hub
        </p>
        <h1 className="mt-2 text-4xl font-black md:text-6xl">{item.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-base-content/60">{item.intro}</p>
      </section>

      <section className="mt-7 grid gap-5 md:grid-cols-2">
        {item.items.map((text, index) => (
          <div key={text} className="rounded-[1.5rem] border border-white/5 bg-base-100/60 p-6">
            <p className="font-mono text-xs text-primary">0{index + 1}</p>
            <p className="mt-3 font-bold leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      {item.links.length > 0 && (
        <section className="mt-7 rounded-[1.5rem] border border-white/5 bg-base-100/60 p-6">
          <h2 className="text-xl font-black">Available now</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {item.links.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="btn btn-primary btn-outline">
                {label}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export const TechnicalCtf = () => (
  <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
    <section className="rounded-[2rem] border border-secondary/15 bg-base-100/70 p-7 md:p-10">
      <FaFlag className="text-3xl text-secondary" />
      <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-secondary">// practice & competitions</p>
      <h1 className="mt-2 text-4xl font-black md:text-6xl">CTF</h1>
      <p className="mt-4 max-w-3xl text-base-content/60">
        Upcoming external CTFs, a future archive of club-hosted events, and the protected
        EWUCSC member practice arena.
      </p>
    </section>

    <div className="mt-7 grid gap-5 md:grid-cols-3">
      <div className="rounded-[1.5rem] border border-white/5 bg-base-100/60 p-6">
        <h2 className="text-xl font-black">/ctf/upcoming</h2>
        <p className="mt-2 text-sm text-base-content/55">External competition calendar from CTFtime.</p>
      </div>
      <div className="rounded-[1.5rem] border border-white/5 bg-base-100/60 p-6">
        <h2 className="text-xl font-black">/ctf/archive</h2>
        <p className="mt-2 text-sm text-base-content/55">Past EWUCSC-hosted CTFs will be archived here.</p>
      </div>
      <div className="rounded-[1.5rem] border border-white/5 bg-base-100/60 p-6">
        <h2 className="text-xl font-black">/ctf/practice</h2>
        <p className="mt-2 text-sm text-base-content/55">In-house practice stays behind member authentication.</p>
        {isExternalHref(authCtfUrl) ? (
          <a href={authCtfUrl} className="btn btn-sm btn-secondary mt-4">Member Practice</a>
        ) : (
          <Link to={authCtfUrl} className="btn btn-sm btn-secondary mt-4">Member Practice</Link>
        )}
      </div>
    </div>

    <section className="mt-8">
      <UpcomingCtfs limit={4} />
    </section>
  </div>
);

export default TechnicalSection;
