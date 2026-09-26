import { motion } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaBuilding,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaShieldHalved,
  FaUserAstronaut,
} from "react-icons/fa6";
import PageHero from "../components/PageHero";

const gmailCompose = (email) =>
  "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email);

const builderLinks = [
  {
    label: "Portfolio",
    value: "Gazi Taoshif",
    href: "https://webdevportfolio-three.vercel.app/",
    icon: <FaUserAstronaut />,
  },
  {
    label: "Taoshiflex Studio",
    value: "taoshiflexstudio.me",
    href: "https://taoshiflexstudio.me/",
    icon: <FaGlobe />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/taoshif1",
    href: "https://www.linkedin.com/in/taoshif1/",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    value: "github.com/Taoshif1",
    href: "https://github.com/Taoshif1",
    icon: <FaGithub />,
  },
];

const Credits = () => (
  <div className="space-y-14 pb-20">
    <PageHero
      badge="Build & Stewardship"
      title="Built with care."
      highlight="Operated by EWUCSC."
      description="A maintained club platform built through Taoshiflex Studio and operated by East West University Cyber Security Club."
    />

    <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
      <motion.article
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-base-100/70 p-7 backdrop-blur-xl md:p-9"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(37,99,235,0.18),transparent_30%)]" />
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
            <FaUserAstronaut />
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            // builder
          </p>
          <h2 className="mt-2 text-3xl font-black">Gazi Taoshif</h2>
          <p className="mt-2 font-semibold text-secondary">Owner · Taoshiflex Studio</p>
          <p className="mt-4 leading-relaxed text-base-content/60">
            Built, integrated and maintained the EWUCSC website and member portal,
            with the codebase prepared for club handover and future maintainers.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {builderLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/5 bg-base-200/35 p-4 transition hover:-translate-y-1 hover:border-primary/25"
              >
                <div className="flex items-center justify-between">
                  <span className="text-primary">{item.icon}</span>
                  <FaArrowUpRightFromSquare className="text-xs text-base-content/25 group-hover:text-primary" />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-base-content/35">
                  {item.label}
                </p>
                <p className="mt-1 truncate text-sm font-bold">{item.value}</p>
              </a>
            ))}
          </div>
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative overflow-hidden rounded-[2rem] border border-accent/15 bg-base-100/70 p-7 backdrop-blur-xl md:p-9"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(34,197,94,0.15),transparent_30%)]" />
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-xl text-accent">
            <FaShieldHalved />
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            // official stewardship
          </p>
          <h2 className="mt-2 text-3xl font-black">EWU Cyber Security Club</h2>
          <p className="mt-4 leading-relaxed text-base-content/60">
            EWUCSC operates the platform and controls member approvals, roles,
            announcements, resources, gallery content and ongoing club operations.
          </p>

          <div className="mt-7 space-y-3">
            <a
              href={gmailCompose("ewcsc@ewubd.edu")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-white/5 bg-base-200/35 p-5 transition hover:border-accent/25"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FaBuilding />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/35">Club email</p>
                <p className="font-bold">ewcsc@ewubd.edu</p>
              </div>
            </a>

            <a
              href={gmailCompose("hello@zabermahmud.me")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-white/5 bg-base-200/35 p-5 transition hover:border-secondary/25"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/35">Technical contact</p>
                <p className="font-bold">hello@zabermahmud.me</p>
              </div>
            </a>
          </div>
        </div>
      </motion.article>
    </section>
  </div>
);

export default Credits;
