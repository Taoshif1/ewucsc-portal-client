import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBullhorn,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import ContentManager from "../components/admin/ContentManager";
import ContactInbox from "../components/admin/ContactInbox";
import VPResourcesManager from "../components/admin/VPResourcesManager";
import { useAuth } from "../hooks/useAuth";
import { api, publicApi } from "../services/api";

const EMPTY_SETTINGS = {
  clubEmail: "ewcsc@ewubd.edu",
  technicalEmail: "hello@zabermahmud.me",
  socialLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    x: "",
  },
};

const OperationsContent = () => {
  const { backendUser } = useAuth();
  const [settings, setSettings] = useState(EMPTY_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    publicApi
      .get("/site-settings")
      .then((res) => {
        const incoming = res.data.settings || {};
        setSettings({
          ...EMPTY_SETTINGS,
          ...incoming,
          socialLinks: {
            ...EMPTY_SETTINGS.socialLinks,
            ...(incoming.socialLinks || {}),
          },
        });
      })
      .catch(() => setSettings(EMPTY_SETTINGS));
  }, []);

  const setSocial = (key, value) => {
    setSettings((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        [key]: value,
      },
    }));
  };

  const saveSettings = async (event) => {
    event.preventDefault();

    try {
      setSavingSettings(true);
      const res = await api.patch("/site-settings/admin", settings);
      setSettings(res.data.settings || settings);
      toast.success("Site contact and social settings updated.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save site settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">// publishing desk</p>
        <h1 className="mt-2 flex items-center gap-3 text-3xl font-black md:text-5xl"><FaBullhorn /> Content & Inbox</h1>
        <p className="mt-3 text-base-content/55">Publish announcements and blogs, manage global contact/social settings, then review contact messages.</p>
      </div>

      {backendUser?.role === "admin" && (
        <form
          onSubmit={saveSettings}
          className="mt-8 rounded-[1.5rem] border border-primary/10 bg-base-100/65 p-5 md:p-7"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">// global site settings</p>
            <h2 className="mt-2 text-2xl font-black">Contact & Social Links</h2>
            <p className="mt-2 text-sm text-base-content/50">
              Footer contact details and social buttons update from here. Leave a social URL empty to hide that icon.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-base-content/45">Club Email</span>
              <input
                type="email"
                value={settings.clubEmail}
                onChange={(e) => setSettings({ ...settings, clubEmail: e.target.value })}
                className="input input-bordered bg-base-100"
                required
              />
            </label>

            <label className="form-control">
              <span className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-base-content/45">Technical Email</span>
              <input
                type="email"
                value={settings.technicalEmail}
                onChange={(e) => setSettings({ ...settings, technicalEmail: e.target.value })}
                className="input input-bordered bg-base-100"
                required
              />
            </label>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["facebook", "Facebook page URL", <FaFacebook key="fb" />],
              ["instagram", "Instagram URL", <FaInstagram key="ig" />],
              ["linkedin", "LinkedIn URL", <FaLinkedin key="li" />],
              ["youtube", "YouTube URL", <FaYoutube key="yt" />],
              ["x", "X / Twitter URL", <FaXTwitter key="x" />],
            ].map(([key, label, icon]) => (
              <label key={key} className="form-control">
                <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-base-content/45">
                  {icon} {label}
                </span>
                <input
                  type="url"
                  value={settings.socialLinks[key] || ""}
                  onChange={(e) => setSocial(key, e.target.value)}
                  placeholder="https://..."
                  className="input input-bordered bg-base-100"
                />
              </label>
            ))}
          </div>

          <button type="submit" disabled={savingSettings} className="btn btn-primary mt-6">
            {savingSettings ? "Saving..." : "Save Site Settings"}
          </button>
        </form>
      )}

      {backendUser?.role === "admin" && <VPResourcesManager />}
      <ContentManager />
      <ContactInbox />
    </div>
  );
};

export default OperationsContent;
