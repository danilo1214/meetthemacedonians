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
        className="mx-auto h-32 object-cover"
        src={profile.photoUrl}
        alt={`${profile.title}'s photo`}
      />
      <div className="py-2 lg:py-2.5">
        <div className="text-md font-bold text-neutral-800">
          {profile.title}
        </div>

        <div className="text-md text-neutral-800">{profile.address}</div>
      </div>

      {!profileId && !isAdmin && (
        <div className="mx-auto mt-2 flex w-full flex-col items-center pb-2">
          <div>
            <Link
              href={`/profile/${profile.id}`}
              className="rounded bg-primary-600 px-8 py-2 text-white lg:px-10 lg:py-2.5"
            >
              View
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
