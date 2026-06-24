const fs = require('fs');
const path = require('path');

const files = [
  'app/employees/all-employees/page.tsx',
  'app/organization/departments/page.tsx',
  'app/users/page.tsx',
  'app/statutory-payments/payments-dashboard/page.tsx',
  'app/statutory-payments/payments-dashboard/[id]/page.tsx',
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
  let originalContent = content;

  // 1. thead bg
  content = content.replace(/<thead className="bg-white">/g, '<thead className="bg-[#F8FAFC]">');
  content = content.replace(/<thead>/g, '<thead className="bg-[#F8FAFC]">');
  content = content.replace(/<thead([^>]*)bg-neutral-50([^>]*)>/g, '<thead$1bg-[#F8FAFC]$2>');
  // if it has no bg class but has others
  content = content.replace(/<thead className="([^"]*?)">/g, (match, classes) => {
    if (!classes.includes('bg-') && !classes.includes('bg-[')) {
      return `<thead className="${classes} bg-[#F8FAFC]">`;
    }
    if (classes.includes('bg-white')) {
        return `<thead className="${classes.replace('bg-white', 'bg-[#F8FAFC]')}">`;
    }
    if (classes.includes('bg-neutral-50')) {
        return `<thead className="${classes.replace('bg-neutral-50', 'bg-[#F8FAFC]')}">`;
    }
    return match;
  });

  // 2. tbody bg
  content = content.replace(/<tbody>/g, '<tbody className="bg-white">');
  content = content.replace(/<tbody className="([^"]*?)">/g, (match, classes) => {
    if (!classes.includes('bg-') && !classes.includes('bg-[')) {
      return `<tbody className="${classes} bg-white">`;
    }
    return match;
  });

  // 3. tr borders in body
  content = content.replace(/border-neutral-100/g, 'border-[#E2E8F0]');
  content = content.replace(/border-\[#F1F5F9\]/g, 'border-[#E2E8F0]');
  content = content.replace(/border-neutral-200/g, 'border-[#E2E8F0]');

  // 4. th borders
  content = content.replace(/border-\[#D0D5DD\]/g, 'border-[#E2E8F0]');

  // 5. table wrapper and table classes
  // A table inside an overflow-x-auto might be directly nested or have some whitespace.
  content = content.replace(/<div className="([^"]*overflow-x-auto[^"]*)">(\s*)<table className="([^"]*)"/g, (match, divClasses, spaces, tableClasses) => {
    let newDivClasses = divClasses;
    // Add rounded borders to the overflow div if not present
    if (!newDivClasses.includes('rounded-xl')) {
      newDivClasses += ' rounded-xl border border-[#E2E8F0]';
    }
    
    let newTableClasses = tableClasses;
    newTableClasses = newTableClasses.replace('border-separate', 'border-collapse').replace('border-spacing-y-0', '');
    if (!newTableClasses.includes('border-collapse')) {
      newTableClasses += ' border-collapse';
    }

    return `<div className="${newDivClasses}">${spaces}<table className="${newTableClasses}"`;
  });

  // 6. Fix padding on cells to match exactly (py-3 sm:py-4 -> px-4 py-4 sm:px-6)
  // Also pl-4 pr-6 -> px-4 py-4 sm:px-6
  content = content.replace(/py-3 sm:py-4/g, 'px-4 py-4 sm:px-6');
  // Some tables use py-4 alone. We should be careful not to break other stuff, so we just replace the ones we know
  content = content.replace(/py-4 pl-4 pr-6/g, 'px-4 py-4 sm:px-6'); // found in statutory dashboard
  content = content.replace(/py-4 pr-6/g, 'px-4 py-4 sm:px-6');
  content = content.replace(/pb-4 pl-4 pr-4/g, 'px-4 py-4 sm:px-6');
  content = content.replace(/pb-4 pr-4/g, 'px-4 py-4 sm:px-6');

  // 7. Header font sizes: text-[13px] instead of text-[12px] sm:text-[14px] 2xl:text-[15px]
  content = content.replace(/text-\[12px\] sm:text-\[14px\] 2xl:text-\[15px\]/g, 'text-[13px]');
  
  // 8. Body font sizes: text-[14px] instead of text-[12px] sm:text-[13px] 2xl:text-[14px]
  content = content.replace(/text-\[12px\] sm:text-\[13px\] 2xl:text-\[14px\]/g, 'text-[14px]');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${relPath}`);
  }
}
