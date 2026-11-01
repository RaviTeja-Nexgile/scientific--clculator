import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export type Theme = "dark" | "light";

const DEFAULT_THEME: Theme = "dark";

/**
 * Applies the current theme to the document root so the CSS variables in
 * `global.css` switch between the dark and light palettes.
 */
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === "light"}
      data-testid="theme-toggle"
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === "dark" ? "☀" : "☾"}
      </span>
      <span className={styles.text}>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
