import { ProfileStatus } from "@prisma/client";
import { useState } from "react";
import { Modal } from "~/components/generic/Modal";
import { type TPopulatedReservation } from "~/server/api/types";

interface ReservationRequestProps {
  reservation: TPopulatedReservation;
  onAccept?: () => void;
  onDecline?: () => void;
  showActions?: boolean;
}

interface IModalState {
  isOpen: boolean;
  action?: "accept" | "decline";
}

export const ReservationRequest = ({
  reservation,
  onAccept,
  onDecline,
  showActions = false,
}: ReservationRequestProps) => {
  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
  });

  const getModalTitle = (action: string) => {
    return action === "accept" ? "Accept Reservation" : "Decline Reservation";
  };

  const getModalDescription = (action: string) => {
    return action === "accept"
      ? "Are you sure you want to accept the reservation?"
      : "Are you sure you want to decline the reservation?";
  };

  const onModelConfirm = () => {
    const { action } = modalState;

    if (!action) {
      return;
    }

    if (action === "accept" && onAccept) {
      onAccept();
    }

    if (action === "decline" && onDecline) {
      onDecline();
    }
  };

  const handleClose = () => {
    setModalState({ isOpen: false });
  };

  return (
    <div className="my-10 max-w-lg rounded-2xl bg-white">
      {modalState.action && (
        <Modal
          open={modalState.isOpen}
          onConfirm={onModelConfirm}
          onClose={handleClose}
          title={getModalTitle(modalState.action)}
          description={getModalDescription(modalState.action)}
        />
      )}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-md font-semibold">
          {reservation.firstName} {reservation.lastName}
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium text-white ${
            reservation.status === ProfileStatus.APPROVED
              ? "bg-secondary-500"
              : "bg-accent-500"
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
          <div className="mt-1 flex justify-end gap-2">
            <button
              className="rounded-lg border border-neutral-500 px-4 py-2 text-neutral-500 hover:bg-gray-50"
              onClick={() => {
                setModalState({ isOpen: true, action: "decline" });
              }}
            >
              Decline
            </button>
            <button
              className="rounded-lg bg-secondary-500 px-4 py-2 text-white hover:bg-secondary-600"
              onClick={() => {
                setModalState({ isOpen: true, action: "accept" });
              }}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
