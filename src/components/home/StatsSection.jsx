import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const stats = [
  { number: "150+", label: "Active Learners" },
  { number: "40+", label: "Cyber Challenges" },
  { number: "12+", label: "Workshops & Sessions" },
  { number: "4", label: "Growth Tracks" },
];

const StatsSection = () => {
  return (
    <section className="space-y-10">
      <SectionHeading
        badge="Club Impact"
        title="Built for Growth, Competition & Real Skill"
        subtitle="A performance-driven ecosystem where students learn ethical hacking, solve practical cyber problems, and climb the leaderboard."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group card bg-base-100/70 border border-white/5 shadow-xl backdrop-blur-md hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.18)]"
          >
            <div className="card-body items-center text-center">
              <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-sm md:text-base text-base-content/70">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;