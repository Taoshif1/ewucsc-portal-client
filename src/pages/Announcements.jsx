import { useEffect, useState } from "react";
import { FaBullhorn, FaCalendarDays } from "react-icons/fa6";
import PageHero from "../components/PageHero";
import { publicApi } from "../services/api";

const formatDate = (value) =>
  value
    ? new Date(value.includes("T") ? value : value + "T00:00:00").toLocaleDateString(
        undefined,
        { day: "numeric", month: "long", year: "numeric" },
      )
    : "";

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
            <div key={item} className="h-72 animate-pulse rounded-[1.5rem] bg-base-200/50" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/10 p-12 text-center">
          <FaBullhorn className="mx-auto text-3xl text-base-content/30" />
          <h2 className="mt-4 text-xl font-black">No published announcements yet</h2>
          <p className="mt-2 text-sm text-base-content/50">
            New official notices will appear here when published from the EWUCSC Admin portal.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const images =
              item.imageUrls?.length > 0
                ? item.imageUrls
                : item.imageUrl
                  ? [item.imageUrl]
                  : [];

            return (
            <article
              key={item.id}
              className="overflow-hidden rounded-[1.75rem] border border-white/5 bg-base-100/70 backdrop-blur-xl shadow-2xl"
            >
              {images.length > 0 && (
                <div className={images.length > 1 ? "grid grid-cols-2 gap-1" : ""}>
                  {images.slice(0, 4).map((imageUrl, index) => (
                    <div key={imageUrl} className="relative overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className={`w-full object-cover ${
                          images.length === 1 ? "h-48" : "h-36"
                        }`}
                      />
                      {index === 3 && images.length > 4 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-xl font-black text-white">
                          +{images.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="p-6">
                <span className="badge badge-primary badge-outline mb-4">Announcement</span>
                <h2 className="text-xl font-black">{item.title}</h2>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-base-content/65">
                  {item.excerpt || item.body}
                </p>

                <div className="mt-5 space-y-2 font-mono text-[10px] uppercase tracking-[0.15em] text-base-content/35">
                  {item.eventDate && (
                    <p className="flex items-center gap-2 text-primary/70">
                      <FaCalendarDays />
                      Event date: {formatDate(item.eventDate)}
                    </p>
                  )}
                  {item.publishedAt && (
                    <p>Published {formatDate(item.publishedAt)}</p>
                  )}
                </div>
              </div>
            </article>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Announcements;
