import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { debounce } from "../../../util";

const useStyles = makeStyles((theme) => ({
  colorPicker: {
    marginTop: "1em",
  },
  label: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    color: "#000000",
    fontWeight: 400,
    marginLeft: "1em",
  },
}));

export default function ({ onChange, className, color, label }) {
  const classes = useStyles();
  const id = Math.random();

  const handleChange = debounce((newColor) => {
    onChange(newColor);
  }, 100);

  return (
    <div className={`${classes.colorPicker} ${className}`}>
      <input
        type="color"
        id={id}
        name={id}
        value={color}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
