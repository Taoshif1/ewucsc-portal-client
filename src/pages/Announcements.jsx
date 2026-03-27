import PageHero from "../components/PageHero";

const Announcements = () => {
  return (
    <div className="space-y-16">
      <PageHero
        badge="Club Updates"
        title="Latest"
        highlight="Announcements & Posts"
        description="Stay updated with the latest EWUCSC notices, event announcements, important updates, and community highlights."
      />

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-6 backdrop-blur-xl shadow-2xl"
          >
            <span className="badge badge-primary badge-outline mb-4">
              Announcement
            </span>
            <h3 className="text-xl font-bold mb-2">Upcoming Club Update</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              This section will display official EWUCSC announcements, notices,
              and social updates.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Announcements;