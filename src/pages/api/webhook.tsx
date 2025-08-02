/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextApiRequest, type NextApiResponse } from "next";
import crypto from "crypto";
import { db } from "~/server/db";
import { ReservationStatus } from "@prisma/client";
import { reservationIncludeOptions } from "~/server/api/types";
import { sendReservationComplete } from "~/server/api/services/email.service";

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

interface ILemonSqueezyWebhook {
  meta: {
    event_name: string;
    custom_data: {
      reservation_id: string;
    };
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("stigam");
  try {
    if (req.method !== "POST") {
      return res.status(405);
    }

    console.log("test");

    const b: Buffer = await buffer(req);

    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SIGNATURE!;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(b.toString()).digest("hex"),
      "utf8",
    ).toString();
    const signature = req.headers["x-signature"];

    if (signature !== digest) {
      res.status(401).end();
      return;
    }

    const event: ILemonSqueezyWebhook = JSON.parse(
      b.toString(),
    ) as ILemonSqueezyWebhook;

    switch (event.meta.event_name) {
      case "order_created":
        const reservationId = Number(event.meta.custom_data.reservation_id);

        const updatedRes = await db.reservation.update({
          where: {
            id: reservationId,
          },
          data: {
            status: ReservationStatus.ACCEPTED,
          },
          ...reservationIncludeOptions,
        });

        void sendReservationComplete(updatedRes);

        res.status(200).end();
        return;
        break;
    }

    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
}

export const config = { api: { bodyParser: false } };
