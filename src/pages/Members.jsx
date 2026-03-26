import { motion } from "framer-motion";
import { Link } from "react-router";

import currentThumbnail from "../assets/ewucscLogo.jpg";
import ep2425Thumbnail from "../assets/members/EP2425/thumbnail.jpg";
import ep2526Thumbnail from "../assets/members/EP2526/thumbnail.jpg";

const panelCards = [
  {
    id: 1,
    title: "Current Panel",
    subtitle: "Active Leadership Team",
    description:
      "Meet the current leadership and operational team driving EWUCSC’s cybersecurity vision, events, training, and community growth.",
    image: currentThumbnail,
    path: "/members/current",
    badge: "Live Panel",
  },
  {
    id: 2,
    title: "Executive Panel 24–25",
    subtitle: "Legacy Leadership Archive",
    description:
      "Explore the executive team that contributed to the club’s structure, growth, and cyber culture during the 2024–2025 session.",
    image: ep2425Thumbnail,
    path: "/members/executive-panel-24-25",
    badge: "Archive",
  },
  {
    id: 3,
    title: "Executive Panel 25–26",
    subtitle: "Legacy Leadership Archive",
    description:
      "Recognizing the executive leadership team of the 2025–2026 session for their role in engagement, technical direction, and community impact.",
    image: ep2526Thumbnail,
    path: "/members/executive-panel-25-26",
    badge: "Archive",
  },
];

const Members = () => {
  return (
    <div className="space-y-20 md:space-y-28">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-base-100/60 px-6 py-16 md:px-10 md:py-24 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.16),transparent_30%)]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            EWUCSC Leadership Archive
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-6xl font-black leading-tight"
          >
            Explore Our{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Members & Panels
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base md:text-lg text-base-content/70 leading-relaxed"
          >
            Discover the current and previous leadership teams that shaped
            EWUCSC through strategy, operations, technical growth, and
            community-driven cybersecurity initiatives.
          </motion.p>
        </div>
      </section>

      {/* Panel Cards */}
      <section className="grid gap-8 lg:grid-cols-3">
        {panelCards.map((panel, index) => (
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.015 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group cyber-shimmer relative overflow-hidden rounded-[1.75rem] border border-white/5 bg-base-100/70 backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_25%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 p-5 space-y-5">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4">
                  <span className="badge badge-accent badge-outline bg-base-100/70 backdrop-blur-md">
                    {panel.badge}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">
                  {panel.subtitle}
                </p>

                <h2 className="text-2xl font-black text-base-content">
                  {panel.title}
                </h2>

                <p className="text-sm md:text-base leading-relaxed text-base-content/70">
                  {panel.description}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to={panel.path}
                  className="btn btn-primary rounded-full px-8"
                >
                  View Panel
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Members;