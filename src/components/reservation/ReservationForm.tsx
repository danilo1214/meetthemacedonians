import { ClockIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import { QuantitySelector } from "../generic/QuantitySelector";
import { FormItem } from "../generic/FormItem";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

const RESERVATION_PRICE = 3.5;

interface ReservationFormProps {
  profileId: number;
  onSuccess?: (link?: string) => void;
}

interface FormValues {
  dateFrom: string;
  hours: number;
  bags: number;
  email: string;
}

export const ReservationForm = ({
  profileId,
  onSuccess,
}: ReservationFormProps) => {
  const {
    control,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      dateFrom: "",
      hours: 1,
      bags: 1,
      email: "",
    },
  });

  const [step, setStep] = useState<1 | 2>(1);
  const { mutateAsync: reserve } =
    api.reservation.createReservation.useMutation();

  const bags = watch("bags");

  const totalPrice = (bags ?? 1) * RESERVATION_PRICE;

  const onSubmit = async (data: FormValues) => {
    try {
      const link = await reserve({
        profileId,
        dateFrom: new Date(data.dateFrom),
        dateTo: moment(data.dateFrom).add(data.hours, "hours").toDate(),
        bags: data.bags,
        email: data.email,
      });

      if (onSuccess) onSuccess(link);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleNext = async () => {
    const valid = await trigger(["dateFrom", "hours", "bags"]);
    if (valid) setStep(2);
  };

  return (
    <div className="mx-auto max-w-md rounded-md border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-xl font-semibold">
        Make a reservation
      </h2>

      {/* Step indicator */}
      <div className="mb-8 flex justify-center space-x-4">
        <StepCircle active={step === 1}>1</StepCircle>
        <StepCircle active={step === 2}>2</StepCircle>
      </div>

      {step === 1 && (
        <>
          <Controller
            name="dateFrom"
            control={control}
            rules={{
              required: "Please select a date/time",
              validate: (value) =>
                !isNaN(new Date(value).getTime()) || "Invalid date/time",
            }}
            render={({ field }) => (
              <FormItem
                label="Reservation Date & Time"
                error={errors.dateFrom?.message}
              >
                <input
                  {...field}
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  className={`w-full rounded border p-2 text-lg ${
                    errors.dateFrom ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-600`}
                />
              </FormItem>
            )}
          />

          <Controller
            name="hours"
            control={control}
            rules={{ required: true, min: 1 }}
            render={({ field }) => (
              <FormItem label="Hours" error={errors.hours?.message}>
                <QuantitySelector
                  label="Hours"
                  svg={
                    <ClockIcon
                      className="text-primary-500"
                      width={50}
                      height={50}
                    />
                  }
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <Controller
            name="bags"
            control={control}
            rules={{ required: true, min: 1, max: 10 }}
            render={({ field }) => (
              <FormItem label="Bags" error={errors.bags?.message}>
                <QuantitySelector
                  label="Bags"
                  svg={
                    <ShoppingBagIcon
                      className="text-primary-500"
                      width={50}
                      height={50}
                    />
                  }
                  value={field.value}
                  min={1}
                  max={10}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <div className="mt-6 text-lg font-semibold">
            Total Price:{" "}
            <span className="text-primary-600">
              {totalPrice.toFixed(2)} EUR
            </span>
          </div>

          <button
            onClick={handleNext}
            type="button"
            className={`mt-8 w-full rounded bg-primary-600 py-3 font-medium text-white ${
              errors.dateFrom ? "opacity-50" : ""
            }`}
            disabled={errors.dateFrom !== undefined}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            }}
            render={({ field }) => (
              <FormItem label="Email" error={errors.email?.message}>
                <input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full rounded border p-2 text-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-600`}
                />
              </FormItem>
            )}
          />

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              type="button"
              className="rounded border border-gray-300 px-6 py-2 font-medium hover:bg-gray-100"
            >
              Back
            </button>

            <button
              type="submit"
              className="rounded bg-primary-600 px-6 py-2 font-medium text-white"
            >
              Submit Reservation ({totalPrice.toFixed(2)} EUR)
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const StepCircle = ({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
      active
        ? "border-primary-600 bg-primary-600 text-white"
        : "border-gray-300 text-gray-400"
    } font-semibold`}
  >
    {children}
  </div>
);
