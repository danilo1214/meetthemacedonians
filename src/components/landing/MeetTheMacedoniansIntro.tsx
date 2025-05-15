import Image from "next/image";
import React from "react";

export const MeetTheMacedoniansIntro = () => {
  return (
    <section className="my-5 bg-white px-6 text-gray-800 md:px-12 lg:px-8">
      <div className="flex flex-col items-center gap-x-20 lg:flex-row">
        <div className="mx-auto">
          <h1 className="mb-6 text-lg font-bold text-primary-600 md:text-xl">
            Discover Macedonia Through Dinner
          </h1>
          <p className="text-md mb-6 md:text-lg">
            Every year, travelers come to Macedonia drawn by its rich history,
            breathtaking landscapes, and warm hospitality. But there’s a deeper
            way to experience the country— by sharing a home-cooked meal with
            the people who live here.
          </p>
          <p className="text-md mb-6 md:text-lg">
            <strong>Meet the Macedonians</strong> invites you into the homes of
            local families for an evening of good food, heartfelt stories, and
            cultural connection. Our hosts prepare traditional Macedonian dishes
            and open their doors to curious, open-minded guests looking for more
            than just sightseeing.
          </p>
          <p className="text-md mb-6 md:text-lg">
            You’ll sit around the table, not just as a visitor, but as a
            guest—sharing laughter, learning about daily life, and discovering
            what makes Macedonian culture so unique and welcoming.
          </p>
          <p className="text-md mb-8 md:text-lg">
            For many, these dinners lead to unforgettable memories—and sometimes
            lasting friendships.
          </p>
          <p className="text-md font-semibold italic text-primary-600">
            Come as a traveler, leave as a friend.
          </p>
        </div>
        <Image
          loading="lazy"
          className="flex-1"
          alt="logo"
          width={400}
          height={100}
          src="/food.jpg"
        />
      </div>
    </section>
  );
};
