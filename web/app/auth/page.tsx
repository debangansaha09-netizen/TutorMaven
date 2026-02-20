export default function AuthLandingPage() {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-xl font-semibold tracking-tight">
        Sign in to TutorMaven
      </h1>
      <p className="text-xs text-slate-300">
        Continue as a student, tutor, parent, or admin using email or Google.
      </p>
      <div className="mt-4 flex flex-col gap-2 text-xs">
        <a
          href="/auth/login?role=STUDENT"
          className="glass-panel block px-3 py-2 hover:bg-white/10"
        >
          Continue as Student
        </a>
        <a
          href="/auth/login?role=TUTOR"
          className="glass-panel block px-3 py-2 hover:bg-white/10"
        >
          Continue as Tutor
        </a>
        <a
          href="/auth/login?role=PARENT"
          className="glass-panel block px-3 py-2 hover:bg-white/10"
        >
          Continue as Parent
        </a>
        <a
          href="/auth/login?role=ADMIN"
          className="glass-panel block px-3 py-2 hover:bg-white/10"
        >
          Continue as Admin
        </a>
      </div>
    </div>
  );
}

