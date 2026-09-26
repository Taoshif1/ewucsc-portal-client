import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Logo from "./Logo";
import { useAuth } from "../hooks/useAuth";
import SiteCreditBar from "./SiteCreditBar";
import { publicApi } from "../services/api";
import {
  authCtfUrl,
  authHomeworksUrl,
  authLoginUrl,
  isExternalHref,
  technicalLearningUrl,
  technicalResourcesUrl,
} from "../config/siteLinks";

const DEFAULT_SETTINGS = {
  clubEmail: "ewcsc@ewubd.edu",
  technicalEmail: "hello@zabermahmud.me",
  socialLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    x: "",
  },
};

const socialMeta = {
  facebook: { label: "Facebook", icon: <FaFacebookF /> },
  instagram: { label: "Instagram", icon: <FaInstagram /> },
  linkedin: { label: "LinkedIn", icon: <FaLinkedinIn /> },
  youtube: { label: "YouTube", icon: <FaYoutube /> },
  x: { label: "X", icon: <FaXTwitter /> },
};

const SmartHref = ({ href, children, className }) =>
  isExternalHref(href) ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <Link to={href} className={className}>{children}</Link>
  );

const gmailCompose = (email) =>
  "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email);

const Footer = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    publicApi
      .get("/site-settings")
      .then((res) => {
        const incoming = res.data.settings || {};
        setSettings({
          ...DEFAULT_SETTINGS,
          ...incoming,
          socialLinks: {
            ...DEFAULT_SETTINGS.socialLinks,
            ...(incoming.socialLinks || {}),
          },
        });
      })
      .catch(() => setSettings(DEFAULT_SETTINGS));
  }, []);

  const memberDestination = (memberUrl) => (user ? memberUrl : authLoginUrl);
  const linkClass = "hover:text-secondary transition-colors";
  const socials = Object.entries(settings.socialLinks || {}).filter(([, href]) => Boolean(href));

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
              <li><Link to="/gallery" className={linkClass}>Gallery</Link></li>
              <li><Link to="/partners" className={linkClass}>Sponsors / Partners</Link></li>
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li><Link to="/credits" className={linkClass}>Build Credits</Link></li>
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
                  href={gmailCompose(settings.clubEmail)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-secondary transition-colors hover:text-primary"
                >
                  {settings.clubEmail}
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/35">Technical</p>
                <a
                  href={gmailCompose(settings.technicalEmail)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-secondary transition-colors hover:text-primary"
                >
                  {settings.technicalEmail}
                </a>
              </div>

              {socials.length > 0 && (
                <div className="pt-2">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/35">
                    Follow EWUCSC
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map(([key, href]) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={socialMeta[key]?.label || key}
                        title={socialMeta[key]?.label || key}
                        className="btn btn-sm btn-circle btn-ghost border border-white/5 hover:border-primary/30 hover:text-primary"
                      >
                        {socialMeta[key]?.icon}
                      </a>
                    ))}
                  </div>
                </div>
              )}
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
