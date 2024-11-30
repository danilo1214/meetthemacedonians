import classNames from "classnames";

export const Button = ({
  className,
  label,
  onClick,
  ...rest
}: {
  className: string;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={classNames("rounded px-5 py-2", className)}
      {...rest}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
