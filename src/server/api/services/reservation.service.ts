import { type ReservationStatus, type Prisma } from "@prisma/client";
import {
  reservationIncludeOptions,
  type TPopulatedReservation,
} from "~/server/api/types";
import { db } from "~/server/db";

export const getUserReservations = async (
  userId: string,
  status?: ReservationStatus,
): Promise<TPopulatedReservation[]> => {
  return await db.reservation.findMany({
    where: {
      profile: {
        createdById: userId,
      },
      status,
    },
    ...reservationIncludeOptions,
  });
};

export const createReservation = async (
  data: Prisma.ReservationCreateArgs["data"],
): Promise<TPopulatedReservation> => {
  return db.reservation.create({
    data,
    ...reservationIncludeOptions,
  });
};
