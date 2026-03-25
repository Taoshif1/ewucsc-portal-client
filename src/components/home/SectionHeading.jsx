import { motion } from "framer-motion";

const SectionHeading = ({ badge, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto space-y-4"
    >
      <div className="badge badge-outline badge-primary px-4 py-3 text-sm font-semibold tracking-wide">
        {badge}
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
        {title}
      </h2>

      <p className="text-base md:text-lg text-base-content/70 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeading;