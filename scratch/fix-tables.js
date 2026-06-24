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

  // 1. Revert header bg to white
  content = content.replace(/bg-\[#F8FAFC\]/g, 'bg-white');

  // 2. Remove the added border from overflow-x-auto
  content = content.replace(/className="([^"]*)overflow-x-auto rounded-xl border border-\[#E2E8F0\]([^"]*)"/g, 'className="$1overflow-x-auto$2"');
  
  // also catch cases where it might have a space before rounded-xl
  content = content.replace(/ rounded-xl border border-\[#E2E8F0\]/g, (match, offset, fullString) => {
    // Only remove if it's on an overflow-x-auto div
    const textBefore = fullString.substring(Math.max(0, offset - 50), offset);
    if (textBefore.includes('overflow-x-auto')) {
      return '';
    }
    return match; // keep it otherwise
  });

  // 3. For roles/page.tsx specifically, wrap the table in a card since it didn't have one
  if (relPath === 'app/roles/page.tsx') {
     // I will manually fix this below, so skipping regex for it
  }

  // 4. Update the outer cards that already existed to use the right border color
  content = content.replace(/border-neutral-200/g, 'border-[#E2E8F0]');
  content = content.replace(/border-\[#D0D5DD\]/g, 'border-[#E2E8F0]');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${relPath}`);
}
