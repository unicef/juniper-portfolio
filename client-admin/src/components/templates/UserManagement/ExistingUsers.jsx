import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import GenerateLinkIcon from "../../atoms/Icons/GenerateLinkIcon";
import EnvelopeIcon from "../../atoms/Icons/EnvelopeIcon";
import CancelIcon from "../../atoms/Icons/CancelIcons";
import { copyToClipboard } from "../../../actions";
import { monthNames } from "../../../util";
import TextButton from "../../atoms/Button/TextIcon";
import ExpansionList from "../../organisms/ExpansionPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  avatar: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.75,
    height: 47,
    width: 47,
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.light,
  },
  listItem: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
    lineHeight: 1.6,
    marginTop: 12,
    marginBottom: 12,
    padding: 15,
  },
  username: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.5,
    marginTop: 0,
    marginBottom: 0,
  },
  position: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    lineHeight: 1.64,
    color: "#898989",
    marginTop: 0,
    marginBottom: 0,
  },
  joinMessage: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    lineHeight: 1.64,
    color: "#898989",
    marginTop: 0,
    marginBottom: 0,
  },
  pendingMessage: {
    maxWidth: 200,
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    lineHeight: 1.64,
    color: "#ef6161",
    marginTop: 0,
    marginBottom: 0,
  },
  generateButton: {
    padding: 0,
    paddingBottom: 6,
    height: 26,
    float: "left",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.textButtonHover,
    },
    "& .MuiButton-endIcon": {
      margin: 0,
    },
    paddingLeft: 0,
    "& .MuiButton-startIcon": {
      margin: 0,
      marginTop: 8,
    },
  },
  removeButton: {
    padding: 0,
    paddingBottom: 6,
    height: 26,
    float: "left",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: "#ef6161",
    "&:hover": {
      backgroundColor: "#f1bfbf",
    },
    "& .MuiButton-endIcon": {
      margin: 0,
    },
    paddingLeft: 0,
    "& .MuiButton-startIcon": {
      color: "#ef6161",
      margin: 0,
      marginTop: 8,
    },
  },
}));

export default function ActivityList({
  users,
  removeUser,
  setUsers,
  title,
  heading,
}) {
  const classes = useStyles();

  const reinviteUser = async (user) => {
    let res;
    let users;

    try {
      res = await fetch(`/rest/admin/settings/user/invite`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          user,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      users = await res.json();
    } catch (e) {
      return console.log(e);
    }

    if (res.status === 200) {
      setUsers(users);
    }
  };

  return (
    <ExpansionList title={title} heading={heading}>
      <List component="nav" className={classes.root}>
        <Fragment>
          <Divider />
          {users.map((user, index) => {
            const joinDate = new Date(
              parseInt(user._id.toString().substring(0, 8), 16) * 1000
            );
            return (
              <ListItem className={classes.listItem} key={index}>
                <Grid container>
                  <Grid item xs={1}>
                    <Avatar src={user.picture} className={classes.avatar}>
                      {user
                        ? user.firstName
                          ? user.firstName.charAt(0)
                          : ""
                        : ""}{" "}
                      {user
                        ? user.lastName
                          ? user.lastName.charAt(0)
                          : ""
                        : ""}
                    </Avatar>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={classes.username}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className={classes.position}>{user.department}</p>
                  </Grid>
                  <Grid item xs={4}>
                    {user.isVerified ? (
                      <p className={classes.joinMessage}>
                        User joined on {joinDate.getDate()}{" "}
                        {monthNames[joinDate.getMonth()]}{" "}
                        {joinDate.getFullYear()}
                      </p>
                    ) : (
                      <p className={classes.pendingMessage}>
                        User response pending. Invited via email on{" "}
                        {joinDate.getDate()} {monthNames[joinDate.getMonth()]}{" "}
                        {joinDate.getFullYear()}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    {!user.isVerified && (
                      <Fragment>
                        <TextButton
                          startIcon={<EnvelopeIcon style={{ marginTop: 8 }} />}
                          onClick={async () => {
                            reinviteUser(user);
                          }}
                        >
                          Send New Invite
                        </TextButton>
                        <TextButton
                          startIcon={
                            <GenerateLinkIcon style={{ marginTop: 8 }} />
                          }
                          onClick={async () => {
                            copyToClipboard(
                              `https://juniper.unicef.io/admin/signin?verification=${user.verificationCode}`
                            );
                          }}
                        >
                          Generate Invite Link
                        </TextButton>
                      </Fragment>
                    )}

                    <TextButton
                      startIcon={
                        <CancelIcon style={{ fill: "#ef6161", marginTop: 8 }} />
                      }
                      onClick={async () => {
                        const users = await removeUser(user.email);
                        setUsers(users);
                      }}
                    >
                      Remove User
                    </TextButton>
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
        </Fragment>
      </List>
    </ExpansionList>
  );
}
