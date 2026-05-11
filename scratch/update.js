const fs = require('fs');
const file = 'd:/website/shiftmate-frontend-main/app/dashboard/Dashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Replace imports
code = code.replace(/import \{ useState, Fragment, useEffect \} from "react";[\s\S]*?import adminImage from "@\/assets\/images\/admin-img\.png";/, 'import { useState } from "react";\nimport DashboardLayout from "@/Component/Layout/DashboardLayout";');

// 2. Remove LeftNav and AdminDropdown
code = code.replace(/function LeftNav\(\{ collapsed \}: Readonly<\{ collapsed: boolean \}>\) \{[\s\S]*?function AdminDropdown\(\) \{[\s\S]*?  \);\n\}\n\nconst data = /, 'const data = ');

// 3. Replace the component body up to the grid div
code = code.replace(/export default function DashboardPage\(\) \{[\s\S]*?<div className="grid flex-1 gap-4 p-4 md:grid-cols-12 md:p-6">/, 
`export default function DashboardPage() {
  const [workforceView, setWorkforceView] =
    useState<keyof typeof workforceSeries>("days");

  return (
    <DashboardLayout title="Dashboard" subtitle="Overview of your workforce and HR activities">
      <div className="grid flex-1 gap-4 p-4 md:grid-cols-12 md:p-6">`);

// 4. Replace the closing tags
code = code.replace(/          <\/div>\n        <\/section>\n      <\/div>\n    <\/main>\n  \);\n\}/, 
`          </div>
    </DashboardLayout>
  );
}`);

fs.writeFileSync(file, code);
