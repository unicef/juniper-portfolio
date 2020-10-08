import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LoginSettings from "../templates/Login";
import Notifications from "../templates/Notifications";
import UserActivity from "../templates/UserActivity";
import Profile from "../templates/Profile";
import WorkDetails from "../templates/WorkDetails";
import AddNewUser from "../templates/UserManagement/AddNewUser";
import ExistingUsers from "../templates/UserManagement/ExistingUsers";
import { getUsers, removeUser } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5em",
    paddingBottom: "5em",
    backgroundColor: "#f8f8f8",
    width: "100%",
    maxHeight: "100vh",
    overflow: "hidden",
    overflowY: "scroll",
  },
  title: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 2,
    letterSpacing: 1,
    color: "#898989",
    textTransform: "uppercase",
    marginTop: 50,
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    fontWeight: 400,
    lineHeight: 1.42,
    color: "#898989",
    marginTop: 0,
    marginBottom: 30,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Settings({ isAdmin, user, updateUser }) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function init() {
      setUsers(await getUsers());
    }
    init();
  }, [user]);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <WorkDetails
          title={"Profile"}
          heading={"Work Details"}
          user={user}
          updateUser={updateUser}
        />

        <Profile user={user} updateUser={updateUser} />

        <LoginSettings title={"Login"} heading={"Change Password"} />

        <Notifications
          title={"Notifications"}
          heading={"Email Notifications"}
          user={user}
          updateUser={updateUser}
        />

        <UserActivity title={"User Activity"} heading={"View Activity Log"} />

        {isAdmin && (
          <Fragment>
            <h5 className={classes.title} style={{ marginBottom: 7 }}>
              User Management
            </h5>
            <h5 className={classes.subtitle}>
              You are an admin user of Juniper and have the permissions to add
              or remove other users. New users that are added get invited
              through an email link.
            </h5>

            <AddNewUser heading={"Add a new user"} setUsers={setUsers} />

            <ExistingUsers
              users={users}
              removeUser={removeUser}
              setUsers={setUsers}
              heading={"View existing users"}
            />
          </Fragment>
        )}
      </Container>
    </div>
  );
}
