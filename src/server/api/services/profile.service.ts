import {
  type Profile,
  type Prisma,
  ProfileStatus,
} from "@prisma/client";
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

export const getProfiles = async ({
  search,
  ageRange,
  city,
}: {
  search?: string;
  ageRange?: number[];
  city?: string;
  date?: Date;
  guests?: number;
}): Promise<TPopulatedProfile[]> => {
  const where: {
    AND: Prisma.ProfileWhereInput[];
    OR?: Prisma.ProfileWhereInput[];
  } = {
  };

  if (ageRange) {
    const startAge = ageRange[0];
    const endAge = ageRange[1];
    if (!startAge || !endAge) {
      throw new Error("age range should be 2");
    }

   
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
        },
      },
    ];
  }


  if (city) {
    where.AND.push({
    });
  }


  const profiles = await db.profile.findMany({
    where: where ?? undefined,
    ...profileIncludeOptions,
  });

  console.log(profiles)

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


