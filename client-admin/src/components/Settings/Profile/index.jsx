import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FileUpload from "../../FileUpload";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ffffff",
    paddingTop: 19,
    paddingBottom: 19,
    paddingLeft: 15,
  },
  avatarbox: {
    textAlign: "right",
    paddingLeft: 15,
  },
  avatar: {
    height: 47,
    width: 47,
  },
  message: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#00aeef",
    boxShadow: "none",
    textTransform: "uppercase",
    marginTop: 12,
  },
  chevron: {
    textAlign: "right",
    color: "#00aeef",
    marginTop: 12,
    paddingRight: 15,
  },
});

export default function User(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1} className={classes.avatarbox}>
        <FileUpload afterUpload={props.updateUser} showStatus={false}>
          <Avatar src={props.user.picture} className={classes.avatar}>
            {props.user
              ? props.user.firstName
                ? props.user.firstName.charAt(0)
                : ""
              : ""}{" "}
            {props.user
              ? props.user.lastName
                ? props.user.lastName.charAt(0)
                : ""
              : ""}
          </Avatar>
        </FileUpload>
      </Grid>
      <Grid item xs={10} className={classes.message}>
        <FileUpload
          afterUpload={(json) => {
            props.updateUser({ picture: json.imageUrl });
          }}
          showStatus={false}
        >
          Change Profile Picture
        </FileUpload>
      </Grid>
      <Grid item xs={1} className={classes.chevron}>
        <ChevronRightIcon />
      </Grid>
    </Grid>
  );
}
