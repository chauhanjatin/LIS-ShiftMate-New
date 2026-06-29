"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@/Component/Button/Button";
import { LockIcon, MailIcon, ShieldCheckIcon } from "@/Component/Icons/SystemIcons";

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

function ForgotPass() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("michael.mitc@example.com");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    startTransition(() => {
      router.push("/reset-password");
    });
  }

  return (
    <div className="w-full max-w-[37.5rem] rounded-[2rem] px-6 py-7 sm:px-8 sm:py-9">
      <div className="text-center">
        <h1 className="text-[2.5rem] font-black tracking-[-0.05em] text-neutral-900 sm:text-[3rem]">
          Forgot Passwords
        </h1>
        <p className="mt-3 text-[1.15rem] tracking-tight text-neutral-800">
          Enter your email address to receive a password reset link
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

        <Button
          type="submit"
          className="mt-4 min-h-[3.7rem] w-full rounded-[1rem] cursor-pointer"
          disabled={isPending || !email.trim()}
        >
          <span className="text-[1.15rem] font-semibold">
            {isPending ? "Sending reset link..." : "Send Reset Link"}
          </span>
        </Button>
      </form>


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

export default ForgotPass;
