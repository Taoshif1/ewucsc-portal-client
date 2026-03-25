import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const badges = [
  "Ethical Hacking",
  "CTF Challenges",
  "Web Security",
  "Linux Skills",
  "Network Basics",
  "Cyber Research",
  "Problem Solving",
  "Leaderboard System",
];

const CyberBadgeStrip = () => {
  return (
    <section className="space-y-8 overflow-hidden">
      <SectionHeading
        badge="Core Tracks"
        title="What We Train You In"
        subtitle="From beginner-friendly foundations to competitive cyber skill-building, every track is designed to make you sharper, faster, and more dangerous in the right way."
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-base-100/60 backdrop-blur-xl py-6">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base-100 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base-100 to-transparent z-10"></div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 22,
            ease: "linear",
          }}
          className="flex w-max gap-4"
        >
          {[...badges, ...badges].map((badge, index) => (
            <div
              key={`${badge}-${index}`}
              className="badge badge-lg border border-primary/20 bg-base-100/80 backdrop-blur-md px-5 py-4 text-sm font-semibold text-base-content shadow-md hover:shadow-[0_0_20px_rgba(37,99,235,0.18)] transition-all"
            >
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CyberBadgeStrip;