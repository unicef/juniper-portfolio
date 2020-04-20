import React from 'react'
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';


import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Transaction } from './Transaction'
import { Received } from './Received'
import { Invested } from './Invested'

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
      padding: '10px 26px 15px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: 'Cabin',
      fontSize: '12px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '1px',
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
      width: '100%',
    },

    icon: {
      fill: '#0068ea',
      fontSize: '30px',
      marginTop: '-18px'
    }
  }),
);


export const ViewSwitcher = (props:any) =>
  {
    switch (props.type)
    {
        case '10': return (<div><Transaction /></div>)
        case '20': return (<div><Received /> </div>)
        case '30': return (<div> <Invested /> </div>)
        default: return <Transaction />
    }
  }


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
          IconComponent={ExpandMoreIcon}
          inputProps = {{
            classes: {
              icon: classes.icon,
            }
          }}
        >
          <MenuItem value={'10'}>All Transfers</MenuItem>
          <MenuItem value={'20'}>Received</MenuItem>
          <MenuItem value={'30'}>Invested</MenuItem>
        </Select>
      </FormControl>

      <ViewSwitcher type={filtertype}/>

    </div>
  );
}


