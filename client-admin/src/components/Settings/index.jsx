import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ExpansionList from "../../ui/ExpansionPanel";
import LoginSettings from "./Login";
import Notifications from "./Notifications";
import UserActivity from "./UserActivity";
import Profile from "./Profile";
import WorkDetails from "./WorkDetails";
import AddNewUser from "./UserManagement/AddNewUser";
import ExistingUsers from "./UserManagement/ExistingUsers";

const styles = (theme) => ({
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
});

class Settings extends React.Component {
  render() {
    const { classes, user, updateUser } = this.props;

    return (
      <div className={classes.root}>
        <Container maxWidth="md">
          <h5 className={classes.title}>Profile</h5>
          <ExpansionList heading={"Work Details"}>
            <WorkDetails user={user} />
          </ExpansionList>
          <Profile user={user} updateUser={updateUser} />
          <h5 className={classes.title}>Login</h5>
          <ExpansionList title={"Login"} heading={"Change Password"}>
            <LoginSettings />
          </ExpansionList>
          <h5 className={classes.title}>Notifications</h5>
          <ExpansionList
            title={"Notifications"}
            heading={"Email Notifications"}
          >
            <Notifications user={user} />
          </ExpansionList>
          <h5 className={classes.title}>User Activity</h5>
          <ExpansionList title={"User Activity"} heading={"View Activity Log"}>
            <UserActivity />
          </ExpansionList>
          <h5 className={classes.title} style={{ marginBottom: 7 }}>
            User Management
          </h5>
          <h5 className={classes.subtitle}>
            You are an admin user of Juniper and have the permissions to add or
            remove other users. New users that are added get invited through an
            email link.
          </h5>
          <ExpansionList heading={"Add a new user"}>
            <AddNewUser />
          </ExpansionList>

          <ExpansionList heading={"View existing users"}>
            <ExistingUsers />
          </ExpansionList>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
