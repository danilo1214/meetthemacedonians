"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "~/components/generic/Input";
import { Select } from "~/components/generic/Select";
import { Slider } from "~/components/generic/Slider";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  // Initialize form with query params
  const { handleSubmit, control, formState } = useForm<IProfileSearchForm>({
    defaultValues: {
      search: searchParams.get("search") ?? "",
      city: searchParams.get("city") ?? "",
      date: searchParams.get("date") ?? "",
      guests: searchParams.get("guests")
        ? Number(searchParams.get("guests"))
        : 1,
      ageRange: searchParams.get("ageRange") ?? "",
    },
  });

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
      />

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
      />

      {/* Date Picker */}
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
      />

      {/* Guests Slider */}
      <Controller
        name="guests"
        control={control}
        render={({ field }) => (
          <Slider label="Guests" min={1} max={10} {...field} />
        )}
      />

      {/* Age Range */}
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
      />

      {/* Submit Button */}
      <button
        disabled={Object.keys(formState.dirtyFields).length === 0}
        type="submit"
        className="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 disabled:bg-primary-200"
      >
        Search
      </button>
    </form>
  );
};
