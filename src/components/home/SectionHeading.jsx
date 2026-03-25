import { motion } from "framer-motion";

const SectionHeading = ({ badge, title, subtitle, center = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`space-y-4 ${center ? "text-center" : "text-left"}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-primary shadow-[0_0_20px_rgba(37,99,235,0.15)]">
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
          {badge}
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {subtitle && (
        <p className="max-w-2xl mx-auto text-sm md:text-base text-base-content/70 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;