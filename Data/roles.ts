import { Role } from "@/types";


export const initialRoles: Role[] = [
  {
    id: "R001",
    name: "Admin",
    description: "Full system access with all permissions",
    userCount: 4,
  },
  {
    id: "R002",
    name: "Manager",
    description: "Team management, reports, and approvals",
    userCount: 6,
  },
  {
    id: "R003",
    name: "HR",
    description: "People operations, recruitment, employee management",
    userCount: 4,
  },
  {
    id: "R004",
    name: "Finance",
    description: "Payroll, invoices, financial reports",
    userCount: 4,
  },
  {
    id: "R005",
    name: "Employee",
    description: "Basic self-service access",
    userCount: 4,
  },
  {
    id: "R006",
    name: "Super Admin",
    description: "System administration with advanced permissions",
    userCount: 4,
  },
];
