import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/slices/userSlices/authSlice";
import { useNavigate } from "react-router-dom";
// 1. Added Eye and EyeOff to imports
import { Mail, Lock, CheckCircle, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((s) => s.auth);

  // 2. State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: form.email.trim(),
        password: form.password,
      })
    );
  };

  // Helper to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 relative overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md relative">
        {/* LOGO AREA */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 mb-4">
            <CheckCircle className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Appoint<span className="text-emerald-500">Me</span>
          </h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">
            Secure Administrator Access
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-slate-400 text-sm font-medium">
              Please enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] font-bold text-blue-600 hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                {/* Lock Icon (Left) */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={20} />
                </div>
                
                <input
                  name="password"
                  // 3. Conditional Type: Toggle between text and password
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  // Changed pr-4 to pr-12 so text doesn't go under the eye icon
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
                />

                {/* 4. Toggle Button (Right) */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <p className="font-bold">{error}</p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} AppointMe Enterprise System
          </p>
          <div className="flex justify-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <button className="hover:text-blue-500 transition-colors">
              Privacy
            </button>
            <span>•</span>
            <button className="hover:text-blue-500 transition-colors">
              Terms
            </button>
            <span>•</span>
            <button className="hover:text-blue-500 transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}