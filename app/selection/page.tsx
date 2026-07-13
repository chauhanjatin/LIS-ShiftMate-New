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

                <h1 className="text-[24px] md:text-[40px] xl:text-[48px] font-bold text-neutral-900 lg:mb-4 mb-2">
                    Welcome to <span className="text-[#257BFC]">ShiftMate</span>
                </h1>
                
                <p className="text-neutral-500 text-[12px] md:text-[15px] max-w-[500px] mx-auto lg:mb-12 md:mb-10 mb-6">
                    Manage your workforce smarter — from payroll to HR operations, everything you need is just a click away.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <div className="md:flex justify-center gap-4 w-full space-y-4 md:space-y-0">
                        <button 
                            onClick={() => handleSelectModule("System Flow")}
                            className="bg-white rounded-xl shadow-md xl:px-8 2xl:py-9 xl:py-7 md:py-5 py-4 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-neutral-900 hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[250px] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[350px] 2xl:min-w-[452px]"
                        >   
                            System Flow
                        </button>
                        <button 
                            onClick={() => handleSelectModule("Payroll")}
                            className="bg-white rounded-xl shadow-md px-8 2xl:py-9 xl:py-7 md:py-5 py-4 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-neutral-900 hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[250px] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[350px] 2xl:min-w-[452px]"
                        >
                            Payroll
                        </button>
                        <button 
                            onClick={() => handleSelectModule("HR Operations")}
                            className="bg-white rounded-xl shadow-md px-8 2xl:py-9 xl:py-7 md:py-5 py-4 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-neutral-900 hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[250px] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[350px] 2xl:min-w-[452px]"
                        >
                            HR Operations
                        </button>
                    </div>
                    
                    <div className="md:flex justify-center gap-4 w-full space-y-4 md:space-y-0">
                        <button 
                            onClick={() => handleSelectModule("Employee Self-Service Portal")}
                            className="bg-white rounded-xl shadow-md px-8 2xl:py-9 xl:py-7 md:py-5 py-4 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-neutral-900 hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[250px] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[350px] 2xl:min-w-[452px]"
                        >
                            Employee Self-Service Portal
                        </button>
                        <button 
                            onClick={() => handleSelectModule("Multi-Company Management")}
                            className="bg-white rounded-xl shadow-md px-8 2xl:py-9 xl:py-7 md:py-5 py-4 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-neutral-900 hover:shadow-md hover:border-[#257BFC] transition-all cursor-pointer min-w-[250px] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[350px] 2xl:min-w-[452px]"
                        >
                            Multi-Company Management
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
