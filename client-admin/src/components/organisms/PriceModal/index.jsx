import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../atoms/Modal";
import Block from "../../atoms/Block";
import CancelIcon from "../../atoms/Icons/CancelIcons";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    cursor: "pointer",
  },
}));

export default function PriceModal({ open, setOpen, children }) {
  const classes = useStyles();

  return (
    <div>
      {children}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CancelIcon
          className={classes.closeIcon}
          onClick={() => {
            setOpen(false);
          }}
        />
        <Block>Block1</Block>
        <Block>Block2</Block>
      </Modal>
    </div>
  );
}
