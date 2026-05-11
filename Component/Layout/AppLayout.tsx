import Link from "next/link";

type AppLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/design-system" className="text-lg font-semibold tracking-tight">
            ShiftMate
          </Link>
          <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Design System
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-zinc-500 sm:px-6 lg:px-8">
          Component showcase route for ShiftMate UI building blocks.
        </div>
      </footer>
    </div>
  );
}
