import PageHero from "../components/PageHero";

const resources = [
  "Club Guidelines",
  "Internal Wiki",
  "Security Toolkit",
  "Practice Labs",
  "Learning Materials",
  "Recommended Platforms",
];

const Resources = () => {
  return (
    <div className="space-y-16">
      <PageHero
        badge="Learning Assets"
        title="Club"
        highlight="Resources"
        description="Access useful learning materials, internal resources, club documents, and cybersecurity tools to accelerate your journey."
      />

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={resource}
            className="rounded-[1.5rem] border border-white/5 bg-base-100/70 p-6 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-lg font-bold mb-2">{resource}</h3>
            <p className="text-sm text-base-content/70">
              Add downloadable files, docs, or external learning links here.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resources;