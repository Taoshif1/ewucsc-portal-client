import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBook,
  FaCheck,
  FaCirclePlus,
  FaEye,
  FaEyeSlash,
  FaFlag,
  FaRotate,
} from "react-icons/fa6";
import { api } from "../../services/api";

const emptyChallenge = {
  title: "",
  description: "",
  category: "web",
  difficulty: "Easy",
  points: 100,
  flag: "",
  hint: "",
  published: false,
};

const emptyHomework = {
  title: "",
  description: "",
  dueAt: "",
  published: false,
};

const CyberOperationsManager = () => {
  const [tab, setTab] = useState("ctf");
  const [challenge, setChallenge] = useState(emptyChallenge);
  const [homework, setHomework] = useState(emptyHomework);
  const [challenges, setChallenges] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const [challengeRes, homeworkRes] = await Promise.all([
        api.get("/challenges/admin/all"),
        api.get("/homeworks/admin/all"),
      ]);
      setChallenges(challengeRes.data.challenges || []);
      setHomeworks(homeworkRes.data.homeworks || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load operations data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createChallenge = async (event) => {
    event.preventDefault();
    try {
      setBusy(true);
      await api.post("/challenges/admin", {
        ...challenge,
        points: Number(challenge.points),
      });
      toast.success("Challenge created.");
      setChallenge(emptyChallenge);
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create challenge.");
    } finally {
      setBusy(false);
    }
  };

  const createHomework = async (event) => {
    event.preventDefault();
    try {
      setBusy(true);
      await api.post("/homeworks/admin", {
        ...homework,
        dueAt: homework.dueAt || null,
      });
      toast.success("Homework created.");
      setHomework(emptyHomework);
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create homework.");
    } finally {
      setBusy(false);
    }
  };

  const toggleChallenge = async (item) => {
    try {
      await api.patch(`/challenges/admin/${item.id}`, {
        published: !item.published,
      });
      toast.success(item.published ? "Challenge hidden." : "Challenge published.");
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update challenge.");
    }
  };

  const toggleHomework = async (item) => {
    try {
      await api.patch(`/homeworks/admin/${item.id}`, {
        published: !item.published,
      });
      toast.success(item.published ? "Homework hidden." : "Homework published.");
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update homework.");
    }
  };

  return (
    <section className="mt-8 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">
            // tournament operations
          </p>
          <h2 className="mt-2 text-2xl font-black">CTF & Homework Management</h2>
        </div>
        <button type="button" onClick={load} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("ctf")}
          className={`btn btn-sm rounded-full ${tab === "ctf" ? "btn-secondary" : "btn-ghost"}`}
        >
          <FaFlag /> CTF Challenges
        </button>
        <button
          type="button"
          onClick={() => setTab("homework")}
          className={`btn btn-sm rounded-full ${tab === "homework" ? "btn-accent" : "btn-ghost"}`}
        >
          <FaBook /> Homework
        </button>
      </div>

      {tab === "ctf" ? (
        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={createChallenge} className="rounded-2xl border border-secondary/10 bg-base-200/35 p-5 space-y-4">
            <div className="flex items-center gap-2 text-secondary">
              <FaCirclePlus />
              <h3 className="font-black">Create Challenge</h3>
            </div>
            <input
              value={challenge.title}
              onChange={(e) => setChallenge({ ...challenge, title: e.target.value })}
              placeholder="Challenge title"
              className="input input-bordered w-full bg-base-100/60"
              required
            />
            <textarea
              value={challenge.description}
              onChange={(e) => setChallenge({ ...challenge, description: e.target.value })}
              placeholder="Challenge description"
              className="textarea textarea-bordered min-h-28 w-full bg-base-100/60"
              required
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={challenge.category}
                onChange={(e) => setChallenge({ ...challenge, category: e.target.value })}
                placeholder="Category"
                className="input input-bordered w-full bg-base-100/60"
              />
              <select
                value={challenge.difficulty}
                onChange={(e) => setChallenge({ ...challenge, difficulty: e.target.value })}
                className="select select-bordered w-full bg-base-100/60"
              >
                {["Easy", "Medium", "Hard", "Insane"].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>
            <input
              type="number"
              min="1"
              max="5000"
              value={challenge.points}
              onChange={(e) => setChallenge({ ...challenge, points: e.target.value })}
              placeholder="Points"
              className="input input-bordered w-full bg-base-100/60"
              required
            />
            <input
              value={challenge.flag}
              onChange={(e) => setChallenge({ ...challenge, flag: e.target.value })}
              placeholder="Flag — stored hashed, never returned to clients"
              className="input input-bordered w-full bg-base-100/60 font-mono"
              required
            />
            <textarea
              value={challenge.hint}
              onChange={(e) => setChallenge({ ...challenge, hint: e.target.value })}
              placeholder="Hint (optional)"
              className="textarea textarea-bordered w-full bg-base-100/60"
            />
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={challenge.published}
                onChange={(e) => setChallenge({ ...challenge, published: e.target.checked })}
                className="toggle toggle-secondary"
              />
              Publish immediately
            </label>
            <button type="submit" disabled={busy} className="btn btn-secondary w-full">
              <FaCirclePlus /> {busy ? "Creating..." : "Create Challenge"}
            </button>
          </form>

          <div className="space-y-3">
            {loading ? (
              <div className="py-16 text-center"><span className="loading loading-spinner text-secondary" /></div>
            ) : challenges.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-base-content/50">
                No challenges created yet.
              </div>
            ) : (
              challenges.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/5 bg-base-200/35 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="badge badge-outline border-secondary/20">{item.category}</span>
                        <span className="badge badge-outline">{item.difficulty}</span>
                      </div>
                      <h3 className="mt-3 font-black">{item.title}</h3>
                      <p className="mt-1 text-xs text-base-content/45">{item.points} points</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleChallenge(item)}
                      className={`btn btn-sm ${item.published ? "btn-success btn-outline" : "btn-ghost border border-white/10"}`}
                    >
                      {item.published ? <FaEye /> : <FaEyeSlash />}
                      {item.published ? "Published" : "Draft"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={createHomework} className="rounded-2xl border border-accent/10 bg-base-200/35 p-5 space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <FaCirclePlus />
              <h3 className="font-black">Create Homework</h3>
            </div>
            <input
              value={homework.title}
              onChange={(e) => setHomework({ ...homework, title: e.target.value })}
              placeholder="Homework title"
              className="input input-bordered w-full bg-base-100/60"
              required
            />
            <textarea
              value={homework.description}
              onChange={(e) => setHomework({ ...homework, description: e.target.value })}
              placeholder="Instructions"
              className="textarea textarea-bordered min-h-32 w-full bg-base-100/60"
              required
            />
            <input
              type="datetime-local"
              value={homework.dueAt}
              onChange={(e) => setHomework({ ...homework, dueAt: e.target.value })}
              className="input input-bordered w-full bg-base-100/60"
            />
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={homework.published}
                onChange={(e) => setHomework({ ...homework, published: e.target.checked })}
                className="toggle toggle-accent"
              />
              Publish immediately
            </label>
            <button type="submit" disabled={busy} className="btn btn-accent w-full">
              <FaCirclePlus /> {busy ? "Creating..." : "Create Homework"}
            </button>
          </form>

          <div className="space-y-3">
            {loading ? (
              <div className="py-16 text-center"><span className="loading loading-spinner text-accent" /></div>
            ) : homeworks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-base-content/50">
                No homework created yet.
              </div>
            ) : (
              homeworks.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/5 bg-base-200/35 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black">{item.title}</h3>
                      <p className="mt-1 text-xs text-base-content/45">
                        {item.dueAt ? `Due ${new Date(item.dueAt).toLocaleString()}` : "No deadline"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleHomework(item)}
                      className={`btn btn-sm ${item.published ? "btn-success btn-outline" : "btn-ghost border border-white/10"}`}
                    >
                      {item.published ? <FaCheck /> : <FaEyeSlash />}
                      {item.published ? "Published" : "Draft"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CyberOperationsManager;
