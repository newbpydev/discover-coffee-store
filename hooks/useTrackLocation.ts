import { useState } from "react";

export default function useTrackLocation(): {
  latLong: string | undefined;
  handleTrackLocation: () => void;
  locationErrorMsg: string;
  isFindingLocation: boolean;
} {
  // @ States
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState<string>("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  // @ Success()
  const success = (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    setLatLong(`${lat},${long}`);
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  // @ Error()
  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setLatLong("");
    setIsFindingLocation(false);
  };

  // @ handleTrackLocation()
  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
}
