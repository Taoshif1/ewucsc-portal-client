import { motion } from "framer-motion";
import { Link } from "react-router";

const MembersCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="rounded-[2rem] border border-secondary/10 bg-base-100/60 px-6 py-14 md:px-10 text-center backdrop-blur-xl"
    >
      <div className="max-w-3xl mx-auto space-y-5">
        <h2 className="text-3xl md:text-4xl font-black">
          Want to be part of the{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            next cyber generation?
          </span>
        </h2>

        <p className="text-base-content/70">
          Join EWUCSC and start your journey through CTFs, workshops, research,
          and hands-on cyber learning.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link to="/register" className="btn btn-primary rounded-full px-8">
            Join the Club
          </Link>

          <Link
            to="/learning"
            className="btn btn-outline rounded-full px-8"
          >
            Explore Learning Path
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default MembersCTA;