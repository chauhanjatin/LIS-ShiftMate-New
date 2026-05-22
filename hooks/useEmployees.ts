import { useState, useEffect } from "react";
import { Employee, initialEmployees } from "@/Data/employees";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("shiftmate_employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    } else {
      setEmployees(initialEmployees);
      localStorage.setItem("shiftmate_employees", JSON.stringify(initialEmployees));
    }
  }, []);

  const updateEmployee = (id: string, updatedData: Partial<Employee>) => {
    setEmployees((prev) => {
      const newEmployees = prev.map((emp) =>
        emp.id === id ? { ...emp, ...updatedData } : emp
      );
      localStorage.setItem("shiftmate_employees", JSON.stringify(newEmployees));
      return newEmployees;
    });
  };

  const addEmployee = (newEmployee: Employee) => {
    setEmployees((prev) => {
      const newEmployees = [newEmployee, ...prev];
      localStorage.setItem("shiftmate_employees", JSON.stringify(newEmployees));
      return newEmployees;
    });
  };

  const removeEmployee = (id: string) => {
    setEmployees((prev) => {
      const newEmployees = prev.filter(emp => emp.id !== id);
      localStorage.setItem("shiftmate_employees", JSON.stringify(newEmployees));
      return newEmployees;
    });
  };

  const getEmployee = (id: string) => {
    return employees.find((emp) => emp.id === id);
  };

  return { employees, updateEmployee, addEmployee, removeEmployee, getEmployee, setEmployees };
}
