"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { useUsers } from "@/hooks/useUsers";
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import deleteRedIcon from "@/assets/images/icons/delete-popup.svg";
import Link from "next/link";
import { User, UserStatus } from "@/Data/users";
import Toast from '@/Component/UI/Toast';
import { Lexend_Deca } from "next/font/google";
import CustomSelect from "@/Component/UI/CustomSelect";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

function StatusPill({ status }: { status: UserStatus }) {
    const styles = {
        Active: "bg-[#EAF9EA] text-[#4DB949]",
        "On Leave": "bg-[#FFF6E8] text-[#FFA100]",
        Inactive: "bg-[#F2F4F7] text-[#98A2B3]",
        Suspended: "bg-[#FEE2E2] text-[#EF4444]",
        Pending: "bg-white text-[#64748B]",
    };
    return (
        <span
            className={`inline-flex rounded-full px-4 py-1.5 text-[12px] font-semibold ${styles[status]}`}
        >
            {status}
        </span>
    );
}

function CreateUserModal({ onClose, onCreate }: { onClose: () => void, onCreate: (user: User) => void }) {
    const [accessMethod, setAccessMethod] = useState<"temp_password" | "invite_email">("temp_password");
    const [tempPassword, setTempPassword] = useState("Temp@123456");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Admin");
    const [company, setCompany] = useState("Shiftmate");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
        let newPass = "";
        for (let i = 0; i < 10; i++) newPass += chars.charAt(Math.floor(Math.random() * chars.length));
        setTempPassword(newPass);
    };

    const handleCreate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!firstName) newErrors.firstName = "Please enter first name";
        if (!lastName) newErrors.lastName = "Please enter last name";
        if (!email) newErrors.email = "Please enter email";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newUser: User = {
            id: `EMP00${Math.floor(Math.random() * 1000)}`,
            name: `${firstName} ${lastName}`,
            email: email,
            role: role,
            company: company,
            status: "Pending",
            avatar: "https://i.pravatar.cc/150?u=" + Math.floor(Math.random() * 100),
            department: "-",
            joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            employmentType: "Full-time"
        };
        onCreate(newUser);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-4">
            <div className="w-full max-w-[720px] rounded-2xl bg-white shadow-[0px_8px_30px_rgba(0,0,0,0.12)] max-h-[90vh] flex flex-col relative overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-white z-10 shrink-0">
                    <h2 className="text-[20px] font-bold text-neutral-900">Create New User</h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900 bg-white rounded-full p-1 cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto px-6 py-6 flex-1 space-y-6">
                    <div>
                        <h3 className="text-[16px] font-semibold text-neutral-900">Basic Information</h3>
                        <p className="mt-1 text-[12px] text-neutral-500">Enter the employee's basic personal information for identification and contact purposes.</p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[14px] font-medium text-neutral-900 mb-1.5">First Name</label>
                                <input type="text" value={firstName} onChange={e => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: "" })) }} placeholder="Michael" className={`w-full rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 py-2.5 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500`} />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-[14px] font-medium text-neutral-900 mb-1.5">Last Name</label>
                                <input type="text" value={lastName} onChange={e => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: "" })) }} placeholder="Enter your last name" className={`w-full rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 py-2.5 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500`} />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[14px] font-medium text-neutral-900 mb-1.5">Email</label>
                                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })) }} placeholder="Enter your email" className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 py-2.5 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500`} />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-[14px] font-medium text-neutral-900 mb-1.5">Role</label>
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
                                <label className="block text-[14px] font-medium text-neutral-900 mb-1.5">Company</label>
                                <CustomSelect
                                    value={company}
                                    onChange={setCompany}
                                    options={[
                                        { label: "Shiftmate", value: "Shiftmate" }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-semibold text-neutral-900">Access Method</h3>
                        <p className="mt-1 text-[12px] text-neutral-500">Enter the employee's basic personal information for identification and contact purposes.</p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                onClick={() => setAccessMethod("temp_password")}
                                className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${accessMethod === "temp_password" ? "border-[#257BFC] bg-[#F5F8FF]" : "border-[#E2E8F0] bg-white"}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#257BFC] text-white">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    </div>
                                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${accessMethod === "temp_password" ? "border-[#257BFC]" : "border-neutral-300"}`}>
                                        {accessMethod === "temp_password" && <div className="h-2.5 w-2.5 rounded-full bg-[#257BFC]"></div>}
                                    </div>
                                </div>
                                <h4 className="mt-3 text-[16px] font-semibold text-neutral-900">Temporary Password</h4>
                                <p className="mt-1 text-[12px] text-neutral-500">Generate a secure temporary password</p>

                                <ul className="mt-3 space-y-1.5">
                                    <li className="flex items-center gap-2 text-[12px] text-neutral-600">
                                        <svg className="text-[#4DB949]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        Auto-generated strong password
                                    </li>
                                    <li className="flex items-center gap-2 text-[12px] text-neutral-600">
                                        <svg className="text-[#4DB949]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        User must change on first login
                                    </li>
                                    <li className="flex items-center gap-2 text-[12px] text-neutral-600">
                                        <svg className="text-[#4DB949]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        Immediate access
                                    </li>
                                </ul>
                            </div>

                            <div
                                onClick={() => setAccessMethod("invite_email")}
                                className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${accessMethod === "invite_email" ? "border-[#257BFC] bg-[#F5F8FF]" : "border-[#E2E8F0] bg-white"}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    </div>
                                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${accessMethod === "invite_email" ? "border-[#257BFC]" : "border-neutral-300"}`}>
                                        {accessMethod === "invite_email" && <div className="h-2.5 w-2.5 rounded-full bg-[#257BFC]"></div>}
                                    </div>
                                </div>
                                <h4 className="mt-3 text-[16px] font-semibold text-neutral-900">Send Invite Email</h4>
                                <p className="mt-1 text-[12px] text-neutral-500">User will set their own password</p>

                                <ul className="mt-3 space-y-1.5">
                                    <li className="flex items-center gap-2 text-[12px] text-neutral-600">
                                        <svg className="text-[#4DB949]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        Email invitation with secure link
                                    </li>
                                    <li className="flex items-center gap-2 text-[12px] text-neutral-600">
                                        <svg className="text-[#4DB949]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        User creates own password
                                    </li>
                                    <li className="flex items-center gap-2 text-[12px] text-neutral-600">
                                        <svg className="text-[#4DB949]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        Link expires in 72 hours
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {accessMethod === "temp_password" && (
                            <div className="mt-4 rounded-xl bg-white p-4">
                                <label className="block text-[12px] font-medium text-neutral-900 mb-1.5">Temporary Password</label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={tempPassword}
                                        readOnly
                                        className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-[14px] outline-none overflow-hidden"
                                    />
                                    <button onClick={generatePassword} type="button" className="flex items-center gap-2 rounded-xl bg-[#E2E8F0] px-4 py-2.5 text-[14px] font-semibold text-neutral-700 whitespace-nowrap hover:bg-[#CBD5E1] transition">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                        Generate New
                                    </button>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500">
                                    <span>User will be required to change this password on first login</span>
                                </div>
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="h-1.5 flex-1 rounded-full bg-neutral-200 overflow-hidden flex">
                                        <div className="h-full bg-[#FFA100] w-3/4"></div>
                                    </div>
                                    <span className="text-[12px] font-medium text-[#FFA100]">Strong</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 shrink-0">
                    <button onClick={onClose} className="rounded-xl border border-[#E2E8F0] bg-white px-6 py-2.5 text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer overflow-hidden">
                        Cancel
                    </button>
                    <button onClick={handleCreate} className="rounded-xl bg-[#257BFC] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                        Create User
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function UsersPage() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const { users, addUser, removeUser } = useUsers();
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [showToast, setShowToast] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(users.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);

    const allSelected = paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length;

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedUsers(paginatedUsers.map((u) => u.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (id: string) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        );
    };

    const handleCreateUser = (newUser: User) => {
        addUser(newUser);
        setCreateModalOpen(false);
        setShowToast(true);
    };

    const handleDelete = () => {
        if (userToDelete) {
            removeUser(userToDelete);
            setDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    return (
        <DashboardLayout title="Users" subtitle="Home/ Users List">
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 md:pt-6 px-4 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-neutral-900">Users List</h2>

                        <div className="flex flex-wrap items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative xl:w-75 md:w-50 w-32">
                                <Image
                                    src={searchIcon}
                                    alt="Search"
                                    width={20}
                                    height={20}
                                    className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                                />
                                <input
                                    className="w-full rounded-xl border border-[#E2E8F0] bg-neutral-50 py-1.5 md:py-2.5 md:pl-11 pl-8 pr-4 text-sm"
                                    placeholder="Search User"
                                />
                            </div>

                            <button className="flex md:h-[42px] md:w-[42px] h-[35px] w-[35px] md:p-2 p-1.5 items-center justify-center rounded-xl border border-[#E2E8F0] cursor-pointer text-neutral-600 transition hover:bg-neutral-50">
                                <Image
                                    src={filterIcon}
                                    alt="Filter"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer"
                                />
                            </button>

                            <button className="flex md:h-[42px] md:w-[42px] h-[35px] w-[35px] md:p-2 p-1.5 items-center justify-center rounded-xl border border-[#E2E8F0] cursor-pointer text-neutral-600 transition hover:bg-neutral-50">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            </button>

                            <button
                                onClick={() => setCreateModalOpen(true)}
                                className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] p-1.5 md:px-2.5 md:py-2 xl:px-5 xl:py-3 text-[12px] md:text-[15px] xl:text-[16px] text-white transition hover:bg-blue-600"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add User
                            </button>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1100px] w-full text-left border-collapse">
                                    <thead className="bg-[#F2F4F7]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-[10px] py-[10px] sm:px-6 2xl:pl-6 pl-3 pr-2 text-[12px] sm:text-[14px] 2xl:text-[16px] text-[#2E334E] whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={allSelected}
                                                    onChange={handleSelectAll}
                                                    className="h-4 w-4 rounded border-[#D0D5DD] text-brand-500 focus:ring-brand-500 cursor-pointer"
                                                />
                                            </th>

                                            <th className="border-b border-[#E2E8F0] px-[10px] py-[10px] sm:px-6 2xl:pr-6 pr-4 text-[12px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#2E334E] whitespace-nowrap">
                                                Name
                                            </th>

                                            <th className="border-b border-[#E2E8F0] px-[10px] py-[10px] sm:px-6 2xl:pr-6 pr-4 text-[12px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#2E334E] whitespace-nowrap">
                                                Email
                                            </th>

                                            <th className="border-b border-[#E2E8F0] px-[10px] py-[10px] sm:px-6 2xl:pr-6 pr-4 text-[12px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#2E334E] whitespace-nowrap">
                                                Role
                                            </th>

                                            <th className="border-b border-[#E2E8F0] px-[10px] py-[10px] sm:px-6 2xl:pr-6 pr-4 text-[12px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#2E334E] whitespace-nowrap">
                                                Company
                                            </th>

                                            <th className="border-b border-[#E2E8F0] px-[10px] py-[10px] sm:px-6 2xl:pr-6 pr-4 text-[12px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#2E334E] whitespace-nowrap">
                                                Status
                                            </th>

                                            <th className="border-b border-[#E2E8F0] px-[10px] py-[10px] sm:px-6 2xl:pr-6 pr-4 text-[12px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#2E334E] whitespace-nowrap">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white">
                                        {paginatedUsers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="group transition-colors hover:bg-neutral-50"
                                            >
                                                <td className="px-4 py-4 sm:px-6 2xl:pl-6 pl-3 pr-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(user.id)}
                                                        onChange={() => handleSelectUser(user.id)}
                                                        className="h-4 w-4 rounded border-neutral-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                                                    />
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 pr-6">
                                                    <Link href={`/users/edit/${user.id}`}>
                                                        <div className="flex md:min-w-[180px] min-w-[150px] items-center gap-2 sm:gap-3 cursor-pointer hover:underline">
                                                            <img
                                                                src={user.avatar}
                                                                alt={user.name}
                                                                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover flex-shrink-0"
                                                            />
                                                            <span className="text-[12px] sm:text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                                                                {user.name}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 pr-6 text-[12px] sm:text-[14px] whitespace-nowrap text-neutral-700">
                                                    {user.email}
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 pr-6 text-[12px] sm:text-[14px] whitespace-nowrap text-neutral-700">
                                                    {user.role}
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 pr-6 text-[12px] sm:text-[14px] whitespace-nowrap text-neutral-700">
                                                    {user.company}
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 pr-6 whitespace-nowrap">
                                                    <StatusPill status={user.status} />
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 pr-6">
                                                    <div className="flex items-center gap-2 sm:gap-4">
                                                        <Link href={`/users/edit/${user.id}`}>
                                                            <button className="text-neutral-400 hover:text-brand-500 mt-2 transition-colors">
                                                                <Image
                                                                    src={editIcon}
                                                                    alt="Edit"
                                                                    width={24}
                                                                    height={24}
                                                                    className="cursor-pointer h-5 w-5 sm:h-6 sm:w-6"
                                                                />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                setUserToDelete(user.id);
                                                                setDeleteModalOpen(true);
                                                            }}
                                                            className="text-neutral-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <Image
                                                                src={deleteIcon}
                                                                alt="Delete"
                                                                width={24}
                                                                height={24}
                                                                className="cursor-pointer h-5 w-5 sm:h-6 sm:w-6"
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end px-2 sm:px-6 py-4 mt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[12px] sm:text-[14px] text-neutral-500">
                                    Rows per page:
                                </span>
                                <div className="w-[80px]">
                                    <CustomSelect 
                                        value={String(rowsPerPage)}
                                        onChange={(val) => { setRowsPerPage(Number(val)); setCurrentPage(1); }}
                                        options={[
                                            { label: "5", value: "5" },
                                            { label: "10", value: "10" },
                                            { label: "20", value: "20" }
                                        ]}
                                        menuPlacement="top"
                                        className="!py-1 !px-2 text-[12px] sm:text-[14px] min-h-[32px]"
                                    />
                                </div>
                            </div>

                            <span className="text-[12px] sm:text-[14px] text-neutral-500 ml-4">
                                {users.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, users.length)} of ${users.length}` : '0-0 of 0'}
                            </span>

                            <div className="flex items-center gap-1 ml-4">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create User Modal */}
            {createModalOpen && <CreateUserModal onClose={() => setCreateModalOpen(false)} onCreate={handleCreateUser} />}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="max-w-[420px] rounded-xl bg-white p-6 text-center shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
                        <div className="mx-auto mb-7 flex h-[72px] w-[72px] items-center justify-center rounded-[16px] bg-[#FDEAEA]">
                            <Image src={deleteRedIcon} alt="Delete" className="pointer-events-none" />
                        </div>
                        <h3 className="mx-auto mb-6 max-w-[275px] text-[16px] font-semibold leading-[22px] text-[#1D2939]">
                            Are you sure you want to delete this <br /> User?
                        </h3>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => { setDeleteModalOpen(false); setUserToDelete(null); }}
                                className="w-full rounded-xl border border-[#344054] bg-white px-6 py-3 text-[16px] font-semibold leading-none text-[#344054] overflow-hidden"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="w-full rounded-xl px-6 py-3 text-[16px] font-semibold leading-none text-white bg-[#F04438]"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Toast
                show={showToast}
                message="User Created Successfully!"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}