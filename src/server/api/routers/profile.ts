import { z } from "zod";
import { getProfile } from "~/server/api/services/profile.service";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const profile = await getProfile(ctx);
    return profile ?? null;
  }),
});
