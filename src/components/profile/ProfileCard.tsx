import { type TPopulatedProfile } from "~/server/api/types";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

export const ProfileCard = ({ profile }: { profile: TPopulatedProfile }) => {
  const router = useRouter();
  const profileId = Number(router.query.id);
  console.log(router.pathname);
  const isAdmin = router.pathname === "/account";

  return (
    <div className="overflow-hidden rounded bg-white p-4">
      <img
        className="h-48 w-full object-cover"
        src={profile.photoUrl}
        alt={`${profile.familyName}'s photo`}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-accent-700">
          {profile.title}
        </div>
        <p className="text-base text-gray-700">{profile.familyName} family</p>
      </div>

      {!profileId && !isAdmin && (
        <div className="px-6 py-2">
          <Link
            href={`/profile/${profile.id}`}
            className="rounded bg-primary-600 px-10 py-3 text-white"
          >
            View
          </Link>
        </div>
      )}
      <div className="px-6 pb-2 pt-4">
        <p>
          <strong>Description:</strong> {profile.description}
        </p>
        <p>
          <strong>Age</strong>{" "}
          {moment().diff(moment(profile.dateOfBirth), "years")}
        </p>
        <p>
          <strong>Maximum People:</strong> {profile.maximumPeople}
        </p>
        <p>
          <strong>Smoking Allowed:</strong> {profile.isSmoking ? "Yes" : "No"}
        </p>
      </div>

      <div className="px-6 pb-2 pt-4">
        <strong>Languages:</strong>
        <div>
          {profile.profileLanguages.map((l) => l.language.name).join(", ")}
        </div>
      </div>
      <div className="px-6 pb-2 pt-4">
        <strong>Drinks:</strong>
        <div>{profile.profileDrinks.map((d) => d.drink.name).join(", ")}</div>
      </div>
      <div className="px-6 pb-2 pt-4">
        <strong>Food Types:</strong>
        <div>
          {profile.profileFoodTypes.map((f) => f.foodType.name).join(", ")}
        </div>
      </div>
    </div>
  );
};
