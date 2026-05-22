export interface Department {
  id: string;
  name: string;
  code: string;
  managerId: string;
  employeeCount: number;
}

export const initialDepartments: Department[] = [
  { id: "D001", name: "Business Development", code: "BD", managerId: "EMP001", employeeCount: 22 },
  { id: "D002", name: "Customer Support", code: "CS", managerId: "EMP002", employeeCount: 18 },
  { id: "D003", name: "Engineering", code: "ENG", managerId: "EMP003", employeeCount: 10 },
  { id: "D004", name: "Finance", code: "FIN", managerId: "EMP004", employeeCount: 20 },
  { id: "D005", name: "Human Resources", code: "HR", managerId: "EMP005", employeeCount: 22 },
  { id: "D006", name: "IT & Security", code: "IT", managerId: "EMP006", employeeCount: 13 },
  { id: "D007", name: "Legal", code: "LEGAL", managerId: "EMP007", employeeCount: 18 },
  { id: "D008", name: "Marketing", code: "MKT", managerId: "EMP008", employeeCount: 14 },
  { id: "D009", name: "Operations", code: "OPS", managerId: "EMP009", employeeCount: 12 },
  { id: "D010", name: "Product Design", code: "PD", managerId: "EMP001", employeeCount: 16 },
];
