import { getImageProps } from "next/image";
import { toast } from "react-toastify";
import { type CheckboxSelectItem } from "~/components/generic/MultiCheckboxSelect";

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

export const toastError = (err: unknown) => {
  if (err instanceof Error) {
    toast(err.message, { type: "error" });
  }
};
