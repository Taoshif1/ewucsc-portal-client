import { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCode,
  FaCompass,
  FaFlag,
  FaGlobe,
  FaGraduationCap,
  FaLock,
  FaMagnifyingGlass,
  FaRoute,
  FaTerminal,
  FaToolbox,
} from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import PageHero from "../components/PageHero";
import UpcomingCtfs from "../components/ctf/UpcomingCtfs";

const resources = [
  {
    title: "EWUCSC Arsenal",
    category: "Learning",
    description: "Existing EWUCSC learning project and practical security roadmap.",
    href: "/arsenal/index.html",
    icon: <FaRoute />,
  },
  {
    title: "Technical Resource Drop",
    category: "EWUCSC",
    description: "A curated technical collection contributed to EWUCSC as a gift from the Vice President (Technical).",
    href: "/vp-collection",
    icon: <FaBookOpen />,
    credit: "A Gift from the VP ✦",
  },
  {
    title: "Web Security Field Notes",
    category: "Field Notes",
    description: "Standalone web-security reference notes intended for responsible, authorized testing and club practice.",
    href: "/vp-resources/web-security-field-notes.html",
    icon: <FaGlobe />,
    credit: "A Gift from the VP ✦",
  },
  {
    title: "Linux & Security Field Guide",
    category: "Field Guide",
    description: "A detailed Linux and security reference covering practical commands, concepts and workflows.",
    href: "/vp-resources/linux-security-field-guide.html",
    icon: <FaTerminal />,
    credit: "A Gift from the VP ✦",
  },
  {
    title: "Reverse Engineering Field Notes",
    category: "Field Notes",
    description: "Reverse-engineering and Linux CTF reference material for binary analysis and related practice.",
    href: "/vp-resources/reverse-engineering-field-notes.html",
    icon: <FaCode />,
    credit: "A Gift from the VP ✦",
  },
  {
    title: "EWUCSC Toolkit",
    category: "Toolkit",
    description: "A searchable categorized directory of cybersecurity tools with links to their official sources.",
    href: "/vp-resources/ewucsc-toolkit.html",
    icon: <FaToolbox />,
    credit: "A Gift from the VP ✦",
  },
  {
    title: "PortSwigger Web Security Academy",
    category: "Labs",
    description: "High-quality interactive web security learning and vulnerability labs.",
    href: "https://portswigger.net/web-security",
    icon: <FaGlobe />,
  },
  {
    title: "OWASP Top 10",
    category: "Reference",
    description: "Core awareness material for common web application security risks.",
    href: "https://owasp.org/www-project-top-ten/",
    icon: <FaLock />,
  },
  {
    title: "TryHackMe",
    category: "Labs",
    description: "Guided hands-on cybersecurity rooms and beginner-friendly learning paths.",
    href: "https://tryhackme.com/",
    icon: <FaTerminal />,
  },
  {
    title: "Hack The Box Academy",
    category: "Labs",
    description: "Structured security modules and practical offensive-security exercises.",
    href: "https://academy.hackthebox.com/",
    icon: <FaToolbox />,
  },
  {
    title: "picoCTF",
    category: "CTF",
    description: "Beginner-friendly cybersecurity challenges and competition practice.",
    href: "https://picoctf.org/",
    icon: <FaFlag />,
  },
  {
    title: "roadmap.sh Cyber Security",
    category: "Roadmap",
    description: "A broad visual roadmap for cybersecurity topics and study planning.",
    href: "https://roadmap.sh/cyber-security",
    icon: <FaCompass />,
  },
  {
    title: "NIST Cybersecurity Framework",
    category: "Reference",
    description: "Industry-standard guidance for managing cybersecurity risk.",
    href: "https://www.nist.gov/cyberframework",
    icon: <FaBookOpen />,
  },
  {
    title: "CTFtime",
    category: "CTF",
    description: "Global CTF calendar, teams, rankings, archives and writeups.",
    href: "https://ctftime.org/",
    icon: <FaFlag />,
  },
  {
    title: "UITS Cyber Security Wing",
    category: "Community",
    description: "Reference community site shared by EWUCSC leadership for resource inspiration.",
    href: "https://uitssec.xyz/index.html",
    icon: <FaGraduationCap />,
  },
];

const Resources = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(resources.map((item) => item.category))];

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return resources.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge="Technical Resource Hub"
        title="EWUCSC"
        highlight="Cyber Library"
        description="Learning paths, labs, references, tools and live CTF discovery in one technical hub."
      />

      <section className="mx-auto max-w-6xl rounded-[1.5rem] border border-white/5 bg-base-100/60 p-5 backdrop-blur-xl">
        <div className="relative">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/35" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search resources, labs, CTFs or roadmaps..."
            className="input input-bordered w-full bg-base-200/45 pl-11"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`btn btn-sm rounded-full ${category === item ? "btn-primary" : "btn-ghost border border-white/5"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-[1.5rem] border border-white/5 bg-base-100/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-2xl text-secondary">
                {item.icon}
              </div>
              <span className="badge badge-outline border-white/10 text-[10px] uppercase tracking-[0.16em]">
                {item.category}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-black group-hover:text-secondary">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-base-content/60">
              {item.description}
            </p>
            {item.credit && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-accent/70">
                {item.credit}
              </p>
            )}
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-secondary">
              Open resource <FaExternalLinkAlt size={10} />
            </span>
          </a>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-base-content/50">
          No resources match this filter.
        </div>
      )}

      <section className="rounded-[2rem] border border-secondary/15 bg-base-100/65 p-6 md:p-9">
        <div className="flex items-center gap-3 text-secondary">
          <FaFlag />
          <p className="font-mono text-xs uppercase tracking-[0.22em]">// upcoming competitions</p>
        </div>
        <h2 className="mt-3 text-3xl font-black">Upcoming global CTFs</h2>
        <p className="mt-3 mb-7 max-w-3xl text-base-content/60">
          Live event discovery is fetched through the EWUCSC backend from CTFtime.
          Club-only challenge content stays inside the authenticated member portal.
        </p>
        <UpcomingCtfs limit={6} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-primary/15 bg-primary/5 p-7">
          <FaCode className="text-2xl text-primary" />
          <h2 className="mt-4 text-2xl font-black">Resource migration</h2>
          <p className="mt-3 text-sm leading-relaxed text-base-content/60">
            Legacy EWUCSC HTML/JS learning resources can be migrated into reusable React
            modules here without changing the public learning URLs.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-accent/15 bg-accent/5 p-7">
          <FaBookOpen className="text-2xl text-accent" />
          <h2 className="mt-4 text-2xl font-black">Contribute responsibly</h2>
          <p className="mt-3 text-sm leading-relaxed text-base-content/60">
            The future contributor workflow will let members propose technical resources
            and writeups for review before publication.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Resources;
