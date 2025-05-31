import Image from "next/image";
import React from "react";

export const MeetTheMacedoniansIntro = () => {
  return (
    <section className="my-10 bg-white px-6 text-gray-800 md:px-12 lg:px-20">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="mb-6 text-xl font-bold text-primary-600 md:text-3xl">
            Discover Macedonia Through Dinner
          </h2>
          <p className="text-md mb-4 md:text-lg">
            Every year, travelers come to Macedonia drawn by its rich history,
            breathtaking landscapes, and warm hospitality. But there’s a deeper
            way to experience the country—by sharing a home-cooked meal with the
            people who live here.
          </p>
          <p className="text-md mb-4 md:text-lg">
            <strong>Meet the Macedonians</strong> invites you into the homes of
            local families for an evening of good food, heartfelt stories, and
            cultural connection.
          </p>
          <p className="text-md mb-4 md:text-lg">
            You’ll sit around the table as a guest—sharing laughter, learning
            about daily life, and discovering what makes Macedonian culture so
            unique and welcoming.For many, these dinners lead to unforgettable
            memories—and sometimes lasting friendships.
          </p>

          <p className="text-md font-semibold italic text-primary-600">
            Come as a traveler, leave as a friend.
          </p>
        </div>
        <Image
          loading="lazy"
          alt="Macedonian Dinner"
          width={400}
          height={300}
          className="rounded shadow-lg"
          src="/macedonians.jpg"
        />
      </div>
    </section>
  );
};
