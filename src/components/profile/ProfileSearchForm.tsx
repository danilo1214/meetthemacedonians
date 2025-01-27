import { Controller, useForm } from "react-hook-form";
import { Input } from "~/components/generic/Input";
import { Select } from "~/components/generic/Select";

export interface IProfileSearchForm {
  search?: string;
  city?: string;
  date?: string;
  guests?: number;
  ageRange?: string;
}

interface ProfileSearchFormProps {
  onSubmit: (data: IProfileSearchForm) => void;
}

export const ProfileSearchForm = ({ onSubmit }: ProfileSearchFormProps) => {
  const { register, handleSubmit, reset, control, watch } =
    useForm<IProfileSearchForm>();

  const guests = watch("guests");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="items-top mx-2 my-5 flex flex-col justify-center gap-4 rounded-lg p-4 py-2 lg:flex-row"
    >
      {/* Search Bar */}

      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <Input
            onChange={field.onChange}
            type="text"
            placeholder="Search..."
            value={field.value}
          />
        )}
      ></Controller>

      {/* City Select Menu */}
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <Select
            onChange={field.onChange}
            value={field.value}
            placeholder="City"
            options={["Skopje", "Ohrid"]}
          />
        )}
      ></Controller>

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <Input
            onChange={field.onChange}
            type="date"
            placeholder="Date"
            value={field.value}
          />
        )}
      ></Controller>

      {/* Guests Slider */}
      <div className="flex w-full items-center gap-2 lg:w-auto">
        <label htmlFor="guests" className="text-sm font-medium">
          Guests
        </label>
        <Controller
          name="guests"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <input type="range" id="guests" min={1} max={10} {...field} />
          )}
        />
        <span className="text-sm">{guests ?? 1}</span>
      </div>

      <Controller
        name="ageRange"
        control={control}
        render={({ field }) => (
          <Select
            onChange={field.onChange}
            value={field.value}
            options={["18-25", "25-40", "40-60", "60-70"]}
            placeholder="Age"
          />
        )}
      ></Controller>

      {/* Submit Button */}
      <button
        type="submit"
        className="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
      >
        Search
      </button>
    </form>
  );
};
