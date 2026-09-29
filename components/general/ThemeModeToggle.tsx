"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  try {
    window.localStorage.setItem("neuvault-theme", theme);
  } catch {
    // Private windows can refuse storage; the switch still works for this visit.
  }
}

const options: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { mode: "light", label: "Light", Icon: Sun },
  { mode: "dark", label: "Dark", Icon: Moon },
];

/**
 * Floating light/dark switch, pinned to the corner of every page so nobody has
 * to scroll back to the navbar. The thumb slides to the active mode.
 */
export default function ThemeModeToggle() {
  const [theme, setTheme] = useState<ThemeMode | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  // Render nothing until the real theme is known, so the thumb never jumps.
  if (!theme) return null;

  return (
    <div className="theme-float" role="radiogroup" aria-label="Colour theme" data-mode={theme}>
      <span className="theme-float-thumb" aria-hidden="true" />
      {options.map(({ mode, label, Icon }) => (
        <button
          key={mode}
          type="button"
          role="radio"
          aria-checked={theme === mode}
          aria-label={`${label} mode`}
          title={`${label} mode`}
          className="theme-float-option"
          onClick={() => {
            applyTheme(mode);
            setTheme(mode);
          }}
        >
          <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
