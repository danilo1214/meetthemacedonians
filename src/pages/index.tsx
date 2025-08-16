import { Meta } from "~/components/generic/Meta";
import { Hero } from "~/components/landing/Hero";
import { HowItWorks } from "~/components/landing/HowItWorks";
import { Benefits } from "~/components/landing/Benefits";
import { ProfileMap } from "~/components/map/ProfileMap";

export default function Home() {
  return (
    <>
      <Meta
        title="BagSafe | Luggage Storage Anywhere"
        description="Find secure luggage storage near you. Drop your bags at trusted local shops and explore hands-free."
      />
      <main className="flex flex-col">
        <Hero />
        <HowItWorks />
        <ProfileMap />
        <Benefits />
      </main>
    </>
  );
}
