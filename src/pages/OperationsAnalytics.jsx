import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBullhorn,
  FaChartLine,
  FaEnvelopeOpenText,
  FaFileCircleCheck,
  FaFlagCheckered,
  FaRotate,
  FaUsers,
} from "react-icons/fa6";
import { api } from "../services/api";

const StatCard = ({ icon, label, value, detail }) => (
  <div className="rounded-[1.4rem] border border-white/5 bg-base-100/65 p-5">
    <div className="text-2xl text-primary">{icon}</div>
    <p className="mt-4 text-sm text-base-content/45">{label}</p>
    <p className="mt-1 text-3xl font-black">{value ?? 0}</p>
    {detail && <p className="mt-2 text-xs text-base-content/45">{detail}</p>}
  </div>
);

const OperationsAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/analytics");
      setData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const roleRows = useMemo(
    () => Object.entries(data?.users?.roles || {}).sort((a, b) => b[1] - a[1]),
    [data],
  );
  const maxRoleCount = Math.max(1, ...roleRows.map(([, count]) => count));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-warning">// operational telemetry</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl"><FaChartLine /> Analytics</h1>
          <p className="mt-3 text-base-content/55">Live portal activity from MongoDB, not hard-coded counters.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="btn btn-sm btn-ghost">
          <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {loading && !data ? (
        <div className="flex min-h-72 items-center justify-center"><span className="loading loading-spinner loading-lg text-warning" /></div>
      ) : (
        <>
          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={<FaUsers />} label="Registered accounts" value={data?.users?.total} detail={`${data?.users?.approved || 0} approved · ${data?.users?.pending || 0} pending`} />
            <StatCard icon={<FaFlagCheckered />} label="CTF solves" value={data?.ctf?.solves} detail={`${data?.ctf?.uniqueSolvers || 0} unique solvers · ${data?.ctf?.publishedChallenges || 0} published challenges`} />
            <StatCard icon={<FaFileCircleCheck />} label="Homework submissions" value={data?.homework?.submissions} detail={`${data?.homework?.published || 0} published homework`} />
            <StatCard icon={<FaEnvelopeOpenText />} label="New contact messages" value={data?.inbox?.newMessages} detail="Unread club inbox items" />
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6">
              <h2 className="text-xl font-black">Role distribution</h2>
              <div className="mt-6 space-y-4">
                {roleRows.length === 0 ? (
                  <p className="text-sm text-base-content/45">No role data yet.</p>
                ) : roleRows.map(([role, count]) => (
                  <div key={role}>
                    <div className="flex justify-between text-sm"><span className="capitalize">{role}</span><span className="font-mono">{count}</span></div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-base-300">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(4, (count / maxRoleCount) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/5 bg-base-100/65 p-6">
              <h2 className="flex items-center gap-2 text-xl font-black"><FaBullhorn className="text-accent" /> Publishing</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-base-200/40 p-4">
                  <p className="text-xs text-base-content/45">Announcements</p>
                  <p className="mt-2 text-3xl font-black">{data?.content?.publishedAnnouncements || 0}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-base-200/40 p-4">
                  <p className="text-xs text-base-content/45">Blogs</p>
                  <p className="mt-2 text-3xl font-black">{data?.content?.publishedBlogs || 0}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-base-200/40 p-4">
                  <p className="text-xs text-base-content/45">All challenges</p>
                  <p className="mt-2 text-3xl font-black">{data?.ctf?.challenges || 0}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-base-200/40 p-4">
                  <p className="text-xs text-base-content/45">All homework</p>
                  <p className="mt-2 text-3xl font-black">{data?.homework?.total || 0}</p>
                </div>
              </div>
              {data?.generatedAt && <p className="mt-5 font-mono text-[11px] text-base-content/35">Generated {new Date(data.generatedAt).toLocaleString()}</p>}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default OperationsAnalytics;
