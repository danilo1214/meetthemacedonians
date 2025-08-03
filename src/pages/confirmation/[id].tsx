import { useRouter } from "next/router";
import { ReservationConfirmed } from "~/components/reservation/ReservationConfirmed";
import { api } from "~/utils/api";

export default function ReservationConfirmation() {
  const router = useRouter();
  const reservationId = Number(router.query.id);

  const { data: reservation } =
    api.reservation.getReservationById.useQuery(reservationId);

  if (!reservation) {
    return <div>Not found</div>;
  }

  return <ReservationConfirmed reservation={reservation} />;
}
