import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { DonorCreateModal } from '../DonorCreateModal';
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
    }, 

  createbutton: 
  {
    backgroundColor: "#00aeef",
    color: '#ffffff',
    fontFamily: 'Cabin',
    fontWeight: 'Bold',
    fontSize: '12px',
    letterSpacing: '1px',
    margin: '30px 0px',
    padding: '10px',

  }

  
    
  });

export default function DonorSummary()
{
    const classes = useStyles();
    const blurb =  "In line with current UNICEF practice, each crypto transaction is initiated after UNICEF has completed due diligence on a donor, ensuring a credible source of the donation."
    const [modalopen, setmodalopen] = React.useState(false);

    const handleOpen = () => {
      setmodalopen(true);
    };

    const handleClose = () =>{
      setmodalopen(false);
     };
    return (
      <div className={classes.root}>
        <Typography variant="h1" style={{ marginBottom: '30px', marginTop: '50px' }}>2 donors</Typography>
        <Grid container className={classes.gridcontainer} spacing={4}>
          <Grid item lg={3}>
            <Typography variant="h2">50 ETH</Typography> 
            <Typography variant="h2" className={classes.regularweight}>18976.50 USD</Typography>
            <div className={classes.smalltext}>TOTAL ETHER DONATED</div>        
          </Grid>
          <Grid item lg={3}>
            <Typography variant="h2">1 BTC</Typography> 
            <Typography variant="h2" className={classes.regularweight}>9644.32 USD</Typography>
            <div className={classes.smalltext}>TOTAL BITCOIN DONATED</div>   
          </Grid>
          <Grid item lg={6}>
            <div style={{ paddingLeft: '16px' }}>{blurb}</div>
            <Button className={classes.button} size="small" color="primary">LEARN MORE ABOUT CRYPTOFUND <ChevronRight/></Button>
          </Grid>
        </Grid>
        <Button className={classes.createbutton} onClick={handleOpen}>CREATE DONOR ACCOUNT</Button>
        <DonorCreateModal open={modalopen} closefn={handleClose}/>
      </div>
  )   
}