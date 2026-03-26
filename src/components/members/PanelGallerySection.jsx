import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const PanelGallerySection = ({ members }) => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.015 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: index * 0.04 }}
          className="group cyber-shimmer relative overflow-hidden rounded-[1.75rem] border border-white/5 bg-base-100/70 backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_25%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10 p-5 space-y-4">
            <img
              src={member.image}
              alt={member.name}
              className="h-64 w-full rounded-2xl object-cover border border-primary/10"
            />

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-base-content">
                {member.name}
              </h3>
              <div className="inline-flex items-center rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-0.5 backdrop-blur-md">
                <span className="text-xs font-semibold tracking-wide text-primary">
                  {member.role}
                </span>
              </div>
            </div>

            {member.team && (
              <p className="text-sm text-base-content/60">{member.team}</p>
            )}

            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-2">
                {member.linkedin && member.linkedin !== "#" && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-circle btn-ghost hover:text-primary"
                  >
                    <FaLinkedin size={18} />
                  </a>
                )}

                {member.github && member.github !== "#" && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-circle btn-ghost hover:text-secondary"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">
                  Executive Panel 2024-2025
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default PanelGallerySection;
