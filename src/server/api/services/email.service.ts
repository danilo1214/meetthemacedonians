import { type Reservation } from "@prisma/client";
import mail from "@sendgrid/mail";
import moment from "moment";
import { env } from "~/env";
import QRCode from "qrcode";
import { put } from "@vercel/blob"; // for direct server-side uploads

import { type TPopulatedReservation } from "~/server/api/types";

const RESERVATION_FROM = "help@meetthemacedonians.com";

enum EMAIL_TEMPLATES {
  RESERVATION_PAYMENT = "d-2fdc466ea15f45bca698bbb648509ef6",
  RESERVATION_CONFIRMATION = "d-cbca81c7539442879d15488938783168",
}

interface IMail {
  subject: string;
}

const mails: Record<EMAIL_TEMPLATES, IMail> = {
  [EMAIL_TEMPLATES.RESERVATION_PAYMENT]: {
    subject: "Complete your reservation",
  },
  [EMAIL_TEMPLATES.RESERVATION_CONFIRMATION]: {
    subject: "Reservation confirmation",
  },
};

mail.setApiKey(env.SENDGRID_API_KEY);

export async function sendReservationComplete(
  reservation: TPopulatedReservation,
): Promise<void> {
  const { id, dateFrom, dateTo, profile, bags } = reservation;

  // 1️⃣ Generate QR code as base64 URL
  const qrCodeBase64 = await QRCode.toDataURL(
    `https://meetthemacedonians.com/confirmation/${id}`,
  );

  const base64Data = qrCodeBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  // Upload to Vercel Blob Storage
  const blob = await put(`qrcodes/reservation-${reservation.id}.png`, buffer, {
    access: "public", // make it public so email clients can load it
    contentType: "image/png",
  });

  // 2️⃣ Generate Static Map URL
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${profile.lat},${profile.lng}&zoom=16&size=600x300&markers=color:red%7C${profile.lat},${profile.lng}&key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  try {
    const msg = {
      to: reservation.email,
      from: RESERVATION_FROM,
      subject: mails[EMAIL_TEMPLATES.RESERVATION_CONFIRMATION].subject,
      templateId: EMAIL_TEMPLATES.RESERVATION_CONFIRMATION,
      dynamicTemplateData: {
        dateFrom: new Date(dateFrom).toLocaleDateString(),
        dateTo: new Date(dateTo).toLocaleDateString(),
        address: profile.address,
        bags,
        reservationId: id,
        qrCodeUrl: blob.url,
        lat: profile.lat,
        lng: profile.lng,
        mapUrl,
      },
    };

    console.log("sending mail");
    console.log(JSON.stringify(msg));

    await mail.send(msg);
  } catch (err) {
    console.log(err);
  }
}
