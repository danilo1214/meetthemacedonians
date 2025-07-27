import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { TPopulatedProfile } from "~/server/api/types";
import { ProfileCard } from "./ProfileCard";
import { BriefcaseIcon } from "@heroicons/react/24/solid";

type Props = {
  profile: TPopulatedProfile;
  isOpen: boolean;
  onClick: () => void;
};

export const ProfileMarker = ({ profile, isOpen, onClick }: Props) => {
  return (
    <AdvancedMarker
      position={{ lat: profile.lat, lng: profile.lng }}
      title={profile.title}
      onClick={onClick}
    >
      <div className="my-[-20px] flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-700 bg-indigo-500 shadow-lg">
        <BriefcaseIcon className="h-5 w-5 text-white" />
      </div>

      {isOpen && (
        <InfoWindow
          position={{ lat: profile.lat, lng: profile.lng }}
          className="p-0"
          headerDisabled
          onCloseClick={onClick}
        >
          <ProfileCard profile={profile} />
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};
