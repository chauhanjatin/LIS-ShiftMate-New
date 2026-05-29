import React from "react";
import DashboardLayout from '@/Component/Layout/DashboardLayout';

export default function NationalInsuranceRulePage() {
    return (
        <DashboardLayout title="National Insurance Rule" subtitle="Home/ National Insurance Rule">
            <div className="flex-1 p-4 2xl:p-6">
                <div className="rounded-2xl bg-white shadow-sm p-6">
                    <h2 className="text-xl font-bold">National Insurance Rule Content</h2>
                </div>
            </div>
        </DashboardLayout>
    );
}
