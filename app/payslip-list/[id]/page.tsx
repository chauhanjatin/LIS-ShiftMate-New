"use client";

import { use } from "react";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import { Lexend_Deca } from "next/font/google";
import payslipBg1 from "@/assets/images/payslip-bg1.png";
import payslipBg2 from "@/assets/images/payslip-bg2.png";
import Image from "next/image";
import shiftmateBg from "@/assets/images/pdf-bg.png";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function PayslipDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const decodedName = decodeURIComponent(id || "Devon Lane");

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/payslip-list" className="hover:text-brand-500 transition-colors">Payslip List</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">{decodedName}</span>
        </span>
    );

    const handleDownloadPDF = async () => {
        const element = document.getElementById("payslip-container");
        if (!element) return;
        
        try {
            const html2pdfModule = await import("html2pdf.js");
            const html2pdf = (html2pdfModule.default || html2pdfModule) as any;
            
            const opt = {
                margin:       [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
                filename:     `Payslip_${decodedName}_March_2026.pdf`,
                image:        { type: 'jpeg' as const, quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // @ts-ignore
            html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("Failed to generate PDF", error);
        }
    };

    return (
        <DashboardLayout title="Payslip Details" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 pb-20 ${lexendDeca.className}`}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
                    <h2 className="lg:text-[20px] md:text-[18px] text-[16px] font-bold text-neutral-900">{decodedName} - March 2026</h2>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white lg:px-5 px-3 py-2.5 text-[12px] lg:text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            Email Payslip
                        </button>
                        <button onClick={handleDownloadPDF} className="flex items-center gap-2 rounded-xl bg-[#257BFC] lg:px-5 px-3 py-2.5 text-[12px] lg:text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download PDF
                        </button>
                    </div>
                </div>

                <div id="payslip-container" className="mx-auto w-full max-w-[850px] overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-200 relative">

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                        <Image src={shiftmateBg} alt="" className="absolute md:top-[45%] top-[62%]" />
                    </div>

                    <div className="bg-[#257BFC] md:p-5 p-4 lg:px-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center rounded-t-2xl relative">
                        <div>
                            <h1 className="text-[20px] md:text-[22px] lg:text-[24px] font-medium">Shiftmate Corporation Ltd</h1>
                            <p className="mt-2 text-[10px] md:text-[12px] text-white font-normal">123 Business Street, London, EC1A 1BB</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:text-right">
                            <h2 className="text-[20px] md:text-[24px] font-medium uppercase tracking-wide">PAYSLIP</h2>
                            <p className="mt-1 text-[10px] md:text-[12px] font-normal text-white">March 2026</p>
                        </div>
                        <div className="absolute top-0 left-0">
                            <Image src={payslipBg1} alt="" />
                        </div>
                        <div className="absolute top-0 right-0">
                            <Image src={payslipBg2} alt="" />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="bg-[#F8F9FC] md:p-6 p-4 border-b border-[#D0D5DD]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-y-6 gap-y-4 gap-x-6">
                                <div>
                                    <p className="text-[12px] md:text-[14px] font-normal text-[#98A2B3] mb-1">Full Name</p>
                                    <p className="text-[14px] md:text-[16px] font-medium text-[#111827]">{decodedName}</p>
                                </div>
                                <div>
                                    <p className="text-[12px] md:text-[14px] font-normal text-[#98A2B3] mb-1">Employee ID</p>
                                    <p className="text-[14px] md:text-[16px] font-medium text-[#111827]">EMP001</p>
                                </div>
                                <div>
                                    <p className="text-[12px] md:text-[14px] font-normal text-[#98A2B3] mb-1">Department</p>
                                    <p className="text-[14px] md:text-[16px] font-medium text-[#111827]">Sales</p>
                                </div>
                                <div>
                                    <p className="text-[12px] md:text-[14px] font-normal text-[#98A2B3] mb-1">Pay Date</p>
                                    <p className="text-[14px] md:text-[16px] font-medium text-[#111827]">31/03/2026</p>
                                </div>

                                <div>
                                    <p className="text-[12px] md:text-[14px] font-normal text-[#98A2B3] mb-1">NI Number</p>
                                    <p className="text-[14px] md:text-[16px] font-medium text-[#111827]">AB123456C</p>
                                </div>
                                <div>
                                    <p className="text-[12px] md:text-[14px] font-normal text-[#98A2B3] mb-1">Tax Code</p>
                                    <p className="text-[14px] md:text-[16px] font-medium text-[#111827]">1257L</p>
                                </div>
                                <div>
                                    <p className="text-[12px] md:text-[14px] font-normal text-[#98A2B3] mb-1">Pay Frequency</p>
                                    <p className="text-[14px] md:text-[16px] font-medium text-[#111827]">Monthly</p>
                                </div>
                                <div>
                                    <p className="text-[12px] md:text-[14px] font-normal text-[#98A2B3] mb-1">Tax Year</p>
                                    <p className="text-[14px] md:text-[16px] font-medium text-[#111827]">2025/2026</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:p-6 p-4 border-b border-[#D0D5DD]">
                            <div className="flex items-center justify-between border-b border-[#D0D5DD] pb-3 md:pb-6 mb-3 md:mb-6">
                                <h3 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Earnings</h3>
                                <span className="md:text-[20px] text-[16px] font-medium text-[#111827]">Amount</span>
                            </div>
                            <div className="md:space-y-4 space-y-2">
                                <div className="flex items-center justify-between md:text-[14px] text-[12px]">
                                    <span className="text-[#111827]">Basic Salary</span>
                                    <span className="font-normal text-[#111827]">$5416.67</span>
                                </div>
                                <div className="flex items-center justify-between md:text-[14px] text-[12px]">
                                    <span className="text-[#111827]">Overtime</span>
                                    <span className="font-normal text-[#111827]">$0.00</span>
                                </div>
                                <div className="flex items-center justify-between md:text-[14px] text-[12px]">
                                    <span className="text-[#111827]">Bonus</span>
                                    <span className="font-normal text-[#111827]">$0.00</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-[#111827] pt-4 mt-4">
                                <span className="text-[14px] font-semibold text-[#111827]">Total Earnings</span>
                                <span className="text-[14px] font-semibold text-[#4DB949]">$5416.67</span>
                            </div>
                        </div>

                        <div className="md:p-6 p-4">
                            <div className="flex items-center justify-between border-b border-[#D0D5DD] pb-3 md:pb-6 mb-3 md:mb-6">
                                <h3 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Deductions</h3>
                                <span className="md:text-[20px] text-[16px] font-medium text-[#111827]">Amount</span>
                            </div>
                            <div className="md:space-y-4 space-y-2">
                                <div className="flex items-center justify-between md:text-[14px] text-[12px]">
                                    <span className="text-[#111827]">PAYE (Income Tax)</span>
                                    <span className="font-normal text-[#111827]">$1083.33</span>
                                </div>
                                <div className="flex items-center justify-between md:text-[14px] text-[12px]">
                                    <span className="text-[#111827]">National Insurance</span>
                                    <span className="font-normal text-[#111827]">$450.00</span>
                                </div>
                                <div className="flex items-center justify-between md:text-[14px] text-[12px]">
                                    <span className="text-[#111827]">Pension (5%)</span>
                                    <span className="font-normal text-[#111827]">$270.83</span>
                                </div>
                                <div className="flex items-center justify-between md:text-[14px] text-[12px]">
                                    <span className="text-[#111827]">Student Loan</span>
                                    <span className="font-normal text-[#111827]">$0.00</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-[#111827] pt-4 mt-4">
                                <span className="text-[14px] font-semibold text-[#111827]">Total Deductions</span>
                                <span className="text-[14px] font-semibold text-[#F04438]">$1804.16</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
