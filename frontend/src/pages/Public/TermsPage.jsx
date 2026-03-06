// TermsPage.jsx (or .tsx)
export default function TermsPage() {
  return (
    <main className="relative flex-1 overflow-hidden w-full">
      <div className="absolute inset-0 bg-slate-950/55 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-8 py-10 md:py-14">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-slate-200/85 font-semibold max-w-2xl mx-auto">
            Clear, simple terms for using Appointify.
          </p>
        </div>

        <div className="mt-8 rounded-[28px] bg-white/5 border border-white/12 backdrop-blur-2xl shadow-2xl shadow-black/35 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-600" />

          <div className="p-6 md:p-8 grid gap-4">
            <TermCard
              title="Using the Service"
              text="Use Appointify lawfully and responsibly. Do not misuse, disrupt, or attempt to access restricted areas of the system."
            />
            <TermCard
              title="Your Information"
              text="You are responsible for the accuracy of the details you submit (name, documents, dates, and contact information)."
            />
            <TermCard
              title="Appointments & Scheduling"
              text="Appointments depend on provider availability. Times may change, and we may notify you when updates occur."
            />
            <TermCard
              title="Limitations"
              text="Appointify helps you request and track appointments. Final decisions and service delivery remain with the provider."
            />
            <TermCard
              title="Updates to These Terms"
              text="We may update these terms from time to time. Continued use of Appointify means you accept the latest version."
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function TermCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_22px_70px_-55px_rgba(37,99,235,0.45)] p-4 md:p-5 transition hover:bg-white/7 hover:border-white/14">
      <h3 className="font-black text-white">{title}</h3>
      <p className="mt-2 text-[13.5px] md:text-sm font-semibold text-slate-200/85 leading-relaxed">
        {text}
      </p>
    </div>
  );
}