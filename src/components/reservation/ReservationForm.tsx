import { useRouter } from "next/router";
import { useState } from "react";
import {
  Controller,
  useForm,
  useFieldArray,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "react-toastify";
import { FormItem } from "~/components/generic/FormItem";
import { Input } from "~/components/generic/Input";
import { Slider } from "~/components/generic/Slider";
import { TextArea } from "~/components/generic/TextArea";
import { toastError } from "~/util";
import { api } from "~/utils/api";

export type TReservationForm = {
  firstName: string;
  lastName: string;
  note: string;
  date: string;
  country: string;
  peopleAges: { age: number }[];
};

interface ReservationFormProps {
  profileId: number;
}

export const ReservationForm = ({ profileId }: ReservationFormProps) => {
  const { mutateAsync: createReservation } =
    api.reservation.createReservation.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TReservationForm>({
    defaultValues: {
      peopleAges: [{ age: 0 }], // At least one guest
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "peopleAges",
  });

  const onGuestChange = (value: number) => {
    if (value > fields.length) {
      // Add new guests
      append(Array(value - fields.length).fill({ age: 0 }));
    } else {
      // Remove excess guests
      replace(fields.slice(0, value));
    }
  };

  const onSubmit: SubmitHandler<TReservationForm> = async (data) => {
    console.log(data);
    try {
      await createReservation({
        ...data,
        profileId,
        date: new Date(data.date),
        peopleAges: data.peopleAges.map((p) => p.age), // Convert objects to array of numbers
      });
      toast("Successfully made reservation");
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: "Required" }}
        render={({ field }) => (
          <FormItem label="First Name" border error={errors.firstName?.message}>
            <Input {...field} placeholder="First Name" />
          </FormItem>
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{ required: "Required" }}
        render={({ field }) => (
          <FormItem label="Last Name" border error={errors.lastName?.message}>
            <Input {...field} placeholder="Last Name" />
          </FormItem>
        )}
      />

      <Controller
        name="date"
        control={control}
        rules={{ required: "Required" }}
        render={({ field }) => (
          <FormItem label="Date and time" border error={errors.date?.message}>
            <Input
              {...field}
              type="datetime-local"
              placeholder="Reservation date"
            />
          </FormItem>
        )}
      />

      <Controller
        name="note"
        control={control}
        rules={{ required: "Required" }}
        render={({ field }) => (
          <FormItem label="Notes" border error={errors.note?.message}>
            <TextArea {...field} placeholder="Note to the host" />
          </FormItem>
        )}
      />

      <Controller
        name="country"
        control={control}
        rules={{ required: "Required" }}
        render={({ field }) => (
          <FormItem label="Country" border error={errors.country?.message}>
            <Input {...field} placeholder="Country" />
          </FormItem>
        )}
      />

      <FormItem label="Guests" border>
        <div>
          <Slider
            min={1}
            max={10}
            value={fields.length}
            onChange={onGuestChange}
          />

          {fields.map((field, idx) => (
            <div key={field.id} className="m-2 flex items-center gap-x-2">
              <label>Age for guest {idx + 1}</label>
              <Controller
                name={`peopleAges.${idx}.age`}
                control={control}
                rules={{
                  required: "Required",
                  min: { value: 0, message: "Age must be 0 or more" },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter age"
                    onChange={(value) => field.onChange(Number(value))} // Ensure number conversion
                  />
                )}
              />
            </div>
          ))}
        </div>
      </FormItem>

      <button type="submit" className="mt-4 rounded bg-blue-500 p-2 text-white">
        Submit Reservation
      </button>
    </form>
  );
};
