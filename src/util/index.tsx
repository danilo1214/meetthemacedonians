import { type Drink, type FoodType, type Language } from "@prisma/client";
import { getImageProps } from "next/image";
import { type FieldErrors } from "react-hook-form";
import { type CheckboxSelectItem } from "~/components/generic/MultiCheckboxSelect";
import { type Inputs } from "~/components/profile/ProfileSetupForm";

export const getBackgroundImageStyle = ({
  alt,
  width,
  height,
  src,
}: {
  alt: string;
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
