import { Link, useParams } from "react-router";
import {
  FaArrowLeft,
  FaCode,
  FaFingerprint,
  FaGlobe,
  FaKey,
  FaLinux,
  FaShieldHalved,
} from "react-icons/fa6";

const TRACKS = {
  beginner: {
    title: "Beginner",
    subtitle: "Networking basics · Linux fundamentals · Intro to security",
    icon: <FaLinux />,
    resources: [
      ["Linux & Security Field Guide", "/vp-resources/linux-security-field-guide.html"],
      ["Foundation Zone", "/arsenal/foundation_zone.html"],
      ["Core Domains", "/arsenal/core_domains.html"],
    ],
  },
  "web-security": {
    title: "Web Security",
    subtitle: "OWASP Top 10 · Burp Suite · Manual testing",
    icon: <FaGlobe />,
    resources: [
      ["Web Security Field Notes", "/vp-resources/web-security-field-notes.html"],
      ["Web App Security", "/arsenal/web_app_security.html"],
      ["EWUCSC Toolkit", "/vp-resources/ewucsc-toolkit.html"],
    ],
  },
  "pwn-reversing": {
    title: "Pwn & Reverse Engineering",
    subtitle: "Binary exploitation · RE basics → advanced",
    icon: <FaCode />,
    resources: [
      ["Reverse Engineering Field Notes", "/vp-resources/reverse-engineering-field-notes.html"],
      ["Pwn & Boot2Root", "/arsenal/pwn_boot2root.html"],
    ],
  },
  forensics: {
    title: "Forensics",
    subtitle: "Disk, memory, evidence handling and incident-response foundations",
    icon: <FaFingerprint />,
    resources: [["DFIR", "/arsenal/dfir.html"]],
  },
  cryptography: {
    title: "Cryptography",
    subtitle: "Classic ciphers, encodings, hashes and challenge-solving foundations",
    icon: <FaKey />,
    resources: [["Full Guide", "/arsenal/fullGuide.html"]],
  },
  osint: {
    title: "OSINT",
    subtitle: "Footprinting, passive recon and responsible intelligence gathering",
    icon: <FaShieldHalved />,
    resources: [
      ["OSINT & Passive Recon", "/arsenal/osint_passive.html"],
      ["Active Recon", "/arsenal/active_recon.html"],
      ["TOR Browser OSINT", "/arsenal/tor_browser_osint.html"],
    ],
  },
};

const TechnicalLearningPath = () => {
  const { track } = useParams();

  if (!track) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
          // role-based tracks
        </p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">Learning Paths</h1>
        <p className="mt-4 max-w-3xl text-base-content/60">
          Start at your current level and follow an ordered track. The structure follows
          the VP-provided roadmap and links into EWUCSC's existing Arsenal and field guides.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(TRACKS).map(([slug, item]) => (
            <Link
              key={slug}
              to={"/learning-paths/" + slug}
              className="rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6 transition hover:-translate-y-1 hover:border-primary/25"
            >
              <div className="text-2xl text-primary">{item.icon}</div>
              <h2 className="mt-4 text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/55">{item.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const item = TRACKS[track];

  if (!item) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black">Learning path not found</h1>
        <Link to="/learning-paths" className="btn btn-primary mt-6">All learning paths</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 lg:px-8">
      <Link to="/learning-paths" className="btn btn-sm btn-ghost">
        <FaArrowLeft /> Learning Paths
      </Link>

      <section className="mt-6 rounded-[2rem] border border-primary/15 bg-base-100/70 p-7 md:p-10">
        <div className="text-3xl text-primary">{item.icon}</div>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          // ordered learning track
        </p>
        <h1 className="mt-2 text-4xl font-black md:text-6xl">{item.title}</h1>
        <p className="mt-4 text-lg text-base-content/60">{item.subtitle}</p>
      </section>

      <section className="mt-7 rounded-[1.5rem] border border-white/5 bg-base-100/60 p-6">
        <h2 className="text-2xl font-black">Recommended EWUCSC resources</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {item.resources.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/5 bg-base-200/35 p-4 font-bold transition hover:border-primary/25 hover:text-primary"
            >
              {label} →
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TechnicalLearningPath;
