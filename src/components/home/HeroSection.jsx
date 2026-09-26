import { motion } from "framer-motion";
import { Link } from "react-router";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaArrowRight, FaShieldAlt, FaTerminal, FaTrophy } from "react-icons/fa";
import MatrixBackground from "./MatrixBackground";
import FloatingParticles from "./FloatingParticles";
import HeroTerminal from "./HeroTerminal";
import CodeRain from "./CodeRain";
import { useAuth } from "../../hooks/useAuth";
import { useActiveRecruitment } from "../../hooks/useActiveRecruitment";
import {
  authCtfUrl,
  authLoginUrl,
  isExternalHref,
  technicalLearningUrl,
  technicalResourcesUrl,
} from "../../config/siteLinks";

const SmartLink = ({ href, children, className, state }) =>
  isExternalHref(href) ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <Link to={href} state={state} className={className}>{children}</Link>
  );

const HeroSection = () => {
  const { user } = useAuth();
  const { form: recruitment } = useActiveRecruitment();
  const [text] = useTypewriter({
    words: ["Ethical Hackers", "CTF Champions", "Cyber Defenders", "Security Experts"],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 40,
    delaySpeed: 1800,
  });

  const ctfDestination = user ? authCtfUrl : authLoginUrl;
  const ctfLoginState = user ? undefined : { from: { pathname: "/dashboard/ctf" } };

  const quickLinks = [
    {
      href: technicalLearningUrl,
      title: "Hands-on Practice",
      description: "Open the technical learning hub for labs, roadmaps and guided practice.",
      icon: <FaTerminal className="mx-auto mb-3 text-2xl text-primary" />,
    },
    {
      href: ctfDestination,
      state: ctfLoginState,
      title: "CTF Practice",
      description: "Approved members can solve private practice challenges inside the portal.",
      icon: <FaTrophy className="mx-auto mb-3 text-2xl text-secondary" />,
    },
    {
      href: technicalResourcesUrl,
      title: "Technical Resources",
      description: "Browse curated references, tooling and learning material in the technical hub.",
      icon: <FaShieldAlt className="mx-auto mb-3 text-2xl text-accent" />,
    },
  ];

  return (
    <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden rounded-[2rem] border border-white/5 bg-base-100/40 px-6 py-20 backdrop-blur-xl lg:px-16">
      <MatrixBackground />
      <FloatingParticles />
      <CodeRain />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
        >
          <FaShieldAlt /> EWU Cyber Security Club
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          We Build{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {text}
          </span>
          <Cursor cursorColor="#22c55e" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-base-content/70 md:text-lg lg:text-xl"
        >
          EWUCSC brings students together through cybersecurity learning, club
          activities, workshops, community events and member-only practice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {recruitment?.acceptingSubmissions && (
            <Link
              to={"/apply/" + recruitment.formKey}
              className="btn btn-lg rounded-full border-none bg-gradient-to-r from-primary via-secondary to-accent px-8 text-white shadow-xl shadow-primary/20 transition-all duration-500 hover:scale-105 hover:saturate-150 active:scale-95"
            >
              Recruitment Open · Apply <FaArrowRight />
            </Link>
          )}

          <SmartLink
            href={ctfDestination}
            state={ctfLoginState}
            className="btn btn-lg btn-outline btn-accent rounded-full px-8 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {user ? "Open Member Practice" : "Member Portal"}
          </SmartLink>
        </motion.div>

        {!recruitment?.acceptingSubmissions && !user && (
          <p className="mt-3 text-xs text-base-content/40">
            Recruitment is currently closed. Existing members can always use the Member Portal.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {quickLinks.map((item) => (
            <SmartLink
              key={item.title}
              href={item.href}
              state={item.state}
              className="group rounded-2xl border border-white/10 bg-base-200/40 p-5 shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:border-primary/30"
            >
              {item.icon}
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-base-content/70">{item.description}</p>
              <span className="mt-4 inline-flex font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                Open →
              </span>
            </SmartLink>
          ))}
        </motion.div>

        <HeroTerminal />
      </div>
    </section>
  );
};

export default HeroSection;
