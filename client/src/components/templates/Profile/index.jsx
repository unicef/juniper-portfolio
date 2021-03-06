import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FileUpload from "../../atoms/FileUpload";

const useStyles = makeStyles((theme) => ({
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
    fontSize: 16,
    color: theme.palette.primary.dark,
    fontWeight: 700,
    lineHeight: 1.75,
    backgroundColor: theme.palette.primary.light,
  },
  message: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1,
    color: theme.palette.primary.main,
    boxShadow: "none",
    textTransform: "uppercase",
    marginTop: 12,
  },
  chevron: {
    textAlign: "right",
    color: theme.palette.primary.main,
    marginTop: 12,
    paddingRight: 15,
  },
}));

export default function User({ user, updateUser }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1} className={classes.avatarbox}>
        <FileUpload
          url={"/upload/image"}
          afterUpload={updateUser}
          showStatus={false}
        >
          <Avatar src={user.picture} className={classes.avatar}>
            {user ? (user.firstName ? user.firstName.charAt(0) : "") : ""}{" "}
            {user ? (user.lastName ? user.lastName.charAt(0) : "") : ""}
          </Avatar>
        </FileUpload>
      </Grid>
      <Grid item xs={10} className={classes.message}>
        <FileUpload
          url={"/upload/image"}
          afterUpload={(json) => {
            updateUser({ picture: json.imageUrl });
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
