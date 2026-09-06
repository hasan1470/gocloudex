"use client";

import { useId, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Settings, X, Check, Moon, Sun } from "lucide-react";
import {
  appearanceColors as colors,
  appearanceFonts as fonts,
  appearanceSizes as sizes,
  applyAccent,
} from "@/lib/appearance";

const sessionPreferences = new Map<string, string>();
function subscribe(callback: () => void) {
  const syncStorage = () => {
    sessionPreferences.clear();
    callback();
  };
  window.addEventListener("gocloudex-appearance", callback);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener("gocloudex-appearance", callback);
    window.removeEventListener("storage", syncStorage);
  };
}
function read(key: string, fallback: string) {
  if (sessionPreferences.has(key)) return sessionPreferences.get(key)!;
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: string) {
  sessionPreferences.set(key, value);
  try {
    localStorage.setItem(key, value);
  } catch {
    /* The current page remains usable when storage is blocked. */
  }
  window.dispatchEvent(new Event("gocloudex-appearance"));
}

export default function ThemeSettings({ label }: { label?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const mode = hydrated ? resolvedTheme : "light";
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
  const size = useSyncExternalStore(
    subscribe,
    () => read("theme-size", sizes[0].value),
    () => sizes[0].value,
  );
  const selectedColor =
    colors.find((item) => item.value === color) || colors[0];
  const selectedFont = fonts.find((item) => item.value === font) || fonts[0];
  const selectedSize = sizes.find((item) => item.value === size) || sizes[0];

  function chooseColor(value: string) {
    const selected = colors.find((item) => item.value === value) || colors[0];
    applyAccent(selected);
    save("theme-color", selected.value);
  }
  function chooseFont(value: string) {
    const selected = fonts.find((item) => item.value === value) || fonts[0];
    document.documentElement.style.setProperty("--heading-font", selected.css);
    document.documentElement.style.setProperty("--body-font", selected.css);
    save("theme-font", selected.value);
  }
  function chooseSize(value: string) {
    const selected = sizes.find((item) => item.value === value) || sizes[0];
    document.documentElement.style.setProperty(
      "--reading-size",
      selected.value + "px",
    );
    save("theme-size", selected.value);
  }

  return (
    <>
      <button
        className={
          label
            ? "gc-theme-trigger gc-theme-trigger-labeled"
            : "gc-theme-trigger"
        }
        type="button"
        aria-label="Appearance settings"
        onClick={() => dialog.current?.showModal()}
      >
        <Settings size={20} aria-hidden="true" />
        {label && <span>{label}</span>}
      </button>
      <dialog
        ref={dialog}
        className="gc-theme-dialog"
        aria-labelledby={headingId}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="gc-theme-inner">
          <div className="gc-theme-title">
            <h2 id={headingId}>Appearance</h2>
            <button
              type="button"
              aria-label="Close appearance settings"
              onClick={() => dialog.current?.close()}
            >
              <X size={22} />
            </button>
          </div>
          <p className="gc-theme-description">
            Make the website comfortable for you.
          </p>
          <fieldset>
            <legend>Color mode</legend>
            <div className="gc-theme-options">
              <button
                type="button"
                aria-pressed={mode !== "dark"}
                onClick={() => setTheme("light")}
              >
                <Sun size={18} /> Light
              </button>
              <button
                type="button"
                aria-pressed={mode === "dark"}
                onClick={() => setTheme("dark")}
              >
                <Moon size={18} /> Dark
              </button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Color palette</legend>
            <div className="gc-theme-colors">
              {colors.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  aria-label={item.name}
                  aria-pressed={selectedColor.key === item.key}
                  onClick={() => chooseColor(item.value)}
                >
                  <span
                    className="gc-theme-swatch"
                    style={{ background: item.solid }}
                  >
                    {selectedColor.key === item.key && (
                      <Check size={18} aria-hidden="true" />
                    )}
                  </span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Text size</legend>
            <div className="gc-theme-options gc-size-options">
              {sizes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={selectedSize.value === item.value}
                  onClick={() => chooseSize(item.value)}
                >
                  <strong>{item.name}</strong>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Font style</legend>
            <div className="gc-theme-options">
              {fonts.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={selectedFont.value === item.value}
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
              chooseSize(sizes[0].value);
            }}
          >
            Reset to defaults
          </button>
        </div>
      </dialog>
    </>
  );
}
