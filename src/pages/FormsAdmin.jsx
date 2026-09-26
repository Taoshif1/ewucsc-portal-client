import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCopy,
  FaDownload,
  FaEye,
  FaFileCsv,
  FaPen,
  FaPlus,
  FaRotate,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";
import { api } from "../services/api";

const DEFAULT_SECTIONS = {
  personal: true,
  activities: true,
  specialization: true,
  experience: true,
  clubHistory: true,
  onlinePresence: true,
  tellUsMore: true,
};

const DEFAULT_ACTIVITIES = [
  "Ethical Hacking",
  "Capture The Flag",
  "Web Development",
  "Graphics Designer",
  "Management",
  "Art and Craft",
  "Content Writing",
  "Research Wing",
  "Other",
];

const DEFAULT_SPECIALIZATIONS = [
  "Video Editing",
  "Anchoring",
  "Graphics Design",
  "Photography",
  "Content Writing",
  "Management",
  "Cultural",
  "Other",
];

const EMPTY = {
  formKey: "",
  type: "recruitment",
  title: "",
  badge: "Member Recruitment",
  intro:
    "Explore cybersecurity, build real-world skills, participate in CTFs, collaborate with passionate students and become part of the EWU Cyber Security Club.",
  status: "draft",
  openAt: "",
  closeAt: "",
  sections: DEFAULT_SECTIONS,
  activityOptionsText: DEFAULT_ACTIVITIES.join("\n"),
  specializationOptionsText: DEFAULT_SPECIALIZATIONS.join("\n"),
};

const toInputDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const linesToOptions = (value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const FormsAdmin = () => {
  const [forms, setForms] = useState([]);
  const [draft, setDraft] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyKey, setBusyKey] = useState(null);
  const [responses, setResponses] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/forms/admin/definitions");
      setForms(res.data.forms || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load forms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setDraft(EMPTY);
    setEditingId(null);
  };

  const edit = (form) => {
    setEditingId(form.id);
    setDraft({
      ...EMPTY,
      ...form,
      openAt: toInputDate(form.openAt),
      closeAt: toInputDate(form.closeAt),
      sections: { ...DEFAULT_SECTIONS, ...(form.sections || {}) },
      activityOptionsText: (form.activityOptions || DEFAULT_ACTIVITIES).join("\n"),
      specializationOptionsText: (form.specializationOptions || DEFAULT_SPECIALIZATIONS).join("\n"),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      const payload = {
        ...draft,
        activityOptions: linesToOptions(draft.activityOptionsText),
        specializationOptions: linesToOptions(draft.specializationOptionsText),
        openAt: draft.openAt ? new Date(draft.openAt).toISOString() : null,
        closeAt: draft.closeAt ? new Date(draft.closeAt).toISOString() : null,
      };

      if (editingId) {
        await api.patch("/forms/admin/definitions/" + editingId, payload);
        toast.success("Recruitment form updated.");
      } else {
        await api.post("/forms/admin/definitions", payload);
        toast.success("Recruitment form created.");
      }

      reset();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save recruitment form.");
    } finally {
      setSaving(false);
    }
  };

  const patchStatus = async (form, status) => {
    try {
      setBusyKey(form.formKey);
      await api.patch("/forms/admin/definitions/" + form.id, { status });
      toast.success("Form status changed to " + status + ".");
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change form status.");
    } finally {
      setBusyKey(null);
    }
  };

  const remove = async (form) => {
    if (!window.confirm("Delete this form? Forms with responses must be archived instead.")) return;
    try {
      setBusyKey(form.formKey);
      await api.delete("/forms/admin/definitions/" + form.id);
      toast.success("Form deleted.");
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete form.");
    } finally {
      setBusyKey(null);
    }
  };

  const exportCsv = async (formKey) => {
    try {
      setBusyKey(formKey);
      const response = await api.get(`/forms/${formKey}/admin/export`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = formKey + "-submissions.csv";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.response?.data?.message || "CSV export failed.");
    } finally {
      setBusyKey(null);
    }
  };

  const viewResponses = async (form) => {
    try {
      setBusyKey(form.formKey);
      const res = await api.get(`/forms/${form.formKey}/admin/all`);
      setResponses({
        form,
        rows: res.data.submissions || [],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load responses.");
    } finally {
      setBusyKey(null);
    }
  };

  const copyLink = async (formKey) => {
    const url = window.location.origin + "/apply/" + formKey;
    await navigator.clipboard.writeText(url);
    toast.success("Public application link copied.");
  };

  const responseColumns = useMemo(() => {
    if (!responses?.rows?.length) return [];
    const set = new Set();
    responses.rows.forEach((row) => Object.keys(row.data || {}).forEach((key) => set.add(key)));
    return [...set].filter((key) => key !== "website");
  }, [responses]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">// recruitment control room</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl">
            <FaFileCsv /> Form Management
          </h1>
          <p className="mt-3 max-w-3xl text-base-content/55">
            Open recruitment only when needed. Member login remains separate and always available.
          </p>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <form onSubmit={save} className="mt-8 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5 md:p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">{editingId ? "Edit Recruitment" : "Create Recruitment"}</h2>
          {editingId && (
            <button type="button" onClick={reset} className="btn btn-xs btn-ghost"><FaXmark /> Cancel</button>
          )}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input className="input input-bordered bg-base-100" required placeholder="Recruitment title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <input className="input input-bordered bg-base-100" required placeholder="form-key-example" value={draft.formKey} onChange={(e) => setDraft({ ...draft, formKey: e.target.value.toLowerCase().replace(/\s+/g, "-") })} />
          <input className="input input-bordered bg-base-100" placeholder="Badge" value={draft.badge} onChange={(e) => setDraft({ ...draft, badge: e.target.value })} />
          <select className="select select-bordered bg-base-100" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="archived">Archived</option>
          </select>
          <label className="form-control">
            <span className="mb-2 text-xs font-bold uppercase text-base-content/40">Opening date</span>
            <input type="datetime-local" className="input input-bordered bg-base-100" value={draft.openAt} onChange={(e) => setDraft({ ...draft, openAt: e.target.value })} />
          </label>
          <label className="form-control">
            <span className="mb-2 text-xs font-bold uppercase text-base-content/40">Closing date</span>
            <input type="datetime-local" className="input input-bordered bg-base-100" value={draft.closeAt} onChange={(e) => setDraft({ ...draft, closeAt: e.target.value })} />
          </label>
        </div>

        <textarea className="textarea textarea-bordered mt-4 min-h-24 w-full bg-base-100" placeholder="Recruitment intro" value={draft.intro} onChange={(e) => setDraft({ ...draft, intro: e.target.value })} />

        <div className="mt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-base-content/40">Visible sections</p>
          <div className="flex flex-wrap gap-3">
            {Object.keys(DEFAULT_SECTIONS).map((key) => (
              <label key={key} className="flex items-center gap-2 rounded-full border border-white/5 px-3 py-2 text-xs font-semibold">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-accent"
                  checked={draft.sections[key]}
                  onChange={(e) => setDraft({
                    ...draft,
                    sections: { ...draft.sections, [key]: e.target.checked },
                  })}
                />
                {key.replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="form-control">
            <span className="mb-2 text-xs font-bold uppercase text-base-content/40">Club activity options · one per line</span>
            <textarea
              className="textarea textarea-bordered min-h-44 bg-base-100"
              value={draft.activityOptionsText}
              onChange={(e) => setDraft({ ...draft, activityOptionsText: e.target.value })}
            />
          </label>
          <label className="form-control">
            <span className="mb-2 text-xs font-bold uppercase text-base-content/40">Specialization options · one per line</span>
            <textarea
              className="textarea textarea-bordered min-h-44 bg-base-100"
              value={draft.specializationOptionsText}
              onChange={(e) => setDraft({ ...draft, specializationOptionsText: e.target.value })}
            />
          </label>
        </div>

        <button type="submit" disabled={saving} className="btn btn-accent mt-5">
          <FaPlus /> {saving ? "Saving..." : editingId ? "Update Recruitment" : "Create Recruitment"}
        </button>
      </form>

      <section className="mt-8 space-y-4">
        {loading ? (
          <div className="py-14 text-center"><span className="loading loading-spinner text-accent" /></div>
        ) : forms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <h2 className="text-xl font-black">No recruitment forms yet</h2>
            <p className="mt-2 text-sm text-base-content/50">Create one above when the club opens recruitment.</p>
          </div>
        ) : (
          forms.map((form) => (
            <article key={form.id} className="rounded-2xl border border-white/5 bg-base-100/65 p-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-outline">{form.status}</span>
                    {form.acceptingSubmissions && <span className="badge badge-success badge-outline">Accepting</span>}
                  </div>
                  <h2 className="mt-3 text-xl font-black">{form.title}</h2>
                  <p className="font-mono text-xs text-accent">/{form.formKey}</p>
                  <p className="mt-2 text-sm text-base-content/50">
                    {form.submissions} submissions
                    {form.latestSubmission ? " · latest " + new Date(form.latestSubmission).toLocaleString() : ""}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => copyLink(form.formKey)} className="btn btn-sm btn-outline"><FaCopy /> Copy Link</button>
                  <a href={"/apply/" + form.formKey} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline"><FaEye /> Preview</a>
                  <button type="button" onClick={() => edit(form)} className="btn btn-sm btn-outline"><FaPen /> Edit</button>
                  <button type="button" onClick={() => viewResponses(form)} disabled={busyKey === form.formKey} className="btn btn-sm btn-outline">Responses</button>
                  <button type="button" onClick={() => exportCsv(form.formKey)} disabled={busyKey === form.formKey || form.submissions === 0} className="btn btn-sm btn-accent btn-outline"><FaDownload /> CSV</button>
                  {form.status !== "open" && form.status !== "archived" && (
                    <button type="button" onClick={() => patchStatus(form, "open")} className="btn btn-sm btn-success btn-outline">Open</button>
                  )}
                  {form.status === "open" && (
                    <button type="button" onClick={() => patchStatus(form, "closed")} className="btn btn-sm btn-warning btn-outline">Close</button>
                  )}
                  {form.status !== "archived" && (
                    <button type="button" onClick={() => patchStatus(form, "archived")} className="btn btn-sm btn-warning btn-outline">Archive</button>
                  )}
                  {form.submissions === 0 && (
                    <button type="button" onClick={() => remove(form)} className="btn btn-sm btn-error btn-outline"><FaTrash /> Delete</button>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {responses && (
        <section className="mt-8 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">responses</p>
              <h2 className="mt-1 text-2xl font-black">{responses.form.title}</h2>
            </div>
            <button type="button" onClick={() => setResponses(null)} className="btn btn-sm btn-ghost"><FaXmark /> Close</button>
          </div>

          {responses.rows.length === 0 ? (
            <p className="mt-6 text-base-content/50">No responses yet.</p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Submitted</th>
                    {responseColumns.map((column) => <th key={column}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {responses.rows.map((row) => (
                    <tr key={row.id}>
                      <td className="whitespace-nowrap">{new Date(row.submittedAt).toLocaleString()}</td>
                      {responseColumns.map((column) => <td key={column} className="max-w-xs whitespace-normal">{row.data?.[column] || ""}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default FormsAdmin;
