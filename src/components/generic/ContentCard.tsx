// components/ContentCard.tsx
import Image from "next/image";

export interface ContentCardProps {
  title: string;
  content: string;
  image: string;
}

export const ContentCard = ({ title, content, image }: ContentCardProps) => {
  return (
    <div className="max-w-sm overflow-hidden rounded-2xl bg-white">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="space-y-2 py-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};
