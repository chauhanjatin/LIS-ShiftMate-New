import Image from "next/image";
import type { ReactNode } from "react";

type AuthMarketingLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthMarketingLayout({
  children,
}: AuthMarketingLayoutProps) {
  return (
    <main className="fixed inset-0 z-0 flex h-[100vh] max-h-[100vh] flex-col overflow-hidden bg-[#eaf2ff] ">
      <div className="mx-auto flex min-h-0 w-full flex-1 flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-1  lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)]">
          <section className="relative hidden min-h-0 overflow-hidden rounded-[2.5rem] lg:flex bg-[#4c51f5] m-[30px]">
            <Image
              src="/login/login-gif.gif"
              alt="Background animation"
              fill
              unoptimized
              className="absolute inset-0 object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_70%_120%,rgba(255,255,255,0.1),transparent_50%)] mix-blend-overlay" />

            <div className="relative z-10 flex min-h-0 flex-1 flex-col 2xl:p-[60px] xl:p-[45px] p-[40px]">
              <div className="max-w-[45rem]">
                <h2
                  className="2xl:text-[48px] text-[40px] font-semibold 2xl:leading-[58px] leading-[48px] text-white"
                  style={{
                    textShadow: "-1px -1px 0 #000000, 1px -1px 0 #000000,-1px  1px 0 #000000, 1px  1px 0 #000000, 0 8px 16px rgba(0,0,0,.12)",
                  }}
                >
                  Manage your workforce, payroll and organization in one place.
                </h2>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex min-h-0 items-end justify-center">
                <Image
                  src="/login/hero-person.png"
                  alt="Smiling professional using a laptop"
                  width={800}
                  height={1080}
                  priority
                  className="h-auto 2xl:w-[66%] w-[100%] max-w-[700px] 2xl:max-w-[850px] object-contain object-bottom select-none pointer-events-none translate-y-[2px] 2xl:translate-x-[20%] translate-x-[2%]"
                />
              </div>
            </div>
          </section>

          <section className="flex min-h-0 flex-1 flex-col justify-center">
            <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain justify-center bg-white">
              <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center py-4">
                <div className="mb-6 flex w-full shrink-0 justify-center lg:mb-10">
                  <Image
                    src="/login/shiftmate-logo.png"
                    alt="ShiftMate"
                    width={560}
                    height={119}
                    priority
                    className="h-auto w-[14rem] xl:w-[16rem] 2xl:w-[18rem] 2xl::w-[20rem]"
                  />
                </div>

                <div className="mb-4 w-full shrink-0 rounded-[1.75rem] bg-[linear-gradient(135deg,#4f62ff_0%,#2a1ee0_100%)] px-6 py-6 text-white shadow-[0_14px_34px_rgba(37,123,252,0.22)] hidden">
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
