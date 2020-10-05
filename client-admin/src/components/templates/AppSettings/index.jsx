import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import ContainedButton from "../../atoms/Button/Contained";
import ExpansionList from "../../organisms/ExpansionPanel";
import ColorPicker from "../../atoms/ColorPicker";
import FileUpload from "../../atoms/FileUpload";

import { saveAppSettings } from "../../../actions";

const useStyles = makeStyles({
  root: {
    paddingLeft: 15,
  },
  logo: {
    width: 200,
    height: 30,
  },
  divider: {
    marginTop: "2em",
    marginBottom: "2em",
    backgroundColor: "rgba(0,0,0,0.12)",
  },
});

export default function AppSettings({
  heading,
  title,
  appSettings,
  setAppSettings,
}) {
  const classes = useStyles();

  const saveSettings = async () => {
    await saveAppSettings(appSettings);
  };

  const changeAppSettings = async (attribute) => {
    const settings = { ...appSettings, ...attribute };

    setAppSettings(settings);
  };

  return (
    <ExpansionList title={title} heading={heading}>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <ColorPicker
            color={appSettings.primaryColor}
            onChange={(value) => {
              changeAppSettings({ primaryColor: value });
            }}
            label="Primary Color"
          />
          <ColorPicker
            color={appSettings.darkPrimaryColor}
            onChange={(value) => {
              changeAppSettings({ darkPrimaryColor: value });
            }}
            label="Dark Primary Color"
          />
          <ColorPicker
            color={appSettings.lightPrimaryColor}
            onChange={(value) => {
              changeAppSettings({ lightPrimaryColor: value });
            }}
            label="Light Primary Color"
          />
        </Grid>
        <Grid item xs={6}>
          <ColorPicker
            color={appSettings.containedButtonHover}
            onChange={(value) => {
              changeAppSettings({ containedButtonHover: value });
            }}
            label="Contained Button Hover"
          />
          <ColorPicker
            color={appSettings.containedButtonActive}
            onChange={(value) => {
              changeAppSettings({ containedButtonActive: value });
            }}
            label="Contained Button Active"
          />
          <ColorPicker
            color={appSettings.textButtonHover}
            onChange={(value) => {
              changeAppSettings({ textButtonHover: value });
            }}
            label="Text Button Hover"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            url={"/upload/image"}
            afterUpload={(json) => {
              changeAppSettings({ logoUrl: json.imageUrl });
            }}
          >
            <img className={classes.logo} src={appSettings.logoUrl} />
          </FileUpload>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <ContainedButton onClick={saveSettings}>
            Save Settings
          </ContainedButton>
        </Grid>
      </Grid>
    </ExpansionList>
  );
}
