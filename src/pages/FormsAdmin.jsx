import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDownload, FaFileCsv, FaRotate } from "react-icons/fa6";
import { api } from "../services/api";

const FormsAdmin = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/forms/admin/summary");
      setForms(res.data.forms || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load form submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const exportCsv = async (formKey) => {
    try {
      setBusyKey(formKey);
      const response = await api.get(`/forms/${formKey}/admin/export`, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(response.data);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${formKey}-submissions.csv`;
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            // reusable form registry
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl">
            <FaFileCsv /> Form Data
          </h1>
          <p className="mt-3 max-w-3xl text-base-content/55">
            Any future EWUCSC form can submit to the generic form endpoint. Every form
            key gets its own CSV export automatically.
          </p>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5 md:p-7">
        {loading ? (
          <div className="py-16 text-center">
            <span className="loading loading-spinner text-accent" />
          </div>
        ) : forms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <FaFileCsv className="mx-auto text-4xl text-base-content/25" />
            <h2 className="mt-4 text-xl font-black">No form submissions yet</h2>
            <p className="mt-2 text-sm text-base-content/50">
              When the membership form or any future form is connected, its submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {forms.map((form) => (
              <div
                key={form.formKey}
                className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-base-200/35 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                    {form.formKey}
                  </p>
                  <p className="mt-1 text-2xl font-black">{form.submissions} submissions</p>
                  {form.latestSubmission && (
                    <p className="mt-1 text-xs text-base-content/40">
                      Latest {new Date(form.latestSubmission).toLocaleString()}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => exportCsv(form.formKey)}
                  disabled={busyKey === form.formKey}
                  className="btn btn-accent btn-outline"
                >
                  <FaDownload /> {busyKey === form.formKey ? "Exporting..." : "Export CSV"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/5 p-5 text-sm leading-relaxed text-base-content/60">
        Future HTML forms only need to POST their values as <code className="text-primary">{'{ data: { ...fields } }'}</code> to
        <code className="ml-1 text-primary">/api/forms/&lt;form-key&gt;</code>. You do not need to redesign CSV logic for each new form.
      </div>
    </div>
  );
};

export default FormsAdmin;
