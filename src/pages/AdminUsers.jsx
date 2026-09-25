import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBan,
  FaCheck,
  FaDownload,
  FaRotate,
  FaUsersGear,
  FaXmark,
} from "react-icons/fa6";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const ROLES = ["admin", "executive", "sub-executive", "member"];
const FILTERS = ["all", "pending", "approved", "rejected", "suspended"];

const AdminUsers = () => {
  const { backendUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [busyUid, setBusyUid] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const visibleUsers = useMemo(
    () => filter === "all" ? users : users.filter((user) => user.approvalStatus === filter),
    [filter, users],
  );

  const exportMembersCsv = () => {
    const headers = ["name", "studentId", "email", "role", "approvalStatus", "ctfScore", "solvedChallenges", "createdAt"];
    const escape = (value) => '"' + String(value ?? "").replaceAll('"', '""') + '"';
    const rows = [headers.join(","), ...users.map((user) => headers.map((key) => escape(user[key])).join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ewucsc-members.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const updateApproval = async (uid, status) => {
    try {
      setBusyUid(uid);
      await api.patch(`/admin/users/${uid}/approval`, { status });
      toast.success(`Membership ${status}.`);
      await loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update membership.");
    } finally {
      setBusyUid(null);
    }
  };

  const updateRole = async (uid, role) => {
    try {
      setBusyUid(uid);
      await api.patch(`/admin/users/${uid}/role`, { role });
      toast.success(`Role changed to ${role}.`);
      await loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update role.");
    } finally {
      setBusyUid(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">// access registry</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl"><FaUsersGear /> Manage Users</h1>
          <p className="mt-3 text-base-content/55">Approve accounts, assign roles and control portal access.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={exportMembersCsv} disabled={loading || !users.length} className="btn btn-sm btn-ghost"><FaDownload /> Export</button>
          <button type="button" onClick={loadUsers} disabled={loading} className="btn btn-sm btn-ghost"><FaRotate className={loading ? "animate-spin" : ""} /> Refresh</button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button key={item} type="button" onClick={() => setFilter(item)} className={`btn btn-sm rounded-full capitalize ${filter === item ? "btn-primary" : "btn-ghost border border-white/5"}`}>{item}</button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/5 bg-base-100/65">
        {loading ? (
          <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary" /></div>
        ) : visibleUsers.length === 0 ? (
          <div className="p-12 text-center text-base-content/50">No users found in this state.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead><tr><th>Student</th><th>Status</th><th>Role</th><th>Registered</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {visibleUsers.map((user) => {
                  const busy = busyUid === user.uid;
                  return (
                    <tr key={user.uid || user.id}>
                      <td><div className="font-bold">{user.name}</div><div className="font-mono text-xs text-secondary">{user.studentId || "Legacy account"}</div><div className="text-xs opacity-45">{user.email}</div></td>
                      <td><span className={`badge badge-outline capitalize ${user.approvalStatus === "approved" ? "badge-success" : user.approvalStatus === "pending" ? "badge-warning" : "badge-error"}`}>{user.approvalStatus}</span></td>
                      <td>
                        <select className="select select-sm select-bordered min-w-40 bg-base-200/60" value={user.role || "member"} disabled={busy} onChange={(event) => updateRole(user.uid, event.target.value)}>
                          {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                        </select>
                      </td>
                      <td className="text-sm opacity-55">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</td>
                      <td><div className="flex justify-end gap-2">
                        {user.approvalStatus !== "approved" && <button type="button" onClick={() => updateApproval(user.uid, "approved")} disabled={busy} className="btn btn-sm btn-success btn-outline"><FaCheck /> Approve</button>}
                        {user.approvalStatus === "approved" && user.uid !== backendUser?.uid && <button type="button" onClick={() => updateApproval(user.uid, "suspended")} disabled={busy} className="btn btn-sm btn-warning btn-outline"><FaBan /> Suspend</button>}
                        {user.approvalStatus !== "rejected" && user.uid !== backendUser?.uid && <button type="button" onClick={() => updateApproval(user.uid, "rejected")} disabled={busy} className="btn btn-sm btn-error btn-outline"><FaXmark /> Reject</button>}
                      </div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
