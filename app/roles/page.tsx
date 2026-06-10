"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { useRoles } from "@/hooks/useRoles";

import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";
import appRectangleIcon from "@/assets/images/icons/apps-rectangle.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import deleteRedIcon from "@/assets/images/icons/delete-popup.svg";

export default function RolesPage() {
  const { roles, removeRole } = useRoles();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  const handleDelete = () => {
    if (roleToDelete) {
      removeRole(roleToDelete);
      setDeleteModalOpen(false);
      setRoleToDelete(null);
    }
  };

  return (
    <DashboardLayout title="Roles" subtitle="Home/ Roles List">
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
            <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">
              Roles List
            </h2>

            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
              <div className="relative 2xl:w-75 lg:w-60 md:w-50 w-32">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={20}
                  height={20}
                  className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                />
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-1.5 md:py-2.5 md:pl-11 pl-8 pr-4 text-sm"
                  placeholder="Search Role"
                />
              </div>

              <button className="flex md:h-[42px] md:w-[42px] h-[35px] w-[35px] p-2 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50">
                <Image
                  src={filterIcon}
                  alt="Filter"
                  width={24}
                  height={24}
                  className="pointer-events-none"
                />
              </button>

              <button className="flex md:h-[42px] md:w-[42px] h-[35px] w-[35px] p-2 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50">
                <Image
                  src={appRectangleIcon}
                  alt="Grid View"
                  width={24}
                  height={24}
                  className="pointer-events-none"
                />
              </button>

              <Link href="/roles/add">
                <button className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] p-1.5 md:px-2.5 md:py-2.5 lg:px-5 lg:py-3 text-[11px] md:text-[12px] xl:text-[14px] font-semibold text-white transition hover:bg-blue-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Role
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto p-3 2xl:p-6">
            <table className="min-w-full w-full text-left">
              <thead className="bg-white">
                <tr>
                  <th className="border-b border-[#D0D5DD] py-3 sm:py-4 2xl:pl-6 pl-3 lg:pr-4 pr-10 text-[12px] sm:text-[14px] 2xl:text-[15px] font-semibold text-neutral-900 whitespace-nowrap">
                    Role Name
                  </th>
                  <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] 2xl:text-[15px] font-semibold text-neutral-900 whitespace-nowrap">
                    Description
                  </th>
                  <th className="border-b border-[#D0D5DD] py-3 sm:py-4 lg:pr-4 pr-10 text-[12px] sm:text-[14px] 2xl:text-[15px] font-semibold text-neutral-900 whitespace-nowrap">
                    Number of Users
                  </th>
                  <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] 2xl:text-[15px] font-semibold text-neutral-900 whitespace-nowrap w-[120px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="group transition-colors hover:bg-neutral-50 border-b border-neutral-100 last:border-0">
                    <td className="py-3 sm:py-4 2xl:pl-6 pl-3 lg:pr-4 pr-10 text-[12px] sm:text-[13px] 2xl:text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                      {role.name}
                    </td>
                    <td className="py-3 sm:py-4 pr-4 text-[12px] sm:text-[13px] 2xl:text-[14px] font-normal text-neutral-600">
                      {role.description}
                    </td>
                    <td className="py-3 sm:py-4 pr-4 text-[12px] sm:text-[13px] 2xl:text-[14px] font-normal text-neutral-900 whitespace-nowrap">
                      {role.userCount} users
                    </td>
                    <td className="py-3 sm:py-4 pr-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button className="text-neutral-400 hover:text-brand-500 transition-colors">
                          <Image
                            src={editIcon}
                            alt="Edit"
                            width={20}
                            height={20}
                            className="pointer-events-none opacity-60 hover:opacity-100"
                          />
                        </button>
                        <button
                          onClick={() => {
                            setRoleToDelete(role.id);
                            setDeleteModalOpen(true);
                          }}
                          className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Image
                            src={deleteIcon}
                            alt="Delete"
                            width={20}
                            height={20}
                            className="pointer-events-none opacity-60 hover:opacity-100"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {roles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-sm text-neutral-500">
                      No roles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-w-[420px] rounded-xl bg-white p-6 text-center shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
            <div className="mx-auto mb-7 flex h-[72px] w-[72px] items-center justify-center rounded-[16px] bg-[#FDEAEA]">
              <Image src={deleteRedIcon} alt="Delete" className="pointer-events-none" />
            </div>
            <h3 className="mx-auto mb-6 max-w-[275px] text-[16px] font-semibold leading-[22px] text-[#1D2939]">
              Are you sure you want to delete this <br /> Role?
            </h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setRoleToDelete(null);
                }}
                className="w-full rounded-xl border border-[#344054] bg-white px-6 py-3 text-[16px] font-semibold leading-none text-[#344054] transition hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-xl px-6 py-3 text-[16px] font-semibold leading-none text-white bg-[#F04438] transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}