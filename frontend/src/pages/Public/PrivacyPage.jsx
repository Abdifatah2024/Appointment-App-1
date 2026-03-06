// PrivacyPage.jsx (or .tsx)
export default function PrivacyPage() {
  return (
    <main className="relative flex-1 w-full overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/55 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-8 py-10 md:py-14">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-200/85 font-semibold max-w-2xl mx-auto">
            We protect your data and use it only to provide and improve Appointify.
          </p>
        </div>

        <div className="mt-8 rounded-[28px] bg-white/5 border border-white/12 backdrop-blur-2xl shadow-2xl shadow-black/35 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-600" />

          <div className="p-6 md:p-8 grid gap-4">
            <PolicyCard
              title="What We Collect"
              text="Information you submit such as your name, contact details, appointment details, and any required documents."
            />
            <PolicyCard
              title="How We Use Your Data"
              text="To create, manage, and track appointments, communicate updates, and maintain service reliability."
            />
            <PolicyCard
              title="Sharing"
              text="We share data only with the service provider required to fulfill your appointment, or when legally required."
            />
            <PolicyCard
              title="Security"
              text="We use reasonable technical and organizational measures to protect your information from unauthorized access."
            />
            <PolicyCard
              title="Your Choices"
              text="You can request corrections or ask questions about your data by contacting our support team."
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function PolicyCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_22px_70px_-55px_rgba(37,99,235,0.45)] p-4 md:p-5 transition hover:bg-white/7 hover:border-white/14">
      <h3 className="font-black text-white">{title}</h3>
      <p className="mt-2 text-[13.5px] md:text-sm font-semibold text-slate-200/85 leading-relaxed">
        {text}
      </p>
    </div>
  );
}