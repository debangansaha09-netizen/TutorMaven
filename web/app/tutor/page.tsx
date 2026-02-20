export default function TutorDashboardPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 md:gap-6">
      <section className="glass-panel px-5 py-5 md:px-7 md:py-6">
        <h1 className="text-lg font-semibold tracking-tight md:text-xl">
          Tutor workspace
        </h1>
        <p className="mt-1 text-xs text-slate-300 md:text-sm">
          Manage your profile, classes, students, attendance, and AI quizzes.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold">My classes</h2>
          <p className="mt-1 text-[11px] text-slate-300">
            Configure subjects, classes, modes (home, online, coaching), and
            fees.
          </p>
        </div>
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold">Students</h2>
          <p className="mt-1 text-[11px] text-slate-300">
            View students class-wise, mark attendance, and remove inactive
            learners.
          </p>
        </div>
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold">AI quizzes</h2>
          <p className="mt-1 text-[11px] text-slate-300">
            Create and assign AI-powered quizzes, then use analytics to
            personalize teaching.
          </p>
        </div>
      </section>
    </div>
  );
}

