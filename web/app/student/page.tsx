export default function StudentDashboardPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 md:gap-6">
      <section className="glass-panel px-5 py-5 md:px-7 md:py-6">
        <h1 className="text-lg font-semibold tracking-tight md:text-xl">
          My Learning
        </h1>
        <p className="mt-1 text-xs text-slate-300 md:text-sm">
          Enrolled tutors, attendance, fees status, and AI-powered practice in
          one place.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold">Enrolled tutors</h2>
          <p className="mt-1 text-[11px] text-slate-300">
            Quickly see all active tutors and classes by subject and board.
          </p>
        </div>
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold">Attendance & fees</h2>
          <p className="mt-1 text-[11px] text-slate-300">
            Track sessions attended and pending fees across tutors.
          </p>
        </div>
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold">AI quiz center</h2>
          <p className="mt-1 text-[11px] text-slate-300">
            Practice daily with class-wise, subject-wise, and chapter-wise MCQs
            with instant feedback.
          </p>
        </div>
      </section>
    </div>
  );
}

