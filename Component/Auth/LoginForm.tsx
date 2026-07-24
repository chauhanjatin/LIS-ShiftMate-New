"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/Component/Button/Button";
import Checkbox from "@/Component/Checkbox/Checkbox";
import { useEffect } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
} from "@/Component/Icons/SystemIcons";

function FieldShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="group flex md:min-h-14 min-h-10 items-center rounded-[1rem] border border-[#c9d5e8] bg-white px-4 transition-all duration-200 focus-within:border-[#111827] focus-within:ring-1 focus-within:ring-[#111827]">
      {children}
    </div>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("shiftmate_remember_email");
    const savedPassword = localStorage.getItem("shiftmate_remember_password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    setIsSubmitting(true);
    
    if (rememberMe) {
      localStorage.setItem("shiftmate_remember_email", email);
      localStorage.setItem("shiftmate_remember_password", password);
    } else {
      localStorage.removeItem("shiftmate_remember_email");
      localStorage.removeItem("shiftmate_remember_password");
    }

    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    router.push("/selection");
  }

  return (
    <div className="w-full max-w-[37.5rem] rounded-[2rem] px-4 py-5 md:px-6 md:py-7 xl:px-8 xl:py-9">
      <div className="text-center">
        <h1 className="xl:text-[32px] text-[30px] font-black text-neutral-900">
          Welcome Back
        </h1>
        <p className="2xl:mt-3 mt-1 xl:text-[16px] text-[14px] font-normal text-[#98A2B3]">
          Manage schedules and teams in one place.
        </p>
      </div>

      <form className="md:mt-10 mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="login-email"
            className="block text-[14px] font-semibold tracking-tight text-neutral-900"
          >
            Email
          </label>
          <FieldShell>
            <MailIcon className="mr-3 text-neutral-900" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              className="w-full border-0 bg-transparent text-[14px] text-[#111827] outline-none placeholder:text-neutral-400"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FieldShell>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="login-password"
            className="block text-[14px] font-semibold tracking-tight text-neutral-900"
          >
            Password
          </label>
          <FieldShell>
            <LockIcon className="mr-3 text-neutral-900" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="w-full border-0 bg-transparent text-[14px] text-[#111927] outline-none placeholder:text-neutral-400"
              placeholder="Enter your password"
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

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <Checkbox
            checked={rememberMe}
            className="gap-2 text-[12px] md:text-[14px] font-medium text-neutral-600"
            label="Remember me"
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <Link
            href="/forgot-password"
            className="text-[12px] md:text-[14px] font-semibold text-brand-500 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-4 md:min-h-[3.7rem] w-full rounded-[1rem] cursor-pointer"
          disabled={isSubmitting || !email || !password}
        >
          <span className="md:text-[16px] text-[14px] font-semibold">
            {isSubmitting ? "Signing in..." : "Login"}
          </span>
        </Button>
      </form>

      <div className="md:mt-8 mt-4 text-center md:text-[16px] text-[14px] text-neutral-400">
        Don't have an account?{" "}
        <Link
          href="#"
          className="font-semibold text-brand-500 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
        >
          Create one
        </Link>
      </div>

      <div className="mt-5 border-t border-neutral-200 pt-4">
        <div className="flex flex-wrap items-center justify-center md:gap-x-6 gap-x-5 gap-y-3 md:text-[16px] text-[14px] font-medium text-neutral-400">
          <span className="inline-flex items-center md:gap-2 gap-1">
            <ShieldCheckIcon className="text-neutral-400" />
            Secure login
          </span>
          <span className="inline-flex items-center md:gap-2 gap-1">
            <LockIcon className="text-neutral-400" />
            Data encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
