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
      <div className="flex flex-col items-center p-20">
        <h1
          className="text-3xl text-white"
          style={{ textShadow: "1px 1px black" }}
        >
          Meet with locals over dinner, learn about their culture and lifestyle.
        </h1>
        <Link
          className="my-10 rounded bg-primary-600 px-4 py-2 text-lg text-white shadow-lg"
          href="/search"
        >
          Explore locals
        </Link>
      </div>
    </div>
  );
};
