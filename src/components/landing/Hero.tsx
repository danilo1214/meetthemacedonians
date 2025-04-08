"use client";

import Link from "next/link";
import { getBackgroundImageStyle } from "~/util";

export const Hero = () => {
  const imageStyle = getBackgroundImageStyle({
    width: 1600,
    height: 800,
    src: "/macedonians.jpg",
  });

  return (
    <div
      style={{ ...imageStyle }}
      className="mb-8 h-[600px] w-full bg-cover bg-center bg-no-repeat"
    >
      <div className="flex flex-col items-center p-20">
        <h1 className="text-3xl text-white">
          Meet with locals over dinner, learn about their culture and lifestyle.
        </h1>
        <Link
          className="my-10 rounded bg-primary-600 p-2 text-white shadow-lg"
          onClick={() => {
            console.log("ok");
          }}
          href="/search"
        >
          Explore locals
        </Link>
      </div>
    </div>
  );
};
