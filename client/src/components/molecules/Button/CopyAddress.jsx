import React, { Fragment, useState } from "react";
import TextButton from "../../atoms/Button/TextIcon";
import CopyIcon from "../../atoms/Icons/CopyIcon";
import { copyToClipboard } from "../../../actions";
import Snackbar from "../../organisms/Snackbar";
import { useTheme } from "@material-ui/core/styles";

export default function (props) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDuration] = useState(3000);
  const [snackbarMessage, setSnackbarMessage] = useState(
    `Address copied to clipboard`
  );
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const theme = useTheme();
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
            style={{
              fontSize: 18,
              stroke: theme.palette.primary.main,
              fill: "rgba(0,0,0,0)",
            }}
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
