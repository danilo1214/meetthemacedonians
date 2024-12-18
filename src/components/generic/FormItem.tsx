import type React from "react";

interface FormItemProps {
  children: React.ReactElement;
  label: string;
  error?: string;
  border?: boolean;
}

export const FormItem = ({ children, label, error, border }: FormItemProps) => {
  return (
    <>
      <div className="flex flex-col items-center gap-y-10 lg:flex-row lg:gap-x-10">
        {label && (
          <div className="w-64 text-center lg:text-right">
            <div>{label}</div>
            <div className="text-sm text-primary-400">{error}</div>
          </div>
        )}

        {children}
      </div>

      {border && (
        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      )}
    </>
  );
};
