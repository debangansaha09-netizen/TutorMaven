export default function ParentDashboardPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 md:gap-6">
      <section className="glass-panel px-5 py-5 md:px-7 md:py-6">
        <h1 className="text-lg font-semibold tracking-tight md:text-xl">
          Parent view
        </h1>
        <p className="mt-1 text-xs text-slate-300 md:text-sm">
          Linked access to your child&apos;s attendance, fees, tutors, and AI
          quiz performance.
        </p>
      </section>
    </div>
  );
}

