import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { toast } from "react-toastify";
import { ReservationRequest } from "~/components/reservation/ReservationRequest";
import { authConfig } from "~/server/auth/config";
import { helpers } from "~/server/helpers";
import { toastError } from "~/util";
import { api } from "~/utils/api";

export default function Dashboard() {
  const { data: reservations } =
    api.reservation.getReservationRequests.useQuery();
  const { mutateAsync: acceptReservation } =
    api.reservation.acceptReservation.useMutation();
  const { mutateAsync: declineReservation } =
    api.reservation.declineReservation.useMutation();

  const handleAccept = async (reservationId: number) => {
    try {
      await acceptReservation(reservationId);
      toast("Successfully accepted reservation");
    } catch (err) {
      toastError(err);
    }
  };

  const handleDecline = async (reservationId: number) => {
    try {
      await declineReservation(reservationId);
      toast("Successfully declined reservation");
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <main>
      <div className="flex flex-col gap-y-10">
        {reservations?.map((reservation) => (
          <ReservationRequest
            key={reservation.id}
            reservation={reservation}
            onAccept={() => handleAccept(reservation.id)}
            onDecline={() => handleDecline(reservation.id)}
          />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authConfig);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
