export default function LandingPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 md:gap-10">
      <section className="glass-panel px-6 py-8 md:px-10 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 md:space-y-4">
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-200">
              Hyper-local tutoring for India
            </p>
            <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
              Find the right tutor,
              <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                {' '}
                master every chapter.
              </span>
            </h1>
            <p className="max-w-xl text-xs text-slate-300 md:text-sm">
              TutorMaven connects students, tutors, and parents with structured
              classes, transparent fees, attendance tracking, and AI-powered
              quizzes aligned to Indian boards.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-xs md:mt-0 md:text-sm">
            <button className="glass-panel flex items-center justify-center bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-xs font-medium text-slate-50 shadow-lg shadow-indigo-500/40 md:px-5 md:py-2.5">
              Find tutors on map
            </button>
            <div className="flex gap-1 text-[11px] text-slate-300 md:gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-200">
                Students
              </span>
              <span className="rounded-full bg-sky-500/10 px-2 py-1 text-sky-200">
                Tutors
              </span>
              <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-indigo-200">
                Parents
              </span>
              <span className="hidden rounded-full bg-fuchsia-500/10 px-2 py-1 text-fuchsia-200 md:inline">
                Admin
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="students"
        className="grid gap-4 md:grid-cols-3 md:gap-5 lg:gap-6"
      >
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold tracking-tight md:text-base">
            Students
          </h2>
          <p className="mt-1 text-[11px] text-slate-300 md:text-xs">
            Discover tutors by subject, class, location, and fees. Practice
            daily with AI-generated quizzes aligned to CBSE, ICSE, and state
            boards.
          </p>
        </div>
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold tracking-tight md:text-base">
            Tutors
          </h2>
          <p className="mt-1 text-[11px] text-slate-300 md:text-xs">
            Publish your classes, manage students and attendance, and assign
            AI-powered quizzes to personalize every session.
          </p>
        </div>
        <div className="glass-panel p-4 md:p-5">
          <h2 className="text-sm font-semibold tracking-tight md:text-base">
            Parents & Admin
          </h2>
          <p className="mt-1 text-[11px] text-slate-300 md:text-xs">
            Track attendance, fees, and learning outcomes securely. Review
            tutor reports and verification from a single, trusted panel.
          </p>
        </div>
      </section>
    </div>
  );
}

