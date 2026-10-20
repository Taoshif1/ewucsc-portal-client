import { useState } from "react";
import toast from "react-hot-toast";
import { FaDownload, FaFile, FaImage } from "react-icons/fa6";
import { api } from "../../services/api";

const AttachmentList = ({ attachments = [] }) => {
  const [busyId, setBusyId] = useState(null);

  if (!attachments.length) return null;

  const openAsset = async (asset) => {
    try {
      setBusyId(asset.id);
      const response = await api.get(`${asset.apiPath}/link`);
      const anchor = document.createElement("a");
      anchor.href = response.data.url;
      anchor.download = response.data.name || asset.name || "attachment";
      anchor.rel = "noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to download attachment.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mt-5 space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-base-content/35">
        Attachments
      </p>
      <div className="flex flex-wrap gap-2">
        {attachments.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => openAsset(asset)}
            disabled={busyId === asset.id}
            className="btn btn-sm btn-outline gap-2"
          >
            {String(asset.mimeType || "").startsWith("image/") ? <FaImage /> : <FaFile />}
            <span className="max-w-48 truncate">{asset.name}</span>
            <FaDownload />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttachmentList;
