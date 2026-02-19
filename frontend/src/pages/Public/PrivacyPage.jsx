export default function PrivacyPage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* ✅ Layout (PublicLayout) is handling MP4 background */}
      <div className="absolute inset-0 bg-white/35" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-8 py-10 md:py-14">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-700 font-semibold max-w-2xl mx-auto">
            Waxaan ilaalinaa xogtaada si ammaan ah oo waafaqsan nidaamka Appointify.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-[28px] bg-white/60 border border-white/70 backdrop-blur-xl shadow-xl shadow-slate-900/10 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-sky-500 via-blue-600 to-emerald-500" />

          <div className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Sida aan u maareyno xogta
            </h2>

            <div className="mt-4 grid gap-4">
              <InfoBox
                title="Xogta aan ururino"
                items={[
                  "Magaca, email/phone, iyo xogta codsiga adeegga.",
                  "Macluumaadka ballanta (taariikh/waqti) iyo tracking ID.",
                  "Dokumentiyada aad si ikhtiyaari ah u soo geliso (haddii la baahan yahay).",
                ]}
              />
              <InfoBox
                title="Ujeedada isticmaalka"
                items={[
                  "In aan kuu fududeyno booking & tracking.",
                  "In aan xaqiijino codsigaaga iyo dukumentiyada.",
                  "In aan hagaajino adeegga (analytics fudud).",
                ]}
              />
              <InfoBox
                title="Wadaagista xogta"
                items={[
                  "Xogta lama iibiyo, lama kiraysto.",
                  "Waxaa lala wadaagi karaa hay’adaha adeegga bixiya marka ay ku khuseyso codsigaaga.",
                ]}
              />
              <InfoBox
                title="Badbaadada"
                items={[
                  "Waxaan isticmaalnaa habab amni (access control, logging).",
                  "Haddii aad aragto khalad amni, nala soo xiriir Support.",
                ]}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/70 p-4">
              <p className="text-sm md:text-[15px] font-semibold text-slate-700 leading-relaxed">
                Haddii aad qabto su’aalo ku saabsan Privacy Policy, fadlan booqo{" "}
                <span className="font-black">Support</span> ama nagala soo xiriir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoBox({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm p-4 md:p-5">
      <h3 className="font-black text-slate-900">{title}</h3>
      <ul className="mt-2 space-y-2 text-[13.5px] md:text-sm font-semibold text-slate-700">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
