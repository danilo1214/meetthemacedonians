import { useRouter } from "next/router";
import { ProfileCard } from "~/components/profile/ProfileCard";
import { ReservationForm } from "~/components/reservation/ReservationForm";
import { api } from "~/utils/api";

export default function ProfileView() {
  const router = useRouter();
  const profileId = Number(router.query.id);

  const { data: profile } = api.profile.getProfileById.useQuery(profileId);

  if (!profile) {
    return null;
  }

  return (
    <main>
      <ProfileCard profile={profile} />
      <ReservationForm profileId={profileId} />
    </main>
  );
}
