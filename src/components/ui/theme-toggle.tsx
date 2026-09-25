"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent"
      title="Toggle color theme"
    >
      <Moon className="theme-toggle__moon size-5" aria-hidden="true" />
      <Sun className="theme-toggle__sun size-5" aria-hidden="true" />
      <span className="sr-only theme-toggle__dark-label">Switch to dark theme</span>
      <span className="sr-only theme-toggle__light-label">Switch to light theme</span>
    </button>
  );
}
