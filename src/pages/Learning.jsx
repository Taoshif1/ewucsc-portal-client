import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaArrowUpRightFromSquare,
  FaBookOpen,
  FaCode,
  FaFlag,
  FaGlobe,
  FaLinux,
  FaNetworkWired,
  FaRoute,
  FaShieldHalved,
  FaTerminal,
  FaToolbox,
} from "react-icons/fa6";
import PageHero from "../components/PageHero";
import VpResourceIcon from "../components/vp/VpResourceIcon";
import { publicApi } from "../services/api";

const tracks = [
  { icon: <FaShieldHalved />, phase: "01", title: "Cybersecurity Foundations", description: "Core security concepts, ethics, threat models, authentication and defensive thinking." },
  { icon: <FaLinux />, phase: "02", title: "Linux & Command Line", description: "Terminal fluency, files, permissions, processes, networking commands and shell workflows." },
  { icon: <FaNetworkWired />, phase: "03", title: "Networking", description: "TCP/IP, ports, DNS, HTTP, routing, packet analysis and network troubleshooting." },
  { icon: <FaGlobe />, phase: "04", title: "Web Security", description: "Web architecture, common vulnerabilities, secure development and hands-on web labs." },
  { icon: <FaFlag />, phase: "05", title: "CTF Problem Solving", description: "A practical bridge into web, crypto, forensics, OSINT, reversing and challenge strategy." },
  { icon: <FaTerminal />, phase: "06", title: "Research & Tooling", description: "Build repeatable workflows, write notes, use tooling responsibly and publish useful writeups." },
];

const arsenalModules = [
  ["Arsenal Home", "index.html", "Complete EWUCSC learning-path landing page."],
  ["Full Guide", "fullGuide.html", "End-to-end cybersecurity learning guide."],
  ["Foundation Zone", "foundation_zone.html", "Core concepts and beginner foundation material."],
  ["Core Domains", "core_domains.html", "Explore the major cybersecurity domains."],
  ["Web App Security", "web_app_security.html", "Web application security learning module."],
  ["OSINT & Passive Recon", "osint_passive.html", "Passive intelligence gathering and OSINT workflows."],
  ["Active Recon", "active_recon.html", "Active reconnaissance concepts and workflows."],
  ["TOR Browser OSINT", "tor_browser_osint.html", "TOR-focused OSINT learning module."],
  ["DFIR", "dfir.html", "Digital forensics and incident response learning material."],
  ["IoT & Embedded", "iot_embedded.html", "IoT and embedded security module."],
  ["Pwn & Boot2Root", "pwn_boot2root.html", "Binary exploitation and boot-to-root practice guidance."],
  ["APT Tradecraft", "apt_tradecraft.html", "Advanced persistent threat tradecraft concepts."],
  ["Red / Blue / Purple", "red_blue_purple.html", "Offensive, defensive and collaborative security operations."],
];

const Learning = () => {
  const [vpResources, setVpResources] = useState([]);

  useEffect(() => {
    publicApi
      .get("/vp-resources")
      .then((res) => setVpResources(res.data.items || []))
      .catch(() => setVpResources([]));
  }, []);

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
              <p className="mt-3 text-sm leading-relaxed text-base-content/60">{track.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-accent/15 bg-base-100/70 p-6 md:p-9">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 text-accent">
              <FaRoute className="text-2xl" />
              <p className="font-mono text-xs uppercase tracking-[0.22em]">// migrated learning library</p>
            </div>
            <h2 className="mt-3 text-3xl font-black">EWUCSC Arsenal</h2>
            <p className="mt-3 max-w-3xl text-base-content/60">
              The legacy Arsenal HTML/CSS/JS learning modules are now bundled inside this website, so the learning path no longer depends on a separate external deployment.
            </p>
          </div>
          <a href="https://blog.zabermahmud.me/posts/cyber-arsenal/index.html" target="_blank" rel="noreferrer" className="btn btn-accent rounded-full">
            Open Full Arsenal <FaArrowUpRightFromSquare />
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {arsenalModules.map(([title, file, description]) => (
            <a
              key={file}
              href={`/arsenal/${file}`}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/5 bg-base-200/35 p-5 transition hover:-translate-y-1 hover:border-accent/25"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-black group-hover:text-accent">{title}</h3>
                <FaArrowUpRightFromSquare className="text-xs text-accent/60" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-base-content/50">{description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-primary/15 bg-base-100/70 p-6 md:p-9">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
              // VP technical references
            </p>
            <h2 className="mt-3 text-3xl font-black">A Gift from the VP ✦</h2>
            <p className="mt-3 max-w-3xl text-base-content/60">
              A curated set of standalone technical references contributed by the Vice President (Technical),
              preserved inside the EWUCSC technical library for club learning and future
              technical-subdomain use.
            </p>
          </div>
          <Link
            to="/vp-resources"
            className="btn btn-primary btn-outline rounded-full"
          >
            Open Collection <FaArrowUpRightFromSquare />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {vpResources.map((item) => (
            <a
              key={item.id}
              href={item.resourceUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex gap-4 rounded-2xl border border-white/5 bg-base-200/35 p-5 transition hover:-translate-y-1 hover:border-primary/25"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                <VpResourceIcon icon={item.icon} />
              </div>
              <div>
                <h3 className="font-black group-hover:text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/50">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-secondary/15 bg-base-100/70 p-7 md:p-9">
        <FaBookOpen className="text-3xl text-secondary" />
        <h2 className="mt-5 text-3xl font-black">Technical Library</h2>
        <p className="mt-4 text-base-content/60">
          Use the Resources hub for labs, references, roadmaps, upcoming CTFs and curated cybersecurity material.
        </p>
        <Link to="/resources" className="btn btn-secondary btn-outline mt-6 rounded-full">
          Browse Resources
        </Link>
      </section>
    </div>
  );
};

export default Learning;
