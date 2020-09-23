import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { ContainedButton } from "../../../ui/Buttons";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ffffff",
    paddingLeft: 15,
  },
  select: {
    fontFamily: '"Roboto", sans-serif',
    paddingLeft: 10,
    fontSize: 16,
    lineHeight: 1.69,
    width: 450,
    paddingBottom: 8,
    "& .MuiSelect-root:focus": {
      backgroundColor: "#ffffff",
    },
  },
  menuitem: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#daf5ff",
    },
  },
});

export default function SettingsProfile({ user, updateUser }) {
  const classes = useStyles();
  const [department, setDepartment] = useState("");

  useEffect(() => {
    setDepartment(user.department);
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
          className={classes.select}
        >
          <MenuItem className={classes.menuitem} value={"DFAM"}>
            DFAM
          </MenuItem>
          <MenuItem className={classes.menuitem} value={"Office of Innovation"}>
            Office of Innovation
          </MenuItem>
          <MenuItem className={classes.menuitem} value={"ICTD"}>
            ICTD
          </MenuItem>
          <MenuItem className={classes.menuitem} value={"Operations (OOI)"}>
            Operations (OOI)
          </MenuItem>
          <MenuItem className={classes.menuitem} value={"WASH"}>
            WASH
          </MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <ContainedButton
          variant="contained"
          color="primary"
          onClick={() => {
            updateUser({ department });
          }}
          style={{ width: 202, marginTop: 35 }}
        >
          Save Changes
        </ContainedButton>
      </Grid>
    </Grid>
  );
}
