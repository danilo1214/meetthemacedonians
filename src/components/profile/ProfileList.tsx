import { ProfileCard } from "~/components/profile/ProfileCard";
import { type TPopulatedProfile } from "~/server/api/types";

export const ProfileList = ({
  profiles,
}: {
  profiles: TPopulatedProfile[];
}) => {
  return (
    <div>
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};
