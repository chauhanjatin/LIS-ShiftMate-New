"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function SelectionPage() {
    const router = useRouter();

    const handleSelectModule = (module: string) => {
        localStorage.setItem("shiftmate_active_module", module);
        router.push("/dashboard");
    };

    return (
        <div className={`relative min-h-screen bg-[#257BFC1A] flex flex-col items-center justify-center p-6 ${lexendDeca.className}`}>
            <div className="absolute top-8 md:top-12 left-0 w-full">
                <img
                    src="/login/shiftmate-logo.png"
                    alt="ShiftMate Logo"
                    className="mx-auto h-10 md:h-12"
                />
            </div>

            <div className="w-full max-w-[800px] text-center mt-10 md:mt-0">

                <h1 className="text-[32px] md:text-[48px] font-semibold text-neutral-900 mb-4">
                    Welcome to <span className="text-[#257BFC]">ShiftMate</span>
                </h1>

                <p className="text-neutral-500 text-[20px] max-w-[560px] font-normal mx-auto mb-12">
                    Manage your workforce smarter — from payroll to HR operations, everything you need is just a click away.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-center gap-4 w-full">
                        <button
                            onClick={() => handleSelectModule("System Flow")}
                            className="bg-white rounded-xl shadow-sm border border-neutral-100 px-8 py-8 text-[24px] font-semibold text-[#111827] hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[452px]"
                        >
                            System Flow
                        </button>
                        <button
                            onClick={() => handleSelectModule("Payroll")}
                            className="bg-white rounded-xl shadow-sm border border-neutral-100 px-8 py-8 text-[24px] font-semibold text-[#111827] hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[452px]"
                        >
                            Payroll
                        </button>
                        <button
                            onClick={() => handleSelectModule("HR Operations")}
                            className="bg-white rounded-xl shadow-sm border border-neutral-100 px-8 py-8 text-[24px] font-semibold text-[#111827] hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[452px]"
                        >
                            HR Operations
                        </button>
                    </div>

                    <div className="flex justify-center gap-4 w-full">
                        <button
                            onClick={() => handleSelectModule("Employee Self-Service Portal")}
                            className="bg-white rounded-xl shadow-sm border border-neutral-100 px-8 py-8 text-[24px] font-semibold text-[#111827] hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[452px]"
                        >
                            Employee Self-Service Portal
                        </button>
                        <button
                            onClick={() => handleSelectModule("Multi-Company Management")}
                            className="bg-white rounded-xl shadow-sm border border-neutral-100 px-8 py-8 text-[24px] font-semibold text-[#111827] hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[452px]"
                        >
                            Multi-Company Management
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
