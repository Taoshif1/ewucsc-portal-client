import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FaArrowLeft,
  FaCalendarDays,
  FaCheck,
  FaClock,
  FaLink,
  FaListUl,
  FaShareNodes,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa6";
import { publicApi } from "../services/api";
import Spinner from "../components/common/Spinner";
import MarkdownContent from "../components/blog/MarkdownContent";
import { parseMarkdown } from "../utils/parseBlogMarkdown";
import { resolveMediaUrl } from "../utils/mediaUrl";

const readSavedFeedback = (slug) => {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem("ewucsc:blog-feedback:" + slug);
  } catch {
    return null;
  }
};

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
  const [feedbackBySlug, setFeedbackBySlug] = useState({});
  const [feedbackMessageBySlug, setFeedbackMessageBySlug] = useState({});
  const [shareMessageBySlug, setShareMessageBySlug] = useState("");
  const feedback = Object.hasOwn(feedbackBySlug, slug)
    ? feedbackBySlug[slug]
    : readSavedFeedback(slug);
  const feedbackMessage = feedbackMessageBySlug[slug] || "";
  const shareMessage = shareMessageBySlug;
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    let active = true;
    publicApi
      .get("/content/blogs/" + slug)
      .then((res) => {
        if (!active) return;
        setItem(res.data.item);
        setState("ready");
      })
      .catch(() => {
        if (active) setState("error");
      });

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    const updateProgress = () => {
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [state, item?.body]);

  const blocks = useMemo(() => parseMarkdown(item?.body || ""), [item?.body]);
  const tocItems = useMemo(
    () => blocks.filter((block) => block.type === "heading" && block.level >= 2 && block.level <= 3),
    [blocks],
  );

  const readingMinutes = useMemo(() => {
    const words = `${item?.title || ""} ${item?.excerpt || ""} ${item?.body || ""}`
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [item?.body, item?.excerpt, item?.title]);

  const images =
    item?.imageUrls?.length > 0
      ? item.imageUrls
      : item?.imageUrl
        ? [item.imageUrl]
        : [];

  const handleFeedback = (vote) => {
    try {
      window.localStorage.setItem("ewucsc:blog-feedback:" + slug, vote);
    } catch {
      // Keep the choice in the current page session when storage is unavailable.
    }

    setFeedbackBySlug((current) => ({ ...current, [slug]: vote }));
    setFeedbackMessageBySlug((current) => ({
      ...current,
      [slug]:
        vote === "yes"
          ? "Thanks! Your feedback is saved on this device."
          : "Thanks for letting us know. Your feedback is saved on this device.",
    }));
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: item.title,
          text: item.excerpt || "Read this article from EWUCSC.",
          url,
        });
        setShareMessageBySlug("Article shared.");
        return;
      }

      await navigator.clipboard.writeText(url);
      setShareMessageBySlug("Article link copied.");
    } catch (error) {
      if (error?.name !== "AbortError") {
        setShareMessageBySlug("Could not share automatically. Copy the page URL from your browser.");
      }
    }
  };

  if (state === "loading" || (state === "ready" && item?.slug !== slug)) {
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
    <article className="relative mx-auto max-w-7xl py-8 md:py-12">
      <div
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-primary via-secondary to-accent transition-[width] duration-150"
        style={{ width: readingProgress + "%" }}
        aria-hidden="true"
      />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link to="/blogs" className="btn btn-sm btn-ghost -ml-2">
          <FaArrowLeft /> All blogs
        </Link>
        <button type="button" onClick={handleShare} className="btn btn-sm btn-outline border-white/10">
          <FaShareNodes /> Share article
        </button>
      </div>

      <header className="mx-auto max-w-5xl">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="badge badge-secondary badge-outline">EWUCSC knowledge hub</span>
          <span className="text-xs text-base-content/35">Long-form article</span>
        </div>

        <h1 className="max-w-5xl text-4xl font-black leading-[1.12] tracking-tight text-base-content sm:text-5xl lg:text-6xl">
          {item.title}
        </h1>

        {item.excerpt && (
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-base-content/65 md:text-xl">
            {item.excerpt}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/10 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-base-content/45">
          {item.publishedAt && (
            <span className="flex items-center gap-2">
              <FaCalendarDays className="text-primary" />
              Published {formatDate(item.publishedAt)}
            </span>
          )}
          {item.eventDate && (
            <span className="flex items-center gap-2">
              <FaCalendarDays className="text-secondary" />
              Event date {formatDate(item.eventDate)}
            </span>
          )}
          <span className="flex items-center gap-2">
            <FaClock className="text-accent" />
            {readingMinutes} min read
          </span>
        </div>
      </header>

      {images.length > 0 && (
        <div className="mx-auto mt-9 max-w-6xl">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-base-200/40 shadow-2xl shadow-black/20">
            <img
              src={resolveMediaUrl(images[0])}
              alt={item.title}
              className="max-h-[38rem] w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.slice(1).map((imageUrl, index) => (
                <div key={imageUrl} className="overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={resolveMediaUrl(imageUrl)}
                    alt={`${item.title} image ${index + 2}`}
                    loading="lazy"
                    className="h-36 w-full object-cover sm:h-44"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tocItems.length > 0 && (
        <details className="mx-auto mt-8 max-w-5xl rounded-2xl border border-white/10 bg-base-100/60 p-4 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-3 font-bold">
            <FaListUl className="text-primary" />
            In this article
            <span className="ml-auto text-xs font-normal text-base-content/40">{tocItems.length} sections</span>
          </summary>
          <nav className="mt-4 space-y-2 border-t border-white/10 pt-4">
            {tocItems.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`block text-sm text-base-content/65 transition hover:text-primary ${heading.level === 3 ? "pl-4" : "font-semibold"}`}
              >
                {heading.text.replace(/\*\*/g, "")}
              </a>
            ))}
          </nav>
        </details>
      )}

      <div className="mx-auto mt-9 grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10">
        <div className="min-w-0 rounded-[1.75rem] border border-white/10 bg-base-100/65 p-6 shadow-xl shadow-black/10 md:p-10">
          <div className="mb-8 flex items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                // the article
              </p>
              <p className="mt-1 text-xs text-base-content/40">
                Take your time. Explore the sections and references below.
              </p>
            </div>
            <span className="hidden rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-base-content/40 sm:inline-flex">
              EWUCSC • READ
            </span>
          </div>

          <MarkdownContent content={item.body} />

          <section className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              Reader feedback
            </p>
            <h2 className="mt-2 text-xl font-black text-base-content md:text-2xl">
              Was this article useful?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-base-content/55">
              Your response helps you keep track of what you found useful on this device.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleFeedback("yes")}
                aria-pressed={feedback === "yes"}
                className={`btn btn-sm ${feedback === "yes" ? "btn-success" : "btn-outline border-success/40 text-success hover:btn-success"}`}
              >
                <FaThumbsUp /> Yes, useful
              </button>
              <button
                type="button"
                onClick={() => handleFeedback("no")}
                aria-pressed={feedback === "no"}
                className={`btn btn-sm ${feedback === "no" ? "btn-error" : "btn-outline border-error/40 text-error hover:btn-error"}`}
              >
                <FaThumbsDown /> Not really
              </button>
            </div>

            {feedbackMessage && (
              <p role="status" className="mt-4 flex items-center gap-2 text-xs text-success">
                <FaCheck /> {feedbackMessage}
              </p>
            )}
            {feedback && !feedbackMessage && (
              <p className="mt-4 text-xs text-base-content/40">
                You already responded on this device. You can change your answer above.
              </p>
            )}
            <p className="mt-3 text-[10px] text-base-content/35">
              Feedback is stored locally in this browser; it is not submitted to EWUCSC.
            </p>
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
            <Link to="/blogs" className="btn btn-sm btn-ghost">
              <FaArrowLeft /> Back to all blogs
            </Link>
            <button type="button" onClick={handleShare} className="btn btn-sm btn-ghost text-secondary">
              <FaLink /> Share this article
            </button>
          </div>
          {shareMessage && <p role="status" className="mt-2 text-right text-xs text-base-content/45">{shareMessage}</p>}
        </div>

        {tocItems.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-base-100/65 p-5">
              <div className="flex items-center gap-2 text-primary">
                <FaListUl />
                <h2 className="text-sm font-black">In this article</h2>
              </div>
              <p className="mt-2 text-xs text-base-content/40">
                Jump directly to a section.
              </p>
              <nav className="mt-5 space-y-3 border-l border-white/10 pl-3">
                {tocItems.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-xs leading-relaxed text-base-content/60 transition hover:text-primary ${heading.level === 3 ? "pl-3" : "font-bold"}`}
                  >
                    {heading.text.replace(/\*\*/g, "")}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/35">Reading progress</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-base-300">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width]" style={{ width: readingProgress + "%" }} />
                </div>
                <p className="mt-2 text-right font-mono text-[10px] text-base-content/40">{Math.round(readingProgress)}%</p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
};

export default BlogDetails;
