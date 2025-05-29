import {
  ContentCard,
  type ContentCardProps,
} from "~/components/generic/ContentCard";

interface ContentCardContainerProps {
  cards: ContentCardProps[];
}

export const ContentCardContainer = ({ cards }: ContentCardContainerProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-6">
      {cards.map((card, idx) => (
        <ContentCard key={idx} {...card} />
      ))}
    </div>
  );
};
