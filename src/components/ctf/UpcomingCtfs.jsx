import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaExternalLinkAlt, FaFlag } from "react-icons/fa";
import { publicApi } from "../../services/api";

const formatDate = (value) => {
  if (!value) return "TBA";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const UpcomingCtfs = ({ limit = 4, compact = false }) => {
  const [events, setEvents] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    publicApi
      .get("/ctf/upcoming")
      .then((res) => {
        setEvents((res.data.events || []).slice(0, limit));
        setState("ready");
      })
      .catch(() => setState("error"));
  }, [limit]);

  if (state === "loading") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: compact ? 2 : 4 }).map((_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-2xl border border-white/5 bg-base-200/50" />
        ))}
      </div>
    );
  }

  if (state === "error" || events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-base-200/35 p-6 text-center text-sm text-base-content/55">
        Upcoming CTF data is temporarily unavailable. You can still browse{" "}
        <a
          href="https://ctftime.org/event/list/upcoming"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-secondary"
        >
          CTFtime.org
        </a>
        .
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"}`}>
      {events.map((event) => (
        <article
          key={event.id}
          className="group rounded-2xl border border-secondary/10 bg-base-200/45 p-5 transition hover:-translate-y-1 hover:border-secondary/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <FaFlag />
            </div>
            <span className="badge badge-outline border-white/10 font-mono text-[10px] uppercase">
              {event.format || "CTF"}
            </span>
          </div>

          <h3 className="mt-4 line-clamp-2 text-lg font-black">{event.title}</h3>

          <div className="mt-4 space-y-2 text-xs text-base-content/55">
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-secondary" />
              Starts {formatDate(event.start)}
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-secondary" />
              Ends {formatDate(event.finish)}
            </p>
          </div>

          <a
            href={event.ctfTimeUrl || event.url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-secondary"
          >
            Event details <FaExternalLinkAlt size={11} />
          </a>
        </article>
      ))}
    </div>
  );
};

export default UpcomingCtfs;
