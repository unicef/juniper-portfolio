import React, { Fragment, useState } from "react";
import TextButton from "./TextButton";
import CopyIcon from "../Icons/CopyIcon";
import { copyToClipboard } from "../../actions";
import Snackbar from "../Snackbar";

export default function (props) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDuration] = useState(3000);
  const [snackbarMessage, setSnackbarMessage] = useState(
    `Address copied to clipboard`
  );
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  return (
    <Fragment>
      <Snackbar
        open={showSnackbar}
        severity={snackbarSeverity}
        duration={snackbarDuration}
        message={snackbarMessage}
        onClose={() => {
          setShowSnackbar(false);
        }}
        icon={<CopyIcon style={{ stroke: "#ffffff", fill: "rgba(0,0,0,0)" }} />}
      />
      <TextButton
        startIcon={
          <CopyIcon
            style={{ fontSize: 18, stroke: "#00AEEF", fill: "rgba(0,0,0,0)" }}
          />
        }
        onClick={() => {
          copyToClipboard(props.address);
          setShowSnackbar(true);
        }}
        {...props}
      >
        {props.children ? props.children : "Copy Address"}
      </TextButton>
    </Fragment>
  );
}
