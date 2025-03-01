import { type Prisma, type Reservation } from "@prisma/client";
import moment from "moment";
import { db } from "~/server/db";

export const getOverlappingReservation = (
  date: Date,
  profileId: number,
): Promise<Reservation | null> => {
  return db.reservation.findFirst({
    where: {
      profileId,
      date: {
        gte: moment(date).subtract(4, "hours").toDate(),
        lt: moment(date).add(4, "hours").toDate(),
      },
    },
  });
};

export const createReservation = async (
  input: Prisma.ReservationCreateArgs["data"],
): Promise<Reservation> => {
  const overlappingReservation = await getOverlappingReservation(
    new Date(input.date),
    input.profileId!,
  );

  if (overlappingReservation) {
    throw new Error("The reservation date is unavailable.");
  }

  return db.reservation.create({
    data: input,
  });
};
