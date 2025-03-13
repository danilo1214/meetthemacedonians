import { ProfileStatus } from "@prisma/client";
import { z } from "zod";
import {
  acceptReservation,
  createReservation,
  declineReservation,
  getUserReservations,
} from "~/server/api/services/reservation.service";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const createReservationValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  note: z.string(),
  date: z.date(),
  country: z.string(),
  profileId: z.number(),
  peopleAges: z.array(z.number()),
});

export const reservationRouter = createTRPCRouter({
  declineReservation: protectedProcedure
    .input(z.number())
    .mutation(async ({ input: id, ctx }) => {
      return declineReservation(id, ctx.session.user.id);
    }),
  acceptReservation: protectedProcedure
    .input(z.number())
    .mutation(async ({ input: id, ctx }) => {
      return acceptReservation(id, ctx.session.user.id);
    }),
  getReservationRequests: protectedProcedure.query(async ({ ctx }) => {
    return getUserReservations(ctx.session.user.id, ProfileStatus.PENDING);
  }),
  getApprovedReservations: protectedProcedure.query(async ({ ctx }) => {
    return getUserReservations(ctx.session.user.id, ProfileStatus.APPROVED);
  }),
  createReservation: protectedProcedure
    .input(createReservationValidator)
    .mutation(async ({ input }) => {
      return createReservation({
        firstName: input.firstName,
        lastName: input.lastName,
        note: input.note,
        country: input.country,
        date: input.date,
        profileId: input.profileId,
        people: {
          create: input.peopleAges.map((age) => ({ age })),
        },
      });
    }),
});
