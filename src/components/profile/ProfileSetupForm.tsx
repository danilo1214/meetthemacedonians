import { useEffect, useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
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
import { useLoadScript } from "@react-google-maps/api";
import { env } from "~/env";
import { GooglePlacesAutocompleteComponent } from "../generic/GooglePlacesAutocomplete";

export type TProfileSetupForm = {
  photoUrl: string;
  title: string;
  files: File[];
  isSmoking: boolean;
  address: string;
  lat: number;
  lng: number;
};

const steps = [
  {
    id: "1",
    name: "Лични податоци",
    fields: ["files", "title", "address"],
  },
  { id: "2", name: "Профил испратен во проверка", fields: [] },
];

export const ProfileSetupForm = () => {
  const utils = api.useUtils();

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const { mutateAsync: createProfile } =
    api.profile.createProfile.useMutation();

  const { mutateAsync: updateProfile } =
    api.profile.updateProfile.useMutation();

  const { data: profile } = api.profile.getProfile.useQuery();

  const methods = useForm<TProfileSetupForm>();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = methods;

  type FieldName = keyof TProfileSetupForm;

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

  const onSubmit: SubmitHandler<TProfileSetupForm> = async (data) => {
    try {
      const { files } = data;
      if (files && files.length > 0 && files[0]) {
        const file = files[0];
        console.log(file);
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        data.photoUrl = blob.downloadUrl;
      }

      if (profile?.id) {
        await updateProfile({
          id: profile.id,
          data: {
            ...data,
          },
        });
      } else {
        await createProfile({
          ...data,
        });
      }

      await utils.reservation.invalidate();
      await utils.profile.invalidate();

      toast("Успешно внесен профил.");
    } catch (err) {
      toastError(err);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const address = watch("address");
  console.log(address);

  useEffect(() => {
    reset({
      ...profile,
    });
  }, [profile, reset]);

  console.log(errors, address);

  return (
    <section>
      <Steps currentStep={currentStep} steps={steps} />

      <FormProvider {...methods}>
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
                    label="Профилна слика"
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
                    label="Наслов"
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
                name="address"
                rules={{
                  validate: {
                    required: (value) => {
                      console.log(value);
                      if (!value) return "Задолжително";
                    },
                  },
                }}
                control={control}
                render={({ field }) => (
                  <FormItem
                    label="Адреса"
                    border
                    error={errors[field.name]?.message}
                  >
                    <GooglePlacesAutocompleteComponent
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormItem>
                )}
              />
            </FormMotionDiv>
          )}

          {currentStep === 1 && <ProfileComplete />}
        </form>
      </FormProvider>

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
