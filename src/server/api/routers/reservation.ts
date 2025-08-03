import { ReservationStatus } from "@prisma/client";
import { z } from "zod";
import {
  createReservation,
  getUserReservations,
  getReservationById,
} from "~/server/api/services/reservation.service";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { generatePaymentForReservation } from "../services/payment.service";
import { reservationIncludeOptions } from "../types";

export const createReservationValidator = z.object({
  dateFrom: z.date(),
  dateTo: z.date(),
  email: z.string(),
  phoneNumber: z.string(),
  profileId: z.number(),
  bags: z.number(),
});

export const reservationRouter = createTRPCRouter({
  getReservationRequests: protectedProcedure.query(async ({ ctx }) => {
    return getUserReservations(ctx.session.user.id, ReservationStatus.PENDING);
  }),
  getReservations: protectedProcedure.query(async ({ ctx }) => {
    return getUserReservations(ctx.session.user.id, ReservationStatus.ACCEPTED);
  }),
  getReservationById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return getReservationById(input);
    }),
  createReservation: publicProcedure
    .input(createReservationValidator)
    .mutation(async ({ input }) => {
      const reservation = await createReservation({
        email: input.email,
        status: ReservationStatus.PENDING,
        phoneNumber: input.phoneNumber,
        dateFrom: input.dateFrom,
        dateTo: input.dateTo,
        profileId: input.profileId,
        bags: input.bags,
      });

      const paymentResponse = await generatePaymentForReservation(reservation);

      const paymentLink: string | undefined =
        paymentResponse?.data?.data?.attributes.url;

      if (!paymentLink) {
        throw new Error("Error generating payment form.");
      }

      return paymentLink;
    }),
});
