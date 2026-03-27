import { motion } from "framer-motion";

const PageHero = ({ badge, title, highlight, description }) => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-base-100/60 px-6 py-16 md:px-10 md:py-24 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.16),transparent_30%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
        >
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          {badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-6xl font-black leading-tight"
        >
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base md:text-lg text-base-content/70 leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default PageHero;