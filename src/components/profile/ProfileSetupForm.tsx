import { type Drink, type Language, type FoodType } from "@prisma/client";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { upload } from "@vercel/blob/client";
import { Checkbox } from "~/components/generic/Checkbox";
import { FormItem } from "~/components/generic/FormItem";
import { Input } from "~/components/generic/Input";
import { MultiCheckboxSelect } from "~/components/generic/MultiCheckboxSelect";
import { TextArea } from "~/components/generic/TextArea";
import { getSelectItemsFromProfileSelectableData, toastError } from "~/util";
import { api } from "~/utils/api";
import { FileInput } from "~/components/generic/FileInput";
import { FormMotionDiv } from "~/components/generic/FormMotionDiv";
import { Steps } from "~/components/generic/Steps";
import { Button } from "~/components/generic/Button";
import { ProfileComplete } from "~/components/profile/ProfileComplete";
import { ProfileCard } from "~/components/profile/ProfileCard";

export type Inputs = {
  familyName: string;
  dateOfBirth: string;
  photoUrl: string;
  title: string;
  files: File[];
  description: string;
  maximumPeople: number;
  isSmoking: boolean;
  profileLanguages: Language[];
  profileDrinks: Drink[];
  profileFoodTypes: FoodType[];
  city: string;
  street: string;
  streetNumber: string;
  postalCode: string;
};

const steps = [
  {
    id: "1",
    name: "Лични податоци",
    fields: ["files", "title", "familyName", "dateOfBirth", "description"],
  },
  {
    id: "2",
    name: "Информации за гости",
    fields: [
      "maximumPeople",
      "isSmoking",
      "profileLanguages",
      "profileDrinks",
      "profileFoodTypes",
    ],
  },
  {
    id: "3",
    name: "Адреса",
    fields: ["city", "street", "streetNumber", "postalCode"],
  },
  { id: "4", name: "Профил испратен во проверка", fields: [] },
];

