import {
  type FoodType,
  type ProfileDrink,
  type ProfileLangugage,
} from "@prisma/client";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Checkbox } from "~/components/generic/Checkbox";
import { FormItem } from "~/components/generic/FormItem";
import { Input } from "~/components/generic/Input";
import { MultiCheckboxSelect } from "~/components/generic/MultiCheckboxSelect";
import { TextArea } from "~/components/generic/TextArea";
import { getSelectItemsFromProfileSelectableData } from "~/util";
import { api } from "~/utils/api";

export type Inputs = {
  familyName: string;
  dateOfBirth: string;
  photoUrl: string;
  title: string;
  description: string;
  maximumPeople: number;
  isSmoking: boolean;
  profileLanguages: ProfileLangugage[];
  profileDrinks: ProfileDrink[];
  profileFoodTypes: FoodType[];
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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data, "molam?");

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <Controller
        name="title"
        control={control}
        rules={{
          required: "Задолжително",
        }}
        render={({ field }) => (
          <FormItem label="Title" border error={errors[field.name]?.message}>
            <Input
              {...field}
              onChange={field.onChange}
              value={field.value ?? ""}
              placeholder="Поглавје"
            />
          </FormItem>
        )}
      />

      <Controller
        name="familyName"
        control={control}
        rules={{
          required: "Задолжително",
        }}
        render={({ field }) => (
          <FormItem
            label="Family Name"
            border
            error={errors[field.name]?.message}
          >
            <Input
              {...field}
              onChange={field.onChange}
              value={field.value ?? ""}
              placeholder="Име на фамилија"
            />
          </FormItem>
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{
          required: "Задолжително",
        }}
        render={({ field }) => (
          <FormItem
            label="Description"
            border
            error={errors[field.name]?.message}
          >
            <TextArea
              {...field}
              onChange={field.onChange}
              value={field.value ?? ""}
              placeholder="Опис"
            />
          </FormItem>
        )}
      />

      <Controller
        name="maximumPeople"
        control={control}
        rules={{
          required: "Задолжително",
        }}
        render={({ field }) => (
          <FormItem
            label="Maximum People"
            border
            error={errors[field.name]?.message}
          >
            <Input
              {...field}
              onChange={field.onChange}
              type="number"
              value={field.value ?? ""}
              placeholder="Максимален број на луѓе"
            />
          </FormItem>
        )}
      />

      <Controller
        name="isSmoking"
        control={control}
        render={({ field }) => (
          <FormItem
            label="Is smoking?"
            border
            error={errors[field.name]?.message}
          >
            <Checkbox
              {...field}
              onChange={field.onChange}
              value={field.value ?? false}
            />
          </FormItem>
        )}
      />

      <Controller
        name="dateOfBirth"
        control={control}
        rules={{
          required: "Задолжително",
        }}
        render={({ field }) => (
          <FormItem
            label="Date of Birth"
            border
            error={errors[field.name]?.message}
          >
            <Input
              {...field}
              type="date"
              onChange={field.onChange}
              value={field.value}
              placeholder="Датум на раѓање"
            />
          </FormItem>
        )}
      />

      <Controller
        name="profileDrinks"
        rules={{
          required: "Задолжително",
          validate: (val) =>
            val.length < 1 ? "Одберете барем еден вид на пијалок" : undefined,
        }}
        control={control}
        render={({ field }) => (
          <FormItem error={errors[field.name]?.message} label="Drinks" border>
            <MultiCheckboxSelect
              onChange={field.onChange}
              value={field.value}
              options={getSelectItemsFromProfileSelectableData(
                drinkTypes ?? [],
              )}
            ></MultiCheckboxSelect>
          </FormItem>
        )}
      />

      <Controller
        name="profileLanguages"
        control={control}
        rules={{
          required: "Задолжително",
          validate: (val) =>
            val.length < 1 ? "Одберете барем еден јазик" : undefined,
        }}
        render={({ field }) => (
          <FormItem
            error={errors[field.name]?.message}
            label="Languages"
            border
          >
            <MultiCheckboxSelect
              {...field}
              onChange={field.onChange}
              value={field.value || []}
              options={getSelectItemsFromProfileSelectableData(languages ?? [])}
            ></MultiCheckboxSelect>
          </FormItem>
        )}
      />

      <Controller
        name="profileDrinks"
        rules={{
          required: "Задолжително",
          validate: (val) =>
            val.length < 1 ? "Одберете барем еден вид на пијалок" : undefined,
        }}
        control={control}
        render={({ field }) => (
          <FormItem error={errors[field.name]?.message} label="Drinks" border>
            <MultiCheckboxSelect
              onChange={field.onChange}
              value={field.value}
              options={getSelectItemsFromProfileSelectableData(
                drinkTypes ?? [],
              )}
            ></MultiCheckboxSelect>
          </FormItem>
        )}
      />

      <Controller
        name="profileFoodTypes"
        rules={{
          required: "Задолжително",
          validate: (val) =>
            val.length < 1 ? "Одберете барем еден вид на храна" : undefined,
        }}
        control={control}
        render={({ field }) => (
          <FormItem error={errors[field.name]?.message} label="Foods">
            <MultiCheckboxSelect
              onChange={field.onChange}
              value={field.value}
              options={getSelectItemsFromProfileSelectableData(foodTypes ?? [])}
            ></MultiCheckboxSelect>
          </FormItem>
        )}
      />

      <div className="my-10 flex items-center justify-center">
        <input
          disabled={Object.keys(errors).length > 0}
          type="submit"
          className="w-64 cursor-pointer rounded bg-primary-600 px-5 py-2 text-white"
        />
      </div>
    </form>
  );
};
