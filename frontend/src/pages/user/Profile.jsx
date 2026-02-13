// import React from "react";

// export default function Profile() {
//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold">Profile</h1>
//       <p className="text-slate-500 mt-2">Coming soon...</p>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Save, User2, Shield, Mail } from "lucide-react";
import {
  updateMyProfile,
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
  const { user, profileSaving, profileError, profileSuccess } = useSelector(
    (s) => s.auth
  );

  const displayName = user?.fullName || user?.name || user?.username || "User";
  const initials = useMemo(() => getInitials(displayName), [displayName]);

  const [fullName, setFullName] = useState(displayName);

  useEffect(() => {
    setFullName(displayName);
  }, [displayName]);

  useEffect(() => {
    // clear toast/messages after 3s
    if (profileError || profileSuccess) {
      const t = setTimeout(() => dispatch(clearProfileMessage()), 3000);
      return () => clearTimeout(t);
    }
  }, [profileError, profileSuccess, dispatch]);

  const onSave = async () => {
    const next = fullName.trim();
    if (next.length < 2) return;

    await dispatch(updateMyProfile({ fullName: next }));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-black text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account information (edit name).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg">
              {initials}
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
    </div>
  );
}
