import Logo from "./Logo";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import SiteCreditBar from "./SiteCreditBar";

const Footer = () => {
  const { user } = useAuth();

  const memberLink = (pathname) => ({
    to: user ? pathname : "/login",
    state: user ? undefined : { from: { pathname } },
  });

  const ctfLink = memberLink("/dashboard/ctf");
  const homeworkLink = memberLink("/dashboard/homeworks");

  return (
    <>
      <footer className="relative bg-base-100/70 backdrop-blur-xl border-t border-white/5 pt-12 pb-6 px-4 lg:px-12 mt-auto">
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-secondary opacity-50" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <Logo className="h-10 w-10" />
          <p className="mt-4 text-sm text-base-content/70 leading-relaxed">
            East West University Cyber Security Club learning, collaboration,
            events and approved-member activities.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={ctfLink.to}
                state={ctfLink.state}
                className="hover:text-secondary transition-colors"
              >
                Member CTF
              </Link>
            </li>
            <li>
              <Link to="/learning" className="hover:text-secondary transition-colors">
                Learning Path
              </Link>
            </li>
            <li>
              <Link
                to={homeworkLink.to}
                state={homeworkLink.state}
                className="hover:text-secondary transition-colors"
              >
                Member Homework
              </Link>
            </li>
            <li>
              <Link to="/members" className="hover:text-secondary transition-colors">
                Members & Panels
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/announcements" className="hover:text-secondary transition-colors">
                Announcements & Posts
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-secondary transition-colors">
                Club Blogs
              </Link>
            </li>
            <li>
              <Link to="/partners" className="hover:text-secondary transition-colors">
                Sponsors / Partners
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-secondary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-secondary transition-colors">
                Technical Resources
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-secondary transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">
            Contact
          </h3>
          <a
            href="mailto:ewucsc@ewubd.edu"
            className="text-sm font-bold text-secondary hover:text-primary transition-colors"
          >
            ewucsc@ewubd.edu
          </a>
          <p className="mt-4 text-xs leading-relaxed text-base-content/50">
            Official social links will be added only after the club provides
            verified profile URLs.
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-base-content/50">
        <p>© {new Date().getFullYear()} EWU Cyber Security Club. All rights reserved.</p>
        <p>Member portal access requires verified EWU identity and club approval.</p>
      </div>
      </footer>
      <SiteCreditBar />
    </>
  );
};

export default Footer;
