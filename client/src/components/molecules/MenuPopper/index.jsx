import React, { Fragment, useState, useRef } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "inline-block",
  },
  paper: {},
}));

export default function MenuPopper(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(props.anchorRef);
  const arrowRef = useRef();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  console.log("arrow", arrowRef);
  return (
    <Fragment>
      <div
        ref={anchorRef}
        style={{ display: "inline-block" }}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {props.button}
      </div>

      <Popper
        placement={props.placement}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 999 }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                props.placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              elevation={1}
              className={classes.paper}
              onClick={handleClose}
            >
              <ClickAwayListener onClickAway={handleClose}>
                {props.children}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}
