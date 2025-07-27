import moment from "moment";
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

const RESERVATION_PRICE = 3.5;

export type TReservationForm = {
  email: string;
  phoneNumber: string;
  dateFrom: string;
  dateTo: string;
  hours: number;
  country: string;
  bags: number;
};

interface ReservationFormProps {
  profileId: number;
  onSuccess?: () => void;
}

export const ReservationForm = ({
  profileId,
  onSuccess,
}: ReservationFormProps) => {
  const { mutateAsync: createReservation, isPending } =
    api.reservation.createReservation.useMutation();

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TReservationForm>({
    defaultValues: {
      bags: 1,
    },
  });

  const onSubmit: SubmitHandler<TReservationForm> = async (data) => {
    console.log(data);
    try {
      await createReservation({
        ...data,
        profileId,
        bags: Number(bags),
        dateFrom: new Date(data.dateFrom),
        dateTo: moment(data.dateFrom).add(data.hours, "h").toDate(),
      });
      toast("Successfully made reservation");

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      toastError(err);
    }
  };

  const bags = watch("bags");
  const totalPrice = (bags ?? 1) * RESERVATION_PRICE;

  return (
    <div className="mx-lg flex flex-col border-t-2 border-t-gray-100 px-5 lg:items-center lg:px-12">
      <h1 className="mt-3 text-lg font-semibold text-gray-900 lg:my-5">
        {" "}
        Make a reservation
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="dateFrom"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormItem label="From" border error={errors.dateFrom?.message}>
              <Input
                {...field}
                type="datetime-local"
                placeholder="Reservation date"
              />
            </FormItem>
          )}
        />

        <Controller
          name="hours"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormItem label="Hours" border error={errors.hours?.message}>
              <Input {...field} type="number" placeholder="Hours" />
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

        <Controller
          name="bags"
          control={control}
          rules={{
            required: "Required",
          }}
          render={({ field }) => (
            <FormItem label="Bags" border error={errors.bags?.message}>
              <Input {...field} placeholder="Bags" type="number" />
            </FormItem>
          )}
        />

        <div className="my-10 border-t border-t-black py-10">
          <div className="">
            <span className="font-bold">{RESERVATION_PRICE} EUR</span>
          </div>
          <div>
            Total Price: <span className="font-bold">{totalPrice} EUR</span>{" "}
          </div>
        </div>

        <Button
          disabled={Object.keys(errors).length > 0 || isPending}
          type="submit"
          label={`Submit Reservation (${totalPrice} EUR)`}
          className="mx-auto my-4 block w-full rounded bg-primary-600 p-2 text-white disabled:bg-primary-200"
        />
      </form>
    </div>
  );
};
