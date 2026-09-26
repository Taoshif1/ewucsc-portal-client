import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBoxArchive,
  FaBullhorn,
  FaCalendarDays,
  FaFilePen,
  FaImage,
  FaNewspaper,
  FaPen,
  FaRotate,
  FaRotateLeft,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";
import { api } from "../../services/api";
import AssetDropzone from "./AssetDropzone";
import { resolveMediaUrl } from "../../utils/mediaUrl";

const EMPTY_DRAFT = {
  title: "",
  excerpt: "",
  body: "",
  imageUrls: [],
  eventDate: "",
  published: false,
};

const ContentManager = () => {
  const [type, setType] = useState("announcements");
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("active");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const resetForm = () => {
    setEditingId(null);
    setDraft(EMPTY_DRAFT);
  };

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
    resetForm();
    setStatusFilter("active");
    load();
  }, [type]);

  const visibleItems = useMemo(() => {
    if (statusFilter === "archived") return items.filter((item) => item.archived);
    if (statusFilter === "active") return items.filter((item) => !item.archived);
    return items;
  }, [items, statusFilter]);

  const save = async (event) => {
    event.preventDefault();

    try {
      setBusy(true);

      const payload = {
        ...draft,
        imageUrl: draft.imageUrls[0] || "",
      };

      if (editingId) {
        await api.patch("/content/" + type + "/admin/" + editingId, payload);
        toast.success(type === "blogs" ? "Blog updated." : "Announcement updated.");
      } else {
        await api.post("/content/" + type + "/admin", payload);
        toast.success(type === "blogs" ? "Blog created." : "Announcement created.");
      }

      resetForm();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save content.");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setDraft({
      title: item.title || "",
      excerpt: item.excerpt || "",
      body: item.body || "",
      imageUrls:
        item.imageUrls?.length > 0
          ? item.imageUrls
          : item.imageUrl
            ? [item.imageUrl]
            : [],
      eventDate: item.eventDate || "",
      published: Boolean(item.published),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const patchItem = async (item, patch, successMessage) => {
    try {
      setBusyId(item.id);
      await api.patch("/content/" + type + "/admin/" + item.id, patch);
      toast.success(successMessage);
      if (editingId === item.id) resetForm();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update content.");
    } finally {
      setBusyId(null);
    }
  };

  const togglePublished = (item) =>
    patchItem(
      item,
      { published: !item.published },
      item.published ? "Content unpublished." : "Content published.",
    );

  const toggleArchived = (item) =>
    patchItem(
      item,
      { archived: !item.archived },
      item.archived ? "Content restored." : "Content archived.",
    );

  const deleteItem = async (item) => {
    const noun = type === "blogs" ? "blog" : "announcement";
    if (!window.confirm(`Permanently delete this ${noun}? This cannot be undone.`)) return;

    try {
      setBusyId(item.id);
      await api.delete("/content/" + type + "/admin/" + item.id);
      toast.success(type === "blogs" ? "Blog deleted." : "Announcement deleted.");
      if (editingId === item.id) resetForm();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete content.");
    } finally {
      setBusyId(null);
    }
  };

  const formattedDate = (value) => {
    if (!value) return null;
    return new Date(value + "T00:00:00").toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="mt-8 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
            // publishing desk
          </p>
          <h2 className="mt-2 text-2xl font-black">Announcements & Blogs</h2>
          <p className="mt-2 max-w-3xl text-sm text-base-content/50">
            Publish current updates or historical event recaps, attach multiple images,
            edit existing content, archive it for later, or permanently delete it.
          </p>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
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
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-white/5 bg-base-200/35 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-primary">
              <FaFilePen />
              <h3 className="font-black">
                {editingId
                  ? type === "blogs" ? "Edit Blog" : "Edit Announcement"
                  : type === "blogs" ? "Create Blog" : "Create Announcement"}
              </h3>
            </div>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn btn-xs btn-ghost">
                <FaXmark /> Cancel
              </button>
            )}
          </div>

          <input
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            placeholder="Title"
            className="input input-bordered w-full bg-base-100"
            required
          />

          <textarea
            value={draft.excerpt}
            onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })}
            placeholder="Short summary / excerpt"
            className="textarea textarea-bordered min-h-24 w-full bg-base-100"
          />

          <textarea
            value={draft.body}
            onChange={(event) => setDraft({ ...draft, body: event.target.value })}
            placeholder={type === "blogs" ? "Full blog body" : "Announcement details"}
            className="textarea textarea-bordered min-h-44 w-full bg-base-100"
            required={type === "blogs"}
          />

          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-base-content/45">
              <FaImage /> Post images <span className="font-normal normal-case tracking-normal">(optional · first image is the cover)</span>
            </label>
            <AssetDropzone
              scope="content"
              accept="image/*"
              multiple
              maxFiles={10}
              label="Drop up to 10 post images here or click to upload"
              helper="JPG, PNG, WebP, GIF or AVIF · max 10 MB each"
              onUploaded={(asset) =>
                setDraft((current) => ({
                  ...current,
                  imageUrls: [...current.imageUrls, asset.url].slice(0, 10),
                }))
              }
            />
            {draft.imageUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {draft.imageUrls.map((imageUrl, index) => (
                  <div
                    key={imageUrl}
                    className="relative overflow-hidden rounded-xl border border-white/5 bg-base-300/30"
                  >
                    <img
                      src={resolveMediaUrl(imageUrl)}
                      alt={index === 0 ? "Post cover preview" : "Post image preview"}
                      className="h-32 w-full object-cover"
                    />
                    <div className="absolute left-2 top-2 rounded-full bg-black/65 px-2 py-1 text-[10px] font-bold text-white">
                      {index === 0 ? "Cover" : index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          imageUrls: current.imageUrls.filter((url) => url !== imageUrl),
                        }))
                      }
                      className="btn btn-xs btn-circle btn-error absolute right-2 top-2"
                      aria-label="Remove post image"
                    >
                      <FaXmark />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-base-content/45">
              <FaCalendarDays /> Event / historical date <span className="font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={draft.eventDate}
              onChange={(event) => setDraft({ ...draft, eventDate: event.target.value })}
              className="input input-bordered w-full bg-base-100"
            />
            <p className="mt-2 text-xs text-base-content/40">
              Use this for event recaps such as 21 January 2024. The real publication date is still stored separately.
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(event) => setDraft({ ...draft, published: event.target.checked })}
              className="toggle toggle-primary"
            />
            Publish immediately
          </label>

          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? "Saving..." : editingId ? "Update Content" : "Save Content"}
          </button>
        </form>

        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {["active", "archived", "all"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`btn btn-xs rounded-full capitalize ${statusFilter === filter ? "btn-neutral" : "btn-ghost"}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="py-16 text-center">
                <span className="loading loading-spinner text-primary" />
              </div>
            ) : visibleItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-base-content/50">
                No content in this view.
              </div>
            ) : (
              visibleItems.map((item) => (
                <article
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border p-5 ${
                    item.archived
                      ? "border-warning/15 bg-warning/5"
                      : "border-white/5 bg-base-200/35"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    {(item.imageUrls?.[0] || item.imageUrl) && (
                      <div className="relative shrink-0">
                        <img
                          src={resolveMediaUrl(item.imageUrls?.[0] || item.imageUrl)}
                          alt=""
                          className="h-24 w-full rounded-xl object-cover sm:w-32"
                        />
                        {(item.imageUrls?.length || 0) > 1 && (
                          <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                            +{item.imageUrls.length - 1}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black">{item.title}</h3>
                        {item.archived && <span className="badge badge-warning badge-outline badge-sm">Archived</span>}
                        <span className={`badge badge-sm badge-outline ${item.published ? "badge-success" : "badge-ghost"}`}>
                          {item.published ? "Published" : "Draft"}
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm text-base-content/55">
                        {item.excerpt || item.body || "No summary"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-base-content/35">
                        <span>/{type}/{item.slug}</span>
                        {item.eventDate && <span>Event: {formattedDate(item.eventDate)}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      disabled={busyId === item.id}
                      className="btn btn-xs btn-outline"
                    >
                      <FaPen /> Edit
                    </button>

                    {!item.archived && (
                      <button
                        type="button"
                        onClick={() => togglePublished(item)}
                        disabled={busyId === item.id}
                        className={`btn btn-xs ${item.published ? "btn-success btn-outline" : "btn-ghost border border-white/10"}`}
                      >
                        {item.published ? "Unpublish" : "Publish"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleArchived(item)}
                      disabled={busyId === item.id}
                      className="btn btn-xs btn-warning btn-outline"
                    >
                      {item.archived ? <><FaRotateLeft /> Restore</> : <><FaBoxArchive /> Archive</>}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteItem(item)}
                      disabled={busyId === item.id}
                      className="btn btn-xs btn-error btn-outline"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentManager;
