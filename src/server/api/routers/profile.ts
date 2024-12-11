import { z } from "zod";
import {
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

export const profileRouter = createTRPCRouter({
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
