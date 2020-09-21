import React from "react";
import TextButton from "./TextButton";
import CopyIcon from "../Icons/CopyIcon";
import { copyToClipboard } from "../../actions";

export default function (props) {
  return (
    <TextButton
      startIcon={<CopyIcon style={{ fontSize: 18 }} />}
      onClick={() => {
        copyToClipboard(props.address);
      }}
      {...props}
    >
      {props.children ? props.children : "Copy Address"}
    </TextButton>
  );
}
