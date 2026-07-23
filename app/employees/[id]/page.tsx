"use client";

import { useParams, useRouter } from "next/navigation";
import React, { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import CustomSelect from "@/Component/UI/CustomSelect";
import { useEmployees } from "@/hooks/useEmployees";
import { Employee, Status } from "@/types";
import editIcon from "@/assets/images/icons/edit.svg";
import backArrow from "@/assets/images/icons/back-arrow.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";

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
      className={`inline-flex whitespace-nowrap rounded-full px-4 py-1.5 text-[12px] font-semibold ${isInactive ? "bg-[#FFE8E8] text-[#EF4444]" : "bg-[#EAF9EA] text-[#4DB949]"
        }`}
    >
      {isInactive ? "In Active" : status} &middot; {type}
    </span>
  );
}

export default function EmployeeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { employees, updateEmployee } = useEmployees();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedDocument, setSelectedDocument] = useState<{name: string} | null>(null);
  const [documents, setDocuments] = useState([
    { name: "Employment_Contract.pdf", uploader: "Mathieu Wade", date: "October 25, 2026" },
    { name: "Passport_JohnDoe.jpg", uploader: "Mathieu Wade", date: "March 13, 2026" },
    { name: "HMRC Starter Checklist.pdf", uploader: "Mathieu Wade", date: "August 24, 2026" },
    { name: "Right to Work document.pdf", uploader: "Mathieu Wade", date: "October 31, 2026" },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "1990-03-15",
    gender: "Male",
    phone: "+44 1234 567890",
    email: "john@company.com",
    personalEmail: "devon.lane@example.com",
    workPhone: "+1 (415) 555-0192",
    address: "123 Main Street, London, EC1A 1BB",
    emergencyContact: "+44 1234 567891",
    
    empId: "",
    startDate: "2023-01-15",
    employmentType: "Full-time",
    department: "",
    jobTitle: "Senior Software Engineer",
    location: "London Office",
    manager: "Michael",
    contractType: "Permanent",

    bankAccount: "12345678912310",
    sortCode: "12-34-56",
    niNumber: "AB 12 34 56 C",
    taxCode: "1257L",
    payrollFrequency: "Monthly",
    salary: "£31.25",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id && employees.length > 0) {
      const emp = employees.find(e => e.id === id);
      if (emp && JSON.stringify(emp) !== JSON.stringify(employee)) {
        setEmployee(emp);
        setFormData(prev => ({
          ...prev,
          firstName: emp.firstName || emp.name.split(" ")[0] || "",
          lastName: emp.lastName || emp.name.split(" ").slice(1).join(" ") || "",
          department: emp.dept || "",
          email: emp.workEmail || prev.email,
          empId: emp.id,
          employmentType: emp.type || prev.employmentType,
          jobTitle: emp.role || prev.jobTitle,
        }));
      }
    }
  }, [id, employees, employee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!employee) return;
    updateEmployee(id, {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      dept: formData.department,
      workEmail: formData.email,
      role: formData.jobTitle,
      type: formData.employmentType as any
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

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <Link href="/employees/all-employees" className="hover:text-brand-500 transition-colors">All Employees</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Employee Details</span>
    </span>
  );

  if (!employee) return <DashboardLayout title="Employees" subtitle={breadcrumb}><div className="p-6">Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout title="Employees" subtitle={breadcrumb}>
      <div className="flex-1 p-4">
        <Link href="/employees/all-employees">
          <div className="flex items-center gap-2 cursor-pointer mb-4">
            <Image src={backArrow} alt="back" />
            <p className="text-[#111827] font-normal text-[16px]">Back</p>
          </div>
        </Link>
        <div className="flex flex-col xl:flex-row 2xl:gap-[34px] gap-[26px] bg-white 2xl:p-6 p-4 rounded-[20px] min-h-[800px]">

          <div className="w-full 2xl:w-[353px] xl:w-[320px] shrink-0">
            <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-8 text-center">
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

              <h2 className="text-[24px] font-medium text-[#111827] m-0">{employee.name}</h2>
              <p className="mt-1 mb-5 text-[14px] text-[#6B7280] font-normal">{employee.role}</p>
              <StatusPill status={employee.status} type={employee.type} />
            </div>

            <div className="mt-8 flex flex-col 2xl:gap-6 gap-4">
              <div>
                <p className="2xl:text-[14px] text-[13px] font-normal text-[#9CA3AF] mb-1 m-0">Employee ID</p>
                <p className="2xl:text-[20px] text-[16px] font-medium text-[#111827] mt-1 m-0">{employee.id}</p>
              </div>
              <div>
                <p className="2xl:text-[14px] text-[13px] font-normal text-[#9CA3AF] mb-1 m-0">Department</p>
                <p className="2xl:text-[20px] text-[16px] font-medium text-[#111827] mt-1 m-0">{employee.dept}</p>
              </div>
              <div>
                <p className="2xl:text-[14px] text-[13px] font-normal text-[#9CA3AF] mb-1 m-0">Join Date</p>
                <p className="2xl:text-[20px] text-[16px] font-medium text-[#111827] mt-1 m-0">{employee.joinDate}</p>
              </div>
            </div>
          </div>

          <div className="w-[1px] bg-[#E5E7EB] self-stretch hidden lg:block"></div>

          <div className="flex-1 min-w-[300px] flex flex-col">
            <div className="flex items-center 2xl:gap-1 gap-2 justify-between overflow-x-auto 2xl:mb-12 mb-8 bg-[#F9FAFB] p-1.5 rounded-xl scrollbar-hide w-full shrink-0">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg 2xl:px-4 px-3.5 2xl:py-2.5 py-2 text-[14px] font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer border-none ${activeTab === tab
                    ? "bg-[#111827] text-white shadow-sm"
                    : "bg-transparent text-[#6B7280] hover:text-[#111827]"
                    }`}
                >
                  {getTabIcon(tab, activeTab === tab)}
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1">
              {activeTab === "Overview" && (
                <div className="w-full">
                  <div className="2xl:mb-12 mb-8">
                    <h3 className="text-[20px] font-bold text-[#111827] m-0">Overview</h3>
                    <p className="text-[14px] text-[#98A2B3] mt-1.5 mb-0">Quick summary of the employee's profile, role, and current status.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:gap-x-8 gap-x-6 2xl:gap-y-8 gap-y-5">
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">First name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Department</label>
                      <CustomSelect value={formData.department} onChange={(val) => handleSelectChange("department", val)} options={[{label: "Engineering", value: "Engineering"}, {label: "Marketing", value: "Marketing"}, {label: "Sales", value: "Sales"}, {label: "HR", value: "HR"}]} />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Work Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Work Email</label>
                      <input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Work Phone</label>
                      <input type="tel" name="workPhone" value={formData.workPhone} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Personal Info" && (
                <div className="w-full">
                  <h3 className="text-[20px] font-medium text-[#111827] 2xl:mb-12 mb-8 m-0">Personal Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:gap-x-8 gap-x-6 2xl:gap-y-6 gap-y-5">
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">First name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Date of Birth</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 pr-10 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Gender</label>
                      <CustomSelect value={formData.gender} onChange={(val) => handleSelectChange("gender", val)} options={[{label: "Male", value: "Male"}, {label: "Female", value: "Female"}]} />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Address</label> 
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Emergency Contact</label>
                      <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Employment Details" && (
                <div className="w-full">
                  <h3 className="text-[20px] font-medium text-[#111827] 2xl:mb-12 mb-8 m-0">Employment Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:gap-x-8 gap-x-6 2xl:gap-y-8 gap-y-5">
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Employee ID</label>
                      <input type="text" name="empId" value={formData.empId} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Start Date</label>
                      <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 pr-10 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Employment Type</label>
                      <CustomSelect value={formData.employmentType} onChange={(val) => handleSelectChange("employmentType", val)} options={[{label: "Full-time", value: "Full-time"}, {label: "Part-time", value: "Part-time"}]} />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Department</label>
                      <CustomSelect value={formData.department} onChange={(val) => handleSelectChange("department", val)} options={[{label: "Engineering", value: "Engineering"}, {label: "Marketing", value: "Marketing"}, {label: "Sales", value: "Sales"}, {label: "HR", value: "HR"}]} />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Job Title</label>
                      <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Manager</label>
                      <input type="text" name="manager" value={formData.manager} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Contract Type</label>
                      <CustomSelect value={formData.contractType} onChange={(val) => handleSelectChange("contractType", val)} options={[{label: "Permanent", value: "Permanent"}, {label: "Temporary", value: "Temporary"}]} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Payroll Information" && (
                <div className="w-full">
                  <h3 className="text-[20px] font-medium text-[#111827] 2xl:mb-12 mb-8 m-0">Payroll Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:gap-x-8 gap-x-6 2xl:gap-y-8 gap-y-5">
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Bank Account Number</label>
                      <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Sort Code</label>
                      <input type="text" name="sortCode" value={formData.sortCode} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">NI Number</label>
                      <input type="text" name="niNumber" value={formData.niNumber} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Tax Code</label>
                      <input type="text" name="taxCode" value={formData.taxCode} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Payroll Frequency</label>
                      <CustomSelect value={formData.payrollFrequency} onChange={(val) => handleSelectChange("payrollFrequency", val)} options={[{label: "Monthly", value: "Monthly"}, {label: "Weekly", value: "Weekly"}]} />
                    </div>
                    <div>
                      <label className="block mb-2 text-[14px] font-normal text-[#111827]">Salary / Hourly Rate</label>
                      <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none box-border focus:border-brand-500 transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Documents" && (
                <div className="w-full">
                  <h3 className="text-[20px] font-medium text-[#111827] 2xl:mb-12 mb-8 m-0">Documents</h3>
                  <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-[#F8F9FC]">
                        <tr>
                          <th className="border-b border-[#E2E8F0] px-4 py-2.5 2xl:px-6 2xl:pl-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">File Name</th>
                          <th className="border-b border-[#E2E8F0] px-4 py-2.5 2xl:px-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Uploaded By</th>
                          <th className="border-b border-[#E2E8F0] px-4 py-2.5 2xl:px-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Expiry Date</th>
                          <th className="border-b border-[#E2E8F0] px-4 py-2.5 2xl:px-6 pr-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documents.map((doc, i) => (
                          <tr key={i} className="hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-b-0">
                            <td 
                              className="px-4 py-4 2xl:py-6 2xl:px-6 2xl:pl-6 2xl:text-[14px] text-[13px] text-[#111827] flex items-center gap-2 cursor-pointer"
                              onClick={() => setSelectedDocument(doc)}
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                              {doc.name}
                            </td>
                            <td className="px-4 py-4 2xl:px-6 2xl:text-[14px] text-[13px] text-[#111827]">{doc.uploader}</td>
                            <td className="px-4 py-4 2xl:px-6 2xl:text-[14px] text-[13px] text-[#111827]">{doc.date}</td>
                            <td className="px-4 py-4 2xl:px-6 2xl:text-[14px] text-[13px] pr-6">
                              <div className="flex gap-3">
                                <button className="text-[#111827] hover:text-brand-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); const a = document.createElement('a'); a.href = '#'; a.download = doc.name; a.click(); }}>
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                </button>
                                <button className="text-[#111827] hover:text-red-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); setDocuments(docs => docs.filter(d => d.name !== doc.name)); }}>
                                  <Image src={deleteIcon} alt="Delete" width={24} height={24} className="pointer-events-none" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "Leave" && (
                <div className="w-full">
                  <h3 className="text-[20px] font-medium text-[#111827] 2xl:mb-12 mb-8 m-0">Leaves</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 2xl:gap-6 gap-3 mb-8">
                    <div className="rounded-xl border border-[#D0D5DD] 2xl:p-5 p-3 flex items-center justify-between">
                      <div>
                        <p className="text-[14px] text-[#111827] mb-2 font-medium">Annual Leave</p>
                        <div className="flex items-end gap-1">
                          <span className="2xl:text-[28px] text-[24px] font-bold text-[#111827] leading-none">16</span>
                          <span className="2xl:text-[12px] text-[10px] text-[#9CA3AF] mb-1">/ 28 days left</span>
                        </div>
                      </div>
                      <div className="2xl:h-12 2xl:w-12 h-10 w-10 rounded-xl bg-[#4DB949] text-white flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 5-4 4-3-1-1 1 3 4 4 3 1-1-1-3 4-4 5 6l1.2-.7c.4-.2.7-.6.6-1.1z"></path></svg>
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#D0D5DD] 2xl:p-5 p-3 flex items-center justify-between">
                      <div>
                        <p className="text-[14px] text-[#111827] font-medium mb-2">Sick Leave</p>
                        <div className="flex items-end gap-1">
                          <span className="2xl:text-[28px] text-[24px] font-bold text-[#111827] leading-none">8</span>
                          <span className="2xl:text-[12px] text-[10px] text-[#9CA3AF] mb-1">/ 10 days left</span>
                        </div>
                      </div>
                      <div className="2xl:h-12 2xl:w-12 h-10 w-10 rounded-xl bg-[#34AFF5] text-white flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path><polyline points="12 8 12 12 14 14"></polyline></svg>
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#D0D5DD] 2xl:p-5 p-3 flex items-center justify-between">
                      <div>
                        <p className="text-[14px] text-[#111827] font-medium mb-2">Pending</p>
                        <div className="flex items-end gap-1">
                          <span className="2xl:text-[28px] text-[24px] font-bold text-[#111827] leading-none">01</span>
                        </div>
                      </div>
                      <div className="2xl:h-12 2xl:w-12 h-10 w-10 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-[#F8F9FC]">
                        <tr>
                          <th className="border-b border-[#D0D5DD] px-4 py-2.5 2xl:px-6 2xl:pl-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Leave Type</th>
                          <th className="border-b border-[#D0D5DD] px-4 py-2.5 2xl:px-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Start Date</th>
                          <th className="border-b border-[#D0D5DD] px-4 py-2.5 2xl:px-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">End Date</th>
                          <th className="border-b border-[#D0D5DD] px-4 py-2.5 2xl:px-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Total Days</th>
                          <th className="border-b border-[#D0D5DD] px-4 py-2.5 2xl:px-6 pr-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { type: "Annual Leave", start: "10 May 2026", end: "14 May 2026", days: "05", status: "Approved", statusColor: "bg-[#EAF9EA] text-[#4DB949]" },
                          { type: "Sick Leave", start: "25 Apr 2026", end: "26 Apr 2026", days: "02", status: "Pending", statusColor: "bg-[#FFF6E8] text-[#FFA100]" },
                          { type: "Annual Leave", start: "1 Jun 2026", end: "15 Jun 2026", days: "10", status: "Approved", statusColor: "bg-[#EAF9EA] text-[#4DB949]" },
                        ].map((leave, i) => (
                          <tr key={i} className="hover:bg-neutral-50 border-b border-[#D0D5DD] last:border-b-0">
                            <td className="px-4 py-5 2xl:px-6 2xl:pl-6 2xl:text-[14px] text-[13px] text-[#111827]">{leave.type}</td>
                            <td className="px-4 py-5 2xl:px-6 2xl:text-[14px] text-[13px] text-[#111827]">{leave.start}</td>
                            <td className="px-4 py-5 2xl:px-6 2xl:text-[14px] text-[13px] text-[#111827]">{leave.end}</td>
                            <td className="px-4 py-5 2xl:px-6 2xl:text-[14px] text-[13px] text-[#111827]">{leave.days}</td>
                            <td className="px-4 py-5 2xl:px-6 pr-6">
                              <span className={`inline-flex rounded-full px-6 py-2.5 2xl:text-[14px] text-[13px] font-medium ${leave.statusColor}`}>
                                {leave.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "Audit Log" && (
                <div className="w-full">
                  <h3 className="text-[20px] font-medium text-[#111827] 2xl:mb-12 mb-8 m-0">Audit Log</h3>
                  <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-[#F8F9FC]">
                        <tr>
                          <th className="border-b border-[#E2E8F0] px-4 py-2.5 2xl:px-6 2xl:pl-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Date</th>
                          <th className="border-b border-[#E2E8F0] px-4 py-2.5 2xl:px-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Name</th>
                          <th className="border-b border-[#E2E8F0] px-4 py-2.5 2xl:px-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Details</th>
                          <th className="border-b border-[#E2E8F0] px-4 py-2.5 2xl:px-6 pr-6 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: "10 May 2026", name: "Cameron Williamson", avatar: "https://i.pravatar.cc/150?u=12", details: "Employment details updated", status: "Uploaded", statusColor: "bg-[#EAF9EA] text-[#4DB949]" },
                          { date: "25 Apr 2026", name: "Devon Lane", avatar: "https://i.pravatar.cc/150?u=13", details: "Passport document uploaded", status: "Viewed", statusColor: "bg-[#FFF6E8] text-[#FFA100]" },
                          { date: "1 Jun 2026", name: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=14", details: "Employee record created", status: "Uploaded", statusColor: "bg-[#EAF9EA] text-[#4DB949]" },
                        ].map((log, i) => (
                          <tr key={i} className="hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-b-0">
                            <td className="px-4 py-5 2xl:px-6 2xl:pl-6 2xl:text-[14px] text-[12px] text-[#111827]">{log.date}</td>
                            <td className="px-4 py-5 2xl:px-6 2xl:text-[14px] text-[12px] text-[#111827]">
                              <div className="flex items-center gap-3">
                                <img src={log.avatar} alt={log.name} className="w-12 h-12 rounded-full object-cover" />
                                {log.name}
                              </div>
                            </td>
                            <td className="px-4 py-5 2xl:px-6 2xl:text-[14px] text-[12px] text-[#111827]">{log.details}</td>
                            <td className="px-4 py-5 2xl:px-6 pr-6">
                              <span className={`inline-flex rounded-full px-3.5 py-2.5 2xl:text-[14px] text-[12px] font-normal ${log.statusColor}`}>
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {["Overview", "Personal Info", "Employment Details", "Payroll Information"].includes(activeTab) && (
              <div className="flex justify-end gap-4 2xl:mt-10 mt-[65px] shrink-0">
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
            )}
          </div>

        </div>
      </div>

      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 px-4 py-4">
          <div className="w-full max-w-[800px] h-[90vh] rounded-xl bg-[#F8F9FA] flex flex-col relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 bg-white z-10 shrink-0 shadow-sm border-b border-neutral-100">
              <h3 className="text-[18px] font-bold text-[#111827] m-0">{selectedDocument.name}</h3>
              <button onClick={() => setSelectedDocument(null)} className="text-[#6B7280] hover:text-[#111827] cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex justify-center items-start bg-[#E5E7EB]">
                <div className="bg-white w-full max-w-[700px] p-10 shadow-sm border border-neutral-200 min-h-full">
                    <h2 className="text-center font-bold text-lg mb-8 uppercase border-b-2 border-black pb-4 text-black">Employment Agreement – Technical Employee</h2>
                    <p className="text-sm mb-6 text-black">This Employment Agreement for "At Will" Employee (the "Agreement") is made and effective this [DATE],</p>
                    
                    <div className="grid grid-cols-[100px_1fr] gap-4 mb-6 text-sm text-black">
                        <div className="font-bold">BETWEEN:</div>
                        <div>
                            <strong>[EMPLOYEE NAME]</strong> (the "Employee"), an individual with his main address at:<br/><br/>
                            [COMPLETE ADDRESS]
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-[100px_1fr] gap-4 mb-8 text-sm text-black">
                        <div className="font-bold">AND:</div>
                        <div>
                            <strong>[YOUR COMPANY NAME]</strong> (the "Company"), an entity organized and existing under the laws of the [State/Province] of [STATE/PROVINCE], with its head office located at:<br/><br/>
                            [YOUR COMPLETE ADDRESS]
                        </div>
                    </div>

                    <h3 className="font-bold text-sm mb-4 text-black">RECITALS</h3>
                    <p className="text-sm mb-8 text-black">In consideration of the covenants and agreements herein contained and the moneys to be paid hereunder, the Company hereby employs the Employee and the Employee hereby agrees to perform services as an employee of the Company, on an "at will" basis, upon the following terms and conditions:</p>

                    <h3 className="font-bold text-sm mb-4 text-black">1. COMPANY'S TRADE SECRETS</h3>
                    <p className="text-sm mb-4 text-black">Employee understands that in performance of [HIS/HER] job duties with the Company, Employee will be exposed to the Company's trade secrets. "Trade secrets" means information or material that is commercially valuable to the Company and not generally known in the industry. This includes:</p>
                    <ol className="list-[upper-alpha] pl-8 space-y-4 text-sm text-black">
                        <li>Any and all versions of the Company's proprietary system (including source code and object code), hardware, firmware and documentation;</li>
                        <li>Technical information concerning the Company's products and services, including product data and specifications, diagrams, flow charts, drawings, test results, know-how, processes, inventions, research projects and product development;</li>
                        <li>Information concerning the Company's business, including cost information, profits, sales information, accounting and unpublished financial information, business plans, markets and marketing methods, customer lists and customer information, purchasing techniques, supplier lists and supplier information and advertising strategies;</li>
                        <li>Information concerning the Company's employees, including their salaries, strengths, weaknesses and skills;</li>
                        <li>Information submitted by the Company's customers, suppliers, employees, consultants or co-venturers with the Company for study, evaluation or use; and</li>
                        <li>Any other information not generally known to the public which, if misused or disclosed, could reasonably be expected to adversely affect the Company's business.</li>
                    </ol>

                    <div className="mt-16 flex justify-between text-xs border-t border-black pt-2 text-black">
                        <span>Employment Agreement – Technical Employee</span>
                        <span>Page 1 of 6</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end px-6 py-4 bg-[#F8F9FA] z-10 shrink-0 border-t border-neutral-200">
              <button
                onClick={() => setSelectedDocument(null)}
                className="rounded-xl bg-white px-6 py-2.5 text-[14px] font-semibold text-[#111827] border border-[#D0D5DD] cursor-pointer transition hover:bg-neutral-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