export const ProfileSetupForm = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const { mutateAsync: createProfile } =
    api.profile.createProfile.useMutation();

  const { mutateAsync: updateProfile } =
    api.profile.updateProfile.useMutation();

  const { data: profile } = api.profile.getProfile.useQuery();

  const { data: foodTypes } = api.profile.getFoodTypes.useQuery();
  const { data: languages } = api.profile.getLanguages.useQuery();
  const { data: drinkTypes } = api.profile.getDrinkTypes.useQuery();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<Inputs>();

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep]!.fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(onSubmit)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const photoUrl = watch("photoUrl");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { files } = data;
      if (files && files.length > 0 && files[0]) {
        const file = files[0];
        console.log(file);
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        console.log(blob);
        data.photoUrl = blob.downloadUrl;
      }

      if (profile?.id) {
        await updateProfile({
          id: profile.id,
          data: {
            ...data,
            address: {
              city: data.city,
              street: data.street,
              streetNumber: data.streetNumber,
              postalCode: data.postalCode,
            },
            maximumPeople: Number(data.maximumPeople),
            dateOfBirth: new Date(data.dateOfBirth),
          },
        });
      } else {
        await createProfile({
          ...data,
          address: {
            city: data.city,
            street: data.street,
            streetNumber: data.streetNumber,
            postalCode: data.postalCode,
          },
          maximumPeople: Number(data.maximumPeople),
          dateOfBirth: new Date(data.dateOfBirth),
        });
      }

      toast("successful");
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    const address = profile?.address;

    reset({
      ...profile,
      profileDrinks: profile?.profileDrinks?.map((pd) => pd.drink),
      profileFoodTypes: profile?.profileFoodTypes?.map((pf) => pf.foodType),
      profileLanguages: profile?.profileLanguages?.map((pl) => pl.language),
      dateOfBirth: profile?.dateOfBirth
        ? profile.dateOfBirth.toString()
        : undefined,
      city: address?.city,
      postalCode: address?.postalCode,
      street: address?.street,
      streetNumber: address?.streetNumber,
    });
  }, [profile, reset]);

  return (
    <section>
      <Steps currentStep={currentStep} steps={steps} />

      <form onSubmit={handleSubmit(onSubmit)} className="">
        {currentStep === 0 && (
          <FormMotionDiv
            delta={delta}
            description="Податоци потребни за креирање профил"
            title="Лични податоци"
          >
            <Controller
              name="files"
              control={control}
              rules={{
                validate: {
                  required: (value) => {
                    if (!value && !photoUrl) return "Задолжително";
                  },
                },
              }}
              render={({ field }) => (
                <FormItem
                  label="File"
                  border
                  error={errors[field.name]?.message}
                >
                  <FileInput
                    {...field}
                    onClear={() => {
                      setValue("photoUrl", "");
                    }}
                    photoUrl={photoUrl}
                    onChange={field.onChange}
                    placeholder="File"
                  />
                </FormItem>
              )}
            />

            <Controller
              name="title"
              control={control}
              rules={{
                required: "Задолжително",
              }}
              render={({ field }) => (
                <FormItem
                  label="Title"
                  border
                  error={errors[field.name]?.message}
                >
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
          </FormMotionDiv>
        )}

        {currentStep === 1 && (
          <FormMotionDiv
            title="Гостински податоци"
            description="Податоци кои што се од корист на гостите"
            delta={delta}
          >
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
                    options={getSelectItemsFromProfileSelectableData(
                      languages ?? [],
                    )}
                  ></MultiCheckboxSelect>
                </FormItem>
              )}
            />

            <Controller
              name="profileDrinks"
              rules={{
                required: "Задолжително",
                validate: (val) =>
                  val.length < 1
                    ? "Одберете барем еден вид на пијалок"
                    : undefined,
              }}
              control={control}
              render={({ field }) => (
                <FormItem
                  error={errors[field.name]?.message}
                  label="Drinks"
                  border
                >
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
                  val.length < 1
                    ? "Одберете барем еден вид на храна"
                    : undefined,
              }}
              control={control}
              render={({ field }) => (
                <FormItem error={errors[field.name]?.message} label="Foods">
                  <MultiCheckboxSelect
                    onChange={field.onChange}
                    value={field.value}
                    options={getSelectItemsFromProfileSelectableData(
                      foodTypes ?? [],
                    )}
                  ></MultiCheckboxSelect>
                </FormItem>
              )}
            />
          </FormMotionDiv>
        )}

        {currentStep === 2 && (
          <FormMotionDiv
            delta={delta}
            description="Податоци потребни за туристот да ве најде"
            title="Адреса"
          >
            <Controller
              name="street"
              control={control}
              rules={{
                required: "Задолжително",
              }}
              render={({ field }) => (
                <FormItem
                  label="Улица"
                  border
                  error={errors[field.name]?.message}
                >
                  <Input
                    {...field}
                    onChange={field.onChange}
                    value={field.value ?? ""}
                    placeholder="Улица"
                  />
                </FormItem>
              )}
            />

            <Controller
              name="streetNumber"
              control={control}
              rules={{
                required: "Задолжително",
              }}
              render={({ field }) => (
                <FormItem
                  label="Број"
                  border
                  error={errors[field.name]?.message}
                >
                  <Input
                    {...field}
                    onChange={field.onChange}
                    value={field.value ?? ""}
                    placeholder="Број"
                  />
                </FormItem>
              )}
            />

            <Controller
              name="city"
              control={control}
              rules={{
                required: "Задолжително",
              }}
              render={({ field }) => (
                <FormItem
                  label="Град"
                  border
                  error={errors[field.name]?.message}
                >
                  <Input
                    {...field}
                    onChange={field.onChange}
                    value={field.value ?? ""}
                    placeholder="Град"
                  />
                </FormItem>
              )}
            />

            <Controller
              name="postalCode"
              control={control}
              rules={{
                required: "Задолжително",
              }}
              render={({ field }) => (
                <FormItem
                  label="Поштенски број"
                  border
                  error={errors[field.name]?.message}
                >
                  <Input
                    {...field}
                    onChange={field.onChange}
                    value={field.value ?? ""}
                    placeholder="Поштенски број"
                  />
                </FormItem>
              )}
            />
          </FormMotionDiv>
        )}

        {currentStep === 3 && <ProfileComplete />}
      </form>

      <div className="my-8 px-10 pt-5">
        <div className="flex justify-between">
          <Button
            className="bg-primary-500 px-8 py-2 text-center text-lg text-white shadow-xl hover:bg-primary-400"
            label="Назад"
            onClick={prev}
            disabled={currentStep === 0}
          />

          <Button
            className="bg-primary-500 px-8 py-2 text-center text-lg text-white shadow-xl hover:bg-primary-400"
            label="Следно"
            onClick={next}
            disabled={currentStep === steps.length - 1}
          />
        </div>
      </div>
    </section>
  );
};
