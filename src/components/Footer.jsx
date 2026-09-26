import Logo from "./Logo";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import SiteCreditBar from "./SiteCreditBar";
import {
  authCtfUrl,
  authHomeworksUrl,
  authLoginUrl,
  isExternalHref,
  technicalLearningUrl,
  technicalResourcesUrl,
} from "../config/siteLinks";

const SmartHref = ({ href, children, className }) =>
  isExternalHref(href) ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <Link to={href} className={className}>{children}</Link>
  );

const Footer = () => {
  const { user } = useAuth();

  const memberDestination = (memberUrl) => (user ? memberUrl : authLoginUrl);
  const linkClass = "hover:text-secondary transition-colors";

  return (
    <>
      <footer className="relative mt-auto border-t border-white/5 bg-base-100/70 px-4 pb-6 pt-12 backdrop-blur-xl lg:px-12">
        <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-secondary opacity-50" />

        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="h-10 w-10" />
            <p className="mt-4 text-sm leading-relaxed text-base-content/70">
              East West University Cyber Security Club learning, collaboration,
              events and approved-member activities.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className={linkClass}>Home</Link></li>
              <li>
                <SmartHref href={memberDestination(authCtfUrl)} className={linkClass}>
                  Member CTF
                </SmartHref>
              </li>
              <li>
                <SmartHref href={technicalLearningUrl} className={linkClass}>
                  Learning Path
                </SmartHref>
              </li>
              <li>
                <SmartHref href={memberDestination(authHomeworksUrl)} className={linkClass}>
                  Member Homework
                </SmartHref>
              </li>
              <li><Link to="/members" className={linkClass}>Members & Panels</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/announcements" className={linkClass}>Announcements & Posts</Link></li>
              <li><Link to="/blogs" className={linkClass}>Club Blogs</Link></li>
              <li><Link to="/partners" className={linkClass}>Sponsors / Partners</Link></li>
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li>
                <SmartHref href={technicalResourcesUrl} className={linkClass}>
                  Technical Resources
                </SmartHref>
              </li>
              <li><Link to="/contact" className={linkClass}>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/35">Club</p>
                <a
                  href="mailto:ewcsc@ewubd.edu"
                  className="font-bold text-secondary transition-colors hover:text-primary"
                >
                  ewcsc@ewubd.edu
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/35">Technical</p>
                <a
                  href="mailto:hello@zabermahmud.me"
                  className="font-bold text-secondary transition-colors hover:text-primary"
                >
                  hello@zabermahmud.me
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-base-content/50 md:flex-row">
          <p>© {new Date().getFullYear()} EWU Cyber Security Club. All rights reserved.</p>
          <p>Member portal access requires verified EWU identity and club approval.</p>
        </div>
      </footer>
      <SiteCreditBar />
    </>
  );
};

export default Footer;
