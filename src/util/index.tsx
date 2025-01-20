import {
  type Address,
  type Drink,
  type FoodType,
  type Language,
} from "@prisma/client";
import { getImageProps } from "next/image";
import { toast } from "react-toastify";
import { type CheckboxSelectItem } from "~/components/generic/MultiCheckboxSelect";

export const formatAddress = (address: Address) => {
  return `${address.streetNumber} ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`;
};

export const getBackgroundImageStyle = ({
  width,
  height,
  src,
}: {
  width: number;
  height: number;
  src: string;
}): { backgroundImage: string } => {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    width,
    height,
    src,
  });

  if (!srcSet) {
    return { backgroundImage: "" };
  }

  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  const backgroundImage = `image-set(${imageSet})`;

  return { backgroundImage };
};

export const getSelectItemsFromProfileSelectableData = (
  arr: Language[] | FoodType[] | Drink[],
): CheckboxSelectItem<object>[] => {
  return arr.map((i) => ({ label: i.mkName, value: i }));
};

export const toastError = (err: unknown) => {
  if (err instanceof Error) {
    toast(err.message, { type: "error" });
  }
};
