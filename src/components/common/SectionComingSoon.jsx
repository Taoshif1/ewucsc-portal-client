import { FaRocket } from "react-icons/fa";

const SectionComingSoon = ({
  title = "Feature Coming Soon",
  message = "This module is planned and will be available in an upcoming release.",
}) => {
  return (
    <div className="rounded-3xl border border-base-content/10 bg-base-100/60 backdrop-blur-xl p-8 md:p-10 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.12),_transparent_35%)]"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center shrink-0">
          <FaRocket className="text-4xl text-primary" />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2">
            In Progress
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-base-content/70">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionComingSoon;