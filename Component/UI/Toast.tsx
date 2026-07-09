"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}

export default function Toast({ show, message, onClose, type = "success" }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (show) {
      setIsRendered(true);
      const showTimer = setTimeout(() => setIsVisible(true), 10);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(), 300);
      }, 3000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(timer);
      };
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!isRendered) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 w-max md:max-w-[calc(100vw-3rem)] max-w-[calc(100vw-1rem)] rounded-xl border ${type === "error" ? "border-red-200 bg-red-50" : "border-[#D1FADF] bg-[#F6FBF6]"} px-5 py-3 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}>
      <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${type === "error" ? "border-red-500 text-red-500" : "border-[#12B76A] text-[#12B76A]"}`}>
        {type === "error" ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
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
