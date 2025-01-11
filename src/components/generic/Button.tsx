import classNames from "classnames";

export const Button = ({
  className,
  label,
  disabled,
  onClick,
  ...rest
}: {
  disabled: boolean;
  className: string;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={classNames("rounded px-5 py-2", className)}
      disabled={disabled}
      {...rest}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
