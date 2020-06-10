import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ChevronRight } from '@material-ui/icons';
import { DonorModal } from '../DonorModal';

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
    fontFamily: "Roboto",
    fontSize: '24px',
    lineHeight: 1.17,
    letterSpacing:'normal',
    color: '#000000',
    fontWeight: 700,
  },

  usvalue: 
  {
    fontFamily: "Roboto",
    fontSize: '18px',
    lineHeight: 1.33,
    letterSpacing: "normal",
    fontStretch: "normal"
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

export default function DonorCards()
{
  const classes = useStyles();
  const numcards = 2;

  const ethfoundation = {
    name: "Ethereum Foundation",
    amtETH: 50,
    amtBTC: 10
  }

  const coinsense = {
    name: "Coinsense",
    amtBTC: 10
  }

  return (
     <div className={classes.root}>
      <div className={classes.numcards}>{numcards} DONOR ACCOUNTS</div>
      <Grid container className={classes.cardsection} spacing={4}>
        <Grid item>
          <DonorCard {...ethfoundation} />
        </Grid>
        <Grid item>
          <DonorCard {...coinsense}/>
        </Grid>
      </Grid>
      </div>
  )
}



type DonorCardData = 
  {
    name: string,
    amtETH: number,
    amtBTC: number,
  }
  

function ETHData({amtETH}: number)
{
  const classes = useStyles();

  if (amtETH)
  {
    return (
      <Grid item>
        <div className={classes.amount}>
          {amtETH} ETH
        </div>
        <div className={classes.smalltext}>
          ETHER DONATED
        </div>
        <div className={classes.usvalue}>
          198987124. USD
        </div>
        <div className={classes.smalltext}>
          CURRENT VALUE
        </div>
      </Grid>
    ) 
  }
  else
  return (null)
}


function BTCData({amtBTC}: number)
{
  const classes = useStyles();

  if (amtBTC)
  {
    return (
      <Grid item>
        <div className={classes.amount}>
          {amtBTC} BTC
        </div>
        <div className={classes.smalltext}>
          BITCOIN DONATED
        </div>
        <div className={classes.usvalue}>
          198987124. USD
        </div>
        <div className={classes.smalltext}>
          CURRENT VALUE
        </div>
      </Grid>
    ) 
  }
  else
  return (null)
}


export function DonorCard(props)
{
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
        <div className={classes.donorinfo}>
          <div className={classes.donorname}>
            {props.name}
          </div>
        </div>
        <Grid container spacing={10}>
            <ETHData amtETH={props.amtETH}/>
            <BTCData amtBTC={props.amtBTC} />
        </Grid>
        <Button className={classes.button} size="small" onClick={handleOpen} color="primary">VIEW ACCOUNT DETAILS <ChevronRight/></Button>
      </Card>

      <DonorModal open={modalopen} closefn={handleClose} details={props}/>
    </div>
  );
}