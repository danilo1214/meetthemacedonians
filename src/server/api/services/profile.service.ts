import { type Profile, type Prisma, ProfileStatus } from "@prisma/client";
import { type Context } from "~/server/api/trpc";
import {
  profileIncludeOptions,
  type TPopulatedProfile,
} from "~/server/api/types";
import { db } from "~/server/db";

export const getProfileById = (
  id: number,
): Promise<TPopulatedProfile | null> => {
  return db.profile.findUnique({
    where: {
      id,
    },
    ...profileIncludeOptions,
  });
};

export const getProfile = (ctx: Context): Promise<TPopulatedProfile | null> => {
  return db.profile.findUnique({
    where: {
      createdById: ctx.session.user.id,
    },
    ...profileIncludeOptions,
  });
};

export const getProfiles = async (): Promise<TPopulatedProfile[]> => {
  const profiles = await db.profile.findMany({
    ...profileIncludeOptions,
  });

  return profiles ?? [];
};

export const updateProfile = async (
  ctx: Context,
  id: number,
  input: Prisma.ProfileUpdateArgs["data"],
): Promise<void> => {
  await db.profile.update({
    where: {
      id,
    },
    data: input,
  });
};

export const createProfile = (
  ctx: Context,
  input: Prisma.ProfileCreateArgs["data"],
): Promise<Profile> => {
  return db.profile.create({
    data: input,
  });
};
