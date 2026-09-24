import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaEnvelope,
  FaEnvelopeOpen,
  FaRotate,
} from "react-icons/fa6";
import { api } from "../../services/api";

const statusClass = {
  new: "badge-warning",
  read: "badge-info",
  resolved: "badge-success",
};

const ContactInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact/admin");
      setMessages(res.data.messages || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load contact inbox.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const newCount = useMemo(
    () => messages.filter((item) => item.status === "new").length,
    [messages],
  );

  const updateStatus = async (id, status) => {
    try {
      setBusyId(id);
      await api.patch("/contact/admin/" + id, { status });
      toast.success(status === "resolved" ? "Inquiry resolved." : "Inquiry marked read.");
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update inquiry.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="mt-8 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">
            // public contact inbox
          </p>
          <h2 className="mt-2 text-2xl font-black">Contact Inquiries</h2>
          <p className="mt-2 text-sm text-base-content/50">
            {newCount} new message{newCount === 1 ? "" : "s"}
          </p>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost" disabled={loading}>
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <span className="loading loading-spinner text-secondary" />
        </div>
      ) : messages.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-10 text-center text-base-content/50">
          No contact inquiries yet.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/5 bg-base-200/35 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-black">{item.name}</h3>
                    <span className={"badge badge-outline capitalize " + (statusClass[item.status] || "")}>
                      {item.status}
                    </span>
                  </div>
                  <a
                    href={"mailto:" + item.email}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-secondary"
                  >
                    <FaEnvelope /> {item.email}
                  </a>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-base-content/65">
                    {item.message}
                  </p>
                  <p className="mt-4 text-xs text-base-content/40">
                    Received {item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {item.status === "new" && (
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => updateStatus(item.id, "read")}
                      className="btn btn-sm btn-info btn-outline"
                    >
                      <FaEnvelopeOpen /> Mark read
                    </button>
                  )}
                  {item.status !== "resolved" && (
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => updateStatus(item.id, "resolved")}
                      className="btn btn-sm btn-success btn-outline"
                    >
                      <FaCheck /> Resolve
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContactInbox;
