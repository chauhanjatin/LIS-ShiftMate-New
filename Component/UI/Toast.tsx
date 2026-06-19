"use client";

import { useEffect } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export default function Toast({ show, message, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-xl border border-[#D1FADF] bg-[#F6FBF6] px-5 py-3 shadow-sm animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#12B76A] text-[#12B76A]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span className="text-[14px] font-semibold text-neutral-900">{message}</span>
      <button onClick={onClose} className="ml-4 flex h-5 w-5 items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
