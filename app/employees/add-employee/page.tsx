"use client";

import { useState } from "react";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the steps
const STEPS = [
  "Personal Details",
  "Employment Details",
  "Payroll Details",
  "Compliance Documents",
  "Review and Submit"
];

export default function AddEmployeePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "Michael",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",

    employeeId: "#1234",
    startDate: "",
    employmentType: "",
    department: "",
    jobTitle: "",
    location: "",
    manager: "",
    contractType: "",

    bankAccount: "12345678912310",
    sortCode: "",
    niNumber: "",
    taxCode: "",
    payrollFrequency: "",
    salary: "",
  });

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Submit logic here
    alert("Employee Created Successfully!");
    router.push("/employees/all-employees");
  };

  return (
    <DashboardLayout title="Employees" subtitle="Home/ Employees/ Add Employee">
      <div className="flex-1 p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm min-h-[calc(100vh-120px)] relative pb-24">
          <h2 style={{ fontSize: "24px" }} className="font-semibold text-neutral-900 mb-10">Add Employee</h2>

          {/* Stepper */}
          <div className="mb-12 flex items-center justify-center gap-10">
            {STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;

              return (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center relative mb-10">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors
                      ${isActive || isCompleted
                          ? "bg-[#257BFC] text-white"
                          : "bg-neutral-100 text-neutral-400"
                        }`}
                    >
                      {isCompleted ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        stepNumber
                      )}
                    </div>
                    <span
                      style={{ top: "50px" }}
                      className={`absolute left-1/2 w-24 -translate-x-1/2 text-center text-[16px] font-medium
                        ${isActive || isCompleted ? "text-black" : "text-neutral-400"
                        }`}
                    >
                      {step}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="mx-4 h-[2px] w-12 bg-neutral-200 sm:w-20 lg:w-24">
                      <div
                        style={{
                          backgroundColor: "#257BFC",
                          height: "2px",
                          width: isCompleted ? "100%" : "0%",
                          transition: "width 0.3s ease",
                        }}
                        className="h-full transition-all duration-300"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mb-8 mt-16 max-w-5xl mx-auto">
            <h3 className="mb-6 mt-10 text-[18px] font-bold text-neutral-900">{STEPS[currentStep - 1]}</h3>

            {/* Forms Content */}
            {currentStep === 1 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">First name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Date of Birth</label>
                  <div className="relative">
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC] text-neutral-500" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC] text-neutral-500 bg-white">
                    <option value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Email</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" type="email" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Emergency Contact</label>
                  <input name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} placeholder="Enter your email" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Employee ID</label>
                  <input name="employeeId" value={formData.employeeId} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC] text-neutral-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Employment Type</label>
                  <select name="employmentType" value={formData.employmentType} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC] text-neutral-500 bg-white">
                    <option value="">Select your employment type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Department</label>
                  <select name="department" value={formData.department} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC] text-neutral-500 bg-white">
                    <option value="">Select your department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Job Title</label>
                  <input name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Enter your job title" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Location</label>
                  <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter your location" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Manager</label>
                  <input name="manager" value={formData.manager} onChange={handleInputChange} placeholder="Enter your manager name" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Contract Type</label>
                  <select name="contractType" value={formData.contractType} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC] text-neutral-500 bg-white">
                    <option value="">Select your contract type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Fixed Term">Fixed Term</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Bank Account Number</label>
                  <input name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Sort Code</label>
                  <input name="sortCode" value={formData.sortCode} onChange={handleInputChange} placeholder="Enter your sort code" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">NI Number</label>
                  <input name="niNumber" value={formData.niNumber} onChange={handleInputChange} placeholder="Enter your NI number" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Tax Code</label>
                  <input name="taxCode" value={formData.taxCode} onChange={handleInputChange} placeholder="Enter your tax code" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Payroll Frequency</label>
                  <select name="payrollFrequency" value={formData.payrollFrequency} onChange={handleInputChange} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC] text-neutral-500 bg-white">
                    <option value="">Select your payroll</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Salary / Hourly Rate</label>
                  <input name="salary" value={formData.salary} onChange={handleInputChange} placeholder="Enter your salary" className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:border-[#257BFC]" />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {/* File Upload mock UI */}
                {[
                  { label: "Right to Work document", desc: "PDF, PNG, JPG up to 10MB" },
                  { label: "Signed Employment Contract", desc: "PDF, DOCX up to 10MB" },
                  { label: "Passport or Visa copy", desc: "PDF, PNG, JPG up to 10MB" },
                  { label: "HMRC Starter Checklist or P45", desc: "PDF, PNG, JPG up to 10MB" },
                ].map((doc, idx) => (
                  <div key={idx}>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">{doc.label.split(' document')[0].split(' copy')[0]}</label>
                    <div className="flex items-center justify-between rounded-xl border border-dashed border-neutral-300 p-4 bg-neutral-50">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{doc.label}</p>
                        <p className="text-xs text-neutral-400 mt-1">{doc.desc}</p>
                      </div>
                      <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Upload file
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 5 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Personal Information */}
                <div className="rounded-xl border border-neutral-200 p-5 relative">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-[16px] font-bold text-neutral-900">Personal Information</h4>
                    <button onClick={() => setCurrentStep(1)} className="text-neutral-400 hover:text-[#257BFC] transition">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-400">Full Name</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Gender</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.gender || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Email Address</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.email || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Phone</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.phone || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Date of Birth</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.dob || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Address</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.address || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Emergency Contact</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.emergencyContact || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Employment Information */}
                <div className="rounded-xl border border-neutral-200 p-5 relative">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-[16px] font-bold text-neutral-900">Employment Information</h4>
                    <button onClick={() => setCurrentStep(2)} className="text-neutral-400 hover:text-[#257BFC] transition">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-400">Employee ID</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.employeeId || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Job Title</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.jobTitle || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Employment Type</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.employmentType || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Location</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.location || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Department</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.department || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Manager</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.manager || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Start Date</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.startDate || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Contract Type</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.contractType || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Payroll Details */}
                <div className="rounded-xl border border-neutral-200 p-5 relative">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-[16px] font-bold text-neutral-900">Payroll Details</h4>
                    <button onClick={() => setCurrentStep(3)} className="text-neutral-400 hover:text-[#257BFC] transition">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-400">Bank Account Number</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.bankAccount || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Sort Code</p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">{formData.sortCode || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Compliance Documents */}
                <div className="rounded-xl border border-neutral-200 p-5 relative">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-[16px] font-bold text-neutral-900">Employment Information</h4>
                    <button onClick={() => setCurrentStep(4)} className="text-neutral-400 hover:text-[#257BFC] transition">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="rounded-xl bg-neutral-50 px-4 py-3 border border-neutral-200 flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F04438" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span className="text-sm text-neutral-900 font-medium">Right to Work document</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Uploaded
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-8 right-8 flex gap-4">
            {currentStep === 1 ? (
              <Link href="/employees/all-employees">
                <button className="rounded-xl border border-neutral-300 bg-white px-6 py-3 text-[16px] font-semibold text-neutral-700 transition hover:bg-neutral-50">
                  Cancel
                </button>
              </Link>
            ) : (
              <button onClick={handlePrevious} className="rounded-xl border border-neutral-300 bg-white px-6 py-3 text-[16px] font-semibold text-neutral-700 transition hover:bg-neutral-50">
                Previous
              </button>
            )}

            {currentStep === 5 ? (
              <button onClick={handleSubmit} className="rounded-xl bg-[#257BFC] px-6 py-3 text-[16px] font-semibold text-white transition hover:bg-blue-600">
                Submit & Create Employee
              </button>
            ) : (
              <button onClick={handleNext} className="rounded-xl bg-[#257BFC] px-6 py-3 text-[16px] font-semibold text-white transition hover:bg-blue-600 w-28">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
