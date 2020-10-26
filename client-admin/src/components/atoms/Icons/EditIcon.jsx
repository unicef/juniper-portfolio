import React from "react";
import { useTheme } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function ArchiveTxIcon(props) {
  const theme = useTheme();
  return (
    <SvgIcon {...props}>
      <path
        fill={theme.palette.primary.main}
        d="M15.424 2.385l-.043-.043L13.555.516c-.58-.58-1.503-.602-2.105-.022l-.021.022L1.117 10.849c-.064.064-.107.128-.129.214l-.902 4.254c-.043.129 0 .28.107.387.086.085.194.128.301.128H.58l4.254-.902c.085-.021.15-.064.214-.129L15.381 4.49c.602-.559.623-1.504.043-2.105zM4.533 14.092l-3.48.752.752-3.48 7.84-7.84 2.729 2.727-7.841 7.841zM14.78 3.845L12.997 5.65l-2.75-2.75 1.805-1.783c.236-.258.623-.258.88-.021l.022.021 1.826 1.826c.258.236.258.623 0 .902z"
      />
    </SvgIcon>
  );
}
