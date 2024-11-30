"use client";

import { Button } from "~/components/generic/Button";
import { getBackgroundImageStyle } from "~/util";

export const Hero = () => {
  const imageStyle = getBackgroundImageStyle({
    alt: "hero",
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
        <h1 className="text-white text-3xl">
          Meet with local Macedonians over dinner, learn about their culture and
          lifestyle.
        </h1>
        <Button
          className="text-white my-10 bg-primary-600 shadow-lg"
          label="Get started"
          onClick={() => {
            console.log("ok");
          }}
        />
      </div>
    </div>
  );
};
