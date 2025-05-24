"use client";

import Link from "next/link";
import { getBackgroundImageStyle } from "~/util";

export const Hero = () => {
  const imageStyle = getBackgroundImageStyle({
    width: 1600,
    height: 800,
    src: "/food.jpg",
  });

  return (
    <div
      style={{ ...imageStyle }}
      className="h-[600px] w-full bg-cover bg-center bg-no-repeat"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-2xl text-4xl font-bold text-white drop-shadow-md sm:text-3xl">
          Eat Dinner in a Local Macedonian Home{" "}
        </h1>

        <p className="mt-4 max-w-xl text-lg text-white drop-shadow-sm sm:text-xl">
          Share a home-cooked meal, hear real stories, and connect through
          culture one dinner at a time.
        </p>

        <Link
          href="/search"
          className="text-md mt-8 rounded bg-primary-600 px-6 py-2 font-semibold text-white shadow-md transition-transform hover:scale-105"
        >
          Find Your Host
        </Link>
      </div>
    </div>
  );
};
