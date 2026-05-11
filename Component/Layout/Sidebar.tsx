"use client";

import Image from "next/image";
import { useState, Fragment, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import dashboardIcon from "@/assets/images/icons/dashboard.svg";
import usersIcon from "@/assets/images/icons/users.svg";
import roleIcon from "@/assets/images/icons/role.svg";
import organisationIcon from "@/assets/images/icons/organisation.svg";
import employeesIcon from "@/assets/images/icons/emplooye.svg";
import closeLogoIcon from "@/assets/images/icons/close-logo.svg";

export default function Sidebar({ collapsed }: Readonly<{ collapsed: boolean }>) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>("null");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [activeSubItem, setActiveSubItem] = useState("");

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
    } else if (pathname.includes("/organization")) {
      setActiveItem("Organization");
    } else {
      setActiveItem("Dashboard");
    }
  }, [pathname]);

  const items: Array<{
    label: string;
    icon: "dashboard" | "users" | "role" | "organisation" | "employees";
    expandable?: boolean;
  }> = [
    { label: "Dashboard", icon: "dashboard" },
    { label: "Users", icon: "users" },
    { label: "Roles", icon: "role" },
    { label: "Organization", icon: "organisation", expandable: true },
    { label: "Employees", icon: "employees", expandable: true },
  ] as const;

  const routesMap: Record<string, string> = {
    Dashboard: "/dashboard",
    Users: "/users",
    Roles: "/roles",
    Organization: "/organization",
    Employees: "",
  };

  const employeeSubMenus = [
    "All Employees",
    "Add Employee",
    "Documents",
    "Onboarding",
  ];

  const employeeSubRoutes: Record<string, string> = {
    "All Employees": "/employees/all-employees",
    "Add Employee": "/employees/add",
    Documents: "/employees/documents",
    Onboarding: "/employees/onboarding",
  };

  const iconMap = {
    dashboard: dashboardIcon,
    users: usersIcon,
    role: roleIcon,
    organisation: organisationIcon,
    employees: employeesIcon,
  } as const;

  return (
    <aside
      className={`hidden shrink-0 border-r border-neutral-200 bg-white transition-[width] duration-500 ease-in-out lg:flex lg:flex-col ${
        collapsed ? "w-28" : "w-64"
      }`}
    >
      {/* LOGO */}
      <div
        className={`relative h-[104px] py-6 ${
          collapsed ? "px-0" : "px-5"
        } text-3xl font-black tracking-tight text-brand-500 transition-all duration-500 ease-in-out`}
      >
        <img
          src="/login/shiftmate-logo.png"
          alt="ShiftMate Logo"
          className={`absolute left-5 top-1/2 h-auto w-[205px] -translate-y-1/2 object-contain transition-all duration-500 ease-in-out ${
            collapsed
              ? "pointer-events-none translate-x-2 opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        />
        <Image
          src={closeLogoIcon}
          alt="ShiftMate Logo"
          width={56}
          height={56}
          className={`absolute left-1/2 top-1/2 h-14 w-14 -translate-y-1/2 object-contain transition-all duration-500 ease-in-out ${
            collapsed
              ? "-translate-x-1/2 opacity-100"
              : "pointer-events-none -translate-x-[40%] opacity-0"
          }`}
        />
      </div>

      {/* MENU */}
      <nav
        className={`mt-5 space-y-2 transition-all duration-500 ease-in-out ${
          collapsed ? "px-2" : "px-3"
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
                    ? `mx-auto flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-brand-500 text-white shadow-[0_10px_20px_rgba(37,123,252,0.25)]"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`
                    : `group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[16px] font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-brand-500 text-white shadow-[0_10px_20px_rgba(37,123,252,0.25)]"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`
                }
              >
                <span
                  className={`inline-flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                >
                  <Image
                    src={iconMap[item.icon]}
                    alt=""
                    width={20}
                    height={20}
                    className={`transition-all duration-300 ${
                      collapsed ? "h-7 w-7" : "h-5 w-5"
                    } ${isActive ? "brightness-0 invert" : "brightness-0"}`}
                  />

                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${
                      collapsed ? "max-w-0 opacity-0" : "max-w-40 opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>

                {!collapsed && item.expandable && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
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

              {/* EMPLOYEE DROPDOWN */}
              {!collapsed && item.label === "Employees" && isOpen && (
                <div
                  className="relative mt-2 animate-in slide-in-from-top-2 duration-300"
                  style={{ marginLeft: "48px" }}
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
                          style={{
                            backgroundColor: isSubActive
                              ? "#EAF2FF"
                              : "transparent",
                            color: isSubActive ? "#257BFC" : "#111827",
                          }}
                          className="flex w-full items-center rounded-xl px-4 py-3 text-left text-[16px] font-medium transition-all duration-300"
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
