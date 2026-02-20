import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
      <div className="glass-panel w-full px-6 py-8 md:px-8 md:py-10">
        {children}
      </div>
    </div>
  );
}

