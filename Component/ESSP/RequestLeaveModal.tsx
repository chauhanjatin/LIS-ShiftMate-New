import { useState } from "react";
import CustomSelect from "@/Component/UI/CustomSelect";

interface RequestLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function RequestLeaveModal({ isOpen, onClose, onSubmit }: RequestLeaveModalProps) {
  const [formData, setFormData] = useState({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setFormData({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
      onSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[800px] overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
          <h2 className="text-[18px] 2xl:text-[24px] font-semibold text-[#111827]">Request Leave</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-black cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-[14px] font-normal text-[#111827]">Leave Type</label>
              <CustomSelect 
                options={[{ value: 'Annual Leave', label: 'Annual Leave' }, { value: 'Sick Leave', label: 'Sick Leave' }]}
                value={formData.type}
                onChange={(val) => setFormData({...formData, type: val})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-[14px] font-normal text-[#111827]">Start Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className={`w-full h-11 px-4 rounded-xl border ${errors.startDate ? 'border-red-500' : 'border-neutral-200'} text-[14px] outline-none focus:border-[#257BFC] focus:ring-1 focus:ring-[#257BFC] transition-all`}
                  />
                </div>
                {errors.startDate && <p className="mt-1 text-[12px] text-red-500">{errors.startDate}</p>}
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-normal text-[#111827]">End Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className={`w-full h-11 px-4 rounded-xl border ${errors.endDate ? 'border-red-500' : 'border-neutral-200'} text-[14px] outline-none focus:border-[#257BFC] focus:ring-1 focus:ring-[#257BFC] transition-all`}
                  />
                </div>
                {errors.endDate && <p className="mt-1 text-[12px] text-red-500">{errors.endDate}</p>}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[14px] font-normal text-[#111827]">Reason</label>
              <textarea 
                placeholder="Please provide reason for leave..."
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className={`w-full h-24 p-4 rounded-xl border ${errors.reason ? 'border-red-500' : 'border-neutral-200'} text-[14px] outline-none focus:border-[#257BFC] focus:ring-1 focus:ring-[#257BFC] transition-all resize-none`}
              ></textarea>
              {errors.reason && <p className="mt-1 text-[12px] text-red-500">{errors.reason}</p>}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="h-10 px-6 rounded-xl border border-black text-[14px] font-semibold text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="h-10 px-6 rounded-xl bg-[#257BFC] text-[14px] font-semibold text-white cursor-pointer"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
