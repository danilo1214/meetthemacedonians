import {
  type Language,
  type Drink,
  type Profile,
  type FoodType,
  type Prisma,
} from "@prisma/client";
import type * as zod from "zod";
import { type Context } from "~/server/api/trpc";
import { db } from "~/server/db";

export const getProfile = (ctx: Context): Promise<Profile | null> => {
  return db.profile.findUnique({
    where: {
      createdById: ctx.session.user.id,
    },
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
