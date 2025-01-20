import {
  type Language,
  type Drink,
  type Profile,
  type FoodType,
  type Prisma,
  ProfileStatus,
} from "@prisma/client";
import { type Context } from "~/server/api/trpc";
import {
  profileIncludeOptions,
  type TPopulatedProfile,
} from "~/server/api/types";
import { db } from "~/server/db";

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
  maximumPeople,
  date,
}: {
  ctx: Context;
  search?: string;
  ageRange?: number[];
  maximumPeople: number;
  city: string;
  date: Date;
  guests: number;
}): Promise<TPopulatedProfile[]> => {
  const where: {
    AND: Prisma.ProfileWhereInput[];
    OR: Prisma.ProfileWhereInput[];
  } = {
    AND: [{ status: ProfileStatus.APPROVED }],
    OR: [],
  };

  if (ageRange) {
    const startAge = ageRange[0];
    const endAge = ageRange[1];
    if (!startAge || !endAge) {
      throw new Error("age range should be 2");
    }

    where.AND.push({
      dateOfBirth: {
        gte: new Date(
          date.getFullYear() - endAge,
          date.getMonth(),
          date.getDate(),
        ), // Min age
        lte: new Date(
          date.getFullYear() - startAge,
          date.getMonth(),
          date.getDate(),
        ), // Max age
      },
    });
  }

  if (search) {
    where.OR = [
      {
        familyName: {
          contains: search,
        },
      },
      {
        description: {
          contains: search,
        },
      },
      {
        title: {
          contains: search,
        },
      },
    ];
  }

  if (maximumPeople) {
    where.AND.push({
      maximumPeople: {
        gte: maximumPeople,
      },
    });
  }

  if (city) {
    where.AND.push({
      address: {
        city,
      },
    });
  }

  const profiles = await db.profile.findMany({
    where: {
      ...where,
    },
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

export const getDrinkTypes = (): Promise<Drink[]> => {
  return db.drink.findMany();
};

export const getLanguages = (): Promise<Language[]> => {
  return db.language.findMany();
};

export const getFoodTypes = (): Promise<FoodType[]> => {
  return db.foodType.findMany();
};
