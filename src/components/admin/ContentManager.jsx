import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBullhorn,
  FaFilePen,
  FaNewspaper,
  FaRotate,
} from "react-icons/fa6";
import { api } from "../../services/api";

const ContentManager = () => {
  const [type, setType] = useState("announcements");
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState({
    title: "",
    excerpt: "",
    body: "",
    published: false,
  });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/content/" + type + "/admin/all");
      setItems(res.data.items || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [type]);

  const create = async (event) => {
    event.preventDefault();

    try {
      setBusy(true);
      await api.post("/content/" + type + "/admin", draft);
      toast.success(type === "blogs" ? "Blog created." : "Announcement created.");
      setDraft({ title: "", excerpt: "", body: "", published: false });
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create content.");
    } finally {
      setBusy(false);
    }
  };

  const togglePublished = async (item) => {
    try {
      await api.patch("/content/" + type + "/admin/" + item.id, {
        published: !item.published,
      });
      toast.success(item.published ? "Content unpublished." : "Content published.");
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update content.");
    }
  };

  return (
    <section className="mt-8 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
            // publishing desk
          </p>
          <h2 className="mt-2 text-2xl font-black">Announcements & Blogs</h2>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => setType("announcements")}
          className={"btn btn-sm rounded-full " + (type === "announcements" ? "btn-primary" : "btn-ghost")}
        >
          <FaBullhorn /> Announcements
        </button>
        <button
          type="button"
          onClick={() => setType("blogs")}
          className={"btn btn-sm rounded-full " + (type === "blogs" ? "btn-secondary" : "btn-ghost")}
        >
          <FaNewspaper /> Blogs
        </button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={create} className="rounded-2xl border border-white/5 bg-base-200/35 p-5 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <FaFilePen />
            <h3 className="font-black">
              {type === "blogs" ? "Create Blog" : "Create Announcement"}
            </h3>
          </div>

          <input
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            placeholder="Title"
            className="input input-bordered w-full bg-base-100/60"
            required
          />

          <textarea
            value={draft.excerpt}
            onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })}
            placeholder="Short summary / excerpt"
            className="textarea textarea-bordered min-h-24 w-full bg-base-100/60"
          />

          <textarea
            value={draft.body}
            onChange={(event) => setDraft({ ...draft, body: event.target.value })}
            placeholder={type === "blogs" ? "Full blog body" : "Announcement details"}
            className="textarea textarea-bordered min-h-44 w-full bg-base-100/60"
            required={type === "blogs"}
          />

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(event) =>
                setDraft({ ...draft, published: event.target.checked })
              }
              className="toggle toggle-primary"
            />
            Publish immediately
          </label>

          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? "Publishing..." : "Save Content"}
          </button>
        </form>

        <div className="space-y-3">
          {loading ? (
            <div className="py-16 text-center">
              <span className="loading loading-spinner text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-base-content/50">
              No content created yet.
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/5 bg-base-200/35 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-base-content/55">
                      {item.excerpt || item.body || "No summary"}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/35">
                      /{type}/{item.slug}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePublished(item)}
                    className={
                      "btn btn-sm " +
                      (item.published
                        ? "btn-success btn-outline"
                        : "btn-ghost border border-white/10")
                    }
                  >
                    {item.published ? "Published" : "Draft"}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentManager;
