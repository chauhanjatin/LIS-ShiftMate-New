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

export const initialUsers: User[] = [
  { id: "EMP001", name: "Cameron Williamson", email: "georgia.young@example.com", role: "Admin", company: "Shiftmate", status: "Active", avatar: "https://i.pravatar.cc/150?u=1", department: "Engineering", joinDate: "October 25, 2026", employmentType: "Full-time" },
  { id: "EMP002", name: "Devon Lane", email: "willie.jennings@example.com", role: "Manager", company: "Shiftmate", status: "Active", avatar: "https://i.pravatar.cc/150?u=2", department: "Marketing", joinDate: "March 13, 2026", employmentType: "Full-time" },
  { id: "EMP003", name: "Jane Cooper", email: "nevaeh.simmons@example.com", role: "HR", company: "Shiftmate", status: "Inactive", avatar: "https://i.pravatar.cc/150?u=3", department: "HR", joinDate: "August 24, 2026", employmentType: "Contract" },
  { id: "EMP004", name: "Courtney Henry", email: "michelle.rivera@example.com", role: "Employee", company: "Shiftmate", status: "Active", avatar: "https://i.pravatar.cc/150?u=4", department: "Operations", joinDate: "October 31, 2026", employmentType: "Part-time" },
  { id: "EMP005", name: "Guy Hawkins", email: "michael.mitc@example.com", role: "HR", company: "Shiftmate", status: "On Leave", avatar: "https://i.pravatar.cc/150?u=5", department: "HR", joinDate: "December 2, 2026", employmentType: "Full-time" },
  { id: "EMP006", name: "Brooklyn Simmons", email: "kenzi.lawson@example.com", role: "Admin", company: "Shiftmate", status: "Active", avatar: "https://i.pravatar.cc/150?u=6", department: "IT", joinDate: "December 19, 2026", employmentType: "Contract" },
  { id: "EMP007", name: "Jacob Jones", email: "sara.cruz@example.com", role: "Employee", company: "Shiftmate", status: "Suspended", avatar: "https://i.pravatar.cc/150?u=7", department: "Sales", joinDate: "November 28, 2026", employmentType: "Full-time" },
  { id: "EMP008", name: "Darlene Robertson", email: "alma.lawson@example.com", role: "Manager", company: "Shiftmate", status: "Active", avatar: "https://i.pravatar.cc/150?u=8", department: "Marketing", joinDate: "May 12, 2026", employmentType: "Contract" },
  { id: "EMP009", name: "Esther Howard", email: "dolores.chambers@example.com", role: "Employee", company: "Shiftmate", status: "Inactive", avatar: "https://i.pravatar.cc/150?u=9", department: "Operations", joinDate: "August 24, 2026", employmentType: "Full-time" },
];
