import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { env } from "~/env";
import { Input } from "./Input";
import { TProfileSetupForm } from "../profile/ProfileSetupForm";

export const GooglePlacesAutocompleteComponent = ({
  ...field
}: ControllerRenderProps<TProfileSetupForm, "address">) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (!isLoaded || !inputRef.current || !window.google?.maps?.places) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (
        !place.geometry ||
        !place.formatted_address ||
        !place.geometry.location?.lat() ||
        !place.geometry.location?.lng()
      )
        return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      console.log(place, lat, lng);

      field.onChange(place.formatted_address);
      setValue("lat", lat);
      setValue("lng", lng);
    });

    return () => {
      // cleanup listener if needed
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isLoaded, setValue]);

  if (loadError) return <div>Failed to load Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return <Input placeholder="Search address..." {...field} ref={inputRef} />;
};
