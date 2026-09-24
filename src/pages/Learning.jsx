import { Link } from "react-router";
import {
  FaBookOpen,
  FaFlag,
  FaGlobe,
  FaLinux,
  FaNetworkWired,
  FaRoute,
  FaShieldHalved,
  FaTerminal,
} from "react-icons/fa6";
import PageHero from "../components/PageHero";

const tracks = [
  {
    icon: <FaShieldHalved />,
    phase: "01",
    title: "Cybersecurity Foundations",
    description: "Core security concepts, ethics, threat models, authentication and defensive thinking.",
  },
  {
    icon: <FaLinux />,
    phase: "02",
    title: "Linux & Command Line",
    description: "Terminal fluency, files, permissions, processes, networking commands and shell workflows.",
  },
  {
    icon: <FaNetworkWired />,
    phase: "03",
    title: "Networking",
    description: "TCP/IP, ports, DNS, HTTP, routing, packet analysis and network troubleshooting.",
  },
  {
    icon: <FaGlobe />,
    phase: "04",
    title: "Web Security",
    description: "Web architecture, common vulnerabilities, secure development and hands-on web labs.",
  },
  {
    icon: <FaFlag />,
    phase: "05",
    title: "CTF Problem Solving",
    description: "A practical bridge into web, crypto, forensics, OSINT, reversing and challenge strategy.",
  },
  {
    icon: <FaTerminal />,
    phase: "06",
    title: "Research & Tooling",
    description: "Build repeatable workflows, write notes, use tooling responsibly and publish useful writeups.",
  },
];

const Learning = () => {
  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge="EWUCSC Learning Path"
        title="Build Skills"
        highlight="In Sequence"
        description="A focused learning route from cybersecurity fundamentals to practical competition and research work."
      />

      <section className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <article
              key={track.phase}
              className="group rounded-[1.5rem] border border-white/5 bg-base-100/70 p-6 transition hover:-translate-y-1 hover:border-primary/25"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                  {track.icon}
                </div>
                <span className="font-mono text-xs text-base-content/35">{track.phase}</span>
              </div>
              <h2 className="mt-5 text-xl font-black">{track.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-base-content/60">
                {track.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-accent/15 bg-base-100/70 p-7 md:p-9">
          <FaRoute className="text-3xl text-accent" />
          <h2 className="mt-5 text-3xl font-black">EWUCSC Arsenal</h2>
          <p className="mt-4 text-base-content/60">
            The existing Arsenal learning project remains available while its HTML/JS
            modules are progressively incorporated into this React learning experience.
          </p>
          <a
            href="https://ewucsc-arsenal.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-accent btn-outline mt-6 rounded-full"
          >
            Open Arsenal
          </a>
        </div>

        <div className="rounded-[2rem] border border-secondary/15 bg-base-100/70 p-7 md:p-9">
          <FaBookOpen className="text-3xl text-secondary" />
          <h2 className="mt-5 text-3xl font-black">Technical Library</h2>
          <p className="mt-4 text-base-content/60">
            Use the Resources hub for labs, references, roadmaps, upcoming CTFs and
            curated cybersecurity material.
          </p>
          <Link to="/resources" className="btn btn-secondary btn-outline mt-6 rounded-full">
            Browse Resources
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Learning;
