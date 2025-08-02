import { ProfileStatus } from "@prisma/client";
import { useState } from "react";
import { Modal } from "~/components/generic/Modal";
import { type TPopulatedReservation } from "~/server/api/types";

interface ReservationRequestProps {
  reservation: TPopulatedReservation;
  onAccept?: () => void;
  onDecline?: () => void;
}

interface IModalState {
  isOpen: boolean;
  action?: "accept" | "decline";
}

export const ReservationRequest = ({
  reservation,
  onAccept,
  onDecline,
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
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium text-white ${"bg-secondary-500"}`}
        >
          {reservation.status}
        </span>
      </div>
      <div className="space-y-1 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-medium">📅 Date:</span>
          <span>{new Date(reservation.dateFrom).toISOString()}</span>
        </div>
      </div>
    </div>
  );
};
