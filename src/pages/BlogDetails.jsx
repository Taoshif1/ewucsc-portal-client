import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaArrowLeft, FaCalendarDays } from "react-icons/fa6";
import { publicApi } from "../services/api";
import Spinner from "../components/common/Spinner";

const formatDate = (value) =>
  value
    ? new Date(value.includes("T") ? value : value + "T00:00:00").toLocaleDateString(
        undefined,
        { day: "numeric", month: "long", year: "numeric" },
      )
    : "";

const BlogDetails = () => {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    publicApi
      .get("/content/blogs/" + slug)
      .then((res) => {
        setItem(res.data.item);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, [slug]);

  if (state === "loading") {
    return <div className="flex min-h-[60vh] items-center justify-center"><Spinner /></div>;
  }

  if (state === "error" || !item) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-black">Blog not found</h1>
        <Link to="/blogs" className="btn btn-ghost mt-5"><FaArrowLeft /> Back to Blogs</Link>
      </div>
    );
  }

  const images =
    item.imageUrls?.length > 0
      ? item.imageUrls
      : item.imageUrl
        ? [item.imageUrl]
        : [];

  return (
    <article className="mx-auto max-w-4xl py-8 md:py-14">
      <Link to="/blogs" className="btn btn-sm btn-ghost mb-8">
        <FaArrowLeft /> Blogs
      </Link>

      {images.length > 0 && (
        <div className={`mb-8 grid gap-3 ${images.length > 1 ? "md:grid-cols-2" : ""}`}>
          {images.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="overflow-hidden rounded-[1.75rem] border border-white/5 shadow-2xl"
            >
              <img
                src={imageUrl}
                alt={index === 0 ? item.title : `${item.title} photo ${index + 1}`}
                className="max-h-[34rem] w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
        // EWUCSC knowledge hub
      </p>
      <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{item.title}</h1>

      {item.excerpt && (
        <p className="mt-6 text-lg leading-relaxed text-base-content/65">{item.excerpt}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-4 font-mono text-xs text-base-content/35">
        {item.eventDate && (
          <span className="flex items-center gap-2 text-primary/70">
            <FaCalendarDays /> Event date: {formatDate(item.eventDate)}
          </span>
        )}
        {item.publishedAt && <span>Published {formatDate(item.publishedAt)}</span>}
      </div>

      <div className="mt-10 whitespace-pre-wrap rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6 text-base leading-8 text-base-content/80 md:p-9">
        {item.body}
      </div>
    </article>
  );
};

export default BlogDetails;
