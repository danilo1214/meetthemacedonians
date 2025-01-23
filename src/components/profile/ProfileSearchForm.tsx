import { Controller, useForm } from "react-hook-form";

export interface IProfileSearchForm {
  search?: string;
  city?: string;
  date?: Date;
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
      className="flex flex-col items-center gap-4 rounded-lg bg-gray-100 p-4 shadow-sm sm:flex-row"
    >
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search"
        {...register("search")}
        className="w-full rounded border p-2 sm:w-auto"
      />

      {/* City Select Menu */}
      <select
        {...register("city")}
        className="w-full rounded border p-2 sm:w-auto"
      >
        <option value="">Select City</option>
        <option value="Skopje">Skopje</option>
        <option value="Ohrid">Ohrid</option>
      </select>

      {/* Date Picker */}
      <input
        type="date"
        {...register("date")}
        className="w-full rounded border p-2 sm:w-auto"
      />

      {/* Guests Slider */}
      <div className="flex items-center gap-2">
        <label htmlFor="guests" className="text-sm font-medium">
          Guests
        </label>
        <Controller
          name="guests"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <input
              type="range"
              id="guests"
              min={1}
              max={10}
              {...field}
              className="w-24"
            />
          )}
        />
        <span className="text-sm">{guests ?? 1}</span>
      </div>

      {/* Age Range Selection */}
      <select
        {...register("ageRange")}
        className="w-full rounded border p-2 sm:w-auto"
      >
        <option value="18-25">18-25</option>
        <option value="25-40">25-40</option>
        <option value="40-60">40-60</option>
        <option value="60+">60+</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Search
      </button>

      {/* Reset Button */}
      <button
        type="button"
        onClick={() => reset()}
        className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
      >
        Reset
      </button>
    </form>
  );
};
