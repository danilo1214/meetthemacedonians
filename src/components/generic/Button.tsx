import classNames from "classnames";

export const Button = ({
  className,
  label,
  disabled,
  onClick,
  ...rest
}: {
  disabled?: boolean;
  className: string;
  label: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}) => {
  return (
    <button
      className={classNames(
        "rounded px-5 py-2 disabled:bg-slate-200",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  );
};
