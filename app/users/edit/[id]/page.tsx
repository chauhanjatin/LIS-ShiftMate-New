"use client";

import React, { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { User, UserStatus } from "@/Data/users";
import { useUsers } from "@/hooks/useUsers";
import Toast from '@/Component/UI/Toast';
import CustomSelect from "@/Component/UI/CustomSelect";

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<UserStatus | "">("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [department, setDepartment] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showToast, setShowToast] = useState(false);
    const { getUser, updateUser, users } = useUsers();

    useEffect(() => {
        if (id && users.length > 0 && !isLoaded) {
            const foundUser = getUser(id);
            if (foundUser) {
                setUser(foundUser);
                setSelectedStatus(foundUser.status);
                setFirstName(foundUser.name.split(' ')[0] || "");
                setLastName(foundUser.name.split(' ').slice(1).join(' ') || "");
                setEmail(foundUser.email || "");
                setRole(foundUser.role || "");
                setCompany(foundUser.company || "");
                setDepartment(foundUser.department || "");
                setIsLoaded(true);
            }
        }
    }, [id, users, isLoaded]);

    const handleUpdate = () => {
        if (!user) return;
        
        const newErrors: { [key: string]: string } = {};
        if (!firstName) newErrors.firstName = "Please enter first name";
        if (!lastName) newErrors.lastName = "Please enter last name";
        if (!email) newErrors.email = "Please enter email";
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        updateUser(user.id, {
            name: `${firstName} ${lastName}`,
            email,
            role,
            company,
            department,
            status: selectedStatus || user.status,
        });
        
        setShowToast(true);
        setTimeout(() => {
            router.push('/users');
        }, 2000);
    };

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/users" className="hover:text-brand-500 transition-colors">Users</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Edit User</span>
        </span>
    );

    if (!user) {
        return (
            <DashboardLayout title="Users" subtitle={breadcrumb}>
                <div className="flex h-full items-center justify-center p-6">
                    <p className="text-neutral-500">Loading user data...</p>
                </div>
            </DashboardLayout>
        );
    }

    const statuses: { value: UserStatus, label: string, desc: string, icon: React.ReactNode }[] = [
        {
            value: "Active",
            label: "Active",
            desc: "Full access granted",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        },
        {
            value: "Inactive",
            label: "Inactive",
            desc: "Temporarily disabled",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path><line x1="9" y1="16" x2="15" y2="16"></line></svg>
        },
        {
            value: "Pending",
            label: "Pending",
            desc: "Awaiting activation",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        },
        {
            value: "Suspended",
            label: "Suspended",
            desc: "Access revoked",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
        }
    ];

    return (
        <DashboardLayout title="Users" subtitle={breadcrumb}>
            <div className="flex-1 p-4 2xl:p-6 overflow-y-auto">
                <div className="flex flex-col lg:flex-row gap-6 bg-white 2xl:p-6 p-4 rounded-[20px] min-h-[800px]">

                    <div className="w-full lg:w-[353px] shrink-0">
                        <div className="rounded-2xl border border-neutral-200 p-6 bg-[#F9FAFB]">
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-24 w-24 rounded-full object-cover shadow-sm mb-4"
                                />
                                <h3 className="text-[20px] font-bold text-neutral-900">{user.name}</h3>
                                <p className="text-[14px] text-neutral-500 mt-1">{user.role}</p>
                                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#EAF9EA] px-3 py-1 text-[12px] font-medium text-[#4DB949]">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#4DB949]"></div>
                                    {user.status} • {user.employmentType || 'Full-time'}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-5">
                            <div>
                                <p className="text-[13px] font-medium text-neutral-500">User ID</p>
                                <p className="mt-1 text-[15px] font-semibold text-neutral-900">{user.id}</p>
                            </div>
                            <div>
                                <p className="text-[13px] font-medium text-neutral-500">Department</p>
                                <p className="mt-1 text-[15px] font-semibold text-neutral-900">{user.department || '-'}</p>
                            </div>
                            <div>
                                <p className="text-[13px] font-medium text-neutral-500">Join Date</p>
                                <p className="mt-1 text-[15px] font-semibold text-neutral-900">{user.joinDate || '-'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[1px] bg-[#E5E7EB] self-stretch hidden lg:block"></div>

                    <div className="flex-1">
                        <div className="bg-white">

                            <div className="mb-8">
                                <h2 className="text-[18px] font-bold text-neutral-900">Basic Information</h2>
                                <p className="mt-1 text-[13px] text-neutral-500 mb-6">Enter the employee's basic personal information for identification and contact purposes.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <div>
                                        <label className="block text-[14px] font-medium text-neutral-900 mb-2">First name</label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={e => { setFirstName(e.target.value); setErrors(prev => ({...prev, firstName: ""})) }}
                                            className={`w-full rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-neutral-200'} px-4 py-3 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500`}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[14px] font-medium text-neutral-900 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={e => { setLastName(e.target.value); setErrors(prev => ({...prev, lastName: ""})) }}
                                            className={`w-full rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-neutral-200'} px-4 py-3 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500`}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[14px] font-medium text-neutral-900 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => { setEmail(e.target.value); setErrors(prev => ({...prev, email: ""})) }}
                                            className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-neutral-200'} px-4 py-3 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-[14px] font-medium text-neutral-900 mb-2">Role</label>
                                        <CustomSelect
                                            value={role}
                                            onChange={setRole}
                                            options={[
                                                { label: "Admin", value: "Admin" },
                                                { label: "Manager", value: "Manager" },
                                                { label: "HR", value: "HR" },
                                                { label: "Employee", value: "Employee" }
                                            ]}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[14px] font-medium text-neutral-900 mb-2">Company</label>
                                        <CustomSelect
                                            value={company}
                                            onChange={setCompany}
                                            options={[
                                                { label: "Shiftmate", value: "Shiftmate" }
                                            ]}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-[14px] font-medium text-neutral-900 mb-2">Department</label>
                                        <CustomSelect
                                            value={department}
                                            onChange={setDepartment}
                                            options={[
                                                { label: "Engineering", value: "Engineering" },
                                                { label: "Marketing", value: "Marketing" },
                                                { label: "HR", value: "HR" },
                                                { label: "Operations", value: "Operations" },
                                                { label: "IT", value: "IT" },
                                                { label: "Sales", value: "Sales" }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-[18px] font-bold text-neutral-900">Account Status</h2>
                                <p className="mt-1 text-[13px] text-neutral-500 mb-6">Enter the employee's basic personal information for identification and contact purposes.</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                                    {statuses.map((status) => (
                                        <div
                                            key={status.value}
                                            onClick={() => setSelectedStatus(status.value)}
                                            className={`cursor-pointer rounded-2xl border md:p-4 p-3 transition-all ${
                                                selectedStatus === status.value
                                                    ? status.value === "Active" ? "border-[#4DB949] bg-[#F5FCF5]" :
                                                      status.value === "Inactive" ? "border-[#98A2B3] bg-[#F2F4F7]" :
                                                      status.value === "Pending" ? "border-[#FFA100] bg-[#FFF6E8]" :
                                                      "border-[#EE5340] bg-[#FEE2E2]"
                                                    : "border-neutral-200 bg-white hover:border-neutral-300"
                                            }`}
                                        >
                                            <div className={`md:mb-3 mb-2 flex md:h-10 h-9 md:w-10 w-9 items-center justify-center rounded-xl ${
                                                selectedStatus === status.value
                                                    ? status.value === "Active" ? "bg-[#4DB949] text-white" :
                                                      status.value === "Inactive" ? "bg-[#98A2B3] text-white" :
                                                      status.value === "Pending" ? "bg-[#FFA100] text-white" :
                                                      "bg-[#EE5340] text-white"
                                                    : "bg-[#F1F5F9] text-[#94A3B8]"
                                            }`}>
                                                {status.icon}
                                            </div>
                                            <h4 className="md:text-[18px] text-[17px] font-medium text-[#111827]">{status.label}</h4>
                                            <p className="md:mt-2 mt-1 text-[14px] font-normal text-[#98A2B3]">{status.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        if (user) {
                                            setSelectedStatus(user.status);
                                            setFirstName(user.name.split(' ')[0] || "");
                                            setLastName(user.name.split(' ').slice(1).join(' ') || "");
                                            setEmail(user.email || "");
                                            setRole(user.role || "");
                                            setCompany(user.company || "");
                                            setDepartment(user.department || "");
                                            setErrors({});
                                        }
                                    }}
                                    className="rounded-xl border border-neutral-200 bg-white md:px-8 px-5 py-2 md:py-3 text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="rounded-xl bg-[#257BFC] md:px-8 px-5 py-2 md:py-3 text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                                >
                                    Update Info
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toast
                show={showToast}
                message="User Updated Successfully!"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}
