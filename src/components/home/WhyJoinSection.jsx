import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const points = [
  "Gain hands-on exposure to cybersecurity",
  "Participate in ranked challenge-based learning",
  "Build confidence through real practice",
  "Collaborate with a serious student tech community",
];

const WhyJoinSection = () => {
  return (
    <section className="space-y-12">
      <SectionHeading
        badge="WHY JOIN"
        title="More Than a Club — A Skill Accelerator"
        description="This platform is being built to help students become stronger technically, more competitive professionally, and more prepared for future opportunities."
      />

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/5 bg-base-100/70 backdrop-blur-md p-8 shadow-xl"
        >
          <h3 className="text-2xl font-black mb-4">
            Competitive Learning Environment
          </h3>
          <p className="text-base-content/70 leading-relaxed">
            Members will be able to solve cyber problems, earn points, and climb
            rankings — creating a focused environment similar to gamified learning
            platforms like picoCTF.
          </p>
        </motion.div>

        <div className="space-y-4">
          {points.map((point, index) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/5 bg-base-100/60 p-5 shadow-lg backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_rgba(37,99,235,0.7)]"></div>
                <p className="font-semibold">{point}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;