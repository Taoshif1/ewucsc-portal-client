import { motion } from "framer-motion";
import { FaBug, FaLaptopCode, FaNetworkWired, FaUsers } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const activities = [
  {
    title: "Capture The Flag",
    description:
      "Sharpen your skills through web exploitation, OSINT, forensics, and security puzzles.",
    icon: <FaBug className="text-2xl" />,
  },
  {
    title: "Workshops & Training",
    description:
      "Structured sessions on cybersecurity fundamentals, tools, workflows, and practical thinking.",
    icon: <FaLaptopCode className="text-2xl" />,
  },
  {
    title: "Networking & Community",
    description:
      "Learn with like-minded students, collaborate on ideas, and grow inside a cyber-focused network.",
    icon: <FaUsers className="text-2xl" />,
  },
  {
    title: "Security Mindset",
    description:
      "Understand systems, attacks, defense strategies, and modern cyber operations from the ground up.",
    icon: <FaNetworkWired className="text-2xl" />,
  },
];

const ActivitiesSection = () => {
  return (
    <section className="space-y-12">
      <SectionHeading
        badge="OUR ACTIVITIES"
        title="Built for Learning, Competition, and Growth"
        description="EWUCSC is designed to help students move from curiosity to capability through practical cybersecurity exposure."
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-3xl border border-white/5 bg-base-100/70 backdrop-blur-md p-6 shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-4 text-primary group-hover:scale-110 transition-transform duration-300">
              {activity.icon}
            </div>

            <h3 className="text-xl font-bold mb-3">{activity.title}</h3>
            <p className="text-base-content/70 leading-relaxed text-sm">
              {activity.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ActivitiesSection;