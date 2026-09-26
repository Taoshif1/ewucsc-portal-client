import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBoxArchive,
  FaImages,
  FaPen,
  FaRotate,
  FaRotateLeft,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";
import { api } from "../services/api";
import AssetDropzone from "../components/admin/AssetDropzone";

const EMPTY = {
  title: "",
  caption: "",
  imageUrl: "",
  assetId: "",
  eventDate: "",
  published: true,
};

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [view, setView] = useState("active");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery/admin/all");
      setItems(res.data.items || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => {
    if (view === "archived") return items.filter((item) => item.archived);
    if (view === "active") return items.filter((item) => !item.archived);
    return items;
  }, [items, view]);

  const reset = () => {
    setDraft(EMPTY);
    setEditingId(null);
  };

  const save = async (event) => {
    event.preventDefault();

    if (!draft.imageUrl) {
      toast.error("Upload an image first.");
      return;
    }

    try {
      setBusy(true);
      if (editingId) {
        await api.patch("/gallery/admin/" + editingId, draft);
        toast.success("Gallery item updated.");
      } else {
        await api.post("/gallery/admin", draft);
        toast.success("Gallery image added.");
      }
      reset();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save gallery item.");
    } finally {
      setBusy(false);
    }
  };

  const edit = (item) => {
    setEditingId(item.id);
    setDraft({
      title: item.title || "",
      caption: item.caption || "",
      imageUrl: item.imageUrl || "",
      assetId: item.assetId || "",
      eventDate: item.eventDate || "",
      published: Boolean(item.published),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const patch = async (item, data, message) => {
    try {
      setBusyId(item.id);
      await api.patch("/gallery/admin/" + item.id, data);
      toast.success(message);
      if (editingId === item.id) reset();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update gallery.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item) => {
    if (!window.confirm("Permanently delete this gallery item?")) return;

    try {
      setBusyId(item.id);
      await api.delete("/gallery/admin/" + item.id);
      if (item.assetId) {
        await api.delete("/uploads/admin/" + item.assetId).catch(() => {});
      }
      toast.success("Gallery item deleted.");
      if (editingId === item.id) reset();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete gallery item.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">
            // media library
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl">
            <FaImages /> Gallery Admin
          </h1>
          <p className="mt-3 text-base-content/55">
            Drag in club photos, add an optional event date, then publish them to the public Gallery.
          </p>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="mt-7 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <form onSubmit={save} className="space-y-4 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-black">{editingId ? "Edit photo" : "Add photo"}</h2>
            {editingId && (
              <button type="button" onClick={reset} className="btn btn-xs btn-ghost">
                <FaXmark /> Cancel
              </button>
            )}
          </div>

          <AssetDropzone
            scope="gallery"
            accept="image/*"
            label="Drop a gallery photo here or click to upload"
            helper="Images only · maximum 10 MB"
            onUploaded={(asset) =>
              setDraft((current) => ({
                ...current,
                imageUrl: asset.url,
                assetId: asset.id,
              }))
            }
          />

          {draft.imageUrl && (
            <img
              src={draft.imageUrl}
              alt="Gallery preview"
              className="max-h-72 w-full rounded-2xl object-cover"
            />
          )}

          <input
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            placeholder="Photo / event title (optional)"
            className="input input-bordered w-full bg-base-100"
          />

          <textarea
            value={draft.caption}
            onChange={(event) => setDraft({ ...draft, caption: event.target.value })}
            placeholder="Caption (optional)"
            className="textarea textarea-bordered min-h-24 w-full bg-base-100"
          />

          <label className="form-control">
            <span className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-base-content/45">
              Event date (optional)
            </span>
            <input
              type="date"
              value={draft.eventDate}
              onChange={(event) => setDraft({ ...draft, eventDate: event.target.value })}
              className="input input-bordered w-full bg-base-100"
            />
          </label>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(event) => setDraft({ ...draft, published: event.target.checked })}
              className="toggle toggle-secondary"
            />
            Publish on Gallery
          </label>

          <button type="submit" disabled={busy} className="btn btn-secondary w-full">
            {busy ? "Saving..." : editingId ? "Update Photo" : "Add to Gallery"}
          </button>
        </form>

        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {["active", "archived", "all"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={`btn btn-xs rounded-full capitalize ${view === item ? "btn-neutral" : "btn-ghost"}`}
              >
                {item}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <span className="loading loading-spinner text-secondary" />
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-base-content/50">
              No gallery items in this view.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {visible.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-white/5 bg-base-100/65"
                >
                  <img src={item.imageUrl} alt="" className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className={`badge badge-sm badge-outline ${item.published ? "badge-success" : ""}`}>
                        {item.published ? "Published" : "Draft"}
                      </span>
                      {item.archived && <span className="badge badge-sm badge-warning badge-outline">Archived</span>}
                    </div>
                    <h3 className="mt-3 font-black">{item.title || "Untitled photo"}</h3>
                    {item.caption && <p className="mt-2 line-clamp-2 text-sm text-base-content/50">{item.caption}</p>}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button type="button" onClick={() => edit(item)} className="btn btn-xs btn-outline">
                        <FaPen /> Edit
                      </button>
                      {!item.archived && (
                        <button
                          type="button"
                          disabled={busyId === item.id}
                          onClick={() => patch(item, { published: !item.published }, item.published ? "Photo hidden." : "Photo published.")}
                          className="btn btn-xs btn-success btn-outline"
                        >
                          {item.published ? "Hide" : "Publish"}
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => patch(item, { archived: !item.archived }, item.archived ? "Photo restored." : "Photo archived.")}
                        className="btn btn-xs btn-warning btn-outline"
                      >
                        {item.archived ? <><FaRotateLeft /> Restore</> : <><FaBoxArchive /> Archive</>}
                      </button>
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => remove(item)}
                        className="btn btn-xs btn-error btn-outline"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryAdmin;
