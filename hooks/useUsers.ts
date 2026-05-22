import { useState, useEffect } from "react";
import { User, initialUsers } from "@/Data/users";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("shiftmate_users");
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      setUsers(initialUsers);
      localStorage.setItem("shiftmate_users", JSON.stringify(initialUsers));
    }
  }, []);

  const updateUser = (id: string, updatedData: Partial<User>) => {
    setUsers((prev) => {
      const newUsers = prev.map((u) =>
        u.id === id ? { ...u, ...updatedData } : u
      );
      localStorage.setItem("shiftmate_users", JSON.stringify(newUsers));
      return newUsers;
    });
  };

  const addUser = (newUser: User) => {
    setUsers((prev) => {
      const newUsers = [newUser, ...prev];
      localStorage.setItem("shiftmate_users", JSON.stringify(newUsers));
      return newUsers;
    });
  };

  const removeUser = (id: string) => {
    setUsers((prev) => {
      const newUsers = prev.filter(u => u.id !== id);
      localStorage.setItem("shiftmate_users", JSON.stringify(newUsers));
      return newUsers;
    });
  };

  const getUser = (id: string) => {
    return users.find((u) => u.id === id);
  };

  return { users, updateUser, addUser, removeUser, getUser, setUsers };
}
