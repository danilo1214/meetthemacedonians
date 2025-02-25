import { z } from "zod";
import { createReservation } from "~/server/api/services/reservation.service";
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
  createReservation: protectedProcedure
    .input(createReservationValidator)
    .mutation(async ({ input }) => {
      return createReservation({
        ...input,
        people: {
          create: input.peopleAges.map((age) => ({ age })),
        },
      });
    }),
});
