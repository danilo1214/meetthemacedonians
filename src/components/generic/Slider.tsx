interface SliderProps {
  value?: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
}

export const Slider = ({
  value,
  label,
  onChange,
  min = 1,
  max = 10,
  ...props
}: SliderProps) => {
  return (
    <div className="flex w-full items-center gap-2 lg:w-auto">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        {...props}
      />
      <span className="text-sm">{value ?? min}</span>
    </div>
  );
};
