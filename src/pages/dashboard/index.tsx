import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { toast } from "react-toastify";
import SuperJSON from "superjson";
import { ReservationRequest } from "~/components/reservation/ReservationRequest";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
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
      console.log("mmm what?");
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
      {requests?.length === 0 && reservations?.length === 0 && (
        <h2 className="text-2xl font-semibold">
          Во моментов немате предстоечки резервации
        </h2>
      )}

      {requests && requests.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold">Your requests</h2>
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
          <h2 className="text-2xl font-semibold">Your upcoming reservations</h2>
          <div className="flex flex-col">
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

  if (!session) {
    return {
      redirect: {
        destination: "/get-started",
        permanent: false,
      },
    };
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: SuperJSON,
  });

  await Promise.all([
    helpers.reservation.getReservationRequests.fetch(undefined, {}),
    helpers.reservation.getReservations.fetch(undefined, {}),
  ]);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
