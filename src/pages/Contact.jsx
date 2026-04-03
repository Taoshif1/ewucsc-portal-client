import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineClipboardCheck,
  HiOutlineArrowRight,
  HiOutlineChartBar,
  HiOutlineChip,
  HiOutlineLightningBolt,
  HiOutlineGlobe,
  HiOutlineAcademicCap,
  HiOutlineFire,
} from "react-icons/hi";

import { FaDiscord, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import PageHero from "../components/PageHero";
import Map from "../components/Map";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace the strings below with your actual EmailJS IDs
    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY",
      )
      .then(() => {
        toast.success("Message transmitted successfully!");
        e.target.reset();
      })
      .catch(() => {
        toast.error("Transmission failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const recruitmentSteps = [
    { icon: <HiOutlineClipboardCheck />, text: "Submit Application via Form" },
    {
      icon: <HiOutlineShieldCheck />,
      text: "Technical Evaluation & Interview",
    },
    {
      icon: <HiOutlineUserGroup />,
      text: "Trial Period with Active Participation",
    },
    { icon: <HiOutlineLightBulb />, text: "Full Membership & Growth Tracks" },
  ];

  const benefits = [
    {
      title: "Skill Development",
      desc: "Enhance cybersecurity skills through regular practice.",
      icon: <HiOutlineChartBar />,
      color: "text-blue-500",
    },
    {
      title: "Elite Networking",
      desc: "Connect with industry professionals and enthusiasts.",
      icon: <HiOutlineChip />,
      color: "text-emerald-500",
    },
    {
      title: "Global Impact",
      desc: "Represent EWU in international CTF competitions.",
      icon: <HiOutlineLightningBolt />,
      color: "text-purple-500",
    },
    {
      title: "Open Research",
      desc: "Contribute to security projects and vulnerability research.",
      icon: <HiOutlineGlobe />,
      color: "text-cyan-500",
    },
    {
      title: "Growth Tracks",
      desc: "Structured paths for beginners to advanced hackers.",
      icon: <HiOutlineAcademicCap />,
      color: "text-amber-500",
    },
    {
      title: "Live Fire Labs",
      desc: "Get hands-on experience in our dedicated practice labs.",
      icon: <HiOutlineFire />,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-20 pb-24">
      <PageHero
        badge="Connect with EWUCSC"
        title="Operation"
        highlight="Collaboration"
        description="Whether you're a student looking to join our ranks, a brand seeking to sponsor, or a researcher wanting to collaborate—we're listening."
      />

      {/* Benefits Section: 6 Cards */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl border border-white/5 bg-base-100/30 backdrop-blur-sm group overflow-hidden hover:border-primary/20 transition-all"
            >
              <div
                className={`absolute -right-4 -bottom-4 text-9xl opacity-5 group-hover:opacity-10 transition-opacity ${item.color}`}
              >
                {item.icon}
              </div>
              <div className={`text-4xl mb-6 ${item.color}`}>{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-base-content/60 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid gap-8 lg:grid-cols-12">
        {/* Left Column: Info & Recruitment */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-white/5 bg-base-100/40 p-10 backdrop-blur-xl shadow-2xl cyber-shimmer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 text-9xl">
              <HiOutlineShieldCheck />
            </div>
            <div className="flex items-center gap-4 mb-6">
              {/* Modern Cyber Bar */}
              <div className="h-10 w-1.5 bg-primary rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] shrink-0"></div>

              {/* Gradient Heading */}
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
                Join the <span className="uppercase">Elite Ranks</span>
              </h2>
            </div>
            <p className="text-base-content/70 mb-10 leading-relaxed text-lg">
              We're looking for passionate CTF players and security researchers
              to join the top cybersecurity ecosystem at East West University.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              {recruitmentSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {step.icon}
                  </div>
                  <span className="text-sm font-semibold">{step.text}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-lg rounded-2xl px-10 group">
              Apply for Membership{" "}
              <HiOutlineArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl border border-white/5 bg-base-100/60 flex items-center gap-6 hover:border-primary/20 transition-all">
              <HiOutlineMail className="text-4xl text-primary" />
              <div>
                <p className="text-xs uppercase opacity-40 font-mono">
                  Email Us
                </p>
                <p className="font-bold">ewucsc@ewubd.edu</p>
              </div>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-base-100/60 flex items-center gap-6 hover:border-accent/20 transition-all">
              <HiOutlineLocationMarker className="text-4xl text-accent" />
              <div>
                <p className="text-xs uppercase opacity-40 font-mono">
                  Base Address
                </p>
                <p className="font-bold">Aftabnagar, Dhaka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Secure Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 rounded-[2.5rem] border border-white/10 bg-base-100/80 p-10 backdrop-blur-2xl shadow-2xl flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px]" />
          <h3 className="text-2xl font-bold mb-2">Secure Transmission</h3>
          <p className="text-sm text-base-content/50 mb-8 font-mono">
            Direct line for inquiries.
          </p>

          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <input
              name="user_name"
              type="text"
              placeholder="Full Name"
              required
              className="input input-bordered w-full h-14 bg-base-200/30 border-white/5 focus:border-primary"
            />
            <input
              name="user_email"
              type="email"
              placeholder="Email Address"
              required
              className="input input-bordered w-full h-14 bg-base-200/30 border-white/5 focus:border-primary"
            />
            <textarea
              name="message"
              placeholder="How can we collaborate?"
              required
              className="textarea textarea-bordered w-full bg-base-200/30 border-white/5 focus:border-primary min-h-[160px] resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-14 rounded-xl shadow-xl shadow-primary/20"
            >
              {loading ? "Transmitting..." : "Initialize Transmission"}
            </button>
          </form>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#"
              className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary hover:bg-secondary/10 transition-all"
            >
              <FaDiscord />
            </a>
            <a
              href="#"
              className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary hover:bg-secondary/10 transition-all"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary hover:bg-secondary/10 transition-all"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="btn btn-ghost btn-sm btn-circle text-xl hover:text-secondary hover:bg-secondary/10 transition-all"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>
      <Map></Map>
    </div>
  );
};

export default Contact;
