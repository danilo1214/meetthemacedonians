import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const ReservationConfirmation = ({ link }: { link: string }) => {
  return (
    <div className="mx-5 my-16 flex flex-col gap-y-5 p-10">
      <div className="text-highlight-300 flex w-full justify-center">
        <CheckCircleIcon className="size-16" />
      </div>

      <div className="text-center text-xl">Complete your reservation</div>

      <Link
        href={link}
        target="_blank"
        className="bg-primary-500 px-8 py-2 text-center text-lg text-white shadow-xl hover:bg-primary-400"
      >
        Finish Reservation
      </Link>
    </div>
  );
};
