// src/components/Footer.jsx
import React from "react";
import Logo from "./Logo";
import { Link } from "react-router";
import { FaFacebook, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-base-100/70 backdrop-blur-xl border-t border-white/5 pt-12 pb-6 px-4 lg:px-12 mt-auto">
      {/* Decorative Top Gradient Line (Matches Navbar) */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary after:to-secondary opacity-50"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <Logo className="h-10 w-10" />
          <p className="mt-4 text-sm text-base-content/70 leading-relaxed">
            Empowering East West University students with advanced cybersecurity 
            skills, ethical hacking practices, and a community-driven learning path.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/ctf" className="hover:text-secondary transition-colors">CTF Challenges</Link></li>
            <li><Link to="/learning" className="hover:text-secondary transition-colors">Learning Path</Link></li>
            <li><Link to="/homeworks" className="hover:text-secondary transition-colors">Homeworks</Link></li>
            <li><Link to="/dashboard" className="hover:text-secondary transition-colors">Member Dashboard</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-secondary transition-colors">Club Guidelines</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Internal Wiki</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Security Toolkit</a></li>
            <li><Link to="/register" className="hover:text-secondary transition-colors">Join the Club</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Connect With Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary"><FaDiscord /></a>
            <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary"><FaGithub /></a>
            <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary"><FaFacebook /></a>
            <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary"><FaLinkedin /></a>
          </div>
          <p className="text-xs text-base-content/50">Contact: support@ewucsc.org</p>
        </div>
      </div>

      {/* Bottom Copyright */}
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
