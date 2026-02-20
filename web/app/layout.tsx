import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'TutorMaven',
  description:
    'Hyper-local tutor discovery, management, and AI-powered learning for India.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground">
        <div className="min-h-screen flex flex-col">
          <header className="px-4 py-3 md:px-8 md:py-4">
            <div className="glass-panel flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 shadow-lg" />
                <span className="font-semibold tracking-tight text-sm md:text-base">
                  TutorMaven
                </span>
              </div>
              <nav className="hidden md:flex items-center gap-6 text-xs text-muted-foreground">
                <a href="#students" className="hover:text-foreground">
                  Students
                </a>
                <a href="#tutors" className="hover:text-foreground">
                  Tutors
                </a>
                <a href="#parents" className="hover:text-foreground">
                  Parents
                </a>
                <a href="#admin" className="hover:text-foreground">
                  Admin
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1 px-4 pb-8 md:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

