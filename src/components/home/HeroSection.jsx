import { motion } from "framer-motion";
import { Link } from "react-router";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaArrowRight, FaShieldAlt, FaTerminal, FaTrophy } from "react-icons/fa";
import MatrixBackground from "./MatrixBackground";
import FloatingParticles from "./FloatingParticles";
import HeroTerminal from "./HeroTerminal";

const HeroSection = () => {
  const [text] = useTypewriter({
    words: [
      "Ethical Hackers",
      "CTF Champions",
      "Cyber Defenders",
      "Security Experts",
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 40,
    delaySpeed: 1800,
  });

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden rounded-[2rem] border border-white/5 bg-base-100/40 backdrop-blur-xl px-6 py-20 lg:px-16">
      <MatrixBackground />
      <FloatingParticles />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-6"
        >
          <FaShieldAlt />
          EWU Cyber Security Club
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
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
          className="max-w-3xl mx-auto mt-6 text-base md:text-lg lg:text-xl text-base-content/70 leading-relaxed"
        >
          Join a high-performance cybersecurity community where students learn
          ethical hacking, solve CTF challenges, sharpen real-world skills, and
          compete on rankings inside one elite digital arena.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/register"
            className="btn btn-lg border-none text-white rounded-full px-8 bg-gradient-to-r from-primary via-secondary to-accent hover:saturate-150 hover:scale-105 active:scale-95 transition-all duration-500 shadow-xl shadow-primary/20"
          >
            Join the Club <FaArrowRight />
          </Link>

          <Link
            to="/ctf"
            className="btn btn-lg btn-outline btn-accent rounded-full px-8 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Explore CTF Arena
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-base-200/40 backdrop-blur-md p-5 shadow-lg">
            <FaTerminal className="text-primary text-2xl mb-3 mx-auto" />
            <h3 className="font-bold text-lg">Hands-on Practice</h3>
            <p className="text-sm text-base-content/70 mt-2">
              Real labs, problem solving, and technical cyber workflows.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-base-200/40 backdrop-blur-md p-5 shadow-lg">
            <FaTrophy className="text-secondary text-2xl mb-3 mx-auto" />
            <h3 className="font-bold text-lg">CTF Competition</h3>
            <p className="text-sm text-base-content/70 mt-2">
              Solve challenges, gain points, and rise in the leaderboard.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-base-200/40 backdrop-blur-md p-5 shadow-lg">
            <FaShieldAlt className="text-accent text-2xl mb-3 mx-auto" />
            <h3 className="font-bold text-lg">Career Readiness</h3>
            <p className="text-sm text-base-content/70 mt-2">
              Build security thinking for industry, research, and beyond.
            </p>
          </div>
        </motion.div>

        <HeroTerminal />
      </div>
    </section>
  );
};

export default HeroSection;