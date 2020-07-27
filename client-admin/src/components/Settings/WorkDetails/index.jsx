import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ffffff",
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
  filledButton: {
    width: 202,
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
    marginTop: 35,
  },
});

export default function SettingsProfile() {
  const classes = useStyles();
  const [workUnit, setWorkUnit] = useState(null);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Select
          value={workUnit}
          onChange={(e) => {
            setWorkUnit(e.target.value);
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
        <Button
          className={classes.filledButton}
          variant="contained"
          color="primary"
        >
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
}
