"use client";

import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import CustomSelect from "@/Component/UI/CustomSelect";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState("Personal Details");

  const tabs = [
    { name: "Personal Details", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
    { name: "Contact Information", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
    { name: "Emergency Contacts", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> },
    { name: "Bank Details", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> },
    { name: "Tax Info", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
  ];

  return (
    <DashboardLayout title="Dashboard" subtitle={<><Link href="/dashboard" className="text-[#98A2B3] hover:text-brand-500 transition-colors">Home</Link> <span className="text-[#98A2B3]">/</span> <span className="text-[#111827]">My Profile</span></>}>
      <div className={`p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 xl:p-6 p-4 bg-white rounded-2xl">
          <div className="w-full xl:w-[360px] shrink-0 space-y-6 xl:border-r xl:border-[#E4E7EC] xl:pr-6">
            <div className="bg-[#F9FAFB] border border-[#E4E7EC] rounded-xl p-6 xl:p-8 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="John Smith" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#257BFC] rounded-full flex items-center justify-center border-2 border-white text-white hover:bg-blue-600 transition-colors cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                </button>
              </div>
              <h2 className="text-[20px] 2xl:text-[24px] font-medium text-[#111827] mb-2">John Smith</h2>
              <p className="text-[14px] text-[#98A2B3] mb-2">Senior Software Engineer</p>
              <div className="px-3.5 py-1.5 bg-[#EDFAF2] text-[#4db949] rounded-full text-[12px]">
                Active - Full-time
              </div>
            </div>

            <div className="bg-white rounded-2xl">
              <div className="space-y-6">
                <div>
                  <p className="text-[14px] text-[#98A2B3] mb-2">Employee ID</p>
                  <p className="text-[20px] font-medium text-[#111827]">EMP002</p>
                </div>
                <div>
                  <p className="text-[14px] text-[#98A2B3] mb-2">Department</p>
                  <p className="text-[20px] font-medium text-[#111827]">Engineering</p>
                </div>
                <div>
                  <p className="text-[14px] text-[#98A2B3] mb-2">Join Date</p>
                  <p className="text-[20px] font-medium text-[#111827]">March 13, 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-2xl w-full flex flex-col min-w-0">
            <div className="w-full overflow-x-auto scrollbar-hide mb-6">
              <div className="flex items-center justify-self-center gap-1 bg-[#F9FAFB] p-1.5 rounded-xl w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`whitespace-nowrap rounded-lg 2xl:px-4 px-3.5 2xl:py-2.5 py-2 text-[14px] font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer border-none ${
                      activeTab === tab.name 
                        ? "bg-[#111827] text-white shadow-sm" 
                        : "bg-transparent text-[#98A2B3] hover:text-[#111827]"
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "Personal Details" && (
              <div>
                <div className="mb-6">
                  <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-2">Personal Details</h3>
                  <p className="text-[14px] text-[#98A2B3]">Quick summary of the employee's profile, role, and current status.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                  <div>
                    <label className="block text-[14px] text-[#111827] mb-2">First name</label>
                    <input 
                      type="text" 
                      defaultValue="John"
                      className="w-full h-11 px-4 rounded-xl border border-[#D0D5DD] bg-white text-[14px] text-[#111827] outline-none focus:border-[#111827] focus:ring-1 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] text-[#111827] mb-2">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="Smith"
                      className="w-full h-11 px-4 rounded-xl border border-[#D0D5DD] bg-white text-[14px] text-[#111827] outline-none focus:border-[#111827] focus:ring-1 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#111827] mb-2">Date of Birth</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="03/15/1990"
                        className="w-full h-11 pl-4 pr-10 rounded-xl border border-[#D0D5DD] bg-white text-[14px] text-[#111827] outline-none focus:border-[#111827] focus:ring-1 transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] text-[#111827] mb-2">Gender</label>
                    <CustomSelect 
                      options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
                      value="Male"
                      onChange={() => {}}
                      placeholder="Select Gender"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#111827] mb-2">National Insurance Number</label>
                    <input 
                      type="text" 
                      defaultValue="AB123456C"
                      className="w-full h-11 px-4 rounded-xl border border-[#D0D5DD] bg-white text-[14px] text-[#111827] outline-none focus:border-[#111827] focus:ring-1 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] text-[#111827] mb-2">Job Title</label>
                    <input 
                      type="text" 
                      defaultValue="Senior Software Engineer"
                      className="w-full h-11 px-4 rounded-xl border border-[#D0D5DD] bg-white text-[14px] text-[#111827] outline-none focus:border-[#111827] focus:ring-1 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#111827] mb-2">Department</label>
                    <input 
                      type="text" 
                      defaultValue="Engineering"
                      className="w-full h-11 px-4 rounded-xl border border-[#D0D5DD] bg-white text-[14px] text-[#111827] outline-none focus:border-[#111827] focus:ring-1 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] text-[#111827] mb-2">Join Date</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="03/13/2021"
                        className="w-full h-11 pl-4 pr-10 rounded-xl border border-[#D0D5DD] bg-white text-[14px] text-[#111827] outline-none focus:border-[#111827] focus:ring-1 transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6">
                  <button className="h-11 px-6 rounded-xl border border-neutral-200 text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button className="h-11 px-6 rounded-xl bg-[#257BFC] text-[14px] font-semibold text-white hover:bg-blue-600 transition-colors shadow-sm cursor-pointer">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            {activeTab !== "Personal Details" && (
              <div className="py-12 flex flex-col items-center justify-center text-center text-neutral-500">
                <p>Content for {activeTab} will go here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
