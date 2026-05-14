const fs = require('fs');

let content = fs.readFileSync('app/employees/add-employee/page.tsx', 'utf8');

// Replacements
content = content.replace(/<h2 style=\{\{\s*fontSize:\s*["']24px["']\s*\}\}\s*className=/g, '<h2 className="text-[24px] ');

content = content.replace(/<div\s*style=\{\{\s*display:\s*["']flex["'],\s*alignItems:\s*["']center["'],\s*justifyContent:\s*["']center["'],\s*gap:\s*["']48px["'],?\s*\}\}\s*className=/g, '<div className="flex items-center justify-center gap-[48px] ');

content = content.replace(/style=\{\{\s*height:\s*["']42px["'],\s*width:\s*["']42px["'],\s*backgroundColor:\s*isActive \|\| isCompleted \? ["']#257BFC["'] : ["']#F1F5F9["'],\s*color:\s*isActive \|\| isCompleted \? ["']#FFFFFF["'] : ["']#94A3B8["'],?\s*\}\}\s*className=\{`/g, 'className={`h-[42px] w-[42px] flex items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${isActive || isCompleted ? "bg-[#257BFC] text-[#FFFFFF]" : "bg-[#F1F5F9] text-[#94A3B8]"} ');

content = content.replace(/style=\{\{\s*top:\s*["']52px["'],\s*color:\s*isActive \|\| isCompleted \? ["']#0F172A["'] : ["']#94A3B8["'],?\s*\}\}\s*className=\{`/g, 'className={`top-[52px] absolute w-[110px] text-center text-[13px] font-medium leading-[18px] ${isActive || isCompleted ? "text-[#0F172A]" : "text-[#94A3B8]"} ');

content = content.replace(/<div\s*style=\{\{\s*backgroundColor:\s*["']#E2E8F0["'],\s*height:\s*["']2px["'],\s*width:\s*["']115px["'],\s*margin:\s*["']0 8px["'],?\s*\}\}>/g, '<div className="bg-[#E2E8F0] h-[2px] w-[115px] mx-2">');

content = content.replace(/<div\s*style=\{\{\s*backgroundColor:\s*["']#257BFC["'],\s*height:\s*["']2px["'],\s*width:\s*isCompleted \? ["']100%["'] : ["']0%["'],\s*transition:\s*["']width 0\.3s ease["'],?\s*\}\}\s*\/>/g, '<div className={`bg-[#257BFC] h-[2px] transition-all duration-300 ease-in-out ${isCompleted ? "w-full" : "w-0"}`} />');

content = content.replace(/<div\s*style=\{\{\s*marginTop:\s*["']110px["']\s*\}\}\s*className=/g, '<div className="mt-[110px] ');

content = content.replace(/<h3\s*style=\{\{\s*marginBottom:\s*["']32px["']\s*\}\}\s*className=/g, '<h3 className="mb-[32px] ');

content = content.replace(/<div\s*style=\{\{\s*marginLeft:\s*["']6%["'],\s*marginRight:\s*["']6%["']\s*\}\}\s*className=/g, '<div className="mx-[6%] ');

content = content.replace(/<div\s*style=\{\{\s*borderRadius:\s*["']16px["'],\s*backgroundColor:\s*["']#F9FAFB["']\s*\}\}\s*className=/g, '<div className="rounded-[16px] bg-[#F9FAFB] ');

content = content.replace(/<div\s*style=\{\{\s*borderBottom:\s*["']1px solid #D0D5DD["']\s*\}\}\s*className=/g, '<div className="border-b border-[#D0D5DD] ');

content = content.replace(/<div\s*style=\{\{\s*gridTemplateColumns:\s*["']2fr 2fr["'],\s*rowGap:\s*["']1rem["'],\s*columnGap:\s*["']1rem["']\s*\}\}\s*className=/g, '<div className="grid-cols-[2fr_2fr] gap-4 ');

content = content.replace(/<p\s*style=\{\{\s*marginBottom:\s*["']6px["']\s*\}\}\s*className=/g, '<p className="mb-[6px] ');
content = content.replace(/<p\s*style=\{\{\s*marginBottom:\s*["']6px["']\s*\}\}\s*className=/g, '<p className="mb-[6px] '); // some formatting difference might exist, this is broad enough

content = content.replace(/<div style=\{\{\s*backgroundColor:\s*["']#EDFAF2["'],\s*border:\s*["']transparent["'],\s*borderRadius:\s*["']100px["'],\s*color:\s*["']#4DB949["'],\s*gap:\s*["']8px["']\s*\}\}\s*className=/g, '<div className="bg-[#EDFAF2] border-transparent rounded-full text-[#4DB949] gap-[8px] ');

content = content.replace(/<div style=\{\{\s*backgroundColor:\s*["']#FEF6E7["'],\s*border:\s*["']transparent["'],\s*borderRadius:\s*["']100px["'],\s*color:\s*["']#F79009["'],\s*gap:\s*["']8px["']\s*\}\}\s*className=/g, '<div className="bg-[#FEF6E7] border-transparent rounded-full text-[#F79009] gap-[8px] ');

content = content.replace(/<div\s*style=\{\{\s*marginTop:\s*["']48px["']\s*\}\}\s*className=/g, '<div className="mt-[48px] ');

fs.writeFileSync('app/employees/add-employee/page.tsx', content);
console.log("Replaced add-employee/page.tsx");
