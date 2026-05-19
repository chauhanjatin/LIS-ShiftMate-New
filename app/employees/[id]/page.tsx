"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { useEmployees } from "@/hooks/useEmployees";
import { Employee, Status } from "@/Data/employees";
import editIcon from "@/assets/images/icons/edit.svg";

const TABS = [
  "Overview",
  "Personal Info",
  "Employment Details",
  "Payroll Information",
  "Documents",
  "Leave",
  "Audit Log"
];

function StatusPill({ status, type }: { status: Status; type: string }) {
  const isInactive = status === "Inactive";
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-4 py-1.5 text-[12px] font-semibold ${
        isInactive ? "bg-[#FFE8E8] text-[#EF4444]" : "bg-[#EAF9EA] text-[#4DB949]"
      }`}
    >
      {isInactive ? "In Active" : status} &middot; {type}
    </span>
  );
}

export default function EmployeeDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { employees, updateEmployee } = useEmployees();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    workEmail: "",
    personalEmail: "",
    workPhone: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id && employees.length > 0) {
      const emp = employees.find(e => e.id === id);
      if (emp && JSON.stringify(emp) !== JSON.stringify(employee)) {
        setEmployee(emp);
        setFormData({
          firstName: emp.firstName || emp.name.split(" ")[0] || "",
          lastName: emp.lastName || emp.name.split(" ").slice(1).join(" ") || "",
          department: emp.dept || "",
          workEmail: emp.workEmail || "",
          personalEmail: emp.personalEmail || "",
          workPhone: emp.workPhone || "",
        });
      }
    }
  }, [id, employees, employee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!employee) return;
    updateEmployee(id, {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      dept: formData.department,
      workEmail: formData.workEmail,
      personalEmail: formData.personalEmail,
      workPhone: formData.workPhone
    });
    router.push("/employees/all-employees");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateEmployee(id, { avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const getTabIcon = (tab: string, isActive: boolean) => {
    const color = isActive ? "white" : "#6B7280";
    switch (tab) {
      case "Overview": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
      case "Personal Info": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
      case "Employment Details": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
      case "Payroll Information": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
      case "Documents": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
      case "Leave": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
      case "Audit Log": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
      default: return null;
    }
  };

  if (!employee) return <DashboardLayout title="Employees" subtitle="Home/ All Employees/ Employee Details"><div className="p-6">Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout title="Employees" subtitle="Home/ All Employees/ Employee Details">
      <div className="flex-1 2xl:p-6 p-4">
        <div className="flex flex-col xl:flex-row 2xl:gap-[34px] gap-[28px] bg-white 2xl:p-6 p-4 rounded-[20px] min-h-[800px]">

          {/* Left Sidebar Profile Card */}
          <div className="w-full 2xl:w-[353px] xl:w-[320px] shrink-0">
            <div className="rounded-2xl border border-[#F3F4F6] bg-[#F9FAFB] p-8 text-center shadow-sm">
              <div className="relative mx-auto mb-6 h-[120px] w-[120px]">
                <div className="h-full w-full overflow-hidden rounded-full shadow-sm">
                  <img src={employee.avatar} alt={employee.name} className="h-full w-full object-cover" />
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-neutral-200 transition hover:bg-neutral-50 cursor-pointer"
                  title="Change image"
                >
                  <Image src={editIcon} alt="edit" width={14} height={14} />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>

              <h2 className="text-[24px] font-bold text-[#111827] m-0">{employee.name}</h2>
              <p className="mt-1 mb-5 text-[14px] text-[#6B7280]">{employee.role}</p>
              <StatusPill status={employee.status} type={employee.type} />
            </div>

            <div className="mt-8 px-2 flex flex-col 2xl:gap-6 gap-4">
              <div>
                <p className="text-[13px] font-medium text-[#9CA3AF] mb-1 m-0">Employee ID</p>
                <p className="text-[15px] font-bold text-[#111827] mt-1 m-0">{employee.id}</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#9CA3AF] mb-1 m-0">Department</p>
                <p className="text-[15px] font-bold text-[#111827] mt-1 m-0">{employee.dept}</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#9CA3AF] mb-1 m-0">Join Date</p>
                <p className="text-[15px] font-bold text-[#111827] mt-1 m-0">{employee.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] bg-[#E5E7EB] self-stretch hidden lg:block"></div>

          {/* Right Content Area */}
          <div className="flex-1 lg:pl-2 min-w-[300px]">
            {/* Tabs */}
            <div className="flex items-center 2xl:gap-1 gap-2 justify-between overflow-x-auto mb-10 bg-[#F9FAFB] p-1.5 rounded-xl scrollbar-hide w-full">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg 2xl:px-4 px-3.5 2xl:py-2.5 py-2 text-[14px] font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer border-none ${
                    activeTab === tab 
                      ? "bg-[#111827] text-white shadow-sm" 
                      : "bg-transparent text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  {getTabIcon(tab, activeTab === tab)}
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "Overview" ? (
              <div className="w-full">
                <div className="mb-8">
                  <h3 className="text-[22px] font-bold text-[#111827] m-0">Overview</h3>
                  <p className="text-[14px] text-[#6B7280] mt-1.5 mb-0">Quick summary of the employee's profile, role, and current status.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:gap-x-8 gap-x-6 2xl:gap-y-6 gap-y-5 mb-10">
                  <div>
                    <label className="block mb-2 text-[13px] font-medium text-[#111827]">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[13px] font-medium text-[#111827]">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[13px] font-medium text-[#111827]">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[13px] font-medium text-[#111827]">Work Email</label>
                    <input
                      type="email"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleInputChange}
                      className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[13px] font-medium text-[#111827]">Personal Email</label>
                    <input
                      type="email"
                      name="personalEmail"
                      value={formData.personalEmail}
                      onChange={handleInputChange}
                      className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[13px] font-medium text-[#111827]">Work Phone</label>
                    <input
                      type="tel"
                      name="workPhone"
                      value={formData.workPhone}
                      onChange={handleInputChange}
                      className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 2xl:mt-10 mt-[65px]">
                  <button
                    onClick={() => router.push("/employees/all-employees")}
                    className="rounded-xl bg-white px-6 py-3 text-[14px] font-semibold text-[#111827] border border-[#D0D5DD] cursor-pointer transition hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="rounded-xl bg-[#257BFC] px-6 py-3 text-[14px] font-semibold text-white border-none cursor-pointer transition hover:bg-blue-600"
                  >
                    Update Info
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-[#6B7280] border border-dashed border-[#E5E7EB] rounded-2xl w-full">
                <p>Content for {activeTab} will go here.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
