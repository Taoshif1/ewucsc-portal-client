import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const roleStyles = {
  President: "badge-accent",
  "Vice President": "badge-secondary",
  Executive: "badge-primary",
  "Sub Executive": "badge-outline",
};

const MemberCard = ({ member, index = 0, spotlight = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.015 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`group cyber-shimmer relative overflow-hidden rounded-[1.75rem] border border-white/5 bg-base-100/70 backdrop-blur-xl shadow-2xl ${
        spotlight ? "max-w-2xl mx-auto" : ""
      }`}
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_25%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.04)_50%,transparent_100%)] bg-[length:100%_8px]" />

      <div
        className={`relative z-10 p-6 ${
          spotlight ? "md:p-8 md:flex md:items-center md:gap-8" : "space-y-5"
        }`}
      >
        <div className={`${spotlight ? "md:w-1/3 flex justify-center" : ""}`}>
          <img
            src={member.image}
            alt={member.name}
            className={`object-cover border border-primary/20 shadow-lg shadow-primary/10 ${
              spotlight
                ? "h-28 w-28 md:h-40 md:w-40 rounded-3xl"
                : "h-20 w-20 rounded-2xl"
            }`}
          />
        </div>

        <div className={`${spotlight ? "md:w-2/3 space-y-5 mt-6 md:mt-0" : ""}`}>
          <div className={`${spotlight ? "space-y-3" : "flex items-start gap-4"}`}>
            {!spotlight ? (
              <>
                <div className="space-y-2">
                  <span className={`badge ${roleStyles[member.role]} badge-outline`}>
                    {member.role}
                  </span>

                  <div>
                    <h3 className="text-xl font-bold text-base-content">
                      {member.name}
                    </h3>
                    <p className="text-sm text-base-content/60">{member.team}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className={`badge ${roleStyles[member.role]} badge-outline badge-lg`}>
                  {member.role}
                </span>

                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-base-content">
                    {member.name}
                  </h3>
                  <p className="text-base text-base-content/60">{member.team}</p>
                </div>
              </>
            )}
          </div>

          <p className="text-sm md:text-base leading-relaxed text-base-content/70">
            {member.bio}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-3">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-circle btn-ghost hover:text-primary"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-circle btn-ghost hover:text-secondary"
              >
                <FaGithub size={18} />
              </a>
            </div>

            <span className="text-xs uppercase tracking-[0.2em] text-accent/70">
              Verified Node
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;