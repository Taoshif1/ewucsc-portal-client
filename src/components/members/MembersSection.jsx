import { motion } from "framer-motion";
import MemberCard from "./MemberCard";

const MembersSection = ({
  title,
  subtitle,
  members,
  spotlight = false,
  gridCols = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
}) => {
  if (!members.length) return null;

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          {title}
        </div>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-base-content/65">
          {subtitle}
        </p>
      </motion.div>

      {spotlight ? (
        <div>
          {members.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              index={index}
              spotlight
            />
          ))}
        </div>
      ) : (
        <div className={`grid gap-6 ${gridCols}`}>
          {members.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MembersSection;