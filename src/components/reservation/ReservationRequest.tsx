import { type Reservation, ProfileStatus } from "@prisma/client";

interface ReservationRequestProps {
  reservation: Reservation;
  onAccept: () => void;
  onDecline: () => void;
}

export const ReservationRequest = ({
  reservation,
  onAccept,
  onDecline,
}: ReservationRequestProps) => {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {reservation.firstName} {reservation.lastName}
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium text-white ${
            reservation.status === ProfileStatus.APPROVED
              ? "bg-green-500"
              : reservation.status === ProfileStatus.REJECTED
                ? "bg-red-500"
                : "bg-yellow-500"
          }`}
        >
          {reservation.status}
        </span>
      </div>
      <div className="space-y-3 text-gray-700">
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
          <div className="border-t pt-2 text-sm italic text-gray-600">
            "{reservation.note}"
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => onDecline()}
          >
            Decline
          </button>
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => onAccept()}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
