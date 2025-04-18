import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
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

  return (
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
  );
}
