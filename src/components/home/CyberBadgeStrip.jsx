import { motion } from "framer-motion";

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
    <section className="overflow-hidden py-4">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
        className="flex w-max gap-4"
      >
        {[...badges, ...badges].map((badge, index) => (
          <div
            key={`${badge}-${index}`}
            className="badge badge-lg border border-primary/20 bg-base-100/80 backdrop-blur-md px-5 py-4 text-sm font-semibold text-base-content shadow-md"
          >
            {badge}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default CyberBadgeStrip;