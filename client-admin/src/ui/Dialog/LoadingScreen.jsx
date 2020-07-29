import React from "react";
import Dialog from "@material-ui/core/Dialog";

export default function LoadingScreen(props) {
  return (
    <div>
      <Dialog fullScreen open={props.open}></Dialog>
    </div>
  );
}
