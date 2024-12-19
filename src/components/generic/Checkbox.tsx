export const Checkbox = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) => {
  return (
    <input type="checkbox" checked={value} onChange={() => onChange(!value)} />
  );
};
