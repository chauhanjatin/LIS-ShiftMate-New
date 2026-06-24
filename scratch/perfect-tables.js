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
  let changed = false;

  // Add overflow-hidden to rounded wrappers
  content = content.replace(/className="([^"]*rounded-(?:xl|2xl)[^"]*)"/g, (match, classes) => {
    // Only add it to border/bg-white wrappers that likely hold tables
    if (classes.includes('border') && classes.includes('bg-white') && !classes.includes('overflow-hidden')) {
      changed = true;
      return `className="${classes} overflow-hidden"`;
    }
    return match;
  });

  // Update header typography to match Image 3 (font-medium text-neutral-500)
  if (content.includes('text-[13px] font-semibold text-neutral-900')) {
    content = content.replace(/text-\[13px\] font-semibold text-neutral-900/g, 'text-[13px] font-medium text-neutral-500');
    changed = true;
  }
  
  // Some headers might still have text-[12px] sm:text-[14px] 2xl:text-[16px] font-semibold text-neutral-900
  if (content.includes('font-semibold text-neutral-900')) {
    content = content.replace(/<th className="([^"]*)font-semibold text-neutral-900([^"]*)"/g, '<th className="$1font-medium text-neutral-500$2"');
    changed = true;
  }

  // Ensure table borders are #EAECF0 for a slightly softer, more precise gray? 
  // No, the user might be okay with #E2E8F0. I will keep #E2E8F0 to be safe.

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${relPath}`);
  }
}
