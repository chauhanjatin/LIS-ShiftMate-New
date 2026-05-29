import React from "react";
import DashboardLayout from '@/Component/Layout/DashboardLayout';

export default function PayslipListPage() {
    return (
        <DashboardLayout title="Payslip List" subtitle="Home/ Payslip List">
            <div className="flex-1 p-4 2xl:p-6">
                <div className="rounded-2xl bg-white shadow-sm p-6">
                    <h2 className="text-xl font-bold">Payslip List Content</h2>
                </div>
            </div>
        </DashboardLayout>
    );
}
