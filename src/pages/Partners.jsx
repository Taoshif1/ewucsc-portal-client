import { Link } from "react-router";
import { FaEnvelope, FaHandshake, FaPeopleGroup, FaShieldHalved } from "react-icons/fa6";
import PageHero from "../components/PageHero";

const partnershipTracks = [
  {
    icon: <FaHandshake />,
    title: "Event Sponsorship",
    description: "Support CTFs, workshops, seminars and student cybersecurity activities.",
  },
  {
    icon: <FaPeopleGroup />,
    title: "Community Collaboration",
    description: "Co-host sessions, knowledge exchanges, mentorship and technical events.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Technical Partnership",
    description: "Collaborate on security learning, research exposure and competition preparation.",
  },
];

const Partners = () => {
  return (
    <div className="space-y-16 pb-16">
      <PageHero
        badge="Trust & Collaboration"
        title="Sponsors &"
        highlight="Club Partners"
        description="EWUCSC welcomes organizations, communities, alumni and cybersecurity professionals interested in supporting student growth."
      />

      <section className="grid gap-6 md:grid-cols-3">
        {partnershipTracks.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-7 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
              {item.icon}
            </div>
            <h2 className="mt-5 text-xl font-black">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-base-content/60">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-secondary/15 bg-base-100/70 p-8 text-center md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.14),transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <FaEnvelope className="mx-auto text-3xl text-secondary" />
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-secondary">
            // partnership inquiry
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Want to work with EWUCSC?
          </h2>
          <p className="mt-4 text-base-content/65">
            Send a collaboration or sponsorship inquiry to{" "}
            <a href="mailto:ewucsc@ewubd.edu" className="font-bold text-secondary">
              ewucsc@ewubd.edu
            </a>
            . We’ll route it to the appropriate executive team.
          </p>
          <Link to="/contact" className="btn btn-secondary mt-7 rounded-full px-8">
            Contact the Club
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Partners;
