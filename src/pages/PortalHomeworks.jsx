import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaClipboardCheck,
  FaClock,
  FaLink,
  FaPaperPlane,
  FaRotate,
} from "react-icons/fa6";
import { api } from "../services/api";
import Spinner from "../components/common/Spinner";
import AttachmentList from "../components/common/AttachmentList";

const PortalHomeworks = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState({});
  const [submitting, setSubmitting] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/homeworks");
      setHomeworks(res.data.homeworks || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load homework.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (homework) => {
    const draft = drafts[homework.id] || {};

    if (!draft.response?.trim() && !draft.link?.trim()) {
      toast.error("Add a response or HTTPS submission link.");
      return;
    }

    try {
      setSubmitting(homework.id);
      await api.post(`/homeworks/${homework.id}/submit`, {
        response: draft.response || "",
        link: draft.link || "",
      });
      toast.success("Homework submitted.");
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(6,182,212,0.1),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-accent/20 bg-base-100/70 p-7 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">// member learning</p>
              <h1 className="mt-3 text-4xl md:text-6xl font-black">
                Homework <span className="text-accent">Board</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base-content/60">
                Member-only assignments, deadlines and submission tracking.
              </p>
            </div>
            <button type="button" onClick={load} className="btn btn-sm btn-ghost">
              <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </section>

        {loading ? (
          <div className="flex min-h-80 items-center justify-center"><Spinner /></div>
        ) : homeworks.length === 0 ? (
          <div className="mt-8 rounded-[1.5rem] border border-dashed border-white/10 p-12 text-center text-base-content/50">
            No published homework right now.
          </div>
        ) : (
          <section className="mt-8 space-y-5">
            {homeworks.map((homework) => (
              <article key={homework.id} className="rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-accent">
                      <FaClipboardCheck />
                      <span className="font-mono text-xs uppercase tracking-[0.18em]">Assignment</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-black">{homework.title}</h2>
                  </div>
                  {homework.dueAt && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-warning/15 bg-warning/5 px-3 py-2 text-xs text-warning">
                      <FaClock /> Due {new Date(homework.dueAt).toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-base-content/65">
                  {homework.description}
                </p>

                <AttachmentList attachments={homework.attachments || []} />

                {homework.submission && (
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-success/15 bg-success/5 p-3 text-sm font-bold text-success">
                    <FaCheck /> Submitted {new Date(homework.submission.submittedAt).toLocaleString()}
                  </div>
                )}

                <div className="mt-6 grid gap-3">
                  <textarea
                    value={drafts[homework.id]?.response || ""}
                    onChange={(event) =>
                      setDrafts((current) => ({
                        ...current,
                        [homework.id]: {
                          ...current[homework.id],
                          response: event.target.value,
                        },
                      }))
                    }
                    placeholder="Response / notes (optional if you submit a link)"
                    className="textarea textarea-bordered min-h-28 bg-base-200/45"
                  />
                  <label className="input input-bordered flex items-center gap-2 bg-base-200/45">
                    <FaLink className="text-accent" />
                    <input
                      value={drafts[homework.id]?.link || ""}
                      onChange={(event) =>
                        setDrafts((current) => ({
                          ...current,
                          [homework.id]: {
                            ...current[homework.id],
                            link: event.target.value,
                          },
                        }))
                      }
                      placeholder="https://... submission link"
                      className="grow"
                    />
                  </label>
                  <div>
                    <button
                      type="button"
                      onClick={() => submit(homework)}
                      disabled={submitting === homework.id}
                      className="btn btn-accent"
                    >
                      <FaPaperPlane />
                      {submitting === homework.id
                        ? "Submitting..."
                        : homework.submission
                          ? "Update Submission"
                          : "Submit Homework"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default PortalHomeworks;
