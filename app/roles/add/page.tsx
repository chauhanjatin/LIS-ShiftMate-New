"use client";

import { useState } from "react";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { useRouter } from "next/navigation";
import { useRoles } from "@/hooks/useRoles";
import { RolePermissions } from "@/types";
import Toast from '@/Component/UI/Toast';
import backArrow from "@/assets/images/icons/back-arrow.svg";
import Image from "next/image";
import Link from "next/link";

const CHECKBOX_CLASS = "appearance-none w-5 h-5 border border-[#D0D5DD] rounded-[6px] checked:bg-[#257BFC] checked:border-[#257BFC] cursor-pointer relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[6px] after:top-[2px] after:w-[6px] after:h-[11px] after:border-white after:border-b-[2.5px] after:border-r-[2.5px] after:rotate-45";

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
  const [showToast, setShowToast] = useState(false);

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

  const handleSelectAllColumn = (field: keyof RolePermissions[string], checked: boolean) => {
    setPermissions((prev) => {
      const next = { ...prev };
      PERMISSION_MODULES.forEach((module) => {
        if (!next[module]) {
          next[module] = { view: false, create: false, edit: false, delete: false, approve: false, export: false };
        }
        next[module] = { ...next[module], [field]: checked };
      });
      return next;
    });
  };

  const isAllSelected = (field: keyof RolePermissions[string]) => {
    return PERMISSION_MODULES.every((module) => permissions[module]?.[field]);
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

    setShowToast(true);
    setTimeout(() => {
      router.push("/roles");
    }, 2000);
  };
  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <Link href="/roles" className="hover:text-brand-500 transition-colors">Roles List</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Add Role</span>
    </span>
  );

  return (
    <DashboardLayout title="Roles" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6 flex flex-col">
        <Link href={`/roles`}>
          <div className="flex items-center gap-2 cursor-pointer mb-4">
            <Image src={backArrow} alt="back" />
            <p className="text-[#111827] font-normal text-[16px]">Back</p>
          </div>
        </Link>
        <div className="rounded-xl bg-white 2xl:p-6 xl:p-5 p-3 shadow-sm flex-1 flex flex-col xl:flex-row 2xl:gap-6 gap-4 overflow-hidden">
          
          <div className="w-full xl:w-[320px] 2xl:w-[380px] shrink-0 rounded-xl">
            <h2 className="md:text-[24px] text-[20px] font-semibold text-[#111827]">Create New Role</h2>
            
            <div className="mt-6 lg:mb-8">
              <h3 className="md:text-[20px] text-[18px] font-medium text-[#111827] mb-1">Role Details</h3>
              <p className="md:text-[14px] text-[12px] font-normal text-[#98A2B3] mb-6 leading-relaxed">
                Enter the employee's basic personal information for identification and contact purposes.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-[14px] font-normal text-[#111827] mb-1.5">Role Name</label>
                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) => { setRoleName(e.target.value); setErrors(prev => ({...prev, roleName: ""})); }}
                    className={`w-full rounded-xl border ${errors.roleName ? 'border-red-500' : 'border-[#111827]'} px-4 py-2.5 md:text-[14px] text-[12px] outline-none bg-white`}
                    placeholder="e.g. Senior Manager"
                  />
                  {errors.roleName && <p className="text-red-500 text-xs mt-1">{errors.roleName}</p>}
                </div>

                <div>
                  <label className="block text-[14px] font-normal text-[#111827] mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); setErrors(prev => ({...prev, description: ""})); }}
                    rows={4}
                    className={`w-full rounded-xl border ${errors.description ? 'border-red-500' : 'border-[#111827]'} px-4 py-2.5 md:text-[14px] text-[12px] outline-none bg-white resize-none`}
                    placeholder="Responsible for team management and project oversight"
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white md:px-4 px-2 2xl:px-6 lg:border-l border-[#E4E7EC] overflow-hidden flex flex-col">
            <h3 className="text-[20px] font-medium text-[#111827] mb-6">Permissions Matrix</h3>
            
            <div className="flex-1 rounded-xl border border-[#E2E8F0] overflow-auto">
              <table className="min-w-[800px] w-full text-left">
                <thead className="bg-white">
                  <tr className="bg-[#F9FAFB]">
                    <th className="py-3 px-4 text-[15px] md:text-[16px] font-normal text-[#111827] border-b border-[#E2E8F0] w-[220px]">
                      Role Name
                    </th>
                    <th className="py-3 px-4 text-[15px] md:text-[16px] font-normal text-[#111827] border-b border-[#E2E8F0] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={isAllSelected('view')}
                          onChange={(e) => handleSelectAllColumn('view', e.target.checked)}
                          className={CHECKBOX_CLASS}
                        />
                        View
                      </div>
                    </th>
                    <th className="py-3 px-4 text-[15px] md:text-[16px] font-normal text-[#111827] border-b border-[#E2E8F0] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={isAllSelected('create')}
                          onChange={(e) => handleSelectAllColumn('create', e.target.checked)}
                          className={CHECKBOX_CLASS}
                        />
                        Create
                      </div>
                    </th>
                    <th className="py-3 px-4 text-[15px] md:text-[16px] font-normal text-[#111827] border-b border-[#E2E8F0] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={isAllSelected('edit')}
                          onChange={(e) => handleSelectAllColumn('edit', e.target.checked)}
                          className={CHECKBOX_CLASS}
                        />
                        Edit
                      </div>
                    </th>
                    <th className="py-3 px-4 text-[15px] md:text-[16px] font-normal text-[#111827] border-b border-[#E2E8F0] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={isAllSelected('delete')}
                          onChange={(e) => handleSelectAllColumn('delete', e.target.checked)}
                          className={CHECKBOX_CLASS}
                        />
                        Delete
                      </div>
                    </th>
                    <th className="py-3 px-4 text-[15px] md:text-[16px] font-normal text-[#111827] border-b border-[#E2E8F0] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={isAllSelected('approve')}
                          onChange={(e) => handleSelectAllColumn('approve', e.target.checked)}
                          className={CHECKBOX_CLASS}
                        />
                        Approve
                      </div>
                    </th>
                    <th className="py-3 px-4 text-[15px] md:text-[16px] font-normal text-[#111827] border-b border-[#E2E8F0] text-center">
                      Export
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {PERMISSION_MODULES.map((module, idx) => {
                    const modPerms = permissions[module] || {};
                    return (
                      <tr key={module} className={`border-b border-[#E2E8F0] last:border-0`}>
                        <td className="py-4 px-4 text-[13px] font-medium text-neutral-900">
                          {module}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.view} 
                            onChange={() => handleCheckboxChange(module, "view")}
                            className={CHECKBOX_CLASS}
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.create} 
                            onChange={() => handleCheckboxChange(module, "create")}
                            className={CHECKBOX_CLASS}
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.edit} 
                            onChange={() => handleCheckboxChange(module, "edit")}
                            className={CHECKBOX_CLASS}
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.delete} 
                            onChange={() => handleCheckboxChange(module, "delete")}
                            className={CHECKBOX_CLASS}
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!modPerms.approve} 
                            onChange={() => handleCheckboxChange(module, "approve")}
                            className={CHECKBOX_CLASS}
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
            
            <div className="flex items-center justify-end md:gap-4 gap-2 pt-6 2xl:mt-4">
              <button 
                onClick={() => router.push('/roles')}
                className="px-6 py-2.5 rounded-xl cursor-pointer border border-neutral-300 bg-white text-[12px] md:text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition overflow-hidden"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateRole}
                className="px-6 py-2.5 rounded-xl bg-[#257BFC] text-[12px] md:text-[14px] font-semibold text-white hover:bg-blue-600 transition cursor-pointer"
              >
                Create Role
              </button>
            </div>
          </div>

        </div>
      </div>
      <Toast
        show={showToast}
        message="Role Created Successfully!"
        onClose={() => setShowToast(false)}
      />
    </DashboardLayout>
  );
}
