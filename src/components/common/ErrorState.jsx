import { Link } from "react-router";
import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  title = "Nothing here yet",
  message = "This section does not have any content right now.",
  buttonText,
  buttonLink = "/",
  icon = <FaInbox className="text-4xl text-primary" />,
}) => {
  return (
    <div className="rounded-3xl border border-base-content/10 bg-base-100/60 backdrop-blur-xl p-8 md:p-12 text-center shadow-xl">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
      <p className="text-base-content/70 max-w-2xl mx-auto mb-6">{message}</p>

      {buttonText && (
        <Link
          to={buttonLink}
          className="btn rounded-full px-8 text-white font-bold border-none bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-500"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;