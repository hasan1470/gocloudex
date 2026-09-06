export const appearanceColors = [
  {
    name: "Teal",
    key: "teal",
    value: "rgb(17 126 116)",
    solid: "#0f746b",
    light: "#a5e8da",
    deep: "#143c3c",
  },
  {
    name: "Blue",
    key: "blue",
    value: "rgb(59 130 246)",
    solid: "#255ccb",
    light: "#b7d4ff",
    deep: "#183454",
  },
  {
    name: "Purple",
    key: "purple",
    value: "rgb(147 51 234)",
    solid: "#783db6",
    light: "#ddc3fa",
    deep: "#352748",
  },
  {
    name: "Green",
    key: "green",
    value: "rgb(22 163 74)",
    solid: "#257342",
    light: "#b8e6c5",
    deep: "#233f30",
  },
  {
    name: "Red",
    key: "red",
    value: "rgb(220 26 26)",
    solid: "#b73548",
    light: "#ffc4cd",
    deep: "#482b37",
  },
  {
    name: "Orange",
    key: "orange",
    value: "rgb(234 88 12)",
    solid: "#ad4c16",
    light: "#ffd1aa",
    deep: "#463425",
  },
] as const;

export const appearanceFonts = [
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
] as const;

export const appearanceSizes = [
  { name: "Standard", value: "16", label: "Clear, comfortable text" },
  { name: "Larger", value: "18", label: "Extra reading comfort" },
] as const;

export function applyAccent(color: (typeof appearanceColors)[number]) {
  const root = document.documentElement;
  root.dataset.accent = color.key;
  root.style.setProperty("--accent-solid", color.solid);
  root.style.setProperty("--accent-light", color.light);
  root.style.setProperty("--accent-deep", color.deep);
}

// Runs before paint, using only allowlisted preferences. Also synchronizes open tabs.
export const appearanceBootstrap = `(() => {
  const preferences = ${JSON.stringify({ colors: appearanceColors, fonts: appearanceFonts, sizes: appearanceSizes })};
  function restore() {
    try {
      const root = document.documentElement;
      const color = preferences.colors.find(item => item.value === localStorage.getItem('theme-color')) || preferences.colors[0];
      const font = preferences.fonts.find(item => item.value === localStorage.getItem('theme-font')) || preferences.fonts[0];
      const size = preferences.sizes.find(item => item.value === localStorage.getItem('theme-size')) || preferences.sizes[0];
      root.dataset.accent = color.key;
      root.style.setProperty('--accent-solid', color.solid);
      root.style.setProperty('--accent-light', color.light);
      root.style.setProperty('--accent-deep', color.deep);
      root.style.setProperty('--heading-font', font.css);
      root.style.setProperty('--body-font', font.css);
      root.style.setProperty('--reading-size', size.value + 'px');
    } catch (_) {}
  }
  restore();
  window.addEventListener('storage', restore);
})();`;
