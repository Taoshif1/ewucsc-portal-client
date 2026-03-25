import { motion } from "framer-motion";

const stats = [
  { number: "150+", label: "Active Learners" },
  { number: "40+", label: "Cyber Challenges" },
  { number: "12+", label: "Workshops & Sessions" },
  { number: "4", label: "Growth Tracks" },
];

const StatsSection = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card bg-base-100/70 border border-white/5 shadow-xl backdrop-blur-md"
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
    </section>
  );
};

export default StatsSection;