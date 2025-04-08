import { useRouter } from "next/router";
import { useState } from "react";
import {
  Controller,
  useForm,
  useFieldArray,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/generic/Button";
import { FormItem } from "~/components/generic/FormItem";
import { Input } from "~/components/generic/Input";
import { TextArea } from "~/components/generic/TextArea";
import { toastError } from "~/util";
import { api } from "~/utils/api";

export type TReservationForm = {
  firstName: string;
  lastName: string;
  note: string;
  email: string;
  phoneNumber: string;
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
    <div className="mx-lg flex flex-col items-center border-t-2 border-t-gray-100 px-12 lg:items-start">
      <h1 className="my-5 text-lg font-semibold text-gray-900">
        {" "}
        Make a reservation
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormItem
              label="First Name"
              border
              error={errors.firstName?.message}
            >
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

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field }) => (
            <FormItem label="Email" border error={errors.email?.message}>
              <Input {...field} placeholder="Email" type="email" />
            </FormItem>
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Required",
            pattern: {
              value:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
              message: "Please enter a valid phone number",
            },
          }}
          render={({ field }) => (
            <FormItem
              label="Phone number"
              border
              error={errors.phoneNumber?.message}
            >
              <Input {...field} placeholder="Phone number" type="tel" />
            </FormItem>
          )}
        />

        <FormItem label="Guests" border>
          <div className="text-xs">
            <div className="mb-2 flex w-64 content-center items-center justify-between gap-x-2">
              <div>Number of guests</div>
              <Input
                classNames="w-20"
                value={fields.length}
                onChange={(v) => onGuestChange(Number(v))}
                type="number"
                placeholder="Country"
              />
            </div>

            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="flex w-64 items-center justify-between gap-x-2"
              >
                <label>Guest {idx + 1} age</label>
                <Controller
                  name={`peopleAges.${idx}.age`}
                  control={control}
                  rules={{
                    required: "Required",
                    min: { value: 0, message: "Age must be 0 or more" },
                  }}
                  render={({ field }) => (
                    <Input
                      classNames="w-20"
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

        <Button
          disabled={Object.keys(errors).length > 0}
          type="submit"
          label="Submit Reservation"
          className="mx-auto my-4 block w-full rounded bg-accent-700 p-2 text-white disabled:bg-accent-100"
        />
      </form>
    </div>
  );
};
