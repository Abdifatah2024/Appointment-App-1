export default function AboutPage() {
  return (
    <main className="relative w-full flex-1 overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-white/35" />

      <div className="relative mx-auto max-w-4xl w-full px-4 md:px-8 py-10">
        <div className="rounded-[32px] bg-white/40 border border-white/55 backdrop-blur-2xl shadow-2xl shadow-slate-900/10 p-7 md:p-9">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            About Us
          </h2>

          <p className="mt-3 text-slate-700 font-semibold leading-relaxed max-w-2xl">
            Appointify helps citizens book services online, reduce queues, and
            track status using a unique tracking ID.
          </p>

          <div className="mt-6 rounded-2xl bg-white/60 border border-white/70 p-5">
            <p className="text-slate-700 font-semibold leading-relaxed">
              Our goal is to make government services easier, faster, and more
              transparent for everyone.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
