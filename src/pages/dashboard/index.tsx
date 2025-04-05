import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { toast } from "react-toastify";
import { ReservationRequest } from "~/components/reservation/ReservationRequest";
import { authConfig } from "~/server/auth/config";
import { helpers } from "~/server/helpers";
import { toastError } from "~/util";
import { api } from "~/utils/api";

export default function Dashboard() {
  const utils = api.useUtils();

  const { data: requests } = api.reservation.getReservationRequests.useQuery();
  const { data: reservations } = api.reservation.getReservations.useQuery();

  const { mutateAsync: acceptReservation } =
    api.reservation.acceptReservation.useMutation();
  const { mutateAsync: declineReservation } =
    api.reservation.declineReservation.useMutation();

  const handleAccept = async (reservationId: number) => {
    try {
      await acceptReservation(reservationId);
      await utils.reservation.invalidate();
      toast("Successfully accepted reservation");
    } catch (err) {
      toastError(err);
    }
  };

  const handleDecline = async (reservationId: number) => {
    try {
      await declineReservation(reservationId);
      await utils.reservation.invalidate();
      toast("Successfully declined reservation");
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <main className="p-4">
      {requests && requests.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Your requests</h2>
          <div className="mb-16 flex flex-col gap-y-10">
            {requests?.map((reservation) => (
              <ReservationRequest
                key={reservation.id}
                reservation={reservation}
                onAccept={() => handleAccept(reservation.id)}
                onDecline={() => handleDecline(reservation.id)}
                showActions
              />
            ))}
          </div>
        </>
      )}

      {reservations && reservations.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Your upcoming reservations</h2>
          <div className="flex flex-col gap-y-10">
            {reservations?.map((reservation) => (
              <ReservationRequest
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        </>
      )}
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
