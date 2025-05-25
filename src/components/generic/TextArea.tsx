interface TextAreaProps {
  value: string | number;
  placeholder: string;
  onChange: (value: string) => void;
}

export const TextArea = ({
  value,
  placeholder,
  onChange,
  ...rest
}: TextAreaProps) => {
  return (
    <textarea
      value={value}
      rows={5}
      cols={50}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border-gray-300 bg-gray-50 p-2 text-lg lg:p-2.5 dark:border-gray-600"
      placeholder={placeholder}
      {...rest}
    />
  );
};
