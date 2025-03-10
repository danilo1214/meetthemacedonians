import classnames from "classnames";

interface InputProps {
  value?: string | number;
  placeholder: string;
  onChange: (value: string) => void;
  classNames?: string;
  type?: string;
}

export const Input = ({
  value,
  placeholder,
  onChange,
  type = "text",
  classNames,
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classnames(
        "rounded border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600",
        classNames,
      )}
      placeholder={placeholder}
      {...rest}
    />
  );
};
