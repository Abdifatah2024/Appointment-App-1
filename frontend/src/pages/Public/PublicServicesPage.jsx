import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Driving License Application",
    desc: [
      "Codso laysanka darawalnimada si degdeg ah.",
      "Buuxi xogta, dooro waqtiga, kuna gudbi dokumentiyada loo baahan yahay.",
      "Natiijo degdeg ah oo la socod sahlan.",
    ],
    to: "/book",
    accent: "from-sky-500 via-blue-600 to-indigo-600",
    ring: "shadow-blue-500/20",
    preview: "/previews/driving.png",
  },
  {
    title: "National ID Registration",
    desc: [
      "Diiwaangeli ama cusboonaysii Kaarka Aqoonsiga.",
      "Xaqiiji xogtaada, kuna lifaaq dokumentiyada muhiimka ah.",
      "Hab fudud oo degdeg u socda.",
    ],
    to: "/book",
    accent: "from-emerald-500 via-teal-600 to-cyan-600",
    ring: "shadow-emerald-500/20",
    preview: "/previews/idcard.png",
  },
  {
    title: "Passport Application",
    desc: [
      "Dalbo ama cusboonaysii baasaboorka.",
      "Buuxi foomka, raac talaabooyinka, oo gudbi codsigaaga.",
      "La soco xaaladda codsiga si toos ah.",
    ],
    to: "/book",
    accent: "from-indigo-500 via-blue-600 to-sky-500",
    ring: "shadow-indigo-500/20",
    preview: "/previews/passport.png",
  },
];

export default function PublicServicesPage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* overlay (layout bg ayuu saaran yahay) */}
      <div className="absolute inset-0 bg-white/35" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 pt-10 md:pt-12 pb-6 w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Services
          </h1>

          <p className="mt-4 text-slate-700 font-semibold max-w-2xl mx-auto leading-relaxed">
            Dooro adeegga aad u baahan tahay, kadib sii fudud ugu gudub foomka
            codsiga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} item={s} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ServiceCard({ item }) {
  return (
    <div className="group relative rounded-[26px] bg-white/75 backdrop-blur-md border border-white/60 shadow-xl shadow-slate-900/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/15 flex flex-col">
      <div className={`h-1.5 bg-gradient-to-r ${item.accent}`} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black text-slate-900 leading-snug">
            {item.title}
          </h3>

          <Link
            to={item.to}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-white text-sm bg-gradient-to-r ${item.accent} shadow-lg ${item.ring} transition-all duration-300 hover:brightness-110 hover:-translate-y-[1px] focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
          >
            Apply
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm p-4 min-h-[132px]">
          <div className="text-[13.5px] text-slate-700 font-semibold leading-relaxed space-y-2">
            {item.desc.map((t, i) => (
              <p key={i} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>{t}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-5">
          <div className="relative rounded-2xl overflow-hidden bg-white/35 border border-white/50 shadow-sm">
            <img
              src={item.preview}
              alt={item.title}
              className="w-full h-[170px] md:h-[180px] object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
