import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function CopyIcon(props) {
  return (
    <SvgIcon {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M2 7.425L17.533 7.425 12.727 1" transform="translate(0 .5)" />
        <path
          d="M2 18.425L17.533 18.425 12.727 12"
          transform="translate(0 .5) rotate(180 9.766 15.213)"
        />
      </g>
    </SvgIcon>
  );
}
