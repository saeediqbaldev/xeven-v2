"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Go to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 right-4 z-30 rounded-full bg-brand p-3 text-white shadow-lg transition-transform hover:scale-105"
    >
      <ArrowUp size={18} />
    </button>
  );
}
