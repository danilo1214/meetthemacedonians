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
    <div className="overflow-hidden rounded bg-white p-2 text-gray-600 lg:p-2.5">
      <img
        className="h-48 w-full object-cover"
        src={profile.photoUrl}
        alt={`${profile.familyName}'s photo`}
      />
      <div className="py-2 lg:py-2.5">
        <p className="text-sm font-semibold text-gray-600">
          {profile.familyName} family
        </p>

        <div className="text-md mb-0.5 font-bold text-neutral-800">
          {profile.title}
        </div>
        <p className="text-md text-black">{profile.description}</p>
      </div>

      {!profileId && !isAdmin && (
        <div className="pb-2">
          <Link
            href={`/profile/${profile.id}`}
            className="rounded bg-primary-600 px-8 py-2 text-white lg:px-10 lg:py-2.5"
          >
            View
          </Link>
        </div>
      )}
      <div className="text-md">
        <div className="text-sm">
          <p>
            <span className="text-black">Age:</span>{" "}
            {moment().diff(moment(profile.dateOfBirth), "years")}
          </p>
          <p>
            <span className="text-black">Maximum people:</span>{" "}
            {profile.maximumPeople}
          </p>
          <p>
            <span className="text-black">Smoking Allowed:</span>{" "}
            {profile.isSmoking ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="text-sm">
        <div className="py-0.5">
          <span className="text-black">Languages:</span>
          <div>
            {profile.profileLanguages.map((l) => l.language.name).join(", ")}
          </div>
        </div>
        <div className="py-0.5">
          <span className="text-black">Drinks:</span>
          <div>{profile.profileDrinks.map((d) => d.drink.name).join(", ")}</div>
        </div>
        <div className="py-0.5">
          <span className="text-black">Food Types:</span>
          <div>
            {profile.profileFoodTypes.map((f) => f.foodType.name).join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};
