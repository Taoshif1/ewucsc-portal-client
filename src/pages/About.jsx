import PageHero from "../components/PageHero";

const About = () => {
  return (
    <div className="space-y-16">
      <PageHero
        badge="Who We Are"
        title="About"
        highlight="EWUCSC"
        description="EWU Cyber Security Club is a student-driven community dedicated to cybersecurity awareness, ethical hacking, practical learning, and technical growth."
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-8 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-black mb-4">Our Mission</h2>
          <p className="text-base-content/70 leading-relaxed">
            To build a strong cybersecurity culture inside East West University
            through hands-on learning, technical collaboration, ethical practice,
            and real-world exposure.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-8 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-black mb-4">Our Vision</h2>
          <p className="text-base-content/70 leading-relaxed">
            To empower the next generation of cybersecurity enthusiasts,
            practitioners, and leaders through community, competition, and
            continuous skill development.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;