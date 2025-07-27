import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import SuperJSON from "superjson";
import { Meta } from "~/components/generic/Meta";
import { ProfileCard } from "~/components/profile/ProfileCard";
import { ReservationConfirmation } from "~/components/reservation/ReservationConfirmation";
import { ReservationForm } from "~/components/reservation/ReservationForm";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { authConfig } from "~/server/auth/config";
import { api } from "~/utils/api";

export default function ProfileView() {
  const router = useRouter();
  const profileId = Number(router.query.id);

  const { data: profile } = api.profile.getProfileById.useQuery(profileId);

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!profile) {
    return null;
  }

  return (
    <>
      <Meta
        image={profile.photoUrl}
        title={`Make a reservation at ${profile.title}`}
        description="Traditional macedonian food with locals"
      />

      <main>
        <div className="flex w-full content-center items-center justify-center p-4 lg:p-10">
          <ProfileCard profile={profile} />
        </div>
        {!isSubmitted && (
          <ReservationForm
            profileId={profileId}
            onSuccess={() => setIsSubmitted(true)}
          />
        )}

        {isSubmitted && <ReservationConfirmation />}
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authConfig);

  const profileId = Number(context.query.id);
  if (!profileId || isNaN(profileId)) {
    return {
      notFound: true,
    };
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: SuperJSON,
  });

  await helpers.profile.getProfileById.fetch(profileId);

  return {
    props: {
      session,
      trpcState: helpers.dehydrate(),
    },
  };
}
