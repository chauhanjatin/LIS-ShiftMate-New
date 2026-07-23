import { apiClient } from './api';
import { Employee } from '@/types';
import { initialEmployees } from '@/Data/employees';

// Simulated network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Employee Service
 * 
 * This service currently wraps the localStorage logic in async functions.
 * A backend developer can simply replace the body of these functions with 
 * `return apiClient.get('/employees')` to fully integrate the backend.
 */
export const employeeService = {
  
  getEmployees: async (): Promise<Employee[]> => {
    // TODO: Replace with `return apiClient.get('/employees')`
    await delay(300);
    const stored = localStorage.getItem("shiftmate_employees");
    if (stored) return JSON.parse(stored);
    
    // Seed initial data if none exists
    localStorage.setItem("shiftmate_employees", JSON.stringify(initialEmployees));
    return initialEmployees;
  },

  getEmployeeById: async (id: string): Promise<Employee | undefined> => {
    // TODO: Replace with `return apiClient.get(\`/employees/\${id}\`)`
    const employees = await employeeService.getEmployees();
    return employees.find(emp => emp.id === id);
  },

  createEmployee: async (data: Employee): Promise<Employee> => {
    // TODO: Replace with `return apiClient.post('/employees', data)`
    const employees = await employeeService.getEmployees();
    const newEmployees = [data, ...employees];
    localStorage.setItem("shiftmate_employees", JSON.stringify(newEmployees));
    return data;
  },

  updateEmployee: async (id: string, data: Partial<Employee>): Promise<Employee> => {
    // TODO: Replace with `return apiClient.put(\`/employees/\${id}\`, data)`
    const employees = await employeeService.getEmployees();
    let updatedEmployee: Employee | null = null;
    
    const newEmployees = employees.map(emp => {
      if (emp.id === id) {
        updatedEmployee = { ...emp, ...data };
        return updatedEmployee;
      }
      return emp;
    });
    
    localStorage.setItem("shiftmate_employees", JSON.stringify(newEmployees));
    if (!updatedEmployee) throw new Error("Employee not found");
    return updatedEmployee;
  },

  deleteEmployee: async (id: string): Promise<void> => {
    // TODO: Replace with `return apiClient.delete(\`/employees/\${id}\`)`
    const employees = await employeeService.getEmployees();
    const newEmployees = employees.filter(emp => emp.id !== id);
    localStorage.setItem("shiftmate_employees", JSON.stringify(newEmployees));
  }
};
