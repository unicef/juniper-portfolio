import React from "react";
import { useTheme } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function ArchiveTxIcon(props) {
  const theme = useTheme();
  return (
    <SvgIcon {...props}>
      <g fill="none" fillRule="evenodd" stroke={theme.palette.primary.main}>
        <path
          fill={theme.palette.primary.main}
          d="M10.127 1.127c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9 4.963 0 9-4.037 9-9 0-4.962-4.037-9-9-9zm0 16.981c-4.401 0-7.98-3.58-7.98-7.98 0-4.401 3.58-7.982 7.98-7.982 4.401 0 7.981 3.58 7.981 7.981 0 4.402-3.58 7.981-7.98 7.981zm.68-4.372c0 .376-.304.68-.68.68-.375 0-.679-.305-.679-.68 0-.375.304-.68.68-.68.375 0 .679.305.679.68zm1.952-5.775c0 1.293-.913 2.362-2.122 2.6V11.8c0 .281-.229.51-.51.51-.28 0-.51-.229-.51-.51v-1.697c0-.282.23-.51.51-.51.89 0 1.614-.723 1.614-1.613 0-.907-.725-1.63-1.614-1.63-.889 0-1.613.723-1.613 1.612 0 .282-.228.518-.51.518-.28 0-.509-.219-.509-.5V7.96c0-1.451 1.181-2.633 2.632-2.633S12.76 6.51 12.76 7.961z"
        />
      </g>
    </SvgIcon>
  );
}
