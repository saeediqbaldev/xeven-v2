"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("xp-cookie-consent")) setVisible(true);
  }, []);

  function decide(value: "accepted" | "rejected") {
    localStorage.setItem("xp-cookie-consent", value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-surface-light p-4 shadow-2xl dark:border-white/10 dark:bg-surface-dark md:p-6">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="text-sm">
          We use cookies to improve your experience and analyze site traffic.
          Read our{" "}
          <a href="/legal/privacy-policy" className="underline hover:text-brand">
            Privacy Policy
          </a>{" "}
          to learn more.
        </p>
        <div className="flex gap-3">
          <button onClick={() => decide("rejected")} className="btn-secondary text-sm">
            Reject
          </button>
          <button onClick={() => decide("accepted")} className="btn-cta text-sm">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
