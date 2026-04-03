import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineBookOpen, HiOutlineShieldCheck, HiOutlineTerminal, 
  HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineDocumentText,
  HiOutlineSearch, HiOutlineCode, HiOutlineLockClosed
} from "react-icons/hi";
import PageHero from "../components/PageHero";

const resources = [
  {
    title: "TryHackMe",
    desc: "Hands-on cyber security training through browser-based labs. Perfect for beginners.",
    icon: <HiOutlineShieldCheck />,
    tag: "Platform",
    link: "https://tryhackme.com",
    color: "from-red-500/20"
  },
  {
    title: "OWASP Top 10",
    desc: "The standard awareness document for web application security risks.",
    icon: <HiOutlineGlobeAlt />,
    tag: "Documentation",
    link: "https://owasp.org",
    color: "from-cyan-500/20"
  },
  {
    title: "Hack The Box",
    desc: "Massive hacking playground for advanced penetration testing skills.",
    icon: <HiOutlineTerminal />,
    tag: "Labs",
    link: "https://hackthebox.com",
    color: "from-emerald-500/20"
  },
  {
    title: "picoCTF",
    desc: "Free computer security education program with year-round challenges.",
    icon: <HiOutlineAcademicCap />,
    tag: "CTF",
    link: "https://picoctf.org",
    color: "from-purple-500/20"
  },
  {
    title: "Cyber Security Wiki",
    desc: "Comprehensive roadmap and resources for every security domain.",
    icon: <HiOutlineDocumentText />,
    tag: "Wiki",
    link: "https://roadmap.sh",
    color: "from-blue-500/20"
  },
  {
    title: "Exploit Database",
    desc: "CVE compliant database for exploits and vulnerable software research.",
    icon: <HiOutlineLockClosed />,
    tag: "Database",
    link: "https://exploit-db.com",
    color: "from-orange-500/20"
  },
  {
    title: "PortSwigger Academy",
    desc: "Free online web security training from the creators of Burp Suite.",
    icon: <HiOutlineCode />,
    tag: "Course",
    link: "https://portswigger.net",
    color: "from-pink-500/20"
  },
  {
    title: "NIST Framework",
    desc: "Standard guidelines to manage and reduce cybersecurity risk.",
    icon: <HiOutlineBookOpen />,
    tag: "Standard",
    link: "https://nist.gov",
    color: "from-amber-500/20"
  }
];

const Resources = () => {
  const [search, setSearch] = useState("");

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(search.toLowerCase()) || 
    res.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge="Learning Assets"
        title="Cyber"
        highlight="Vault"
        description="A curated collection of professional tools, labs, and documentation for EWUCSC members."
      />

      {/* Search Bar Section */}
      <div className="max-w-md mx-auto px-4 -mt-10 relative z-20">
        <div className="relative group">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text"
            placeholder="Search tools, platforms, or tags..."
            className="input input-bordered w-full pl-12 bg-base-100/50 backdrop-blur-md border-white/10 focus:border-primary/50 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((res, index) => (
            <motion.div
              layout
              key={res.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/5 bg-base-100/70 p-8 backdrop-blur-xl shadow-2xl hover:border-primary/30 transition-all duration-300 cyber-shimmer flex flex-col"
            >
              <div className={`absolute -inset-24 bg-gradient-to-br ${res.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary text-3xl group-hover:scale-110 transition-transform duration-300">
                    {res.icon}
                  </div>
                  <span className="badge badge-outline border-white/10 text-[10px] uppercase tracking-wider font-mono opacity-60">
                    {res.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {res.title}
                </h3>
                
                <p className="text-sm text-base-content/60 leading-relaxed mb-6 flex-grow">
                  {res.desc}
                </p>

                <a 
                  href={res.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-ghost p-0 w-fit hover:bg-transparent hover:text-primary group-hover:translate-x-1 transition-all"
                >
                  Visit Resource →
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl font-mono">No resources found for "{search}"</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
