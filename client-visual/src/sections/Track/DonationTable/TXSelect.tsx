import React, { useState } from 'react'
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';


import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      //borderRadius: 4,
      //position: 'relative',
      backgroundColor: theme.palette.background.paper,
      borderBottom: '2px solid #0068ea',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: 'Cabin',
      fontSize: '10px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.83px',
      color: '#0068ea',
      textTransform: 'uppercase',
      marginBottom: '20px',
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px',
      
    },
    margin: {
      //margin: theme.spacing(1),
      width: '100%',
      //padding: '0px 20px 0px 10px',
    },
  }),
);


export const TXSelect = () =>
{
    const classes = useStyles();
    const [filtertype, setFilterType] = React.useState('10');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterType(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={filtertype}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={10}>All Transfers</MenuItem>
          <MenuItem value={20}>Received</MenuItem>
          <MenuItem value={30}>Invested</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
