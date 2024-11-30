import { type Profile } from "@prisma/client";
import { type Context } from "~/server/api/trpc";
import { db } from "~/server/db";

export const getProfile = (ctx: Context): Promise<Profile | null> => {
  return db.profile.findUnique({
    where: {
      createdById: ctx.session.user.id,
    },
  });
};
