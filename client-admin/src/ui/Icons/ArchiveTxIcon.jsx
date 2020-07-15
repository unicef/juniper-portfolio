import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function ArchiveTxIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M15.81 2.49V.924c0-.477-.387-.865-.865-.865H1.055C.577.058.19.446.19.923v1.57c0 .467.37.85.837.865v7.394c0 1.195.968 2.163 2.162 2.163h9.622c1.194 0 2.162-.968 2.162-2.163V3.354c.466-.016.836-.397.837-.863zm-1.702 8.262c0 .717-.58 1.298-1.297 1.298H3.189c-.716 0-1.297-.581-1.297-1.298V3.356h12.216v7.396zM1.055 2.491V.923h13.89v1.57l-13.89-.002z"
        transform="translate(0 1)"
      />
      <path
        d="M5.315 5.73h5.37c.24 0 .433-.194.433-.433s-.194-.432-.433-.432h-5.37c-.24 0-.433.193-.433.432 0 .24.194.433.433.433z"
        transform="translate(0 1)"
      />
    </SvgIcon>
  );
}
