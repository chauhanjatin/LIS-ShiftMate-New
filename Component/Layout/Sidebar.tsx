"use client";

import Image from "next/image";
import { useState, Fragment, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import dashboardIcon from "@/assets/images/icons/dashboard.svg";
import usersIcon from "@/assets/images/icons/users.svg";
import roleIcon from "@/assets/images/icons/role.svg";
import organisationIcon from "@/assets/images/icons/organisation.svg";
import employeesIcon from "@/assets/images/icons/employee.svg";
import closeLogoIcon from "@/assets/images/icons/close-logo.svg";
import payrollSetting from "@/assets/images/icons/payrollsetting.svg";
import payCalendarIcon from "@/assets/images/icons/pay-calendar.svg";
import dollarIcon from "@/assets/images/icons/dollar.svg";
import deductionIcon from "@/assets/images/icons/deduction.svg";
import salaryStructureIcon from "@/assets/images/icons/salary-structure.svg";
import employeePayrollIcon from "@/assets/images/icons/employee-payroll.svg";
import payrollRunsIcon from "@/assets/images/icons/payroll-runs.svg";
import pendingApprovalIcon from "@/assets/images/icons/pending-approval.svg";
import taxRuleIcon from "@/assets/images/icons/tax-rule.svg";
import nationalRuleIcon from "@/assets/images/icons/national-rule.svg";
import studentLoanIcon from "@/assets/images/icons/student-loan.svg";
import payslipListIcon from "@/assets/images/icons/payslip-list.svg";
import Link from "next/link";

export default function Sidebar({
  collapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: Readonly<{
  collapsed: boolean;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>("null");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [activeSubItem, setActiveSubItem] = useState("");

  useEffect(() => {
    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes("/employees")) {
      setActiveItem("Employees");
      setOpenMenu("Employees");
      if (pathname.includes("/all-employees"))
        setActiveSubItem("All Employees");
      if (pathname.includes("/add")) setActiveSubItem("Add Employee");
      if (pathname.includes("/documents")) setActiveSubItem("Documents");
      if (pathname.includes("/onboarding")) setActiveSubItem("Onboarding");
    } else if (pathname.includes("/users")) {
      setActiveItem("Users");
    } else if (pathname.includes("/roles")) {
      setActiveItem("Roles");
    } else if (pathname.includes("/payroll-settings")) {
      setActiveItem("Payroll Settings");
    } else if (pathname.includes("/payroll-calendar")) {
      setActiveItem("Payroll Calendar");
    } else if (pathname.includes("/pay-components")) {
      setActiveItem("Pay Components");
    } else if (pathname.includes("/deduction-components")) {
      setActiveItem("Deduction Components");
    } else if (pathname.includes("/salary-structure")) {
      setActiveItem("Salary Structure");
    } else if (pathname.includes("/employee-payroll-setup")) {
      setActiveItem("Employee Payroll Setup");
    } else if (pathname.includes("/payroll-runs")) {
      setActiveItem("Payroll Runs");
    } else if (pathname.includes("/payroll-approval")) {
      setActiveItem("Payroll Approval");
    } else if (pathname.includes("/tax-rules")) {
      setActiveItem("Tax Rules");
    } else if (pathname.includes("/national-insurance-rule")) {
      setActiveItem("National Insurance Rule");
    } else if (pathname.includes("/student-loan-rules")) {
      setActiveItem("Student Loan Rules");
    } else if (pathname.includes("/payslip-list")) {
      setActiveItem("Payslip List");
    } else if (pathname.includes("/organization")) {
      setActiveItem("Organization");
      setOpenMenu("Organization");
      if (pathname.includes("/company-profile"))
        setActiveSubItem("Company Profile");
      if (pathname.includes("/departments"))
        setActiveSubItem("Departments");
      if (pathname.includes("/locations"))
        setActiveSubItem("Locations");
      if (pathname.includes("/job-titles"))
        setActiveSubItem("Job Titles");
    } else if (pathname.includes("/leave-management")) {
      setActiveItem("Leave Management");
      setOpenMenu("Leave Management");
      if (pathname.includes("/leave-types-and-policies"))
        setActiveSubItem("Leave Types & Policies");
      if (pathname.includes("/leave-requests"))
        setActiveSubItem("Leave Requests");
      if (pathname.includes("/leave-calendar"))
        setActiveSubItem("Leave Calendar");
      if (pathname.includes("/leave-balances"))
        setActiveSubItem("Leave Balances");
    } else if (pathname.includes("/pension")) {
      setActiveItem("Pension");
      setOpenMenu("Pension");
      if (pathname.includes("/pension-settings"))
        setActiveSubItem("Pension Settings");
      if (pathname.includes("/pension-assessment"))
        setActiveSubItem("Pension Assessment");
      if (pathname.includes("/pension-contribution"))
        setActiveSubItem("Pension Contribution");
    } else if (pathname.includes("/statutory-payments")) {
      setActiveItem("Statutory Payments");
    } else if (pathname.includes("/hmrc-rti")) {
      setActiveItem("HMRC RTI");
    } else {
      setActiveItem("Dashboard");
    }
  }, [pathname]);

  const items: Array<{
    label: string;
    icon: "dashboard" | "users" | "role" | "organisation" | "employees" | "payrollsetting" | "paycalendar" | "dollar" | "deduction" | "salarystructure" | "employeepayroll" | "payrollruns" | "payrollapproval" | "taxrules" | "nationalrule" | "studentloan" | "paysliplist" | "leavemanagement" | "pension" | "statutory" | "hmrc";
    expandable?: boolean;
  }> = [
    { label: "Dashboard", icon: "dashboard" },
    { label: "Users", icon: "users" },
    { label: "Roles", icon: "role" },
    { label: "Organization", icon: "organisation", expandable: true },
    { label: "Employees", icon: "employees", expandable: true },
    { label: "Payroll Settings", icon: "payrollsetting" },
    { label: "Payroll Calendar", icon: "paycalendar" },
    { label: "Pay Components", icon: "dollar" },
    { label: "Deduction Components", icon: "deduction" },
    { label: "Salary Structure", icon: "salarystructure" },
    { label: "Employee Payroll Setup", icon: "employeepayroll" },
    { label: "Payroll Runs", icon: "payrollruns" },
    { label: "Payroll Approval", icon: "payrollapproval" },
    { label: "Tax Rules", icon: "taxrules" },
    { label: "National Insurance Rule", icon: "nationalrule" },
    { label: "Student Loan Rules", icon: "studentloan" },
    { label: "Payslip List", icon: "paysliplist" },
    { label: "Leave Management", icon: "leavemanagement", expandable: true },
    { label: "Pension", icon: "pension", expandable: true },
    { label: "Statutory Payments", icon: "statutory", expandable: true },
    { label: "HMRC RTI", icon: "hmrc", expandable: true },
  ] as const;

  const routesMap: Record<string, string> = {
    Dashboard: "/dashboard",
    Users: "/users",
    Roles: "/roles",
    Organization: "",
    Employees: "",
    "Payroll Settings": "/payroll-settings",
    "Payroll Calendar": "/payroll-calendar",
    "Pay Components": "/pay-components",
    "Deduction Components": "/deduction-components",
    "Salary Structure": "/salary-structure",
    "Employee Payroll Setup": "/employee-payroll-setup",
    "Payroll Runs": "/payroll-runs",
    "Payroll Approval": "/payroll-approval",
    "Tax Rules": "/tax-rules",
    "National Insurance Rule": "/national-insurance-rule",
    "Student Loan Rules": "/student-loan-rules",
    "Payslip List": "/payslip-list",
    "Leave Management": "",
    "Pension": "",
    "Statutory Payments": "",
    "HMRC RTI": "",
  };

  const employeeSubMenus = [
    "All Employees",
    "Add Employee",
    "Documents",
    "Onboarding",
  ];

  const employeeSubRoutes: Record<string, string> = {
    "All Employees": "/employees/all-employees",
    "Add Employee": "/employees/add-employee",
    Documents: "/employees/documents",
    Onboarding: "/employees/onboarding",
  };

  const organizationSubMenus = [
    "Company Profile",
    "Departments",
    "Locations",
    "Job Titles",
  ];

  const organizationSubRoutes: Record<string, string> = {
    "Company Profile": "/organization/company-profile",
    "Departments": "/organization/departments",
    "Locations": "",
    "Job Titles": "",
  };

  const leaveManagementSubMenus = [
    "Leave Types & Policies",
    "Leave Requests",
    "Leave Calendar",
    "Leave Balances",
  ];

  const leaveManagementSubRoutes: Record<string, string> = {
    "Leave Types & Policies": "/leave-management/leave-types-and-policies",
    "Leave Requests": "/leave-management/leave-requests",
    "Leave Calendar": "/leave-management/leave-calendar",
    "Leave Balances": "/leave-management/leave-balances",
  };

  const pensionSubMenus = [
    "Pension Settings",
    "Pension Assessment",
    "Pension Contribution",
  ];

  const pensionSubRoutes: Record<string, string> = {
    "Pension Settings": "/pension/pension-settings",
    "Pension Assessment": "/pension/pension-assessment",
    "Pension Contribution": "",
  };

  const iconMap = {
    dashboard: dashboardIcon,
    users: usersIcon,
    role: roleIcon,
    organisation: organisationIcon,
    employees: employeesIcon,
    payrollsetting: payrollSetting,
    paycalendar: payCalendarIcon,
    dollar: dollarIcon,
    deduction: deductionIcon,
    salarystructure: salaryStructureIcon,
    employeepayroll: employeePayrollIcon,
    payrollruns: payrollRunsIcon,
    payrollapproval: pendingApprovalIcon,
    taxrules: taxRuleIcon,
    nationalrule: nationalRuleIcon,
    studentloan: studentLoanIcon,
    paysliplist: payslipListIcon,
    leavemanagement: payCalendarIcon,
    pension: dollarIcon,
    statutory: organisationIcon,
    hmrc: payslipListIcon,
  } as const;

  return (
    <aside
      className={`slim-scrollbar fixed inset-y-0 left-0 z-50 flex flex-col overflow-y-auto border-r border-neutral-200 bg-white transition-all duration-500 ease-in-out lg:static lg:flex lg:shrink-0 ${collapsed ? "w-25 2xl:w-28" : "w-64 2xl:w-[280px]"
        } ${isMobileMenuOpen ? "translate-x-0 w-68" : "-translate-x-full lg:translate-x-0"
        }`}
    >
      <button
        onClick={() => setIsMobileMenuOpen?.(false)}
        className="absolute lg:right-4 right-2 lg:top-6 top-2 z-50 flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 text-neutral-500 lg:hidden hover:bg-neutral-100 cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div
        className={`relative h-[104px] py-6 ${collapsed ? "px-0" : "px-5"
          } text-3xl font-black tracking-tight text-brand-500 transition-all duration-500 ease-in-out`}
      >
        <img
          src="/login/shiftmate-logo.png"
          alt="ShiftMate Logo"
          className={`absolute left-5 top-1/2 h-auto w-[190px] 2xl:w-[205px] -translate-y-1/2 object-contain transition-all duration-500 ease-in-out ${collapsed
            ? "pointer-events-none translate-x-2 opacity-0"
            : "translate-x-0 opacity-100"
            }`}
        />
        <Image
          src={closeLogoIcon}
          alt="ShiftMate Logo"
          width={56}
          height={56}
          className={`absolute left-1/2 top-[70%] 2xl:h-14 2xl:w-14 h-12 w-12 -translate-y-1/2 object-contain transition-all duration-500 ease-in-out ${collapsed
            ? "-translate-x-1/2 opacity-100"
            : "pointer-events-none -translate-x-[40%] opacity-0"
            }`}
        />
      </div>

      <nav
        className={`2xl:mt-8 mt-3 space-y-1 transition-all duration-500 ease-in-out ${collapsed ? "px-2" : "px-3"
          }`}
      >
        {items.map((item) => {
          const isActive = activeItem === item.label;
          const isOpen = openMenu === item.label;

          return (
            <Fragment key={item.label}>
              <button
                type="button"
                onClick={() => {
                  if (item.expandable) {
                    setOpenMenu(isOpen ? null : item.label);
                    setActiveItem(item.label);

                    if (routesMap[item.label]) {
                      router.push(routesMap[item.label]);
                    }
                  } else {
                    setOpenMenu(null);
                    setActiveItem(item.label);

                    if (routesMap[item.label]) {
                      router.push(routesMap[item.label]);
                    }
                  }
                }}
                className={
                  collapsed
                    ? `mx-auto flex 2xl:h-14 2xl:w-14 h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${isActive
                      ? "bg-brand-500 text-white"
                      : "text-[#111827] hover:bg-neutral-100"
                    }`
                    : `group flex w-full items-center justify-between rounded-2xl px-2 xl:px-4 2xl:py-3 py-2 text-left text-[16px] font-semibold cursor-pointer transition-all duration-300 ${isActive
                      ? "bg-brand-500 text-white"
                      : "text-[#111827] hover:bg-neutral-100"
                    }`
                }
              >
                <span
                  className={`inline-flex items-center ${collapsed ? "justify-center" : "gap-3"
                    }`}
                >
                  <Image
                    src={iconMap[item.icon]}
                    alt=""
                    width={20}
                    height={20}
                    className={`transition-all duration-300 ${collapsed ? "2xl:h-7 2xl:w-7 h-6 w-6" : "h-5 w-5"
                      } ${isActive ? "brightness-0 invert" : "brightness-0"}`}
                  />

                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0" : "max-w-[220px] opacity-100"
                      }`}
                  >
                    {item.label}
                  </span>
                </span>

                {!collapsed && item.expandable && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  >
                    <path
                      d="M5.5 7.5L10 12L14.5 7.5"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {!collapsed && item.label === "Employees" && isOpen && (
                <div
                  className="relative mt-2 ml-[48px] animate-in slide-in-from-top-2 duration-300"
                >
                  <div className="space-y-1">
                    {employeeSubMenus.map((subLabel) => {
                      const isSubActive = activeSubItem === subLabel;

                      return (
                        <button
                          key={subLabel}
                          onClick={() => {
                            setActiveSubItem(subLabel);

                            const route = employeeSubRoutes[subLabel];
                            if (route) router.push(route);
                          }}
                          className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-[16px] font-medium cursor-pointer transition-all duration-300 ${isSubActive ? "bg-[#EAF2FF] text-[#257BFC]" : "bg-transparent text-[#111827]"
                            }`}
                        >
                          {subLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {!collapsed && item.label === "Organization" && isOpen && (
                <div
                  className="relative mt-2 ml-[48px] animate-in slide-in-from-top-2 duration-300"
                >
                  <div className="space-y-1">
                    {organizationSubMenus.map((subLabel) => {
                      const isSubActive = activeSubItem === subLabel;

                      return (
                        <button
                          key={subLabel}
                          onClick={() => {
                            setActiveSubItem(subLabel);

                            const route = organizationSubRoutes[subLabel];
                            if (route) router.push(route);
                          }}
                          className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-[16px] font-medium cursor-pointer transition-all duration-300 ${isSubActive ? "bg-[#EAF2FF] text-[#257BFC]" : "bg-transparent text-[#111827]"
                            }`}
                        >
                          {subLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {!collapsed && item.label === "Leave Management" && isOpen && (
                <div
                  className="relative mt-2 ml-[44px] animate-in slide-in-from-top-2 duration-300"
                >
                  <div className="space-y-1">
                    {leaveManagementSubMenus.map((subLabel) => {
                      const isSubActive = activeSubItem === subLabel;

                      return (
                        <button
                          key={subLabel}
                          onClick={() => {
                            setActiveSubItem(subLabel);

                            const route = leaveManagementSubRoutes[subLabel];
                            if (route) router.push(route);
                          }}
                          className={`flex w-full items-center rounded-xl xl:px-4 px-3 py-3 text-left xl:text-[16px] text-[15px] font-medium cursor-pointer transition-all duration-300 ${isSubActive ? "bg-[#EAF2FF] text-[#257BFC]" : "bg-transparent text-[#111827]"
                            }`}
                        >
                          {subLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {!collapsed && item.label === "Pension" && isOpen && (
                <div
                  className="relative mt-2 ml-[44px] animate-in slide-in-from-top-2 duration-300"
                >
                  <div className="space-y-1">
                    {pensionSubMenus.map((subLabel) => {
                      const isSubActive = activeSubItem === subLabel;

                      return (
                        <button
                          key={subLabel}
                          onClick={() => {
                            setActiveSubItem(subLabel);

                            const route = pensionSubRoutes[subLabel];
                            if (route) router.push(route);
                          }}
                          className={`flex w-full items-center rounded-xl xl:px-4 px-3 py-3 text-left xl:text-[16px] text-[15px] font-medium cursor-pointer transition-all duration-300 ${isSubActive ? "bg-[#EAF2FF] text-[#257BFC]" : "bg-transparent text-[#111827]"
                            }`}
                        >
                          {subLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </nav>
    </aside>
  );
}
