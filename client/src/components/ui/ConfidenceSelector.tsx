"use client";

type Confidence = "Low" | "Medium" | "High";

interface ConfidenceSelectorProps {
  value: Confidence;
  onChange: (value: Confidence) => void;
  size?: "sm" | "md";
}

const options: { value: Confidence; label: string; color: string }[] = [
  {
    value: "Low",
    label: "Low",
    color: "data-[selected=true]:bg-emerald-500/30 data-[selected=true]:text-emerald-300 data-[selected=true]:border-emerald-500/50 data-[selected=true]:shadow-emerald-500/20",
  },
  {
    value: "Medium",
    label: "Med",
    color: "data-[selected=true]:bg-amber-500/30 data-[selected=true]:text-amber-300 data-[selected=true]:border-amber-500/50 data-[selected=true]:shadow-amber-500/20",
  },
  {
    value: "High",
    label: "High",
    color: "data-[selected=true]:bg-rose-500/30 data-[selected=true]:text-rose-300 data-[selected=true]:border-rose-500/50 data-[selected=true]:shadow-rose-500/20",
  },
];

export default function ConfidenceSelector({
  value,
  onChange,
  size = "sm",
}: ConfidenceSelectorProps) {
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
  };

  return (
    <div className="inline-flex items-center bg-slate-950/60 border border-purple-500/20 rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          data-selected={value === option.value}
          className={`
            ${sizeClasses[size]}
            font-medium rounded-md transition-all duration-200
            border border-transparent
            text-slate-400 hover:text-slate-200
            cursor-pointer
            ${option.color}
            data-[selected=true]:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-cyan-400/30
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
