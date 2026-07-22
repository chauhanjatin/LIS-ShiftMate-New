// Employee Types
export type Status = "Active" | "On Leave" | "Inactive";

export interface Employee {
  id: string;
  name: string;
  dept: string;
  role: string;
  type: string;
  status: Status;
  joinDate: string;
  avatar: string;
  firstName?: string;
  lastName?: string;
  workEmail?: string;
  personalEmail?: string;
  workPhone?: string;
}

// User Types
export type UserStatus = "Active" | "Inactive" | "On Leave" | "Suspended" | "Pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  status: UserStatus;
  avatar: string;
  department?: string;
  joinDate?: string;
  employmentType?: string;
}

// Department Types
export interface Department {
  id: string;
  name: string;
  code: string;
  managerId: string;
  employeeCount: number;
}

// Role Types
export interface RolePermissions {
  [module: string]: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
    export: boolean;
  };
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions?: RolePermissions;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "profile" | "department" | "company" | "request" | "general" | "warning";
}
