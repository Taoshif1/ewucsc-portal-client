import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaArrowRight, FaNewspaper } from "react-icons/fa6";
import PageHero from "../components/PageHero";
import { publicApi } from "../services/api";

const Blogs = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .get("/content/blogs")
      .then((res) => setItems(res.data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 pb-16">
      <PageHero
        badge="Knowledge Hub"
        title="Latest"
        highlight="Blogs"
        description="Cybersecurity insights, learning notes, event recaps and student-driven technical writing."
      />

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-60 animate-pulse rounded-[1.5rem] bg-base-200/50" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/10 p-12 text-center">
          <FaNewspaper className="mx-auto text-3xl text-base-content/30" />
          <h2 className="mt-4 text-xl font-black">No published blogs yet</h2>
          <p className="mt-2 text-sm text-base-content/50">
            Technical writeups will appear here after approval and publication.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group rounded-[1.75rem] border border-white/5 bg-base-100/70 p-6 backdrop-blur-xl shadow-2xl"
            >
              <span className="badge badge-secondary badge-outline mb-4">Blog</span>
              <h2 className="text-xl font-black group-hover:text-secondary">
                {item.title}
              </h2>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-base-content/65">
                {item.excerpt || item.body}
              </p>
              <Link
                to={"/blogs/" + item.slug}
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-secondary"
              >
                Read article <FaArrowRight size={11} />
              </Link>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default Blogs;
