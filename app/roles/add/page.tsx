"use client";

import { useState } from "react";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { useRouter } from "next/navigation";
import { useRoles } from "@/hooks/useRoles";
import { RolePermissions } from "@/Data/roles";

const PERMISSION_MODULES = [
  "Employee Management",
  "Leave & Attendance",
  "Payroll",
  "Recruitment",
  "Performance Reviews",
  "Documents",
  "User Management",
  "Roles & Permissions",
  "Company Settings",
];

export default function AddRolePage() {
  const router = useRouter();
  const { addRole } = useRoles();

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<RolePermissions>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCheckboxChange = (module: string, field: keyof RolePermissions[string]) => {
    setPermissions((prev) => {
      const modPerms = prev[module] || {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        export: false,
      };
      return {
        ...prev,
        [module]: {
          ...modPerms,
          [field]: !modPerms[field],
        },
      };
    });
  };

  const handleCreateRole = () => {
    const newErrors: { [key: string]: string } = {};
    if (!roleName) newErrors.roleName = "Please enter a role name";
    if (!description) newErrors.description = "Please enter a description";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addRole({
      id: `R00${Math.floor(Math.random() * 1000)}`,
      name: roleName,
      description,
      userCount: 0,
      permissions,
    });

    router.push("/roles");
  };

  return (
    <DashboardLayout title="Roles" subtitle="Home/ Roles List/ Add Role">
      <div className="flex-1 p-4 2xl:p-6 h-full flex flex-col">
        <div className="rounded-2xl border border-neutral-200 bg-white md:p-8 p-5 shadow-sm flex-1 flex flex-col xl:flex-row gap-6">
          
          <div className="w-full xl:w-[320px] 2xl:w-[380px] shrink-0 rounded-2xl lg:p-6 p-3">
            <h2 className="text-[20px] font-bold text-neutral-900 mb-2">Create New Role</h2>
            
            <div className="mt-6 lg:mb-8">
              <h3 className="text-[16px] font-semibold text-neutral-900 mb-1">Role Details</h3>
              <p className="text-[12px] text-neutral-500 mb-6 leading-relaxed">
                Enter the employee's basic personal information for identification and contact purposes.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Role Name</label>
                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) => { setRoleName(e.target.value); setErrors(prev => ({...prev, roleName: ""})); }}
                    className={`w-full rounded-xl border ${errors.roleName ? 'border-red-500' : 'border-neutral-200'} px-4 py-2.5 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-white`}
                    placeholder="e.g. Senior Manager"
                  />
                  {errors.roleName && <p className="text-red-500 text-xs mt-1">{errors.roleName}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); setErrors(prev => ({...prev, description: ""})); }}
                    rows={4}
                    className={`w-full rounded-xl border ${errors.description ? 'border-red-500' : 'border-neutral-200'} px-4 py-2.5 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-white resize-none`}
                    placeholder="Responsible for team management and project oversight"
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white lg:p-6 p-3 lg:border-l border-[#E4E7EC] overflow-hidden flex flex-col">
            <h3 className="text-[18px] font-bold text-neutral-900 mb-6">Permissions Matrix</h3>
            
            <div className="flex-1 overflow-x-auto overflow-y-auto">
              <table className="min-w-[800px] w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC]">
                  <tr>
                    <th className="py-3 px-4 text-[13px] font-semibold text-neutral-700 border-b border-neutral-200 rounded-tl-xl w-[220px]">
                      Role Name
                    </th>
                    <th className="py-3 px-4 text-[13px] font-semibold text-neutral-700 border-b border-neutral-200 text-center">
                      View
                    </th>
                    <th className="py-3 px-4 text-[13px] font-semibold text-neutral-700 border-b border-neutral-200 text-center">
                      Create
                    </th>
                    <th className="py-3 px-4 text-[13px] font-semibold text-neutral-700 border-b border-neutral-200 text-center">
                      Edit
                    </th>
                    <th className="py-3 px-4 text-[13px] font-semibold text-neutral-700 border-b border-neutral-200 text-center">
                      Delete
                    </th>
                    <th className="py-3 px-4 text-[13px] font-semibold text-neutral-700 border-b border-neutral-200 text-center">
                      Approve
                    </th>
                    <th className="py-3 px-4 text-[13px] font-semibold text-neutral-700 border-b border-neutral-200 text-center rounded-tr-xl">
                      Export
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PERMISSION_MODULES.map((module, idx) => {
                    const modPerms = permissions[module] || {};
                    return (
                      <tr key={module} className={`border-b border-neutral-100 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                        <td className="py-4 px-4 text-[13px] font-medium text-neutral-900">
                          {module}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.view} 
                            onChange={() => handleCheckboxChange(module, "view")}
                            className="w-[18px] h-[18px] rounded border-neutral-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.create} 
                            onChange={() => handleCheckboxChange(module, "create")}
                            className="w-[18px] h-[18px] rounded border-neutral-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.edit} 
                            onChange={() => handleCheckboxChange(module, "edit")}
                            className="w-[18px] h-[18px] rounded border-neutral-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.delete} 
                            onChange={() => handleCheckboxChange(module, "delete")}
                            className="w-[18px] h-[18px] rounded border-neutral-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.approve} 
                            onChange={() => handleCheckboxChange(module, "approve")}
                            className="w-[18px] h-[18px] rounded border-neutral-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={!!modPerms.export}
                                onChange={() => handleCheckboxChange(module, "export")}
                              />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                            </label>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-end gap-4 pt-6 mt-4 border-t border-neutral-100">
              <button 
                onClick={() => router.push('/roles')}
                className="px-6 py-2.5 rounded-xl cursor-pointer border border-neutral-300 bg-white text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateRole}
                className="px-6 py-2.5 rounded-xl bg-[#257BFC] text-[14px] font-semibold text-white hover:bg-blue-600 transition cursor-pointer"
              >
                Create Role
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
