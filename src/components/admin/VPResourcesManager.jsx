import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBoxArchive,
  FaGift,
  FaPen,
  FaRotate,
  FaRotateLeft,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";
import { api } from "../../services/api";
import VpResourceIcon from "../vp/VpResourceIcon";

const EMPTY = {
  title: "",
  description: "",
  category: "Reference",
  resourceUrl: "",
  icon: "book",
  sortOrder: 0,
  published: true,
};

const VPResourcesManager = () => {
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
      const res = await api.get("/vp-resources/admin/all");
      setItems(res.data.items || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load VP resources.");
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

    try {
      setBusy(true);

      if (editingId) {
        await api.patch("/vp-resources/admin/" + editingId, draft);
        toast.success("VP resource updated.");
      } else {
        await api.post("/vp-resources/admin", draft);
        toast.success("VP resource added to the collection.");
      }

      reset();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save VP resource.");
    } finally {
      setBusy(false);
    }
  };

  const edit = (item) => {
    setEditingId(item.id);
    setDraft({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "Reference",
      resourceUrl: item.resourceUrl || "",
      icon: item.icon || "book",
      sortOrder: item.sortOrder ?? 0,
      published: Boolean(item.published),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const patch = async (item, values, message) => {
    try {
      setBusyId(item.id);
      await api.patch("/vp-resources/admin/" + item.id, values);
      toast.success(message);
      if (editingId === item.id) reset();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update VP resource.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item) => {
    if (!window.confirm("Permanently delete this VP technical reference?")) return;

    try {
      setBusyId(item.id);
      await api.delete("/vp-resources/admin/" + item.id);
      toast.success("VP resource deleted.");
      if (editingId === item.id) reset();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete VP resource.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="mt-8 rounded-[1.5rem] border border-primary/10 bg-base-100/65 p-5 md:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            // VP technical references
          </p>
          <h2 className="mt-2 flex items-center gap-2 text-2xl font-black">
            <FaGift /> A Gift from the VP ✦
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-base-content/50">
            Admin-controlled technical references shown in the Learning page and the public Open Collection.
          </p>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-white/5 bg-base-200/25 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black">{editingId ? "Edit Technical Reference" : "Add Technical Reference"}</h3>
            {editingId && (
              <button type="button" onClick={reset} className="btn btn-xs btn-ghost">
                <FaXmark /> Cancel
              </button>
            )}
          </div>

          <input
            required
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="Resource title"
            className="input input-bordered w-full bg-base-100"
          />

          <textarea
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="Short description"
            className="textarea textarea-bordered min-h-24 w-full bg-base-100"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              placeholder="Category"
              className="input input-bordered bg-base-100"
            />
            <select
              value={draft.icon}
              onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
              className="select select-bordered bg-base-100"
            >
              <option value="book">Book / Reference</option>
              <option value="globe">Web / Globe</option>
              <option value="linux">Linux</option>
              <option value="code">Code / Reversing</option>
              <option value="toolbox">Toolkit</option>
              <option value="terminal">Terminal</option>
              <option value="shield">Security / Shield</option>
            </select>
          </div>

          <input
            required
            value={draft.resourceUrl}
            onChange={(e) => setDraft({ ...draft, resourceUrl: e.target.value })}
            placeholder="https://... or /internal/path"
            className="input input-bordered w-full bg-base-100"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="form-control">
              <span className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-base-content/40">
                Display order
              </span>
              <input
                type="number"
                value={draft.sortOrder}
                onChange={(e) => setDraft({ ...draft, sortOrder: e.target.value })}
                className="input input-bordered bg-base-100"
              />
            </label>

            <label className="flex items-end gap-3 pb-3 text-sm">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                className="toggle toggle-primary"
              />
              Publish immediately
            </label>
          </div>

          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? "Saving..." : editingId ? "Update Reference" : "Add to Open Collection"}
          </button>
        </form>

        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {["active", "archived", "all"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={"btn btn-xs rounded-full capitalize " + (view === item ? "btn-neutral" : "btn-ghost")}
              >
                {item}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-14 text-center">
              <span className="loading loading-spinner text-primary" />
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-base-content/45">
              No VP technical references in this view.
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/5 bg-base-200/25 p-4">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <VpResourceIcon icon={item.icon} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black">{item.title}</h3>
                        <span className="badge badge-sm badge-outline">{item.category}</span>
                        {item.archived && <span className="badge badge-sm badge-warning badge-outline">Archived</span>}
                        <span className={"badge badge-sm badge-outline " + (item.published ? "badge-success" : "")}>
                          {item.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-base-content/50">{item.description}</p>
                      <p className="mt-2 truncate font-mono text-[10px] text-primary/60">{item.resourceUrl}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                    <button type="button" onClick={() => edit(item)} className="btn btn-xs btn-outline">
                      <FaPen /> Edit
                    </button>
                    {!item.archived && (
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => patch(item, { published: !item.published }, item.published ? "Resource hidden." : "Resource published.")}
                        className="btn btn-xs btn-success btn-outline"
                      >
                        {item.published ? "Hide" : "Publish"}
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => patch(item, { archived: !item.archived }, item.archived ? "Resource restored." : "Resource archived.")}
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
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VPResourcesManager;
