import { Link } from "react-router";
import { FaTriangleExclamation } from "react-icons/fa6";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ErrorState = ({
  title = "Something went wrong",
  message = "We could not load this section right now. Please try again later.",
  buttonText = "Go Home",
  buttonLink = "/",
}) => {
  return (
    <>
    <Navbar />

    <div className="rounded-3xl border border-error/20 bg-error/5 backdrop-blur-xl p-8 md:p-12 text-center shadow-xl">
      <div className="w-20 h-20 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-6">
        <FaTriangleExclamation className="text-4xl text-error" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
      <p className="text-base-content/70 max-w-2xl mx-auto mb-6">{message}</p>

      <Link
        to={buttonLink}
        className="btn rounded-full px-8 text-white font-bold border-none bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-500"
      >
        {buttonText}
      </Link>
    </div>

    <Footer></Footer>
    </>
  );
};

export default ErrorState;