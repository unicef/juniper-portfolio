import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ChevronRight } from '@material-ui/icons';

const useStyles = makeStyles({
  
    root:
    {
        fontSize: '19px',
        lineHeight: '27px',
        letterSpacing: 0,
        marginBottom: '50px',
    },

    gridcontainer: 
    {
        maxWidth: '903px'
    },

    regularweight: 
    {
        fontWeight: 400,
    },

    smalltext:
    {
      fontFamily: 'Cabin',
      fontSize: '10px',
      letterSpacing: '0.83px',
    },

    button:
    {
      fontFamily: 'Cabin',
      fontWeight: 'Bold',
      fontSize: '12px',
      letterSpacing: '1px',
      color: '#00aeef',
      marginLeft: '14px'
    }

  
    
  });

export default function NatcomSummary()
{
    const classes = useStyles();
    const blurb =  "Cryptofund donations are received by HQ through four National Committees - Australia, France, New Zealand, and the United States."
    return (
      <div className={classes.root}>
        <Typography variant="h1" style={{ marginBottom: '30px', marginTop: '50px' }}>4 NatComs</Typography>
        <Grid container className={classes.gridcontainer} spacing={4}>
          <Grid item lg={3}>
            <Typography variant="h2">100 ETH</Typography> 
            <Typography variant="h2" className={classes.regularweight}>21275.00 USD</Typography>
            <div className={classes.smalltext}>TOTAL ETHER INVESTED</div>        
          </Grid>
          <Grid item lg={3}>
            <Typography variant="h2">1 BTC</Typography> 
            <Typography variant="h2" className={classes.regularweight}>9644.32 USD</Typography>
            <div className={classes.smalltext}>TOTAL BITCOIN INVESTED</div>   
          </Grid>
          <Grid item lg={6}>
            <div style={{ paddingLeft: '16px' }}>{blurb}</div>
            <Button className={classes.button} size="small" color="primary">LEARN MORE ABOUT CRYPTOFUND <ChevronRight/></Button>
          </Grid>
        </Grid>
      </div>
  )   
}