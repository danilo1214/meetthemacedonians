import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ProfileList } from "~/components/profile/ProfileList";
import {
  type IProfileSearchForm,
  ProfileSearchForm,
} from "~/components/profile/ProfileSearchForm";
import { ReservationForm } from "~/components/reservation/ReservationForm";
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
  const { data: profiles } = api.profile.fetchProfiles.useQuery(queryParams);

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
        onSubmit={(data) => {
          handleSubmit(data);
        }}
      />
      {profiles && <ProfileList profiles={profiles} />}
    </main>
  );
}
