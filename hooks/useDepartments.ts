import { useState, useEffect } from "react";
import { initialDepartments } from "@/Data/departments";
import { Department } from "@/types";

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("shiftmate_departments");
    if (stored) {
      setDepartments(JSON.parse(stored));
    } else {
      setDepartments(initialDepartments);
      localStorage.setItem("shiftmate_departments", JSON.stringify(initialDepartments));
    }
  }, []);

  const addDepartment = (newDept: Department) => {
    setDepartments((prev) => {
      const updated = [newDept, ...prev];
      localStorage.setItem("shiftmate_departments", JSON.stringify(updated));
      return updated;
    });
  };

  const removeDepartment = (id: string) => {
    setDepartments((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      localStorage.setItem("shiftmate_departments", JSON.stringify(updated));
      return updated;
    });
  };

  return { departments, addDepartment, removeDepartment };
}
