import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const modalStyle = {
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
};
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 650,
    backgroundColor: "#ffffff",
    outline: "none",
  },
}));

export default function SimpleModal({
  open = false,
  onClose,
  children,
  className,
}) {
  const classes = useStyles();

  const body = (
    <div style={modalStyle} className={`${classes.paper} ${className}`}>
      {children}
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}
