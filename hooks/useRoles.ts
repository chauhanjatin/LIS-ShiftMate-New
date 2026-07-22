import { useState, useEffect } from "react";
import { initialRoles } from "@/Data/roles";
import { Role } from "@/types";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("shiftmate_roles");
    if (stored) {
      setRoles(JSON.parse(stored));
    } else {
      setRoles(initialRoles);
      localStorage.setItem("shiftmate_roles", JSON.stringify(initialRoles));
    }
  }, []);

  const addRole = (newRole: Role) => {
    setRoles((prev) => {
      const updated = [newRole, ...prev];
      localStorage.setItem("shiftmate_roles", JSON.stringify(updated));
      return updated;
    });
  };

  const removeRole = (id: string) => {
    setRoles((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem("shiftmate_roles", JSON.stringify(updated));
      return updated;
    });
  };

  return { roles, addRole, removeRole };
}
