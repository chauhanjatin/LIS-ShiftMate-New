import Image from "next/image";
import type { ReactNode } from "react";

type AuthMarketingLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthMarketingLayout({
  children,
}: AuthMarketingLayoutProps) {
  return (
    <main className="fixed inset-0 z-0 flex h-[100vh] max-h-[100vh] flex-col overflow-hidden bg-[#eaf2ff] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex min-h-0 w-full max-w-[1850px] flex-1 flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)]">
          <section className="relative hidden min-h-0 overflow-hidden rounded-[2rem] lg:flex">
            <Image
              src="/login/hero-background.png"
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_28%)]" />

            <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between p-8 xl:p-14">
              <div className="max-w-[42rem]">
                <h2 className="text-[3.55rem] font-black leading-[1.08] tracking-[-0.06em] text-white xl:text-[4.15rem]">
                  Manage your workforce, payroll and teams in one place.
                </h2>
              </div>

              <div className="relative flex min-h-0 flex-1 items-end justify-center">
                <Image
                  src="/login/hero-person.png"
                  alt="Smiling professional using a laptop"
                  width={767}
                  height={1032}
                  className="h-auto max-h-full w-auto object-contain object-bottom"
                />
              </div>
            </div>
          </section>

          <section className="flex min-h-0 flex-1 flex-col justify-center">
            <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain justify-center">
              <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center py-4">
                <div className="mb-6 flex w-full shrink-0 justify-center lg:mb-10">
                  <Image
                    src="/login/shiftmate-logo.png"
                    alt="ShiftMate"
                    width={560}
                    height={119}
                    priority
                    className="h-auto w-[16rem] sm:w-[18rem] lg:w-[20rem]"
                  />
                </div>

                <div className="mb-4 w-full shrink-0 rounded-[1.75rem] bg-[linear-gradient(135deg,#4f62ff_0%,#2a1ee0_100%)] px-6 py-6 text-white shadow-[0_14px_34px_rgba(37,123,252,0.22)] lg:hidden">
                  <p className="max-w-[22rem] text-[1.8rem] font-black leading-[1.12] tracking-[-0.05em]">
                    Manage your workforce, payroll and teams in one place.
                  </p>
                </div>

                {children}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
