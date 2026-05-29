import React from "react";
import DashboardLayout from '@/Component/Layout/DashboardLayout';

export default function StudentLoanRulesPage() {
    return (
        <DashboardLayout title="Student Loan Rules" subtitle="Home/ Student Loan Rules">
            <div className="flex-1 p-4 2xl:p-6">
                <div className="rounded-2xl bg-white shadow-sm p-6">
                    <h2 className="text-xl font-bold">Student Loan Rules Content</h2>
                </div>
            </div>
        </DashboardLayout>
    );
}
