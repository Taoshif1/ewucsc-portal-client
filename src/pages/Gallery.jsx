import { useEffect, useState } from "react";
import { FaCalendarDays, FaImages } from "react-icons/fa6";
import PageHero from "../components/PageHero";
import { publicApi } from "../services/api";

const formatDate = (value) =>
  value
    ? new Date(value + "T00:00:00").toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .get("/gallery")
      .then((res) => setItems(res.data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-14 pb-20">
      <PageHero
        badge="EWUCSC Moments"
        title="Club"
        highlight="Gallery"
        description="Workshops, competitions, club activities and memorable moments from the EWUCSC community."
      />

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-72 animate-pulse rounded-[1.5rem] bg-base-200/50" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/10 p-12 text-center">
          <FaImages className="mx-auto text-4xl text-base-content/25" />
          <h2 className="mt-4 text-xl font-black">Gallery is being curated</h2>
          <p className="mt-2 text-sm text-base-content/50">
            Published club photos will appear here after they are added from Gallery Admin.
          </p>
        </div>
      ) : (
        <section className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] border border-white/5 bg-base-100/70 shadow-2xl"
            >
              <div className="overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title || item.caption || "EWUCSC gallery"}
                  loading="lazy"
                  className="w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              {(item.title || item.caption || item.eventDate) && (
                <div className="p-5">
                  {item.title && <h2 className="text-lg font-black">{item.title}</h2>}
                  {item.caption && (
                    <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                      {item.caption}
                    </p>
                  )}
                  {item.eventDate && (
                    <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-primary/70">
                      <FaCalendarDays /> {formatDate(item.eventDate)}
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default Gallery;
