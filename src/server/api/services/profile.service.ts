import {
  type Language,
  type Drink,
  type Profile,
  type FoodType,
  type Prisma,
  type ProfileLangugage,
  type ProfileFoodType,
  type ProfileDrink,
} from "@prisma/client";
import type * as zod from "zod";
import { type Context } from "~/server/api/trpc";
import { db } from "~/server/db";

const profileIncludeOptions = {
  include: {
    profileDrinks: {
      include: {
        drink: true,
      },
    },
    profileFoodTypes: {
      include: {
        foodType: true,
      },
    },
    profileLanguages: {
      include: {
        language: true,
      },
    },
  },
};

export const getProfile = (
  ctx: Context,
): Promise<Prisma.ProfileGetPayload<typeof profileIncludeOptions> | null> => {
  return db.profile.findUnique({
    where: {
      createdById: ctx.session.user.id,
    },
    ...profileIncludeOptions,
  });
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
