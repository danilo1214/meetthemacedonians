import { ProfileStatus, type Prisma, type Reservation } from "@prisma/client";
import moment from "moment";
import { db } from "~/server/db";

export const getOverlappingReservation = (
  date: Date,
  profileId: number,
): Promise<Reservation | null> => {
  return db.reservation.findFirst({
    where: {
      profileId,
      date: {
        gte: moment(date).subtract(4, "hours").toDate(),
        lt: moment(date).add(4, "hours").toDate(),
      },
    },
  });
};

const validateReservation = async (
  id: number,
  userId: string,
): Promise<void> => {
  const existingProfile = await db.profile.findUnique({
    where: { createdById: userId },
  });
  if (!existingProfile) {
    throw new Error("Profile not found");
  }

  const profileReservation = await db.reservation.findUnique({
    where: {
      id,
      profile: {
        id: existingProfile?.id,
      },
    },
  });

  if (!profileReservation) {
    throw new Error("You do not have access to that reservation.");
  }
};

export const getUserReservations = async (
  userId: string,
  status?: ProfileStatus,
): Promise<Reservation[]> => {
  return await db.reservation.findMany({
    where: {
      profile: {
        createdById: userId,
      },
      status,
    },
    include: {
      profile: true, // Include profile details if needed
      people: true, // Include reservation people details
    },
  });
};

export const acceptReservation = async (id: number, userId: string) => {
  await validateReservation(id, userId);

  return db.reservation.update({
    where: {
      id,
    },
    data: {
      status: ProfileStatus.APPROVED,
    },
  });
};

export const declineReservation = async (id: number, userId: string) => {
  await validateReservation(id, userId);

  return db.reservation.update({
    where: {
      id,
    },
    data: {
      status: ProfileStatus.REJECTED,
    },
  });
};

export const createReservation = async (
  input: Prisma.ReservationCreateArgs["data"],
): Promise<Reservation> => {
  const overlappingReservation = await getOverlappingReservation(
    new Date(input.date),
    input.profileId!,
  );

  if (overlappingReservation) {
    throw new Error("The reservation date is unavailable.");
  }

  return db.reservation.create({
    data: input,
  });
};
