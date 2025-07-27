import { type TPopulatedProfile } from "~/server/api/types";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

export const ProfileCard = ({ profile }: { profile: TPopulatedProfile }) => {
  const router = useRouter();
  const profileId = Number(router.query.id);
  console.log(router.pathname);
  const isAdmin = router.pathname === "/account";

  const card = (
    <div className="flex gap-x-5 bg-white">
      <img
        className={classNames(
          "h-[70px] w-[70px] object-cover",
          !profileId && !isAdmin ? "" : "h-[200px] w-[200px]",
        )}
        src={profile.photoUrl}
        alt={`${profile.title}'s photo`}
      />
      <div className="text-md flex flex-col gap-y-1 pt-2 text-neutral-800 lg:pt-2.5">
        <div className="font-bold">{profile.title}</div>

        <div className="text-neutral-500">{profile.address}</div>

        <div>From €3.50 / day</div>
      </div>
    </div>
  );

  if (!profileId && !isAdmin) {
    return <Link href={`/profile/${profile.id}`}>{card}</Link>;
  }

  return card;
};
