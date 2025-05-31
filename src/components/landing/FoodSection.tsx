import { type ContentCardProps } from "~/components/generic/ContentCard";
import { ContentCardContainer } from "~/components/generic/ContentCardContainer";

const cards: ContentCardProps[] = [
  {
    title: "Ajvar",
    content:
      "A rich roasted red pepper spread, often homemade and enjoyed with bread or meats.",
    image: "/ajvar.jpg",
  },

  {
    title: "Sarma",
    content:
      "Cabbage rolls stuffed with minced meat and rice, slow-cooked in a tomato-based sauce.",
    image: "/sarma.jpg",
  },
  {
    title: "Burek",
    content:
      "Flaky, savory pastry filled with meat, cheese, or spinach. A beloved street food perfect for breakfast or a quick bite.",
    image: "/burek.jpg",
  },
  {
    title: "Shopska Salad",
    content:
      "A fresh salad of tomatoes, cucumbers, onions, and white cheese. A light and crisp dish popular across the Balkans.",
    image: "/shopska.jpg",
  },
  {
    title: "Pastrmajlija",
    content:
      "A Macedonian-style flatbread topped with diced salted meat and eggs. Known as 'Macedonian pizza' with a unique twist.",
    image: "/pastrmajlija.jpg",
  },
  {
    title: "Stuffed Peppers",
    content:
      "Bell peppers filled with seasoned ground meat and rice, simmered in a savory tomato sauce.",
    image: "/stuffed-pepper.jpg",
  },
];

export const FoodSection = () => {
  return (
    <div className="mb-10 mt-5 px-6 lg:px-20">
      <h2 className="mb-6 text-xl font-bold text-primary-600 md:text-3xl">
        What is Macedonia&apos;s food like?
      </h2>{" "}
      <ContentCardContainer cards={cards} />
    </div>
  );
};
