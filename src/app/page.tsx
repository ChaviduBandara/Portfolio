import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="page-container flex min-h-screen items-center py-16">
      <div className="w-full rounded-3xl border border-border bg-surface px-6 py-12 shadow-sm sm:px-12 sm:py-16">
        <div className="mb-10 flex justify-end">
          <ThemeToggle />
        </div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Ready to build
        </p>
        <h1 className="page-title max-w-3xl font-semibold">Portfolio Foundation</h1>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          Project setup completed successfully
        </p>
      </div>
    </main>
  );
}
