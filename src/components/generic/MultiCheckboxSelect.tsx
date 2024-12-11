import React from "react";

interface CheckboxSelectItem<T> {
  value: T;
  label: string;
}

interface MultiCheckboxSelectProps<T> {
  options: CheckboxSelectItem<T>[];
  value: T[];
  label?: string;
  onChange: (value: T[]) => void;
}

export const MultiCheckboxSelect = <T extends string | number>({
  options,
  label,
  value,
  onChange,
}: MultiCheckboxSelectProps<T>) => {
  const isSelected = (val: T) => {
    return value.includes(val);
  };

  const handleChange = (val: T) => {
    const index = value.indexOf(val);
    if (index > -1) {
      onChange([...value.slice(0, index), ...value.slice(index + 1)]);
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <ul style={{ listStyleType: "none" }}>
        {options.map((option) => (
          <li key={option.value}>
            <input
              id={`${option.value}`}
              type="checkbox"
              value={option.value}
              checked={isSelected(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <label htmlFor={`${option.value}`}>{option.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};
