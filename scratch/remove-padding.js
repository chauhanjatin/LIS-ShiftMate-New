const fs = require('fs');
const path = require('path');

const files = [
  'app/employees/all-employees/page.tsx',
  'app/organization/departments/page.tsx',
  'app/users/page.tsx',
  'app/statutory-payments/payments-dashboard/page.tsx',
  'app/statutory-payments/payments-dashboard/[id]/page.tsx',
  'app/roles/page.tsx',
  'app/roles/add/page.tsx',
  'app/pension/pension-contribution/page.tsx',
  'app/pension/pension-assessment/page.tsx',
  'app/salary-structure/page.tsx',
  'app/tax-rules/page.tsx',
  'app/payslip-list/page.tsx',
  'app/payroll-calendar/page.tsx',
  'app/payroll-approval/page.tsx',
  'app/payroll-runs/page.tsx',
  'app/student-loan-rules/page.tsx',
  'app/pay-components/page.tsx',
  'app/leave-management/leave-types-and-policies/page.tsx',
  'app/national-insurance-rule/page.tsx',
  'app/payroll-runs/[period]/page.tsx',
  'app/leave-management/leave-requests/page.tsx',
  'app/leave-management/leave-balances/page.tsx',
  'app/payroll-runs/[period]/[employeeId]/page.tsx',
  'app/employee-payroll-setup/page.tsx',
  'app/design-system/page.tsx',
  'app/deduction-components/page.tsx',
  'app/dashboard/Dashboard.tsx'
];

for (const relPath of files) {
  const filePath = path.join('d:/website/shiftmate-frontend-main', relPath);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // We are looking for something like:
  // className="overflow-x-auto p-3 2xl:p-6"
  // className="overflow-x-auto p-3 2xl:p-6 pb-0"
  // className="overflow-x-auto p-3 2xl:p-6 pb-2"
  // className="overflow-x-auto p-2"
  // We want to replace it with: className="overflow-x-auto"

  content = content.replace(/className="overflow-x-auto p-3 2xl:p-6 pb-0"/g, 'className="overflow-x-auto"');
  content = content.replace(/className="overflow-x-auto p-3 2xl:p-6 pb-2"/g, 'className="overflow-x-auto"');
  content = content.replace(/className="overflow-x-auto p-3 2xl:p-6"/g, 'className="overflow-x-auto"');
  content = content.replace(/className="overflow-x-auto p-2"/g, 'className="overflow-x-auto"');

  // In app/users/page.tsx:
  // `<div className="flex flex-wrap items-center justify-between border-b border-[#E2E8F0] md:p-5 p-3">`
  // the border-b is fine, it separates the header from the table

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Removed padding from ${relPath}`);
}
