import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { env } from "~/env";
import { api } from "~/utils/api";
import { ProfileMarker } from "../profile/ProfileMarker";
import { useState } from "react";

export function ProfileMap() {
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null,
  );
  const { data: profiles } = api.profile.getProfiles.useQuery();

  if (!profiles) return <></>;

  const center = {
    lat: profiles[0]?.lat ?? 41.9981, // Skopje
    lng: profiles[0]?.lng ?? 21.4254,
  };

  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        mapId={"a2bb22666a72f745ae650a2e"}
        style={{ width: "100%", height: "500px", borderRadius: "1rem" }}
        defaultCenter={center}
        defaultZoom={12}
        gestureHandling="greedy"
        disableDefaultUI={false}
      >
        {profiles.map((profile) => (
          <ProfileMarker
            key={profile.id}
            profile={profile}
            isOpen={selectedProfileId === profile.id}
            onClick={() =>
              setSelectedProfileId((prev) =>
                prev === profile.id ? null : profile.id,
              )
            }
          />
        ))}
      </Map>
    </APIProvider>
  );
}
