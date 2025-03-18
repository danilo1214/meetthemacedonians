import { ProfileStatus } from "@prisma/client";
import { type TPopulatedReservation } from "~/server/api/types";

interface ReservationRequestProps {
  reservation: TPopulatedReservation;
  onAccept?: () => void;
  onDecline?: () => void;
  showActions?: boolean;
}

export const ReservationRequest = ({
  reservation,
  onAccept,
  onDecline,
  showActions = false,
}: ReservationRequestProps) => {
  return (
    <div className="my-10 max-w-lg rounded-2xl bg-white">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-md font-semibold">
          {reservation.firstName} {reservation.lastName}
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium text-white ${
            reservation.status === ProfileStatus.APPROVED
              ? "bg-secondary-500"
              : "bg-neutral-500"
          }`}
        >
          {reservation.status}
        </span>
      </div>
      <div className="space-y-1 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-medium">📅 Date:</span>
          <span>{new Date(reservation.date).toISOString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">🌍 Country:</span>
          <span>{reservation.country}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">👥 People:</span>
          <span>{reservation.people.length}</span>
        </div>
        {reservation.note && (
          <div className="border-t pt-1 text-xs italic text-gray-600">
            {reservation.note}
          </div>
        )}
        {showActions && (
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="rounded-lg border border-primary-500 px-4 py-2 text-primary-500 hover:bg-gray-50"
              onClick={onDecline}
            >
              Decline
            </button>
            <button
              className="rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
              onClick={onAccept}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
