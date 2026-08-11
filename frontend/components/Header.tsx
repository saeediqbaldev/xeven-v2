"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Consultancy", href: "/consultancy" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-base-light/80 backdrop-blur dark:border-white/5 dark:bg-base-dark/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          {/* Replace with <Image> pointing at the uploaded logo asset */}
          Xeven Pixels
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/consultancy" className="btn-cta text-sm">
            Book a Discovery Call
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="p-2 md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile off-canvas menu */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-surface-light p-6 shadow-xl transition-transform dark:bg-surface-dark ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button aria-label="Close menu" className="mb-8 p-2" onClick={() => setOpen(false)}>
            <X />
          </button>
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/consultancy" className="btn-cta mt-4 text-sm" onClick={() => setOpen(false)}>
              Book a Discovery Call
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
