import PageHero from "../components/PageHero";

const Blogs = () => {
  return (
    <div className="space-y-16">
      <PageHero
        badge="Knowledge Hub"
        title="Latest"
        highlight="Blogs"
        description="Explore write-ups, cybersecurity insights, beginner guides, event recaps, and student-driven technical articles."
      />

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-6 backdrop-blur-xl shadow-2xl"
          >
            <span className="badge badge-secondary badge-outline mb-4">
              Blog
            </span>
            <h3 className="text-xl font-bold mb-2">
              Beginner’s Cybersecurity Guide
            </h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              Future blog articles can be listed here with title, excerpt,
              publish date, and CTA to read more.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Blogs;