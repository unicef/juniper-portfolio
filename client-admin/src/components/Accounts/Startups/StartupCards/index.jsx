import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ChevronRight } from '@material-ui/icons';
import { StartupModal } from '../StartupModal';

const useStyles = makeStyles({
  
  root:
  {
    backgroundColor: "#f8f8f8",
  },
  
  cardsection:
  {
    marginTop: '20px',  
  },
  

  card:
  {
    width: '435px',
    height: '297px',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
    padding: '25px 30px',
  },

  image: 
  {
    width: '125px',
    height: '71px',
    marginRight: '20px',
  },

  startupinfo:
  {
    height: '71px',  
  },

  startupname:
  {
    fontSize: '24px',
    lineHeight: '28px',
    letterSpacing: 0,
    color: '#000000',
    fontWeight: 700,
  },

  country: 
  {
    fontFamily: "Roboto",
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: 0,
  },

  amount:
  {
    fontFamily: "Roboto",
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: 0,
    fontWeight: 700,
    marginTop: '20px',
  },
  

  smalltext:
  {
    fontFamily: 'Cabin',
    size: '10px',
    letterSpacing: '0.83px',
    color: '#000000',
    paddingBottom: '20px'
  },

  button:
  {
    fontFamily: 'Cabin',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '1px',
    marginLeft: '-5px',
  },

  numcards:
  {
    fontFamily: 'Cabin',
    fontSize: '14px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.78px',
    color: '#898989',
  }

});

export default function StartupCards()
{
  const classes = useStyles();
  const [startups, setStartups] = useState([]);


  const getStartups = async () => {
    let res, startups;
    try {
      res = await fetch("/rest/admin/startups");
      startups = await res.json();
      setStartups(startups);
      console.log('Got startup data: ', startups);
    } catch (e) {
      return console.log(e);
    }

  
  };


  useEffect(() => {
    getStartups();
  }, [startups]);
    


  return (
     <div className={classes.root}>
      <div className={classes.numcards}>{startups.length} STARTUP ACCOUNTS</div>
      <Grid container className={classes.cardsection} spacing={4}>
         {startups.map((startup) =>
           <Grid item>
             <StartupCard {...startup}/>
           </Grid>
          )}
      </Grid>
      </div>
  )
}





export function StartupCard(props) {
  const classes = useStyles();

  const [modalopen, setmodalopen] = React.useState(false);

  const handleOpen = () => {
    setmodalopen(true);
  };

  const handleClose = () =>
  {
    setmodalopen(false);
  }



  return (
    <div>
    <Card className={classes.card} variant="outlined">
      <img src={props.imageurl} alt="" className={classes.image} align='left'/>
      <div className={classes.startupinfo}>
        <div className={classes.startupname}>
          {props.name}
        </div>
        <div className={classes.country}>
          {props.country}
        </div>
      </div>
      <div className={classes.amount}>
        {props.amount} {props.shortcurrency}
      </div>
      <div className={classes.smalltext}>
        {props.currency} INVESTED
      </div>
      <div className={classes.country}>
        198987124. USD
      </div>
      <div className={classes.smalltext}>
        CURRENT VALUE
      </div>
      <Button className={classes.button} size="small" color="primary"  onClick={handleOpen} >VIEW ACCOUNT DETAILS <ChevronRight/></Button>
    </Card>

      <StartupModal open={modalopen} closefn={handleClose} details={props}/>
      </div>
  );
}