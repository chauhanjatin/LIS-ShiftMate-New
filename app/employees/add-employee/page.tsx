"use client";

import React, { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import upload from "@/assets/images/icons/upload.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import fileTypeIcon from "@/assets/images/icons/file-typeicon.svg";
import { useEmployees } from "@/hooks/useEmployees";
import Toast from '@/Component/UI/Toast';
import CustomSelect from '@/Component/UI/CustomSelect';

const STEPS = [
  "Personal Details",
  "Employment Details",
  "Payroll Details",
  "Compliance Documents",
  "Review and Submit"
];

export default function AddEmployeePage() {
  const router = useRouter();
  const { addEmployee } = useEmployees();
  const [currentStep, setCurrentStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",

    employeeId: "",
    startDate: "",
    employmentType: "",
    department: "",
    jobTitle: "",
    location: "",
    manager: "",
    contractType: "",

    bankAccount: "",
    sortCode: "",
    niNumber: "",
    taxCode: "",
    payrollFrequency: "",
    salary: "",
    rightToWorkFile: "",
    employmentContractFile: "",
    passportFile: "",
    hmrcChecklistFile: "",
  });

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      const { firstName, lastName, dob, gender, phone, email, address, emergencyContact } = formData;
      if (!firstName) newErrors.firstName = "Please enter first name";
      if (!lastName) newErrors.lastName = "Please enter last name";
      if (!dob) newErrors.dob = "Please select date of birth";
      if (!gender) newErrors.gender = "Please select gender";
      if (!phone) newErrors.phone = "Please enter phone number";
      if (!email) newErrors.email = "Please enter email";
      if (!address) newErrors.address = "Please enter address";
      if (!emergencyContact) newErrors.emergencyContact = "Please enter emergency contact";
    }
    if (currentStep === 2) {
      const { employeeId, startDate, employmentType, department, jobTitle, location, manager, contractType } = formData;
      if (!employeeId) newErrors.employeeId = "Please enter employee ID";
      if (!startDate) newErrors.startDate = "Please enter start date";
      if (!employmentType) newErrors.employmentType = "Please select employment type";
      if (!department) newErrors.department = "Please select department";
      if (!jobTitle) newErrors.jobTitle = "Please enter job title";
      if (!location) newErrors.location = "Please enter location";
      if (!manager) newErrors.manager = "Please enter manager";
      if (!contractType) newErrors.contractType = "Please select contract type";
    }
    if (currentStep === 3) {
      const { bankAccount, sortCode, niNumber, taxCode, payrollFrequency, salary } = formData;
      if (!bankAccount) newErrors.bankAccount = "Please enter bank account";
      if (!sortCode) newErrors.sortCode = "Please enter sort code";
      if (!niNumber) newErrors.niNumber = "Please enter NI number";
      if (!taxCode) newErrors.taxCode = "Please enter tax code";
      if (!payrollFrequency) newErrors.payrollFrequency = "Please select payroll frequency";
      if (!salary) newErrors.salary = "Please enter salary";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    addEmployee({
        id: formData.employeeId,
        name: `${formData.firstName} ${formData.lastName}`,
        dept: formData.department,
        role: formData.jobTitle,
        type: formData.employmentType as any,
        status: "Active",
        joinDate: new Date(formData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        avatar: "https://i.pravatar.cc/150?u=" + Math.floor(Math.random() * 100),
    });
    setShowToast(true);
    setTimeout(() => {
      router.push("/employees/all-employees");
    }, 2000);
  };

  const breadcrumb = (
    <span className="text-[#98A2B3]">
        <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/employees/all-employees" className="hover:text-brand-500 transition-colors">Employees</Link>
        <span className="mx-1">/</span>
        <span className="text-neutral-900">Add Employee</span>
    </span>
  );

  return (
    <DashboardLayout title="Employees" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6 flex overflow-auto">
        <div className="rounded-2xl border border-neutral-200 bg-white md:p-8 p-5 shadow-sm flex-1 flex flex-col">
          <h2 className="md:text-[24px] text-[20px] font-semibold text-neutral-900 md:mb-10 mb-7">Add Employee</h2>

          <div className="flex max-[425px]:flex-col max-[425px]:items-start items-center justify-center 2xl:gap-[48px] xl:gap-[14px] gap-[8px] max-[425px]:gap-0 2xl:mb-20 md:mb-15 mb-12 2xl:mt-4 mt-3 px-4">
            {STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;
              const words = step.split(" ");

              let firstLine = "";
              let secondLine = "";

              if (words.length === 3) {
                firstLine = words[0];
                secondLine = `${words[1]} ${words[2]}`;
              } else {
                firstLine = words[0];
                secondLine = words[1] || "";
              }

              return (
                <React.Fragment key={step}>
                  <div className="flex flex-col max-[425px]:flex-row max-[425px]:items-center items-center relative shrink-0">
                    <div
                      className={`2xl:h-[42px] 2xl:w-[42px] h-[38px] w-[38px] flex items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${isActive || isCompleted ? "bg-[#257BFC] text-[#FFFFFF]" : "bg-[#F1F5F9] text-[#94A3B8]"}`}
                    >
                      {isCompleted ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        stepNumber
                      )}
                    </div>
                    <span
                      className={`absolute top-[52px] max-[425px]:static max-[425px]:ml-4 w-[110px] max-[425px]:w-auto text-center max-[425px]:text-left text-[13px] font-medium leading-[18px] ${isActive || isCompleted ? "text-[#0F172A]" : "text-[#94A3B8]"}`}
                    >
                      {firstLine}
                      {secondLine && <div className="whitespace-nowrap max-[425px]:inline max-[425px]:ml-1">{secondLine}</div>}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="bg-[#E2E8F0] h-[2px] 2xl:w-[115px] xl:w-[80px] w-[68px] 2xl:mx-2 mx-1 max-[425px]:mx-0 max-[425px]:ml-[18px] max-[425px]:my-1 max-[425px]:h-[30px] max-[425px]:w-[2px]">
                      <div className={`bg-[#257BFC] max-[425px]:w-full transition-all duration-300 ease-in-out ${isCompleted ? "h-[2px] max-[425px]:h-full w-full" : "h-[2px] max-[425px]:h-0 w-0"}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="md:mt-[48px] mb-8">
            <h3 className="mb-[32px] text-[20px] font-medium text-neutral-900">{STEPS[currentStep - 1]}</h3>

            {currentStep === 1 && (
              <div className="mx-[6%] grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">First name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter your first name" className={`w-full rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" className={`w-full rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Date of Birth</label>
                  <div className="relative">
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className={`w-full rounded-xl border ${errors.dob ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC] text-neutral-500`} />
                  </div>
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Gender</label>
                  <CustomSelect
                    value={formData.gender}
                    onChange={(val) => handleSelectChange('gender', val)}
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Other", value: "Other" }
                    ]}
                    placeholder="Select your gender"
                    error={!!errors.gender}
                    className="md:!p-3 !p-2"
                  />
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" className={`w-full rounded-xl border ${errors.phone ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Email</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" type="email" className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" className={`w-full rounded-xl border ${errors.address ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Emergency Contact</label>
                  <input name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} placeholder="Enter emergency contact number" className={`w-full rounded-xl border ${errors.emergencyContact ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="mx-[6%] grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Employee ID</label>
                  <input name="employeeId" value={formData.employeeId} onChange={handleInputChange} placeholder="Enter Employee ID" className={`w-full rounded-xl border ${errors.employeeId ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className={`w-full rounded-xl border ${errors.startDate ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC] text-neutral-500`} />
                  {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Employment Type</label>
                  <CustomSelect
                    value={formData.employmentType}
                    onChange={(val) => handleSelectChange('employmentType', val)}
                    options={[
                      { label: "Full Time", value: "Full Time" },
                      { label: "Part Time", value: "Part Time" },
                      { label: "Contract", value: "Contract" }
                    ]}
                    placeholder="Select your employment type"
                    error={!!errors.employmentType}
                    className="md:!p-3 !p-2"
                  />
                  {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Department</label>
                  <CustomSelect
                    value={formData.department}
                    onChange={(val) => handleSelectChange('department', val)}
                    options={[
                      { label: "Engineering", value: "Engineering" },
                      { label: "Marketing", value: "Marketing" },
                      { label: "Finance", value: "Finance" },
                      { label: "HR", value: "HR" }
                    ]}
                    placeholder="Select your department"
                    error={!!errors.department}
                    className="md:!p-3 !p-2"
                  />
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Job Title</label>
                  <input name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Enter your job title" className={`w-full rounded-xl border ${errors.jobTitle ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Location</label>
                  <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter your location" className={`w-full rounded-xl border ${errors.location ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Manager</label>
                  <input name="manager" value={formData.manager} onChange={handleInputChange} placeholder="Enter your manager name" className={`w-full rounded-xl border ${errors.manager ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.manager && <p className="text-red-500 text-xs mt-1">{errors.manager}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Contract Type</label>
                  <CustomSelect
                    value={formData.contractType}
                    onChange={(val) => handleSelectChange('contractType', val)}
                    options={[
                      { label: "Permanent", value: "Permanent" },
                      { label: "Fixed Term", value: "Fixed Term" }
                    ]}
                    placeholder="Select your contract type"
                    error={!!errors.contractType}
                    className="md:!p-3 !p-2"
                    menuPlacement="top"
                  />
                  {errors.contractType && <p className="text-red-500 text-xs mt-1">{errors.contractType}</p>}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="mx-[6%] grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Bank Account Number</label>
                  <input name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} placeholder="Enter your bank account number" className={`w-full rounded-xl border ${errors.bankAccount ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.bankAccount && <p className="text-red-500 text-xs mt-1">{errors.bankAccount}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Sort Code</label>
                  <input name="sortCode" value={formData.sortCode} onChange={handleInputChange} placeholder="Enter your sort code" className={`w-full rounded-xl border ${errors.sortCode ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.sortCode && <p className="text-red-500 text-xs mt-1">{errors.sortCode}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">NI Number</label>
                  <input name="niNumber" value={formData.niNumber} onChange={handleInputChange} placeholder="Enter your NI number" className={`w-full rounded-xl border ${errors.niNumber ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.niNumber && <p className="text-red-500 text-xs mt-1">{errors.niNumber}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Tax Code</label>
                  <input name="taxCode" value={formData.taxCode} onChange={handleInputChange} placeholder="Enter your tax code" className={`w-full rounded-xl border ${errors.taxCode ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.taxCode && <p className="text-red-500 text-xs mt-1">{errors.taxCode}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Payroll Frequency</label>
                  <CustomSelect
                    value={formData.payrollFrequency}
                    onChange={(val) => handleSelectChange('payrollFrequency', val)}
                    options={[
                      { label: "Monthly", value: "Monthly" },
                      { label: "Bi-weekly", value: "Bi-weekly" },
                      { label: "Weekly", value: "Weekly" }
                    ]}
                    placeholder="Select your payroll"
                    error={!!errors.payrollFrequency}
                    className="md:!p-3 !p-2"
                    menuPlacement="top"
                  />
                  {errors.payrollFrequency && <p className="text-red-500 text-xs mt-1">{errors.payrollFrequency}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">Salary / Hourly Rate</label>
                  <input name="salary" value={formData.salary} onChange={handleInputChange} placeholder="Enter your salary" className={`w-full rounded-xl border ${errors.salary ? 'border-red-500' : 'border-neutral-200'} md:p-3 p-2 outline-none focus:border-[#257BFC]`} />
                  {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="mx-[6%] grid gap-6 sm:grid-cols-2">
                {[
                  { label: "Right to Work document", desc: "PDF, PNG, JPG up to 10MB", field: "rightToWorkFile" },
                  { label: "Signed Employment Contract", desc: "PDF, DOCX up to 10MB", field: "employmentContractFile" },
                  { label: "Passport or Visa copy", desc: "PDF, PNG, JPG up to 10MB", field: "passportFile" },
                  { label: "HMRC Starter Checklist or P45", desc: "PDF, PNG, JPG up to 10MB", field: "hmrcChecklistFile" },
                ].map((doc, idx) => {
                  const uploadedFile = (formData as any)[doc.field];
                  return (
                    <div key={idx}>
                      <label className="mb-2 block text-sm font-medium text-[#111827]">{doc.label.split(' document')[0].split(' copy')[0]}</label>
                      <div className="flex items-center justify-between rounded-xl border border-dashed border-neutral-300 p-4 bg-neutral-50">
                        <div>
                          <p className="text-sm font-medium text-[#111827]">{uploadedFile ? uploadedFile : doc.label}</p>
                          <p className="text-xs text-neutral-400 mt-1">{uploadedFile ? "File selected" : doc.desc}</p>
                        </div>
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
                          <Image
                            src={upload}
                            alt="upload"
                            width={20}
                            height={20}
                          />
                          {uploadedFile ? "Change file" : "Upload file"}
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFormData(prev => ({ ...prev, [doc.field]: e.target.files![0].name }));
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {currentStep === 5 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <div className="rounded-[16px] bg-[#F9FAFB] p-6">
                  <div className="border-b border-[#D0D5DD] flex items-center justify-between pb-4 mb-5">
                    <h4 className="text-[20px] font-medium text-[#111827] 2xl:mb-6">
                      Personal Information
                    </h4>

                    <button
                      onClick={() => setCurrentStep(1)}
                      className="hover:opacity-80 transition"
                    >
                      <Image src={editIcon} alt="edit" width={20} height={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-[6px] text-[12px] font-normal text-[#98A2B3] leading-tight">Full Name</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="mb-[6px] text-[12px] font-normal text-[#98A2B3] leading-tight">Gender</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.gender || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Email Address</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight break-words">
                        {formData.email || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Phone</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.phone || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Phone</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.phone || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Address</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight break-words">
                        {formData.email || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Date of Birth</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.dob || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">
                        Emergency Contact
                      </p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.emergencyContact || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[16px] bg-[#F9FAFB] p-6">
                  <div className="border-b border-[#D0D5DD] flex items-center justify-between pb-4 mb-5">
                    <h4 className="text-[20px] font-medium text-[#111827] 2xl:mb-6">
                      Employment Information
                    </h4>

                    <button
                      onClick={() => setCurrentStep(2)}
                      className="hover:opacity-80 transition"
                    >
                      <Image src={editIcon} alt="edit" width={20} height={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Employee ID</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.employeeId || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Job Title</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.jobTitle || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Employment Type</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.employmentType || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Location</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.location || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Department</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.department || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Manager</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.manager || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Start Date</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.startDate || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Contract Type</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.contractType || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[16px] bg-[#F9FAFB] p-6">
                  <div className="border-b border-[#D0D5DD] flex items-center justify-between pb-4 mb-5">
                    <h4 className="text-[16px] font-bold text-[#111827] 2xl:mb-6">
                      Payroll Details
                    </h4>

                    <button
                      onClick={() => setCurrentStep(3)}
                      className="hover:opacity-80 transition"
                    >
                      <Image src={editIcon} alt="edit" width={20} height={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">
                        Bank Account Number
                      </p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.bankAccount || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-normal text-[#98A2B3] leading-tight">Sort Code</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.sortCode || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[12px] font-normal text-[#98A2B3] mb-1 leading-tight">NI Number</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.niNumber || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[12px] font-normal text-[#98A2B3] mb-1 leading-tight">Tax Code</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.taxCode || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[12px] font-normal text-[#98A2B3] mb-1 leading-tight">Payroll Frequency</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.payrollFrequency || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[12px] font-normal text-[#98A2B3] mb-1 leading-tight">Salary / Hourly Rate</p>
                      <p className="text-[14px] font-medium text-[#111827] leading-tight">
                        {formData.salary || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[16px] bg-[#F9FAFB] p-6">
                  <div className="border-b border-[#D0D5DD] flex items-center justify-between pb-4 mb-5">
                    <h4 className="text-[16px] font-bold text-[#111827] 2xl:mb-6">
                      Employment Information
                    </h4>

                    <button
                      onClick={() => setCurrentStep(4)}
                      className="hover:opacity-80 transition"
                    >
                      <Image src={editIcon} alt="edit" width={20} height={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Image
                          src={fileTypeIcon}
                          alt="file"
                        />

                        <span className="text-[14px] font-semibold text-[#111827]">
                          Right to Work document
                        </span>
                      </div>
                    </div>

                    {formData.rightToWorkFile ? (
                      <div className="bg-[#EDFAF2] border-transparent rounded-full text-[#4DB949] gap-[8px] flex items-center px-3 py-1 text-[14px] font-normal">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Uploaded
                      </div>
                    ) : (
                      <div className="bg-[#FEF6E7] border-transparent rounded-full text-[#F79009] gap-[8px] flex items-center px-3 py-1 text-[14px] font-normal">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Pending
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between 2xl:mt-5 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Image
                          src={fileTypeIcon}
                          alt="file"
                        />

                        <span className="text-[14px] font-semibold text-[#111827]">
                          Passport or Visa
                        </span>
                      </div>
                    </div>

                    {formData.passportFile ? (
                      <div className="bg-[#EDFAF2] border-transparent rounded-full text-[#4DB949] gap-2 flex items-center px-3 py-1 text-[14px] font-normal">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Uploaded
                      </div>
                    ) : (
                      <div className="bg-[#FEF6E7] border-transparent rounded-full text-[#F79009] gap-2 flex items-center px-3 py-1 text-[14px] font-normal">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Pending
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between 2xl:mt-5 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Image
                          src={fileTypeIcon}
                          alt="file"
                        />

                        <span className="text-[14px] font-semibold text-[#111827]">
                          Signed Employment Contract
                        </span>
                      </div>
                    </div>

                    {formData.employmentContractFile ? (
                      <div className="bg-[#EDFAF2] border-transparent rounded-full text-[#4DB949] gap-2 flex items-center px-3 py-1 text-[14px] font-normal">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Uploaded
                      </div>
                    ) : (
                      <div className="bg-[#FEF6E7] border-transparent rounded-full text-[#F79009] gap-2 flex items-center px-3 py-1 text-[14px] font-normal">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Pending
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:mt-[48px] mt-8 flex justify-end md:gap-4 gap-2 md:pt-8">
            {currentStep === 1 ? (
              <Link href="/employees/all-employees">
                <button className="rounded-xl cursor-pointer border border-neutral-300 bg-white 2xl:px-6 px-4 2xl:py-3 py-2 2xl:text-[16px] text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50">
                  Cancel
                </button>
              </Link>
            ) : (
              <button onClick={handlePrevious} className="rounded-xl cursor-pointer border border-neutral-300 bg-white 2xl:px-6 px-3 2xl:py-3 md:py-2 py-1 md:text-[16px] text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50">
                Previous
              </button>
            )}

            {currentStep === 5 ? (
              <button onClick={handleSubmit} className="rounded-xl bg-[#257BFC] 2xl:px-6 px-3 2xl:py-3 md:py-2 py-1 2xl:text-[16px] text-[14px] font-semibold cursor-pointer text-white transition hover:bg-blue-600">
                Submit & Create Employee
              </button>
            ) : (
              <button onClick={handleNext} className="rounded-xl bg-[#257BFC] 2xl:px-6 px-3 2xl:py-3 md:py-2 py-1 md:text-[16px] text-[14px] font-semibold cursor-pointer text-white transition hover:bg-blue-600 2xl:w-28 w-28">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <Toast
        show={showToast}
        message="Employee Created Successfully!"
        onClose={() => setShowToast(false)}
      />
    </DashboardLayout>
  );
}


