import { ClockIcon } from "@heroicons/react/24/solid";
import { ProfileStatus } from "@prisma/client";
import classNames from "classnames";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useState } from "react";
import { Button } from "~/components/generic/Button";
import { ProfileCard } from "~/components/profile/ProfileCard";
import { ProfileSetupForm } from "~/components/profile/ProfileSetupForm";
import { authConfig } from "~/server/auth/config";
import { helpers } from "~/server/helpers";
import { api } from "~/utils/api";

export default function Account() {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { data: profile } = api.profile.getProfile.useQuery();

  const handleCtaClick = () => {
    setShowProfileForm((pf) => !pf);
  };

  if (!profile) {
    return null;
  }

  const isUnderReview = profile.status === ProfileStatus.PENDING;

  return (
    <main className="m-5 flex flex-col gap-y-5">
      <h1 className="text-xl font-semibold">Мој Профил</h1>
      {isUnderReview ? (
        <div className="flex items-center">
          <ClockIcon className="size-8 text-accent-300" />
          <div>
            Вашето барање за креирање профил е испратено и е прегледувано.
          </div>
        </div>
      ) : (
        <>
          <Button
            label={showProfileForm ? "Назад" : "Промени податоци"}
            className={classNames(
              "w-52",
              !showProfileForm && "bg-primary-400 text-white",
              showProfileForm &&
                "border border-primary-400 bg-white text-primary-400",
            )}
            onClick={handleCtaClick}
          />
          <div className="my-5 flex flex-col">
            {showProfileForm ? (
              <ProfileSetupForm />
            ) : (
              <ProfileCard profile={profile} />
            )}
          </div>
        </>
      )}
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authConfig);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
