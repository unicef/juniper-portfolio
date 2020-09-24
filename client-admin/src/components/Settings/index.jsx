import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ExpansionList from "../../ui/ExpansionPanel";
import LoginSettings from "./Login";
import Notifications from "./Notifications";
import UserActivity from "./UserActivity";
import Profile from "./Profile";
import WorkDetails from "./WorkDetails";
import AddNewUser from "./UserManagement/AddNewUser";
import ExistingUsers from "./UserManagement/ExistingUsers";
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
        <h5 className={classes.title}>Profile</h5>
        <ExpansionList heading={"Work Details"}>
          <WorkDetails user={user} updateUser={updateUser} />
        </ExpansionList>
        <Profile user={user} updateUser={updateUser} />
        <h5 className={classes.title}>Login</h5>
        <ExpansionList title={"Login"} heading={"Change Password"}>
          <LoginSettings />
        </ExpansionList>
        <h5 className={classes.title}>Notifications</h5>
        <ExpansionList title={"Notifications"} heading={"Email Notifications"}>
          <Notifications user={user} updateUser={updateUser} />
        </ExpansionList>
        <h5 className={classes.title}>User Activity</h5>
        <ExpansionList title={"User Activity"} heading={"View Activity Log"}>
          <UserActivity />
        </ExpansionList>
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
            <ExpansionList heading={"Add a new user"}>
              <AddNewUser setUsers={setUsers} />
            </ExpansionList>

            <ExpansionList heading={"View existing users"}>
              <ExistingUsers
                users={users}
                removeUser={removeUser}
                setUsers={setUsers}
              />
            </ExpansionList>
          </Fragment>
        )}
      </Container>
    </div>
  );
}
