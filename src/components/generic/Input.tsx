interface InputProps {
  value?: string | number;
  placeholder: string;
  onChange: (value: string) => void;
  type?: string;
}

export const Input = ({
  value,
  placeholder,
  onChange,
  type = "text",
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600"
      placeholder={placeholder}
      {...rest}
    />
  );
};
