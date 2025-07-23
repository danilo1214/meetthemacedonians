import { type GetServerSidePropsContext } from "next";
import { authConfig } from "~/server/auth/config";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { Meta } from "~/components/generic/Meta";
import { BecomeAHost } from "~/components/landing/BecomeAHost";
import { FoodSection } from "~/components/landing/FoodSection";
import { Hero } from "~/components/landing/Hero";
import { MeetTheMacedoniansIntro } from "~/components/landing/MeetTheMacedoniansIntro";
import {
  type IProfileSearchForm,
  ProfileSearchForm,
} from "~/components/profile/ProfileSearchForm";

import { ProfileMap } from "~/components/map/ProfileMap";

export default function Home() {
  const router = useRouter();

  const handleSubmit = (data: IProfileSearchForm) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });

    void router.push(`/search?${params.toString()}`);
  };

  return (
    <>
      <Meta
        title="Meet The Macedonians | Eat with the locals"
        description="Eat traditional macedonian foods. Discover authentic experiences and dinners with local families."
      />
      <main className="flex flex-col">
        <Hero />
        <ProfileSearchForm onSubmit={handleSubmit} />
        <FoodSection />
        <MeetTheMacedoniansIntro />
        <BecomeAHost />
        <ProfileMap/>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authConfig);

  return {
    props: {
      session,
    },
  };
}
