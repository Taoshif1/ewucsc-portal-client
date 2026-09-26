import { motion } from "framer-motion";
import { Link } from "react-router";
import { useActiveRecruitment } from "../../hooks/useActiveRecruitment";
import { isExternalHref, technicalHubUrl } from "../../config/siteLinks";

const CTASection = () => {
  const { form: recruitment } = useActiveRecruitment();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 shadow-2xl md:p-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.25),transparent_30%)] opacity-20" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center">
        <div className="badge badge-outline badge-accent px-4 py-3 font-semibold">
          {recruitment?.acceptingSubmissions ? "RECRUITMENT OPEN" : "EWUCSC COMMUNITY"}
        </div>

        <h2 className="text-3xl font-black leading-tight md:text-5xl">
          Start Your Cyber Journey With EWUCSC
        </h2>

        <p className="text-base leading-relaxed text-base-content/75 md:text-lg">
          {recruitment?.acceptingSubmissions
            ? "Applications are open now. Submit the club recruitment form before the campaign closes."
            : "Recruitment opens only during club campaigns. Existing members can continue using the Member Portal while everyone can use the technical hub."}
        </p>

        <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
          {recruitment?.acceptingSubmissions && (
            <Link
              to={"/apply/" + recruitment.formKey}
              className="btn btn-lg rounded-full border-none bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Apply to EWUCSC
            </Link>
          )}

          {isExternalHref(technicalHubUrl) ? (
            <a href={technicalHubUrl} className="btn btn-lg btn-outline btn-secondary rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
              Open Technical Hub
            </a>
          ) : (
            <Link to={technicalHubUrl} className="btn btn-lg btn-outline btn-secondary rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
              Open Technical Hub
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
