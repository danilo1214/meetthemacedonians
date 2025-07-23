import { type Prisma } from "@prisma/client";

export const profileIncludeOptions = {
  include: {
  },
};

export const reservationIncludeOptions = {
  include: {
    people: true,
    profile: profileIncludeOptions,
  },
};

export type TPopulatedProfile = Prisma.ProfileGetPayload<
  typeof profileIncludeOptions
>;

export type TPopulatedReservation = Prisma.ReservationGetPayload<
  typeof reservationIncludeOptions
>;
