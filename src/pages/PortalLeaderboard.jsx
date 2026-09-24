import { useEffect, useState } from "react";
import { FaMedal, FaRankingStar } from "react-icons/fa6";
import { api } from "../services/api";
import Spinner from "../components/common/Spinner";

const PortalLeaderboard = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leaderboard")
      .then((res) => setRows(res.data.leaderboard || []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-warning/20 bg-base-100/70 p-7 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-warning">// club ranking</p>
        <h1 className="mt-3 flex items-center gap-3 text-4xl md:text-6xl font-black">
          <FaRankingStar className="text-warning" /> Leaderboard
        </h1>
        <p className="mt-4 text-base-content/60">Approved EWUCSC members ranked by CTF score.</p>

        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : rows.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/5 bg-base-200/50 p-8 text-center text-base-content/55">
            Ranking data will appear when members start earning points.
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="table">
              <thead>
                <tr><th>Rank</th><th>Member</th><th>Role</th><th className="text-right">Score</th></tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id || row.studentId || row.rank}>
                    <td><span className="inline-flex items-center gap-2 font-bold"><FaMedal className={row.rank <= 3 ? "text-warning" : "opacity-30"} />#{row.rank}</span></td>
                    <td><div className="font-bold">{row.name}</div><div className="text-xs opacity-50">{row.studentId}</div></td>
                    <td className="capitalize">{row.role}</td>
                    <td className="text-right font-mono font-black text-warning">{row.ctfScore || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalLeaderboard;
