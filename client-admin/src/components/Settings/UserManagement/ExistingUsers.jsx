import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import GenerateLinkIcon from "../../../ui/Icons/GenerateLinkIcon";
import EnvelopeIcon from "../../../ui/Icons/EnvelopeIcon";
import CancelIcon from "../../../ui/Icons/CancelIcons";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
    color: "#374ea2",
    backgroundColor: "#daf5ff",
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
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
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

export default function ActivityList(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const removeUser = async (email) => {
    let res;
    try {
      res = await fetch(`/rest/admin/settings/user/remove`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      return console.log(e);
    }

    console.log(res.status);
  };

  useEffect(() => {
    const getUsers = async () => {
      let res;
      try {
        res = await fetch("/rest/admin/settings/users");
      } catch (e) {
        console.log(e);
      }
      setUsers(await res.json());
    };
    getUsers();
  }, []);

  return (
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
                    {user ? (user.lastName ? user.lastName.charAt(0) : "") : ""}
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
                      User joined on {joinDate.getDay()}{" "}
                      {monthNames[joinDate.getMonth()]} {joinDate.getFullYear()}
                    </p>
                  ) : (
                    <p className={classes.pendingMessage}>
                      User response pending. Invited via email on{" "}
                      {joinDate.getDay()} {monthNames[joinDate.getMonth()]}{" "}
                      {joinDate.getFullYear()}
                    </p>
                  )}
                </Grid>
                <Grid item xs={3}>
                  {!user.isVerified && (
                    <Fragment>
                      <Button
                        className={classes.generateButton}
                        startIcon={<EnvelopeIcon />}
                        onClick={async () => {
                          console.log("button");
                        }}
                      >
                        Send New Invite
                      </Button>
                      <Button
                        className={classes.generateButton}
                        startIcon={<GenerateLinkIcon />}
                        onClick={async () => {
                          console.log("button");
                        }}
                      >
                        Generate Invite Link
                      </Button>
                    </Fragment>
                  )}

                  <Button
                    className={classes.removeButton}
                    startIcon={<CancelIcon style={{ fill: "#ef6161" }} />}
                    onClick={async () => {
                      console.log("button");
                      removeUser(user.email);
                    }}
                  >
                    Remove User
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </Fragment>
    </List>
  );
}
