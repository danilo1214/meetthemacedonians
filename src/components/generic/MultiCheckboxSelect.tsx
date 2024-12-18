import React from "react";

export interface CheckboxSelectItem<T> {
  value: T;
  label: string;
}

interface MultiCheckboxSelectProps<T> {
  options: CheckboxSelectItem<T>[];
  value?: T[];
  border?: boolean;
  onChange: (value: T[]) => void;
}

export const MultiCheckboxSelect = <T extends object>({
  options,
  value,
  onChange,
}: MultiCheckboxSelectProps<T>) => {
  // Helper function to compare objects
  const isEqual = (a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

  const isSelected = (val: T) => {
    return value?.some((v) => isEqual(v, val));
  };

  const handleChange = (val: T) => {
    if (!value) {
      onChange([val]);
    } else if (isSelected(val)) {
      onChange(value.filter((v) => !isEqual(v, val))); // Remove the object
    } else {
      onChange([...value, val]); // Add the object
    }
  };

  return (
    <ul style={{ listStyleType: "none" }} className="space-y-2">
      {options.map((option) => (
        <li key={`${option.label}`}>
          <input
            id={`${option.label}`}
            type="checkbox"
            checked={isSelected(option.value)}
            onChange={() => handleChange(option.value)}
          />
          <label htmlFor={`${option.label}`} className="ml-1">
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  );
};
