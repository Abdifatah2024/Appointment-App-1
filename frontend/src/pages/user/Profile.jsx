
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Save, User2, Shield, Mail, Camera, X } from "lucide-react";
import {
  updateMyProfile,
  uploadMyAvatar,
  clearProfileMessage,
} from "../../Redux/slices/userSlices/authSlice";

function getInitials(name) {
  const n = (name || "").trim();
  if (!n) return "U";
  const parts = n.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

export default function Profile() {
  const dispatch = useDispatch();
  const {
    user,
    profileSaving,
    profileError,
    profileSuccess,
    avatarUploading,
    avatarError,
  } = useSelector((s) => s.auth);

  const API_BASE =
    import.meta?.env?.VITE_API_URL?.replace(/\/$/, "") ||
    "http://localhost:4000/api";

  const displayName = user?.fullName || user?.name || user?.username || "User";
  const initials = useMemo(() => getInitials(displayName), [displayName]);

  const [fullName, setFullName] = useState(displayName);

  // Avatar UI
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  // image url (absolute)
  const avatarUrl = useMemo(() => {
    const v = user?.avatarUrl || "";
    if (!v) return "";
    if (/^https?:\/\//i.test(v)) return v; // already absolute
    // if backend returns "/uploads/avatars/xxx.png"
    return `${API_BASE.replace(/\/api$/, "")}${v}`;
  }, [user?.avatarUrl, API_BASE]);

  useEffect(() => {
    setFullName(displayName);
  }, [displayName]);

  useEffect(() => {
    if (profileError || profileSuccess || avatarError) {
      const t = setTimeout(() => dispatch(clearProfileMessage()), 3000);
      return () => clearTimeout(t);
    }
  }, [profileError, profileSuccess, avatarError, dispatch]);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onSave = async () => {
    const next = fullName.trim();
    if (next.length < 2) return;
    await dispatch(updateMyProfile({ fullName: next }));
  };

  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // basic type validation
    const ok = ["image/png", "image/jpeg", "image/webp"].includes(f.type);
    if (!ok) {
      alert("Only png, jpg, webp images are allowed.");
      return;
    }

    // 2MB
    if (f.size > 2 * 1024 * 1024) {
      alert("Max file size is 2MB.");
      return;
    }

    setFile(f);
  };

  const onUploadAvatar = async () => {
    if (!file) return;
    const fd = new FormData();
    // backend multer field name -> "avatar"
    fd.append("avatar", file);

    const res = await dispatch(uploadMyAvatar(fd));
    if (res.meta.requestStatus === "fulfilled") {
      setAvatarOpen(false);
      setFile(null);
      setPreview("");
    }
  };

  const closeAvatarModal = () => {
    setAvatarOpen(false);
    setFile(null);
    setPreview("");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-black text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account information (edit name & profile photo).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setAvatarOpen(true)}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center hover:bg-slate-50"
                title="Change photo"
              >
                <Camera className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div>
              <div className="font-black text-slate-900">{displayName}</div>
              <div className="text-[11px] font-black text-emerald-600 uppercase">
                {user?.role || "—"}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-slate-400" />
              <span>Account status: Active</span>
            </div>

            {user?.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{user.email}</span>
              </div>
            )}
          </div>

          {avatarError && (
            <div className="mt-4 text-xs font-black text-rose-600">
              {avatarError}
            </div>
          )}
        </div>

        {/* RIGHT CARD */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-black text-slate-900 flex items-center gap-2">
            <User2 className="h-5 w-5 text-slate-500" />
            Edit Profile
          </h2>

          <div className="mt-5">
            <label className="text-sm font-bold text-slate-700">Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your full name"
            />
            {fullName.trim().length > 0 && fullName.trim().length < 2 && (
              <p className="mt-2 text-xs font-bold text-rose-600">
                Name must be at least 2 characters.
              </p>
            )}
          </div>

          {(profileError || profileSuccess) && (
            <div className="mt-4">
              {profileError && (
                <div className="text-sm font-black text-rose-600">
                  {profileError}
                </div>
              )}
              {profileSuccess && (
                <div className="text-sm font-black text-emerald-600">
                  {profileSuccess}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onSave}
              disabled={profileSaving || fullName.trim().length < 2}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-blue-600 text-white font-black hover:bg-blue-700 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {profileSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>

      {/* ================= AVATAR MODAL ================= */}
      {avatarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeAvatarModal}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="font-black text-slate-900">Change profile photo</div>
              <button
                onClick={closeAvatarModal}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="current"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center font-black text-xl">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">
                    Upload a new photo
                  </p>
                  <p className="text-xs text-slate-500 font-semibold">
                    PNG / JPG / WEBP, max 2MB
                  </p>
                </div>
              </div>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onPickFile}
                className="block w-full text-sm"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={closeAvatarModal}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white font-black text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={onUploadAvatar}
                  disabled={!file || avatarUploading}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-700 disabled:opacity-60"
                >
                  {avatarUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
