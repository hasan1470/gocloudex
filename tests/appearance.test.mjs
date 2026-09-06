import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import {
  appearanceColors,
  appearanceBootstrap,
} from "../src/lib/appearance.ts";

function contrast(a, b) {
  const luminance = (hex) => {
    const rgb = hex
      .match(/[a-f\d]{2}/gi)
      .map((value) => parseInt(value, 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("every palette provides readable primary buttons and hero accents", () => {
  for (const color of appearanceColors) {
    assert.ok(
      contrast(color.solid, "#ffffff") >= 4.5,
      color.name + " primary button",
    );
    assert.ok(
      contrast(color.light, color.deep) >= 4.5,
      color.name + " hero button",
    );
  }
});

function restore(saved, blocked = false) {
  const properties = new Map();
  const root = {
    dataset: {},
    style: { setProperty: (key, value) => properties.set(key, value) },
  };
  const events = {};
  vm.runInNewContext(appearanceBootstrap, {
    document: { documentElement: root },
    localStorage: {
      getItem: (key) => {
        if (blocked) throw Error("blocked");
        return saved[key] || null;
      },
    },
    window: {
      addEventListener: (name, handler) => {
        events[name] = handler;
      },
    },
  });
  return { properties, root, events };
}

test("saved palette, font and reading size restore before paint and sync across tabs", () => {
  const saved = {
    "theme-color": "rgb(147 51 234)",
    "theme-font": "'Merriweather', serif",
    "theme-size": "18",
  };
  const result = restore(saved);
  assert.equal(result.root.dataset.accent, "purple");
  assert.equal(result.properties.get("--reading-size"), "18px");
  assert.equal(result.properties.get("--body-font"), "Georgia, serif");
  saved["theme-color"] = "rgb(59 130 246)";
  saved["theme-size"] = "16";
  result.events.storage();
  assert.equal(result.root.dataset.accent, "blue");
  assert.equal(result.properties.get("--reading-size"), "16px");
});

test("invalid preferences cannot inject CSS or an unreadable text size", () => {
  const result = restore({
    "theme-color": "transparent",
    "theme-font": "url(https://invalid.test)",
    "theme-size": "1",
  });
  assert.equal(result.root.dataset.accent, "teal");
  assert.equal(result.properties.get("--reading-size"), "16px");
  assert.equal(
    result.properties.get("--body-font"),
    "var(--font-inter), Arial, sans-serif",
  );
  assert.doesNotThrow(() => restore({}, true));
});
