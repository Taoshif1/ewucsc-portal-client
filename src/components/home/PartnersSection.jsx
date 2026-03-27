import { motion } from "framer-motion";

const partners = [
  { id: 1, name: "Partner One" },
  { id: 2, name: "Partner Two" },
  { id: 3, name: "Partner Three" },
  { id: 4, name: "Partner Four" },
];

const PartnersSection = () => {
  return (
    <section className="space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          Trusted Ecosystem
        </span>

        <h2 className="text-3xl md:text-5xl font-black leading-tight">
          Sponsors &{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Club Partners
          </span>
        </h2>

        <p className="text-base md:text-lg text-base-content/70 leading-relaxed">
          Organizations and communities helping EWUCSC grow through collaboration,
          opportunities, and technical support.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-8 text-center backdrop-blur-xl shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-2xl font-black text-primary">
              {partner.name.charAt(0)}
            </div>

            <h3 className="text-lg font-bold">{partner.name}</h3>
            <p className="mt-2 text-sm text-base-content/70">
              Add sponsor logo and description here.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;