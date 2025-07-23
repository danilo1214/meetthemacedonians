import classnames from "classnames";
import { forwardRef } from "react";

interface InputProps {
  value?: string | number;
  placeholder: string;
  onChange: (value: string) => void;
  classNames?: string;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, placeholder, onChange, type = "text", classNames, ...rest },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={classnames(
          "rounded border-gray-300 bg-gray-50 p-2 text-lg lg:p-2.5 dark:border-gray-600",
          classNames,
        )}
        placeholder={placeholder}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
