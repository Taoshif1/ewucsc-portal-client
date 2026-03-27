import Logo from "./Logo";
import { Link } from "react-router";
import { FaFacebook, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-base-100/70 backdrop-blur-xl border-t border-white/5 pt-12 pb-6 px-4 lg:px-12 mt-auto">
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-secondary opacity-50"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div>
          <Logo className="h-10 w-10" />
          <p className="mt-4 text-sm text-base-content/70 leading-relaxed">
            Empowering East West University students with cybersecurity skills,
            ethical hacking practices, and a strong technical community.
          </p>
        </div>

        {/* Main Navigation */}
        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
            <li><Link to="/ctf" className="hover:text-secondary transition-colors">CTF Challenges</Link></li>
            <li><Link to="/learning" className="hover:text-secondary transition-colors">Learning Path</Link></li>
            <li><Link to="/homeworks" className="hover:text-secondary transition-colors">Homeworks</Link></li>
            <li><Link to="/members" className="hover:text-secondary transition-colors">Members & Panels</Link></li>
          </ul>
        </div>

        {/* More / Info Pages */}
        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/announcements" className="hover:text-secondary transition-colors">Announcements & Posts</Link></li>
            <li><Link to="/blogs" className="hover:text-secondary transition-colors">Latest Blogs</Link></li>
            <li><Link to="/partners" className="hover:text-secondary transition-colors">Sponsors / Partners</Link></li>
            <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
            <li><Link to="/resources" className="hover:text-secondary transition-colors">Resources</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">
            Connect With Us
          </h3>

          <div className="flex gap-4 mb-4">
            <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary">
              <FaDiscord />
            </a>
            <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary">
              <FaGithub />
            </a>
            <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary">
              <FaFacebook />
            </a>
            <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary">
              <FaLinkedin />
            </a>
          </div>

          <p className="text-xs text-base-content/50">
            Contact: support@ewucsc.org
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-base-content/50">
        <p>© {new Date().getFullYear()} EWU Cyber Security Club. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-base-content transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-base-content transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;