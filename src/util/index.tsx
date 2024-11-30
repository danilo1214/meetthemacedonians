import { getImageProps } from "next/image";

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
