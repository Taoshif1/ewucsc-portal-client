import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaFlag,
  FaKey,
  FaLock,
  FaRotate,
  FaTrophy,
} from "react-icons/fa6";
import { api } from "../services/api";
import Spinner from "../components/common/Spinner";
import AttachmentList from "../components/common/AttachmentList";

const difficultyClass = {
  Easy: "badge-success",
  Medium: "badge-warning",
  Hard: "badge-error",
  Insane: "badge-secondary",
};

const PortalCTF = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flags, setFlags] = useState({});
  const [submitting, setSubmitting] = useState(null);
  const [category, setCategory] = useState("All");

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/challenges");
      setChallenges(res.data.challenges || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load challenges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(challenges.map((item) => item.category).filter(Boolean))],
    [challenges],
  );

  const visible =
    category === "All"
      ? challenges
      : challenges.filter((item) => item.category === category);

  const submitFlag = async (challenge) => {
    const flag = flags[challenge.id]?.trim();

    if (!flag) {
      toast.error("Enter a flag first.");
      return;
    }

    try {
      setSubmitting(challenge.id);
      const res = await api.post(`/challenges/${challenge.id}/submit`, { flag });

      if (res.data.correct) {
        toast.success(
          res.data.alreadySolved
            ? "You already solved this challenge."
            : `Correct! +${res.data.pointsAwarded} points`,
        );
        setFlags((current) => ({ ...current, [challenge.id]: "" }));
        await load();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Incorrect flag.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(6,182,212,0.13),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(37,99,235,0.16),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-secondary/20 bg-base-100/70 p-7 md:p-10 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
                // restricted competition module
              </p>
              <h1 className="mt-3 text-4xl md:text-6xl font-black">
                EWUCSC <span className="text-secondary">CTF Arena</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base-content/60">
                Solve private EWUCSC challenges, submit flags and earn points toward
                the internal member leaderboard.
              </p>
            </div>
            <button type="button" onClick={load} className="btn btn-sm btn-ghost">
              <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </section>

        <div className="mt-7 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`btn btn-sm rounded-full ${
                category === item ? "btn-secondary" : "btn-ghost border border-white/5"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex min-h-80 items-center justify-center"><Spinner /></div>
        ) : visible.length === 0 ? (
          <div className="mt-8 rounded-[1.5rem] border border-dashed border-white/10 bg-base-100/50 p-12 text-center">
            <FaLock className="mx-auto text-3xl text-base-content/30" />
            <h2 className="mt-4 text-xl font-black">No active challenges yet</h2>
            <p className="mt-2 text-sm text-base-content/50">
              Admins and executives can publish the tournament challenge set when ready.
            </p>
          </div>
        ) : (
          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            {visible.map((challenge) => (
              <article
                key={challenge.id}
                className={`rounded-[1.5rem] border p-6 backdrop-blur-xl ${
                  challenge.solved
                    ? "border-success/25 bg-success/5"
                    : "border-white/5 bg-base-100/65"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex gap-2">
                    <span className="badge badge-outline border-secondary/25 text-secondary">
                      {challenge.category}
                    </span>
                    <span className={`badge badge-outline ${difficultyClass[challenge.difficulty] || ""}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 font-mono text-sm font-black text-warning">
                    <FaTrophy /> {challenge.points} pts
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-black">{challenge.title}</h2>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-base-content/65">
                  {challenge.description}
                </p>

                <AttachmentList attachments={challenge.attachments || []} />

                {challenge.hint && (
                  <details className="mt-5 rounded-xl border border-warning/10 bg-warning/5 p-4">
                    <summary className="cursor-pointer font-bold text-warning">Hint</summary>
                    <p className="mt-2 text-sm text-base-content/60">{challenge.hint}</p>
                  </details>
                )}

                {challenge.solved ? (
                  <div className="mt-6 flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 p-4 font-bold text-success">
                    <FaCheck /> Challenge solved
                  </div>
                ) : (
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <label className="input input-bordered flex flex-1 items-center gap-2 bg-base-200/45">
                      <FaKey className="text-secondary" />
                      <input
                        value={flags[challenge.id] || ""}
                        onChange={(event) =>
                          setFlags((current) => ({
                            ...current,
                            [challenge.id]: event.target.value,
                          }))
                        }
                        placeholder="EWUCSC{...}"
                        className="grow font-mono"
                        autoComplete="off"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => submitFlag(challenge)}
                      disabled={submitting === challenge.id}
                      className="btn btn-secondary"
                    >
                      <FaFlag />
                      {submitting === challenge.id ? "Checking..." : "Submit Flag"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default PortalCTF;
