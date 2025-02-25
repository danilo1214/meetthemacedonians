import { type Prisma, type Reservation } from "@prisma/client";
import { db } from "~/server/db";

export const createReservation = (
  input: Prisma.ReservationCreateArgs["data"],
): Promise<Reservation> => {
  return db.reservation.create({
    data: input,
  });
};
