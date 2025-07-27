import { ReservationStatus } from "@prisma/client";
import { z } from "zod";
import {
  createReservation,
  getUserReservations,
} from "~/server/api/services/reservation.service";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const createReservationValidator = z.object({
  dateFrom: z.date(),
  dateTo: z.date(),
  email: z.string(),
  phoneNumber: z.string(),
  profileId: z.number(),
  bags: z.number()
});

export const reservationRouter = createTRPCRouter({
  getReservationRequests: protectedProcedure.query(async ({ ctx }) => {
    return getUserReservations(ctx.session.user.id, ReservationStatus.PENDING);
  }),
  getReservations: protectedProcedure.query(async ({ ctx }) => {
    return getUserReservations(ctx.session.user.id, ReservationStatus.ACCEPTED);
  }),
  createReservation: publicProcedure
    .input(createReservationValidator)
    .mutation(async ({ input }) => {
      return createReservation({
        email: input.email,
        status: ReservationStatus.ACCEPTED,
        phoneNumber: input.phoneNumber,
        dateFrom: input.dateFrom,
        dateTo: input.dateTo,
        profileId: input.profileId,
        bags: input.bags,
      });
    }),
});
