import { Select } from "@headlessui/react";
import {
  type FoodType,
  type ProfileDrink,
  type ProfileLangugage,
} from "@prisma/client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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

  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<number[]>([]);
  const [selectedDrinkTypes, setSelectedDrinkTypes] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const ps = "active";
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <select name="s" onChange={(v) => console.log(v)} value={ps}>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="delayed">Delayed</option>
        <option value="canceled">Canceled</option>
      </select>

      <MultiCheckboxSelect
        onChange={(v) => setSelectedLanguages(v)}
        value={selectedLanguages}
        label="langz"
        options={getSelectItemsFromProfileSelectableData(languages ?? [])}
      ></MultiCheckboxSelect>

      <MultiCheckboxSelect
        onChange={(v) => setSelectedDrinkTypes(v)}
        value={selectedDrinkTypes}
        label="drinz"
        options={getSelectItemsFromProfileSelectableData(drinkTypes ?? [])}
      ></MultiCheckboxSelect>

      <MultiCheckboxSelect
        onChange={(v) => setSelectedFoodTypes(v)}
        value={selectedFoodTypes}
        label="foodz"
        options={getSelectItemsFromProfileSelectableData(foodTypes ?? [])}
      ></MultiCheckboxSelect>

      <input type="submit" />
    </form>
  );
};
