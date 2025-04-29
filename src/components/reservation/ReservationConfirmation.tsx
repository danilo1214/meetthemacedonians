import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const ReservationConfirmation = () => {
  return (
    <div className="mx-5 my-16 flex flex-col gap-y-5 p-10">
      <div className="text-highlight-300 flex w-full justify-center">
        <CheckCircleIcon className="size-16" />
      </div>

      <div className="text-center text-xl">
        Successfully sent reservation request. You will recieve an email to
        complete your reservation when the host accepts your request.
      </div>
    </div>
  );
};
