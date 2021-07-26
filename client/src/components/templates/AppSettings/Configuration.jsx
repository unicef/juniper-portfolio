import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import GenerateLinkIcon from "../../atoms/Icons/GenerateLinkIcon";
import EnvelopeIcon from "../../atoms/Icons/EnvelopeIcon";
import CancelIcon from "../../atoms/Icons/CancelIcons";
import { copyToClipboard } from "../../../actions";
import { monthNames } from "../../../util";
import TextButton from "../../atoms/Button/TextIcon";
import ExpansionList from "../../organisms/ExpansionPanel";
import ContainedButton from "../../atoms/Button/Contained";

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
  addDepartment: {
    width: "100%",
  },
}));

export default function ActivityList({
  title,
  heading,
  appSettings,
  saveAppSettings,
  setAppSettings,
}) {
  const classes = useStyles();
  const [newDept, setNewDept] = useState("");
  const [departments, setDepartments] = useState(appSettings.departments || []);

  async function addDepartment() {
    departments.push(newDept);

    appSettings.departments = departments.slice();
    setDepartments(departments.slice());
    await saveAppSettings(appSettings, setAppSettings);
    setNewDept("");
  }

  async function removeDepartment(index) {
    departments.splice(index, 1);

    appSettings.departments = departments.slice();
    setDepartments(departments.slice());
    await saveAppSettings(appSettings, setAppSettings);
  }

  return (
    <ExpansionList title={title} heading={heading}>
      <List component="nav" className={classes.root}>
        <Fragment>
          <Divider />
          <ListItem className={classes.listItem}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <h3>Add/Edit Departments</h3>
                <TextField
                  className={classes.addDepartment}
                  value={newDept}
                  onChange={(e) => {
                    setNewDept(e.target.value);
                  }}
                />
                <ContainedButton
                  onClick={addDepartment}
                  style={{ width: 202, marginTop: 19, paddingLeft: 15 }}
                >
                  Add Department
                </ContainedButton>
                <List>
                  {departments.map((dept, index) => {
                    return (
                      <ListItem key={index} className={classes.listItem}>
                        <Grid container>
                          <Grid item xs={10}>
                            {dept}
                          </Grid>
                          <Grid item xs={2}>
                            <ContainedButton
                              onClick={() => {
                                removeDepartment(index);
                              }}
                            >
                              Delete
                            </ContainedButton>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </ListItem>
        </Fragment>
      </List>
    </ExpansionList>
  );
}
