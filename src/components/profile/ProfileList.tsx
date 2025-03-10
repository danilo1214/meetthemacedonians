import { ProfileCard } from "~/components/profile/ProfileCard";
import { type TPopulatedProfile } from "~/server/api/types";

export const ProfileList = ({
  profiles,
}: {
  profiles: TPopulatedProfile[];
}) => {
  return (
    <div className="m-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};
