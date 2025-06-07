import SuperJSON from "superjson";

import { useSearchParams } from "next/navigation";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { authConfig } from "~/server/auth/config";

import { useRouter } from "next/router";
import { useMemo } from "react";
import { Meta } from "~/components/generic/Meta";
import { ProfileList } from "~/components/profile/ProfileList";
import {
  type IProfileSearchForm,
  ProfileSearchForm,
} from "~/components/profile/ProfileSearchForm";
import { api } from "~/utils/api";

export default function ProfileSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParams = {
    search: searchParams.get("search") ?? undefined,
    guests: searchParams.get("guests")
      ? Number(searchParams.get("guests"))
      : undefined,
    ageRange: searchParams.get("ageRange")?.split("-").map(Number) ?? undefined,
    city: searchParams.get("city") ?? undefined,
    date: searchParams.get("date")
      ? new Date(searchParams.get("date")!)
      : undefined,
  };

  // Fetch profiles using query params
  const { data: profiles, isLoading } =
    api.profile.fetchProfiles.useQuery(queryParams);

  const handleSubmit = (data: IProfileSearchForm) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });

    void router.push(`?${params.toString()}`);
  };

  const queryParamsString = useMemo<string>(() => {
    const date = queryParams.date
      ? ` on ${queryParams.date.toDateString()}`
      : "";

    const guests = queryParams.guests
      ? ` for ${queryParams.guests} guests`
      : "";

    const ages = queryParams.ageRange
      ? ` between ages ${queryParams.ageRange.join("-")}`
      : "";

    const city = queryParams.city ? ` in ${queryParams.city}` : "";

    return `${date}${guests}${ages}${city}`;
  }, [
    queryParams.ageRange,
    queryParams.city,
    queryParams.date,
    queryParams.guests,
  ]);

  return (
    <>
      <Meta
        title={`Profiles ${queryParamsString} | MeetTheMacedonians`}
        description={`Browse Macedonian hosts${queryParamsString}. Discover authentic experiences and dinners with local families.`}
      />

      <main>
        <ProfileSearchForm
          disabled={isLoading}
          onSubmit={(data) => {
            handleSubmit(data);
          }}
        />
        {isLoading && (
          <div className="my-16 text-center text-lg text-gray-900">
            Loading...
          </div>
        )}
        {profiles && <ProfileList profiles={[...profiles]} />}
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authConfig);

  const query = context.query;
  const search = query.search as string | undefined;
  const guests = query.guests ? Number(query.guests) : undefined;
  const ageRange = query.ageRange
    ? (query.ageRange as string).split("-").map(Number)
    : undefined;
  const city = query.city as string | undefined;
  const date = query.date ? new Date(query.date as string) : undefined;

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: SuperJSON,
  });

  await helpers.profile.fetchProfiles.fetch({
    search,
    guests,
    ageRange,
    city,
    date,
  });

  return {
    props: {
      session,
      trpcState: helpers.dehydrate(),
    },
  };
}
