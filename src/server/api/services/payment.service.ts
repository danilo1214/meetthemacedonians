import { type Reservation } from "@prisma/client";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env";
import { type TPopulatedReservation } from "~/server/api/types";

export const lemonSqueezyApi = axios.create({
  baseURL: "https://api.lemonsqueezy.com/v1/",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
  },
});

interface ILemonSqeuezyCheckoutResponse {
  data: {
    attributes: {
      url: string;
    };
  };
}

export const generatePaymentForReservation = async (
  reservation: TPopulatedReservation,
): Promise<AxiosResponse<ILemonSqeuezyCheckoutResponse>> => {
  try {
    console.log(reservation.id);
    const res = await lemonSqueezyApi.post<ILemonSqeuezyCheckoutResponse>(
      "/checkouts",
      {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                reservation_id: reservation.id.toString(),
              },
              variant_quantities: [
                {
                  variant_id: env.LEMONSQUEEZY_PRODUCT_ID,
                  quantity: reservation.bags,
                },
              ],
            },
            product_options: {
              redirect_url: "https://form-assist.com",
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: env.LEMONSQUEEZY_STORE_ID,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: env.LEMONSQUEEZY_PRODUCT_ID,
              },
            },
          },
        },
      },
    );

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
