'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from 'next-themes';
import {
    Settings,
    X,
    Type,
    Palette,
    Check,
    Moon,
    Sun
} from 'lucide-react';

const COLORS = [
    { name: 'Blue', value: 'rgb(59 130 246)', darkValue: 'rgb(37 99 235)' },
    { name: 'Purple', value: 'rgb(147 51 234)', darkValue: 'rgb(126 34 206)' },
    { name: 'Green', value: 'rgb(22 163 74)', darkValue: 'rgb(21 128 61)' },
    { name: 'Red', value: 'rgb(220 26 26)', darkValue: 'rgb(185 28 28)' },
    { name: 'Orange', value: 'rgb(234 88 12)', darkValue: 'rgb(194 65 12)' },
];

const FONTS = [
    { name: 'Inter', value: "'Inter', sans-serif", heading: "'Inter', sans-serif" },
    { name: 'Serif', value: "'Merriweather', serif", heading: "'Merriweather', serif" },
    { name: 'Mono', value: "'JetBrains Mono', monospace", heading: "'JetBrains Mono', monospace" },
    { name: 'Modern', value: "'Plus Jakarta Sans', sans-serif", heading: "'Plus Jakarta Sans', sans-serif" },
];

export default function ThemeSettings() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Local state for current selections
    const [primaryColor, setPrimaryColor] = useState(COLORS[0].value);
    const [currentFont, setCurrentFont] = useState(FONTS[0].value);

    useEffect(() => {
        setMounted(true);
        // Initialize from CSS variables if possible, or defaults
        const root = document.documentElement;
        // Check saved preferences
        const savedColor = localStorage.getItem('theme-color');
        const savedFont = localStorage.getItem('theme-font');

        if (savedColor) {
            handleColorChange(savedColor, false);
        }
        if (savedFont) {
            handleFontChange(savedFont, false);
        }
    }, []);

    const handleColorChange = (colorValue: string, save = true) => {
        const colorObj = COLORS.find(c => c.value === colorValue) || COLORS[0];
        setPrimaryColor(colorValue);

        const root = document.documentElement;
        root.style.setProperty('--primary-color', colorValue);
        root.style.setProperty('--primary-color-dark', colorObj.darkValue);

        if (save) localStorage.setItem('theme-color', colorValue);
    };

    const handleFontChange = (fontValue: string, save = true) => {
        const fontObj = FONTS.find(f => f.value === fontValue) || FONTS[0];
        setCurrentFont(fontValue);

        const root = document.documentElement;
        root.style.setProperty('--heading-font', fontObj.heading);
        root.style.setProperty('--body-font', fontObj.value);

        if (save) localStorage.setItem('theme-font', fontValue);
    };

    if (!mounted) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full hover:bg-input text-textLight transition-colors"
                aria-label="Theme Settings"
            >
                <Settings className="h-5 w-5" />
            </button>

            {/* Render sidebar in a Portal to break out of Header's stacking context (backdrop-filter) */}
            {createPortal(
                <>
                    {/* Backdrop */}
                    <div
                        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[9990] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                            }`}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Sidebar Panel */}
                    <div
                        className={`fixed inset-y-0 right-0 z-[9991] w-80 bg-bgLight shadow-2xl p-6 overflow-y-auto border-l border-border transform transition-transform duration-300 ease-in-out h-[100dvh] ${isOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-headingLight heading-style">Theme Settings</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-input rounded-full text-textLight"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Mode Toggle */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-textLight uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Sun className="h-4 w-4" /> Appearance
                            </h3>
                            <div className="flex bg-input p-1 rounded-lg">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 text-style ${theme === 'light' ? 'bg-white shadow-sm text-headingLight' : 'text-textLight hover:text-headingLight'
                                        }`}
                                >
                                    <Sun className="h-4 w-4" /> Light
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 text-style ${theme === 'dark' ? 'bg-gray-700 text-white shadow-sm' : 'text-textLight hover:text-headingLight'
                                        }`}
                                >
                                    <Moon className="h-4 w-4" /> Dark
                                </button>
                            </div>
                        </div>

                        {/* Color Picker */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-textLight uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Palette className="h-4 w-4" /> Primary Color
                            </h3>
                            <div className="grid grid-cols-5 gap-3">
                                {COLORS.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => handleColorChange(color.value)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 relative"
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    >
                                        {primaryColor === color.value && (
                                            <Check className="h-5 w-5 text-white drop-shadow-md" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Font Picker */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-textLight uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Type className="h-4 w-4" /> Typography
                            </h3>
                            <div className="space-y-2">
                                {FONTS.map((font) => (
                                    <button
                                        key={font.name}
                                        onClick={() => handleFontChange(font.value)}
                                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${currentFont === font.value
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-border hover:border-primary/50 text-textLight'
                                            }`}
                                    >
                                        <span style={{ fontFamily: font.value }} className="text-lg">Aa</span>
                                        <span className="ml-3 text-sm font-medium text-style">{font.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border mt-auto">
                            <button
                                onClick={() => {
                                    setTheme('light');
                                    handleColorChange(COLORS[0].value);
                                    handleFontChange(FONTS[0].value);
                                }}
                                className="w-full py-2.5 text-sm font-medium text-textLight hover:text-redType hover:bg-redType/10 rounded-lg transition-colors text-style"
                            >
                                Reset to Defaults
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}
        </>
    );
}
