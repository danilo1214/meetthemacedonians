import Head from "next/head";
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
      <Head>
        <Meta
          title="Meet The Macedonians | Eat with the locals"
          description="Eat traditional macedonian foods. Discover authentic experiences and dinners with local families."
        />
      </Head>
      <main className="flex flex-col">
        <Hero />
        <ProfileSearchForm onSubmit={handleSubmit} />
        <FoodSection />
        <MeetTheMacedoniansIntro />
        <BecomeAHost />
      </main>
    </>
  );
}
