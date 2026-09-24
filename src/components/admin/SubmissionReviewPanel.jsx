import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaClipboardCheck,
  FaRotate,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { api } from "../../services/api";

const SubmissionReviewPanel = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/homeworks/admin/submissions");
      setRows(res.data.submissions || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setBusy(id);
      await api.patch("/homeworks/admin/submissions/" + id, { status });
      toast.success("Submission marked " + status + ".");
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Review update failed.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            // submission review
          </p>
          <h2 className="mt-2 text-2xl font-black">Homework Review Queue</h2>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <span className="loading loading-spinner text-accent" />
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-10 text-center text-base-content/50">
          No homework submissions yet.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((row) => (
            <article
              key={row.id}
              className="rounded-2xl border border-white/5 bg-base-200/35 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-accent">
                    <FaClipboardCheck />
                    <span className="font-mono text-xs uppercase tracking-[0.18em]">
                      {row.homeworkTitle}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-bold">Member UID: {row.uid}</p>
                  {row.response && (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-base-content/65">
                      {row.response}
                    </p>
                  )}
                  {row.link && (
                    <a
                      href={row.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-secondary"
                    >
                      Open submission <FaExternalLinkAlt size={11} />
                    </a>
                  )}
                  <p className="mt-3 text-xs text-base-content/40">
                    Submitted {row.submittedAt ? new Date(row.submittedAt).toLocaleString() : "—"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busy === row.id}
                    onClick={() => updateStatus(row.id, "accepted")}
                    className="btn btn-sm btn-success btn-outline"
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    type="button"
                    disabled={busy === row.id}
                    onClick={() => updateStatus(row.id, "revision-requested")}
                    className="btn btn-sm btn-warning btn-outline"
                  >
                    <FaTriangleExclamation /> Revision
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default SubmissionReviewPanel;
