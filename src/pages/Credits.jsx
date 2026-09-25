import { motion } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaCodeBranch,
  FaGithub,
  FaLinkedin,
  FaShieldHalved,
} from "react-icons/fa6";
import PageHero from "../components/PageHero";

const links = [
  {
    label: "Developer Portfolio",
    value: "Gazi Taoshif",
    href: "https://webdevportfolio-three.vercel.app/",
    icon: <FaArrowUpRightFromSquare />,
  },
  {
    label: "Studio",
    value: "Taoshiflex Studio",
    href: "https://taoshiflexstudio.me/",
    icon: <FaCodeBranch />,
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
      highlight="Run by EWUCSC."
      description="The portal is developed and maintained as a club system for East West University Cyber Security Club."
    />

    <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-primary/15 bg-base-100/70 p-6 backdrop-blur-xl md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(37,99,235,0.15),transparent_28%),radial-gradient(circle_at_88%_15%,rgba(6,182,212,0.12),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:34px_34px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
          // build ownership
        </p>
        <h1 className="mt-3 text-3xl font-black md:text-5xl">
          Built & managed by <span className="text-primary">Gazi Taoshif</span>
        </h1>
        <p className="mt-5 max-w-3xl leading-relaxed text-base-content/60">
          Developed, integrated and maintained through Taoshiflex Studio, with the
          platform handed over as an operational EWUCSC system rather than a personal
          project.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {links.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="group rounded-2xl border border-white/5 bg-base-200/35 p-5 transition hover:-translate-y-1 hover:border-primary/25"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <FaArrowUpRightFromSquare className="text-xs text-base-content/25 transition group-hover:text-primary" />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-base-content/35">
                {item.label}
              </p>
              <p className="mt-1 font-bold group-hover:text-primary">{item.value}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>

    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-5xl rounded-[2rem] border border-accent/15 bg-accent/5 p-7 md:p-10"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-xl text-accent">
          <FaShieldHalved />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            // current stewardship
          </p>
          <h2 className="mt-2 text-3xl font-black">Operated by EWUCSC</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-base-content/60">
            The website and member portal are operated by East West University Cyber
            Security Club. Club leadership controls member approvals, roles, published
            content, resources and ongoing portal operations.
          </p>
        </div>
      </div>
    </motion.section>
  </div>
);

export default Credits;
