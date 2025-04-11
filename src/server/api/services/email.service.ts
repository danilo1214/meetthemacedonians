import { type Reservation } from "@prisma/client";
import mail from "@sendgrid/mail";
import moment from "moment";
import { env } from "~/env";
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
  let addressStr = "";

  const { address } = reservation.profile;
  if (address) {
    addressStr = `${address.street} - ${address.streetNumber}, ${address.city}, ${address.country}`;
  }

  const data = {
    firstName: reservation.firstName,
    lastName: reservation.lastName,
    date: moment(reservation.date).format("MMMM D, YYYY [at] h:mm A"),
    country: reservation.country,
    email: reservation.email,
    phoneNumber: reservation.phoneNumber,
    note: reservation.note,
    address: addressStr,
    people: reservation.people,
    currentYear: new Date().getFullYear(),
  };

  try {
    const msg = {
      to: reservation.email,
      from: RESERVATION_FROM,
      subject: mails[EMAIL_TEMPLATES.RESERVATION_CONFIRMATION].subject,
      templateId: EMAIL_TEMPLATES.RESERVATION_CONFIRMATION,
      dynamicTemplateData: data,
    };

    console.log("sending mail");
    console.log(JSON.stringify(msg));

    await mail.send(msg);
  } catch (err) {
    console.log(err);
  }
}
export async function sendReservationPayment(
  reservation: Reservation,
): Promise<void> {
  try {
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
  } catch (err) {
    console.log(err);
  }
}
