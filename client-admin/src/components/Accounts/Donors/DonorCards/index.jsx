import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ChevronRight } from '@material-ui/icons';

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



  donorinfo:
  {
    height: '71px',  
  },

  donorname:
  {
    fontSize: '24px',
    lineHeight: '28px',
    letterSpacing: 0,
    color: '#000000',
    fontWeight: 700,
  },


  amount:
  {
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

export default function DonorCards()
{
  const classes = useStyles();
  const numcards = 2;

  return (
     <div className={classes.root}>
      <div className={classes.numcards}>{numcards} DONOR ACCOUNTS</div>
      <Grid container className={classes.cardsection} spacing={4}>
        <Grid item>
          <DonorCard name= "Ethereum Foundation" amtETH="50" amtBTC="300"/>
        </Grid>
        <Grid item>
          <DonorCard />
        </Grid>
      </Grid>
      </div>
  )
}



type DonorCardProps = 
  {
    name: string,
    amtETH: number,
    amtBTC: number,
  }
  


export function DonorCard({name, amtETH, amtBTC}: DonorCardProps)
{
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.donorinfo}>
        <div className={classes.donorname}>
          {name}
        </div>
      </div>
      <div className={classes.amount}>
        {amtETH} ETH
      </div>
      <div className={classes.smalltext}>
        ETHER DONATED
      </div>
      <div className={classes.country}>
        198987124. USD
      </div>
      <div className={classes.smalltext}>
        CURRENT VALUE
      </div>
      <Button className={classes.button} size="small" color="primary">VIEW ACCOUNT DETAILS <ChevronRight/></Button>
    </Card>
  );
}