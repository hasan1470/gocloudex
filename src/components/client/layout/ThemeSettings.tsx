"use client";
import { useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Settings, X, Check, Moon, Sun } from "lucide-react";

const colors = [
  { name: "Blue", value: "rgb(59 130 246)", dark: "rgb(37 99 235)" },
  { name: "Purple", value: "rgb(147 51 234)", dark: "rgb(126 34 206)" },
  { name: "Green", value: "rgb(22 163 74)", dark: "rgb(21 128 61)" },
  { name: "Red", value: "rgb(220 26 26)", dark: "rgb(185 28 28)" },
  { name: "Orange", value: "rgb(234 88 12)", dark: "rgb(194 65 12)" },
];
const fonts = [
  {
    name: "Inter",
    value: "'Inter', sans-serif",
    css: "var(--font-inter), Arial, sans-serif",
  },
  { name: "Serif", value: "'Merriweather', serif", css: "Georgia, serif" },
  {
    name: "Mono",
    value: "'JetBrains Mono', monospace",
    css: "ui-monospace, monospace",
  },
  {
    name: "Modern",
    value: "'Plus Jakarta Sans', sans-serif",
    css: "system-ui, sans-serif",
  },
];
function subscribe(callback: () => void) {
  window.addEventListener("gocloudex-appearance", callback);
  return () => window.removeEventListener("gocloudex-appearance", callback);
}
function read(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Keep session settings usable when storage is unavailable. */
  }
  window.dispatchEvent(new Event("gocloudex-appearance"));
}

export default function ThemeSettings() {
  const dialog = useRef<HTMLDialogElement>(null);
  const { theme, setTheme } = useTheme();
  const color = useSyncExternalStore(
    subscribe,
    () => read("theme-color", colors[0].value),
    () => colors[0].value,
  );
  const font = useSyncExternalStore(
    subscribe,
    () => read("theme-font", fonts[0].value),
    () => fonts[0].value,
  );
  function chooseColor(value: string) {
    const selected = colors.find((item) => item.value === value) || colors[0];
    document.documentElement.style.setProperty(
      "--primary-color",
      selected.value,
    );
    document.documentElement.style.setProperty(
      "--primary-color-dark",
      selected.dark,
    );
    save("theme-color", selected.value);
  }
  function chooseFont(value: string) {
    const selected = fonts.find((item) => item.value === value) || fonts[0];
    document.documentElement.style.setProperty("--heading-font", selected.css);
    document.documentElement.style.setProperty("--body-font", selected.css);
    save("theme-font", selected.value);
  }
  return (
    <>
      <button
        className="gc-theme-trigger"
        type="button"
        aria-label="Appearance settings"
        onClick={() => dialog.current?.showModal()}
      >
        <Settings size={18} />
      </button>
      <dialog
        ref={dialog}
        className="gc-theme-dialog"
        aria-labelledby="appearance-heading"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="gc-theme-inner">
          <div className="gc-theme-title">
            <h2 id="appearance-heading">Appearance</h2>
            <button
              type="button"
              aria-label="Close appearance settings"
              onClick={() => dialog.current?.close()}
            >
              <X size={20} />
            </button>
          </div>
          <fieldset>
            <legend>Color mode</legend>
            <div className="gc-theme-options">
              <button
                type="button"
                aria-pressed={theme !== "dark"}
                onClick={() => setTheme("light")}
              >
                <Sun size={16} />
                Light
              </button>
              <button
                type="button"
                aria-pressed={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                <Moon size={16} />
                Dark
              </button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Accent color</legend>
            <div className="gc-theme-colors">
              {colors.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={item.name}
                  aria-pressed={color === item.value}
                  style={{ background: item.value }}
                  onClick={() => chooseColor(item.value)}
                >
                  {color === item.value && <Check size={18} />}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Typography</legend>
            <div className="gc-theme-options">
              {fonts.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={font === item.value}
                  onClick={() => chooseFont(item.value)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            className="gc-theme-reset"
            onClick={() => {
              setTheme("light");
              chooseColor(colors[0].value);
              chooseFont(fonts[0].value);
            }}
          >
            Reset to defaults
          </button>
        </div>
      </dialog>
    </>
  );
}
