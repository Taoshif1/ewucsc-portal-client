import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare, FaGift } from "react-icons/fa6";
import PageHero from "../components/PageHero";
import VpResourceIcon from "../components/vp/VpResourceIcon";
import { publicApi } from "../services/api";

const VPResources = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .get("/vp-resources")
      .then((res) => setItems(res.data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        badge="VP Technical References"
        title="A Gift from"
        highlight="the VP ✦"
        description="A curated, Admin-managed collection of technical references contributed by the Vice President (Technical) for EWUCSC learning."
      />

      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3 text-primary">
          <FaGift />
          <p className="font-mono text-xs uppercase tracking-[0.22em]">
            // open collection
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-base-content/45">
            No VP technical references are published right now.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.resourceUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[1.5rem] border border-white/5 bg-base-100/70 p-6 transition hover:-translate-y-1 hover:border-primary/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                    <VpResourceIcon icon={item.icon} />
                  </div>
                  <span className="badge badge-outline text-[10px] uppercase tracking-[0.12em]">
                    {item.category}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-black group-hover:text-primary">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-base-content/55">{item.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  Open reference <FaArrowUpRightFromSquare />
                </span>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default VPResources;
