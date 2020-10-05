import React from "react";
import { useTheme } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function UploadIcon(props) {
  const theme = useTheme();
  return (
    <SvgIcon {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke={theme.palette.primary.main}
        strokeLinecap="round"
        strokeWidth="1.5"
      >
        <path
          strokeLinejoin="round"
          d="M6.5 12.5L6.5.5M.342 5.469L6.5.312 12.658 5.469"
        />
        <path d="M0.5 16.5L12.5 16.5" />
      </g>
    </SvgIcon>
  );
}
