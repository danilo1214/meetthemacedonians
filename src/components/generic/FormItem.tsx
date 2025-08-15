import type React from "react";

interface FormItemProps {
  children: React.ReactElement;
  label: string;
  error?: string;
  border?: boolean;
}

export const FormItem = ({ children, label, error }: FormItemProps) => {
  return (
    <div>
      <div className="flex flex-col gap-y-4 py-4 lg:gap-x-6 lg:py-5">
        {label && (
          <div className="w-32 text-sm text-gray-700 lg:w-64 dark:text-gray-100">
            <div>{label}</div>
            <div className="text-primary-400">{error}</div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
