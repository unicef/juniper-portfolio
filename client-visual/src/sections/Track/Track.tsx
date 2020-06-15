import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TrackDesktop } from "./TrackDesktop";
import { TrackMobile } from "./TrackMobile";

export const Track = () => {
  const mobiledevice = useMediaQuery("(max-width: 800px)");

  if (mobiledevice) {
    return (
      <div>
        <TrackMobile />
      </div>
    );
  } else {
    return (
      <div>
        <TrackDesktop />
      </div>
    );
  }
};
