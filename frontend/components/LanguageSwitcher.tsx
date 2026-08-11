"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦", rtl: true },
  { code: "he", label: "עברית", flag: "🇮🇱", rtl: true },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(LOCALES[0]);

  function select(locale: typeof LOCALES[number]) {
    setActive(locale);
    setOpen(false);
    document.documentElement.dir = locale.rtl ? "rtl" : "ltr";
    document.documentElement.lang = locale.code;
    // Actual routing: swap the /[locale]/ segment of the current path once
    // next-intl routing is wired in — placeholder behavior for now.
  }

  return (
    <div className="fixed bottom-4 left-4 z-30">
      {open && (
        <ul
          role="listbox"
          className="mb-2 max-h-64 w-44 overflow-y-auto rounded-xl border border-black/10 bg-surface-light p-1 shadow-lg dark:border-white/10 dark:bg-surface-dark"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => select(l)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand/10"
              >
                <span aria-hidden>{l.flag}</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-surface-light px-3 py-2 text-sm shadow-md dark:border-white/10 dark:bg-surface-dark"
      >
        <Globe size={14} />
        <span aria-hidden>{active.flag}</span>
        <span className="hidden sm:inline">{active.label}</span>
      </button>
    </div>
  );
}
