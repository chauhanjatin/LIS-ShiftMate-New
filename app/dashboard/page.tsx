"use client";

import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import EssDashboard from "./EssDashboard";

export default function DashboardPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setActiveModule(localStorage.getItem("shiftmate_active_module"));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (activeModule === "Employee Self-Service Portal") {
    return <EssDashboard />;
  }

  return <Dashboard />;
}
