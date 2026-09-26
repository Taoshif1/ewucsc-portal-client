import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  authRegisterUrl,
  isExternalHref,
  technicalHubUrl,
} from "../../config/siteLinks";

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 md:p-12 shadow-2xl"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.25),transparent_30%)]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="badge badge-outline badge-accent px-4 py-3 font-semibold">
          READY TO JOIN?
        </div>

        <h2 className="text-3xl md:text-5xl font-black leading-tight">
          Start Your Cyber Journey With EWUCSC
        </h2>

        <p className="text-base md:text-lg text-base-content/75 leading-relaxed">
          Join through the dedicated member-access portal, then use the technical hub
          for structured learning and resources.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          {isExternalHref(authRegisterUrl) ? (
            <a
              href={authRegisterUrl}
              className="btn btn-lg rounded-full border-none text-white bg-gradient-to-r from-primary via-secondary to-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20"
            >
              Join EWUCSC
            </a>
          ) : (
            <Link
              to={authRegisterUrl}
              className="btn btn-lg rounded-full border-none text-white bg-gradient-to-r from-primary via-secondary to-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20"
            >
              Join EWUCSC
            </Link>
          )}

          {isExternalHref(technicalHubUrl) ? (
            <a
              href={technicalHubUrl}
              className="btn btn-lg btn-outline btn-secondary rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Open Technical Hub
            </a>
          ) : (
            <Link
              to={technicalHubUrl}
              className="btn btn-lg btn-outline btn-secondary rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Open Technical Hub
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
