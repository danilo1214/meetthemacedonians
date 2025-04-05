import { type Reservation } from "@prisma/client";
import mail from "@sendgrid/mail";
import { env } from "~/env";

const RESERVATION_FROM = "";

enum EMAIL_TEMPLATES {
  RESERVATION_PAYMENT = "d-2fdc466ea15f45bca698bbb648509ef6",
}

interface IMail {
  subject: string;
}

const mails: Record<EMAIL_TEMPLATES, IMail> = {
  [EMAIL_TEMPLATES.RESERVATION_PAYMENT]: {
    subject: "Complete your reservation",
  },
};

mail.setApiKey(env.SENDGRID_API_KEY);

export async function sendReservationPayment(
  reservation: Reservation,
): Promise<void> {
  const msg = {
    to: reservation.email,
    from: RESERVATION_FROM,
    subject: mails[EMAIL_TEMPLATES.RESERVATION_PAYMENT].subject,
    templateId: EMAIL_TEMPLATES.RESERVATION_PAYMENT,
    dynamicTemplateData: {
      payment_link: reservation.paymentLink,
    },
  };

  await mail.send(msg);
}
