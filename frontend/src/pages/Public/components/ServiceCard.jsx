import { ArrowRight, CreditCard, Fingerprint, CarFront, Globe, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const toneMap = {
  blue: {
    bar: "from-blue-600 via-slate-900 to-emerald-500/60",
    glow:
      "bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_90%_10%,rgba(16,185,129,0.10),transparent_52%)]",
    btn: "from-blue-600 to-slate-900 shadow-blue-600/15 hover:shadow-blue-600/20",
    chip: "text-blue-700 border-blue-200/60 bg-white/30",
    chipIcon: "text-blue-600",
  },
  emerald: {
    bar: "from-emerald-600 via-slate-900 to-blue-600/60",
    glow:
      "bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.14),transparent_55%),radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.12),transparent_52%)]",
    btn: "from-slate-900 to-emerald-600 shadow-emerald-600/12 hover:shadow-emerald-600/18",
    chip: "text-emerald-700 border-emerald-200/60 bg-white/30",
    chipIcon: "text-emerald-600",
  },
  slate: {
    bar: "from-slate-900 via-blue-600/70 to-emerald-500/40",
    glow:
      "bg-[radial-gradient(circle_at_20%_20%,rgba(2,132,199,0.12),transparent_55%),radial-gradient(circle_at_90%_10%,rgba(16,185,129,0.10),transparent_52%)]",
    btn: "from-blue-600 to-emerald-600 shadow-emerald-600/10 hover:shadow-emerald-600/16",
    chip: "text-slate-700 border-slate-200/70 bg-white/30",
    chipIcon: "text-slate-600",
  },
};

function FeatureChip({ icon, title, sub, tone }) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-2xl border px-4 py-3",
        "bg-white/30 backdrop-blur-md shadow-sm",
        "transition duration-300",
        "hover:bg-white/40 hover:-translate-y-[1px]",
        tone.chip,
      ].join(" ")}
    >
      <div className={["shrink-0", tone.chipIcon].join(" ")}>{icon}</div>
      <div className="leading-tight">
        <div className="text-[13px] font-black">{title}</div>
        <div className="text-[12px] font-semibold opacity-80">{sub}</div>
      </div>
    </div>
  );
}

export default function ServiceCard({
  title,
  desc,
  to = "/book",
  tone = "blue",
  features = [],
}) {
  const t = toneMap[tone] || toneMap.blue;

  return (
    <div
      className="
        group relative overflow-hidden rounded-3xl
        border border-white/25 bg-white/55 backdrop-blur-md
        shadow-[0_20px_60px_rgba(2,6,23,0.12)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(2,6,23,0.18)]
      "
    >
      {/* glow */}
      <div
        className={[
          "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          t.glow,
        ].join(" ")}
      />

      {/* top bar */}
      <div className={["h-1 w-full bg-gradient-to-r", t.bar].join(" ")} />

      <div className="relative p-6 md:p-7">
        {/* title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-black text-slate-900">
              {title}
            </h3>
          </div>

          <Link
            to={to}
            className={[
              "shrink-0 inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-extrabold text-sm text-white",
              "bg-gradient-to-r shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-lg active:scale-[0.98]",
              t.btn,
            ].join(" ")}
          >
            Apply <ArrowRight size={16} />
          </Link>
        </div>

        {/* description */}
        <p className="mt-4 text-sm md:text-[15px] text-slate-700 leading-relaxed">
          {desc}
        </p>

        {/* ✅ Transparent shapes (meesha casaanka ah) */}
        {features?.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-3">
            {features.map((f, idx) => (
              <FeatureChip
                key={idx}
                icon={f.icon}
                title={f.title}
                sub={f.sub}
                tone={t}
              />
            ))}
          </div>
        )}

        {/* subtle bottom line */}
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
      </div>
    </div>
  );
}

/**
 * ✅ Icons helper (haddii aad rabto inaad meel kale ka isticmaasho)
 */
export const ServiceIcons = {
  driving: (
    <div className="relative">
      <CarFront size={20} />
    </div>
  ),
  id: (
    <div className="relative">
      <CreditCard size={20} />
    </div>
  ),
  passport: (
    <div className="relative">
      <Globe size={20} />
    </div>
  ),
  fingerprint: <Fingerprint size={20} />,
  shield: <ShieldCheck size={20} />,
};
