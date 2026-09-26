import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCloudArrowUp, FaFile, FaImage, FaSpinner } from "react-icons/fa6";
import { api } from "../../services/api";

const MAX_BYTES = 10 * 1024 * 1024;

const AssetDropzone = ({
  scope,
  accept = "image/*,.pdf,.txt,.md,.json,.csv,.zip,.7z,.rar,.pcap,.pcapng",
  multiple = false,
  maxFiles = 8,
  onUploaded,
  label = "Drop files here or click to browse",
  helper = "Maximum 10 MB per file",
}) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file) => {
    if (file.size > MAX_BYTES) {
      throw new Error(`${file.name} is larger than 10 MB.`);
    }

    const bytes = await file.arrayBuffer();
    const response = await api.post(`/uploads/${scope}`, bytes, {
      headers: {
        "Content-Type": "application/octet-stream",
        "X-File-Name": encodeURIComponent(file.name),
        "X-File-Type": file.type || "application/octet-stream",
      },
      onUploadProgress: (event) => {
        if (event.total) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      },
    });

    return response.data.asset;
  };

  const processFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    const selected = multiple ? files.slice(0, Math.max(1, maxFiles)) : files.slice(0, 1);

    try {
      setUploading(true);
      setProgress(0);

      for (const file of selected) {
        const asset = await uploadFile(file);
        onUploaded?.(asset);
      }

      toast.success(selected.length > 1 ? "Files uploaded." : "File uploaded.");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Upload failed.");
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => processFiles(event.target.files)}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          processFiles(event.dataTransfer.files);
        }}
        className={`w-full rounded-2xl border-2 border-dashed p-6 text-center transition ${
          dragging
            ? "border-primary bg-primary/10"
            : "border-base-content/10 bg-base-100/45 hover:border-primary/35"
        }`}
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
          {uploading ? <FaSpinner className="animate-spin" /> : accept.startsWith("image") ? <FaImage /> : <FaCloudArrowUp />}
        </div>
        <p className="mt-3 text-sm font-bold">{uploading ? `Uploading… ${progress}%` : label}</p>
        <p className="mt-1 text-xs text-base-content/40">{helper}</p>
      </button>
    </div>
  );
};

export const UploadedAssetPill = ({ asset, onRemove }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-base-100/60 px-3 py-2">
    <div className="min-w-0 flex items-center gap-2">
      <FaFile className="shrink-0 text-primary" />
      <span className="truncate text-xs font-semibold">{asset.name}</span>
    </div>
    {onRemove && (
      <button type="button" onClick={onRemove} className="btn btn-xs btn-ghost text-error">
        Remove
      </button>
    )}
  </div>
);

export default AssetDropzone;
