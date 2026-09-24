import { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa6";
import PageHero from "../components/PageHero";
import { publicApi } from "../services/api";

const Announcements = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .get("/content/announcements")
      .then((res) => setItems(res.data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 pb-16">
      <PageHero
        badge="Club Updates"
        title="Latest"
        highlight="Announcements"
        description="Official EWUCSC notices, event updates and community information."
      />

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-52 animate-pulse rounded-[1.5rem] bg-base-200/50" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/10 p-12 text-center">
          <FaBullhorn className="mx-auto text-3xl text-base-content/30" />
          <h2 className="mt-4 text-xl font-black">No published announcements yet</h2>
          <p className="mt-2 text-sm text-base-content/50">
            New official notices will appear here when published from Studio Admin.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-6 backdrop-blur-xl shadow-2xl"
            >
              <span className="badge badge-primary badge-outline mb-4">Announcement</span>
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-base-content/65">
                {item.excerpt || item.body}
              </p>
              {item.publishedAt && (
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-base-content/35">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </p>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default Announcements;
