import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function TxSentIcon(props) {
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
        <g>
          <path
            d="M21.09 3L14.09 11 7.09 3"
            transform="translate(5.5 3) rotate(-90 14.09 7)"
          />
          <path d="M18.09 7L0.5 7" transform="translate(5.5 3)" />
        </g>
        <path d="M0.5 0.5L0.5 18.5" />
      </g>
    </SvgIcon>
  );
}
