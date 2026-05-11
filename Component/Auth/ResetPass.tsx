"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/Component/Button/Button";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  ShieldCheckIcon,
} from "@/Component/Icons/SystemIcons";

function FieldShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="group flex min-h-14 items-center rounded-[1rem] border border-[#c9d5e8] bg-white px-4 transition-all duration-200 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100/70">
      {children}
    </div>
  );
}

function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim() || !confirmPassword.trim() || password !== confirmPassword) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
  }

  return (
    <div className="w-full max-w-[37.5rem] rounded-[2rem] bg-white px-6 py-7 shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:px-8 sm:py-9">
      <div className="text-center">
        <h1 className="text-[2.5rem] font-black tracking-[-0.05em] text-neutral-900 sm:text-[3rem]">
          Reset Passwords
        </h1>

        <p className="mt-3 text-[1.15rem] tracking-tight text-neutral-800">
          Create a new password to regain access to your account.
        </p>
      </div>

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="reset-new-password"
            className="block text-[1.05rem] font-semibold tracking-tight text-neutral-900"
          >
            New password
          </label>

          <FieldShell>
            <LockIcon className="mr-3 text-neutral-900" />

            <input
              id="reset-new-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="w-full border-0 bg-transparent text-[1.1rem] text-neutral-900 outline-none placeholder:text-neutral-400"
              placeholder="Enter new password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              type="button"
              className="ml-3 inline-flex items-center justify-center text-neutral-700 transition-colors hover:text-neutral-900"
              onClick={() => setShowPassword((currentValue) => !currentValue)}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </FieldShell>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reset-confirm-password"
            className="block text-[1.05rem] font-semibold tracking-tight text-neutral-900"
          >
            Confirm password
          </label>

          <FieldShell>
            <LockIcon className="mr-3 text-neutral-900" />

            <input
              id="reset-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              className="w-full border-0 bg-transparent text-[1.1rem] text-neutral-900 outline-none placeholder:text-neutral-400"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            <button
              type="button"
              className="ml-3 inline-flex items-center justify-center text-neutral-700 transition-colors hover:text-neutral-900"
              onClick={() =>
                setShowConfirmPassword((currentValue) => !currentValue)
              }
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </FieldShell>
        </div>

        <Button
          type="submit"
          className="mt-4 min-h-[3.7rem] w-full rounded-[1rem]"
          disabled={isSubmitting || !passwordsMatch}
        >
          <span className="text-[1.15rem] font-semibold">
            {isSubmitting ? "Updating password..." : "Reset password"}
          </span>
        </Button>
      </form>

      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[1rem] font-semibold text-neutral-900 transition-colors hover:text-neutral-700"
        >
          <ChevronLeftIcon className="text-neutral-900" />
          Back to Login
        </Link>
      </div>

      <div className="mt-5 border-t border-neutral-200 pt-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.98rem] font-medium text-neutral-400">
          <span className="inline-flex items-center gap-2">
            <ShieldCheckIcon className="text-neutral-400" />
            Secure login
          </span>

          <span className="inline-flex items-center gap-2">
            <LockIcon className="text-neutral-400" />
            Data encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
