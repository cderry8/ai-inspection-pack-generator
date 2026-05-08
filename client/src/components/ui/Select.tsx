"use client";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label?: string;
  className?: string;
}

export default function Select({
  value,
  onChange,
  options,
  label,
  className = "",
}: SelectProps) {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-xs font-medium text-slate-400 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-950/60 border border-purple-500/30 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-200 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
