import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaClock,
  FaRotate,
  FaShieldHalved,
  FaUserGear,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import CyberOperationsManager from "../../components/admin/CyberOperationsManager";

const ROLES = ["admin", "executive", "sub-executive", "member"];
const FILTERS = ["all", "pending", "approved", "rejected", "suspended"];

const AdminDashboard = () => {
  const { backendUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [busyUid, setBusyUid] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const query = filter === "all" ? "" : `?status=${filter}`;
      const res = await api.get(`/admin/users${query}`);
      setUsers(res.data.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filter]);

  const counts = useMemo(() => {
    const pending = users.filter((user) => user.approvalStatus === "pending").length;
    const approved = users.filter((user) => user.approvalStatus === "approved").length;
    return { pending, approved, visible: users.length };
  }, [users]);

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
    <div className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_90%_12%,rgba(239,68,68,0.08),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <section className="rounded-[2rem] border border-primary/15 bg-base-100/70 p-7 md:p-10 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-error/20 bg-error/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-error">
                <FaShieldHalved /> Admin control
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-black">
                Membership <span className="text-primary">Command Center</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base-content/60">
                Review EWU student registrations, approve portal access and assign the
                four application roles without touching MongoDB directly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-base-200/50 px-5 py-4 font-mono text-xs text-base-content/55">
              Signed in as
              <div className="mt-1 font-bold text-primary">
                {backendUser?.studentId || backendUser?.email}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Pending review", filter === "pending" ? counts.visible : counts.pending, <FaClock key="clock" />],
            ["Approved shown", filter === "approved" ? counts.visible : counts.approved, <FaCheck key="check" />],
            ["Visible records", counts.visible, <FaUsers key="users" />],
          ].map(([label, value, icon]) => (
            <div key={label} className="rounded-2xl border border-white/5 bg-base-100/65 p-5">
              <div className="text-xl text-secondary">{icon}</div>
              <p className="mt-4 text-sm text-base-content/50">{label}</p>
              <p className="mt-1 text-3xl font-black">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-white/5 bg-base-100/65 p-5 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">
                // access registry
              </p>
              <h2 className="mt-2 text-2xl font-black">Member requests & roles</h2>
            </div>
            <button
              type="button"
              onClick={loadUsers}
              className="btn btn-sm btn-ghost"
              disabled={loading}
            >
              <FaRotate className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`btn btn-sm rounded-full capitalize ${
                  filter === item ? "btn-primary" : "btn-ghost border border-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-10 text-center text-base-content/50">
              No members found in this state.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Registered</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const busy = busyUid === user.uid;
                    return (
                      <tr key={user.uid}>
                        <td>
                          <div className="font-bold">{user.name}</div>
                          <div className="font-mono text-xs text-secondary">{user.studentId || "Legacy account"}</div>
                          <div className="mt-1 text-xs opacity-45">{user.email}</div>
                        </td>
                        <td>
                          <span className={`badge badge-outline capitalize ${
                            user.approvalStatus === "approved"
                              ? "badge-success"
                              : user.approvalStatus === "pending"
                                ? "badge-warning"
                                : "badge-error"
                          }`}>
                            {user.approvalStatus}
                          </span>
                        </td>
                        <td>
                          <select
                            className="select select-sm select-bordered min-w-40 bg-base-200/60"
                            value={user.role || "member"}
                            disabled={busy}
                            onChange={(event) => updateRole(user.uid, event.target.value)}
                          >
                            {ROLES.map((role) => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        </td>
                        <td className="text-sm opacity-55">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                        </td>
                        <td>
                          <div className="flex justify-end gap-2">
                            {user.approvalStatus !== "approved" && (
                              <button
                                type="button"
                                onClick={() => updateApproval(user.uid, "approved")}
                                disabled={busy}
                                className="btn btn-sm btn-success btn-outline"
                              >
                                <FaCheck /> Approve
                              </button>
                            )}
                            {user.approvalStatus !== "rejected" && user.uid !== backendUser?.uid && (
                              <button
                                type="button"
                                onClick={() => updateApproval(user.uid, "rejected")}
                                disabled={busy}
                                className="btn btn-sm btn-error btn-outline"
                              >
                                <FaXmark /> Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm text-base-content/60">
            <FaUserGear className="mt-0.5 shrink-0 text-primary" />
            Role changes affect what the member can manage; approval controls whether
            the member can enter the portal at all.
          </div>
        </section>

        <CyberOperationsManager />
      </div>
    </div>
  );
};

export default AdminDashboard;
