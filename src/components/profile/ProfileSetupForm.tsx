import { Select } from "@headlessui/react";
import {
  type FoodType,
  type ProfileDrink,
  type ProfileLangugage,
} from "@prisma/client";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { MultiCheckboxSelect } from "~/components/generic/MultiCheckboxSelect";
import { getSelectItemsFromProfileSelectableData } from "~/util";
import { api } from "~/utils/api";

type Inputs = {
  familyName: string;
  dateOfBirth: Date;
  photoUrl: string;
  title: string;
  description: string;
  maximumPeople: number;
  isSmoking: boolean;
  profileLanguages: ProfileLangugage[];
  profileDrinks: ProfileDrink[];
  profileFoodTypes: FoodType[];
  exampleRequired: string;
};

export const ProfileSetupForm = () => {
  const { data: foodTypes } = api.profile.getFoodTypes.useQuery();
  const { data: languages } = api.profile.getLanguages.useQuery();
  const { data: drinkTypes } = api.profile.getDrinkTypes.useQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <Controller
        name="profileLanguages"
        control={control}
        render={({ field }) => (
          <MultiCheckboxSelect
            {...field}
            onChange={(value) => field.onChange(value)}
            value={field.value || []}
            label="Languages"
            options={getSelectItemsFromProfileSelectableData(languages ?? [])}
          ></MultiCheckboxSelect>
        )}
      />

      <Controller
        name="profileDrinks"
        control={control}
        render={({ field }) => (
          <MultiCheckboxSelect
            onChange={(value) => field.onChange(value)}
            value={field.value}
            label="Drinks"
            options={getSelectItemsFromProfileSelectableData(drinkTypes ?? [])}
          ></MultiCheckboxSelect>
        )}
      />

      <Controller
        name="profileFoodTypes"
        control={control}
        render={({ field }) => (
          <MultiCheckboxSelect
            onChange={(value) => field.onChange(value)}
            value={field.value}
            label="Foods"
            options={getSelectItemsFromProfileSelectableData(foodTypes ?? [])}
          ></MultiCheckboxSelect>
        )}
      />

      <div className="flex items-center justify-center">
        <input
          type="submit"
          className="cursor-pointer rounded bg-primary-800 px-5 py-2 text-white"
        />
      </div>
    </form>
  );
};
