interface SelectProps {
  options: string[] | number[];
  value: string | number | undefined;
  placeholder?: string;
  onChange: (value: string | number) => void;
}

export const Select = ({
  placeholder,
  value,
  options,
  onChange,
  ...props
}: SelectProps) => {
  return (
    <select
      {...props}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border p-2 lg:w-auto"
      value={value}
    >
      <option value={""} disabled selected>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
