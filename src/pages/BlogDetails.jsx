import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { publicApi } from "../services/api";
import Spinner from "../components/common/Spinner";

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

  return (
    <article className="mx-auto max-w-4xl py-8 md:py-14">
      <Link to="/blogs" className="btn btn-sm btn-ghost mb-8">
        <FaArrowLeft /> Blogs
      </Link>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
        // EWUCSC knowledge hub
      </p>
      <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{item.title}</h1>
      {item.excerpt && (
        <p className="mt-6 text-lg leading-relaxed text-base-content/65">{item.excerpt}</p>
      )}
      {item.publishedAt && (
        <p className="mt-5 font-mono text-xs text-base-content/35">
          Published {new Date(item.publishedAt).toLocaleDateString()}
        </p>
      )}
      <div className="mt-10 whitespace-pre-wrap rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6 text-base leading-8 text-base-content/80 md:p-9">
        {item.body}
      </div>
    </article>
  );
};

export default BlogDetails;
