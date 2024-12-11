import { Select } from "@headlessui/react";
import {
  type FoodType,
  type ProfileDrink,
  type ProfileLangugage,
} from "@prisma/client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MultiCheckboxSelect } from "~/components/generic/MultiCheckboxSelect";

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
        onChange={(v) => console.log(v)}
        value={["2"]}
        label="drinz"
        options={[{ label: "2", value: "2" }]}
      ></MultiCheckboxSelect>

      <input type="submit" />
    </form>
  );
};
