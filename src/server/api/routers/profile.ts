import { type Profile } from "@prisma/client";

import { z } from "zod";
import {
  createProfile,
  getDrinkTypes,
  getFoodTypes,
  getLanguages,
  getProfile,
} from "~/server/api/services/profile.service";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const createProfileValue = z.object({
  familyName: z.string(),
  dateOfBirth: z.string().date(),
  photoUrl: z.string(),
  title: z.string(),
  neighbourhood: z.string(),
  description: z.string(),
  maximumPeople: z.number().min(0).max(6),
  isSmoking: z.boolean(),
  profileLanguages: z.array(
    z.object({
      id: z.number(), // Referencing existing Language IDs
    }),
  ),
  profileDrinks: z.array(
    z.object({
      id: z.number(), // Referencing existing Drink IDs
    }),
  ),
  profileFoodTypes: z.array(
    z.object({
      id: z.number(), // Referencing existing FoodType IDs
    }),
  ),
});

export const profileRouter = createTRPCRouter({
  createProfile: protectedProcedure
    .input(createProfileValue)
    .mutation(async ({ ctx, input }): Promise<Profile> => {
      return createProfile(ctx, {
        ...input,
        createdById: ctx.session.user.id,
        profileLanguages: {
          create: input.profileLanguages.map((lang) => ({
            language: { connect: { id: lang.id } },
          })),
        },
        profileDrinks: {
          create: input.profileDrinks.map((drink) => ({
            drink: { connect: { id: drink.id } },
          })),
        },
        profileFoodTypes: {
          create: input.profileFoodTypes.map((food) => ({
            foodType: { connect: { id: food.id } },
          })),
        },
      });
    }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const profile = await getProfile(ctx);
    return profile ?? null;
  }),
  getDrinkTypes: publicProcedure.query(async () => {
    return await getDrinkTypes();
  }),
  getLanguages: publicProcedure.query(async () => {
    return await getLanguages();
  }),
  getFoodTypes: publicProcedure.query(async () => {
    return await getFoodTypes();
  }),
});
