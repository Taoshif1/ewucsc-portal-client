import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const tracks = [
  "Web Exploitation",
  "Networking Basics",
  "Linux & Command Line",
  "Cyber Security Fundamentals",
  "CTF Problem Solving",
  "Security Research Mindset",
];

const LearningTracksSection = () => {
  return (
    <section className="space-y-12">
      <SectionHeading
        badge="LEARNING PATH"
        title="A Structured Route Into Cyber Security"
        description="Instead of random tutorials, members follow a more focused path designed to build skill, confidence, and technical maturity."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tracks.map((track, index) => (
          <motion.div
            key={track}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="rounded-2xl border border-white/5 bg-base-100/70 p-5 backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(34,197,94,0.7)]"></div>
              <h3 className="font-bold text-lg">{track}</h3>
            </div>
            <p className="text-sm text-base-content/65 mt-3">
              Practice-based learning designed for real technical growth.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LearningTracksSection;