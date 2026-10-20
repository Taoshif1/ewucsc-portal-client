import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBan,
  FaCheck,
  FaDownload,
  FaKey,
  FaPen,
  FaRotate,
  FaRotateLeft,
  FaTrash,
  FaUsersGear,
  FaXmark,
} from "react-icons/fa6";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/common/Pagination";

const ROLES = ["admin", "executive", "sub-executive", "member"];
const FILTERS = ["all", "pending", "approved", "rejected", "suspended", "deleted"];

const AdminUsers = () => {
  const { backendUser, resetPassword } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [busyUid, setBusyUid] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingName, setEditingName] = useState("");

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

  const visibleUsers = useMemo(() => {
    if (filter === "deleted") return users.filter((user) => Boolean(user.deletedAt));
    if (filter === "all") return users;
    return users.filter((user) => !user.deletedAt && user.approvalStatus === filter);
  }, [filter, users]);

  const pagination = usePagination(visibleUsers);

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

  const sendPasswordReset = async (user) => {
    if (!user.email) {
      toast.error("This account has no email address.");
      return;
    }

    if (!window.confirm(`Send a Firebase password-reset email to ${user.email}?`)) {
      return;
    }

    try {
      setBusyUid(user.uid);
      await resetPassword(user.email);
      toast.success("Password-reset email sent to the member.");
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many reset requests. Please wait and try again.");
      } else {
        toast.error("Could not send the reset email.");
      }
    } finally {
      setBusyUid(null);
    }
  };

  const saveMemberName = async (event) => {
    event.preventDefault();
    if (!editingUser?.uid) return;

    const name = editingName.trim();
    if (name.length < 2 || name.length > 100) {
      toast.error("Name must be between 2 and 100 characters.");
      return;
    }

    try {
      setBusyUid(editingUser.uid);
      await api.patch(`/admin/users/${editingUser.uid}/profile`, { name });
      toast.success("Member name updated.");
      setEditingUser(null);
      await loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update member profile.");
    } finally {
      setBusyUid(null);
    }
  };

  const removeMember = async (user) => {
    if (!user.uid || user.uid === backendUser?.uid || user.isProtected || user.deletedAt) return;

    const confirmed = window.confirm(
      `Remove ${user.name || "this member"} from the portal? Their portal access will be disabled, while CTF solves and homework history will be preserved.`,
    );
    if (!confirmed) return;

    try {
      setBusyUid(user.uid);
      await api.delete(`/admin/users/${user.uid}`);
      toast.success("Member removed and portal access disabled.");
      await loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to remove member.");
    } finally {
      setBusyUid(null);
    }
  };

  const restoreMember = async (user) => {
    if (!user.uid || !user.deletedAt || user.isProtected) return;

    try {
      setBusyUid(user.uid);
      await api.post(`/admin/users/${user.uid}/restore`);
      toast.success("Member restored.");
      await loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to restore member.");
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
          <button key={item} type="button" onClick={() => { setFilter(item); pagination.resetPage(); }} className={`btn btn-sm rounded-full capitalize ${filter === item ? "btn-primary" : "btn-ghost border border-white/5"}`}>{item}</button>
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
                {pagination.pageItems.map((user) => {
                  const busy = busyUid === user.uid;
                  const removed = Boolean(user.deletedAt);
                  return (
                    <tr key={user.uid || user.id}>
                      <td><div className="font-bold">{user.name}</div><div className="font-mono text-xs text-secondary">{user.studentId || "Legacy account"}</div><div className="text-xs opacity-45">{user.email}</div></td>
                      <td><span className={`badge badge-outline capitalize ${removed ? "badge-error" : user.approvalStatus === "approved" ? "badge-success" : user.approvalStatus === "pending" ? "badge-warning" : "badge-error"}`}>{removed ? "Removed" : user.approvalStatus}</span></td>
                      <td>
                        <select className="select select-sm select-bordered relative z-10 min-w-40 bg-base-100 text-base-content shadow-lg focus:z-50 focus:border-primary/40" value={user.role || "member"} disabled={busy || !user.uid || user.isProtected || removed} onChange={(event) => updateRole(user.uid, event.target.value)}>
                          {ROLES.map((role) => <option key={role} value={role} className="bg-base-100 text-base-content">{role}</option>)}
                        </select>
                      </td>
                      <td className="text-sm opacity-55">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</td>
                      <td><div className="flex justify-end gap-2">
                        {!removed && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingUser(user);
                              setEditingName(user.name || "");
                            }}
                            disabled={busy || !user.uid || user.isProtected}
                            className="btn btn-sm btn-outline"
                            title="Edit member display name"
                          >
                            <FaPen /> Edit
                          </button>
                        )}
                        {removed ? (
                          <button type="button" onClick={() => restoreMember(user)} disabled={busy || user.isProtected} className="btn btn-sm btn-success btn-outline">
                            <FaRotateLeft /> Restore
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => sendPasswordReset(user)}
                              disabled={busy || !user.email || !user.uid || user.isProtected}
                              className="btn btn-sm btn-outline"
                              title="Send Firebase password-reset email"
                            >
                              <FaKey /> Reset Password
                            </button>
                            {user.approvalStatus !== "approved" && <button type="button" onClick={() => updateApproval(user.uid, "approved")} disabled={busy || !user.uid || user.isProtected} className="btn btn-sm btn-success btn-outline"><FaCheck /> Approve</button>}
                            {user.approvalStatus === "approved" && user.uid !== backendUser?.uid && <button type="button" onClick={() => updateApproval(user.uid, "suspended")} disabled={busy || user.isProtected} className="btn btn-sm btn-warning btn-outline"><FaBan /> Suspend</button>}
                            {user.approvalStatus !== "rejected" && user.uid !== backendUser?.uid && <button type="button" onClick={() => updateApproval(user.uid, "rejected")} disabled={busy || user.isProtected} className="btn btn-sm btn-error btn-outline"><FaXmark /> Reject</button>}
                            {user.uid !== backendUser?.uid && !user.isProtected && (
                              <button type="button" onClick={() => removeMember(user)} disabled={busy || !user.uid} className="btn btn-sm btn-error btn-outline" title="Remove portal access while preserving history">
                                <FaTrash /> Remove
                              </button>
                            )}
                          </>
                        )}
                      </div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!loading && visibleUsers.length > 0 && <Pagination pagination={pagination} />}
      </div>
      {editingUser && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setEditingUser(null)}
        >
          <form
            onSubmit={saveMemberName}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-base-100 p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">// member profile</p>
                <h2 className="mt-2 text-2xl font-black">Edit Member</h2>
                <p className="mt-2 text-sm text-base-content/55">
                  Update the display name. Student ID and university email remain tied to the verified Firebase identity.
                </p>
              </div>
              <button type="button" onClick={() => setEditingUser(null)} className="btn btn-sm btn-circle btn-ghost" aria-label="Close edit dialog">
                <FaXmark />
              </button>
            </div>
            <label className="form-control mt-6">
              <span className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-base-content/45">Full name</span>
              <input
                autoFocus
                required
                minLength={2}
                maxLength={100}
                value={editingName}
                onChange={(event) => setEditingName(event.target.value)}
                className="input input-bordered w-full bg-base-200/40"
              />
            </label>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditingUser(null)} className="btn btn-ghost">Cancel</button>
              <button type="submit" disabled={busyUid === editingUser.uid} className="btn btn-primary">
                {busyUid === editingUser.uid ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;