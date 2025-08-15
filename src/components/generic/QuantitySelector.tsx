import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

interface QuantitySelectorProps {
  label: string;
  value: number;
  svg?: React.ReactElement;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
}

export const QuantitySelector = ({
  label,
  svg,
  value,
  min = 1,
  max = 10,
  onChange,
}: QuantitySelectorProps) => {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };
  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="mb-6 w-[200px]">
      <div className="flex flex-col rounded border border-gray-300 bg-gray-50 p-6">
        {/* Minus Button Left */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={decrease}
            disabled={value <= min}
            aria-label={`Decrease ${label}`}
            className="rounded-full bg-white p-1 shadow hover:bg-gray-100 disabled:opacity-50"
          >
            <MinusIcon className="h-5 w-5 text-primary-600" />
          </button>

          {/* Bag Icon Center */}
          {svg}

          {/* Plus Button Right */}
          <button
            type="button"
            onClick={increase}
            disabled={value >= max}
            aria-label={`Increase ${label}`}
            className="rounded-full bg-white p-1 shadow hover:bg-gray-100 disabled:opacity-50"
          >
            <PlusIcon className="h-5 w-5 text-primary-600" />
          </button>
        </div>

        {/* Quantity below bag */}
        <div className="mx-auto my-1 w-20 rounded bg-primary-600 px-3 py-0.5 text-center text-sm font-semibold text-white shadow-md">
          {value}
        </div>
      </div>
    </div>
  );
};
