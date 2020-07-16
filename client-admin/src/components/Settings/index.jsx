import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ExpansionPanel from "../../ui/ExpansionPanel";
import LoginSettings from "./Login";
import UserActivity from "./UserActivity";

const styles = (theme) => ({
  root: {
    marginTop: "5em",
    backgroundColor: "#f8f8f8",
    width: "100%",
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Settings extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Container maxWidth="md">
          <h5 className={classes.title}>Login</h5>
          <ExpansionPanel title={"Login"} heading={"Change Password"}>
            <LoginSettings />
          </ExpansionPanel>
          <h5 className={classes.title}>Notifications</h5>
          <ExpansionPanel
            title={"Notifications"}
            heading={"Email Notifications"}
          />
          <h5 className={classes.title}>User Activity</h5>
          <ExpansionPanel title={"User Activity"} heading={"View Activity Log"}>
            <UserActivity />
          </ExpansionPanel>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
