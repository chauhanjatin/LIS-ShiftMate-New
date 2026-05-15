"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/Component/Button/Button";
import Checkbox from "@/Component/Checkbox/Checkbox";
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
    <div className="group flex min-h-14 items-center rounded-[1rem] border border-[#c9d5e8] bg-white px-4 transition-all duration-200 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100/70">
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-[37.5rem] rounded-[2rem] px-6 py-7 xl:px-8 xl:py-9">
      <div className="text-center">
        <h1 className="xl:text-[32px] text-[30px] font-black tracking-[-0.05em] text-neutral-900">
          Welcome Back
        </h1>
        <p className="2xl:mt-3 mt-1 xl:text-[16px] text-[14px] font-normal tracking-tight text-[#98A2B3]">
          Manage schedules and teams in one place.
        </p>
      </div>

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="login-email"
            className="block text-[1.05rem] font-semibold tracking-tight text-neutral-900"
          >
            Email
          </label>
          <FieldShell>
            <MailIcon className="mr-3 text-neutral-900" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              className="w-full border-0 bg-transparent text-[1.1rem] text-neutral-900 outline-none placeholder:text-neutral-400"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FieldShell>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="login-password"
            className="block text-[1.05rem] font-semibold tracking-tight text-neutral-900"
          >
            Password
          </label>
          <FieldShell>
            <LockIcon className="mr-3 text-neutral-900" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="w-full border-0 bg-transparent text-[1.1rem] text-neutral-900 outline-none placeholder:text-neutral-400"
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
            className="gap-2.5 text-[1rem] font-medium text-neutral-600"
            label="Remember me"
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <Link
            href="/forgot-password"
            className="text-[1rem] font-semibold text-brand-500 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-4 min-h-[3.7rem] w-full rounded-[1rem]"
          disabled={isSubmitting || !email || !password}
        >
          <span className="text-[1.15rem] font-semibold">
            {isSubmitting ? "Signing in..." : "Login"}
          </span>
        </Button>
      </form>

      <div className="mt-8 text-center text-[1rem] text-neutral-400">
        Don't have an account?{" "}
        <Link
          href="#"
          className="font-semibold text-brand-500 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
        >
          Create one
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
