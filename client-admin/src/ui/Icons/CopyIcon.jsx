import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function CopyIcon(props) {
  return (
    <SvgIcon {...props}>
      <g>
        <path d="M14.333 10.6H6.955c-.833 0-1.509-.676-1.509-1.509V1.713c0-.832.676-1.508 1.509-1.508h7.378c.832 0 1.508.676 1.508 1.508v7.378c0 .833-.676 1.509-1.508 1.509z" />
        <path
          strokeLinecap="round"
          d="M10.6 12.814v.979c0 .832-.676 1.508-1.509 1.508H1.714c-.833 0-1.509-.676-1.509-1.508V6.415c0-.833.676-1.508 1.509-1.508h1.285"
        />
      </g>
    </SvgIcon>
  );
}
