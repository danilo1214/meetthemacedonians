import { ProfileStatus, type Profile } from "@prisma/client";

import { z } from "zod";
import {
  createProfile,
  getProfile,
  getProfileById,
  getProfiles,
} from "~/server/api/services/profile.service";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const getProfileByIdValidator = z.number();

export const createProfileValidator = z.object({
  photoUrl: z.string(),
  title: z.string(),
  lat: z.number(),
  lng: z.number(),
  address: z.string(),
});

export const fetchProfilesValidator = z.object({
  search: z.string().optional(),
  city: z.string().optional(),
  date: z.coerce
    .date()
    .refine((data) => data > new Date(), {
      message: "Start date must be in the future",
    })
    .optional(),
  guests: z.number().optional(),
  ageRange: z.array(z.number()).length(2).optional(),
});

export const updateProfileValidator = z.object({
  id: z.number(),
  data: z.object({
    photoUrl: z.string().optional(),
    title: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().optional()
  }),
});

export const profileRouter = createTRPCRouter({
  fetchProfiles: publicProcedure
    .input(fetchProfilesValidator)
    .query(async ({ ctx, input }) => {
      return getProfiles({
        ageRange: input.ageRange,
        date: input.date,
        city: input.city,
        search: input.search,
        guests: input.guests,
      });
    }),
  createProfile: protectedProcedure
    .input(createProfileValidator)
    .mutation(async ({ ctx, input }): Promise<Profile> => {
      return createProfile(ctx, {
        ...input,
        createdById: ctx.session.user.id,
        status: ProfileStatus.PENDING,
        
      });
    }),
  updateProfile: protectedProcedure
    .input(updateProfileValidator)
    .mutation(async ({ ctx, input }): Promise<void> => {
      const { id, data } = input;

      // Fetch the current profile with relations
      const existingProfile = await ctx.db.profile.findUnique({
        where: { id },
      });

      if (!existingProfile) {
        throw new Error("Profile not found");
      }

    

      await ctx.db.profile.update({
        where: { id },
        data: {
          ...data,
        },
      });
    }),

  getProfileById: publicProcedure
    .input(getProfileByIdValidator)
    .query(async ({ input }) => {
      return getProfileById(input);
    }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const profile = await getProfile(ctx);
    return profile ?? null;
  }),

  getProfiles: publicProcedure.query(async () => {
    return getProfiles({})
  })
 
});
