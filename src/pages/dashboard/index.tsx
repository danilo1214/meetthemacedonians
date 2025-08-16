import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { toast } from "react-toastify";
import SuperJSON from "superjson";
import { ReservationRequest } from "~/components/reservation/ReservationRequest";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { authConfig } from "~/server/auth/config";
import { api } from "~/utils/api";

export default function Dashboard() {
  const { data: requests } = api.reservation.getReservationRequests.useQuery();
  const { data: reservations } = api.reservation.getReservations.useQuery();

  return (
    <main className="p-4">
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
