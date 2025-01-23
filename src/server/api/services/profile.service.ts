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
  date,
  guests,
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
    AND: [{ status: ProfileStatus.APPROVED }],
  };

  if (ageRange) {
    const startAge = ageRange[0];
    const endAge = ageRange[1];
    if (!startAge || !endAge) {
      throw new Error("age range should be 2");
    }

    const today = new Date();

    where.AND.push({
      dateOfBirth: {
        gte: new Date(
          today.getFullYear() - endAge,
          today.getMonth(),
          today.getDate(),
        ), // Min age
        lte: new Date(
          today.getFullYear() - startAge,
          today.getMonth(),
          today.getDate(),
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

  if (guests) {
    where.AND.push({
      maximumPeople: {
        gte: guests,
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

  console.log(where.AND, "WHERRRR");

  const profiles = await db.profile.findMany({
    where: where ?? undefined,
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
