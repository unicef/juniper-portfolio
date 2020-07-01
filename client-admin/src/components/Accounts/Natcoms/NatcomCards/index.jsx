import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ChevronRight } from '@material-ui/icons';
import { NatcomModal } from '../NatcomModal';

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
    fontFamily: '"Roboto", sans-serif', 
    fontSize: '24px',
    lineHeight: 1.17,
    letterSpacing:'normal',
    color: '#000000',
    fontWeight: 700,
  },

  usvalue: 
  {
    fontFamily: '"Roboto", sans-serif', 
    fontSize: '18px',
    lineHeight: 1.33,
    letterSpacing: "normal",
    fontStretch: "normal"
  },


  amount:
  {
    fontFamily: '"Roboto", sans-serif', 
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: 0,
    fontWeight: 700,
    marginTop: '20px',
  },
  

  smalltext:
  {
    fontFamily: '"Cabin", sans-serif',
    size: '10px',
    letterSpacing: '0.83px',
    color: '#000000',
    paddingBottom: '20px'
  },

  button:
  {
    fontFamily: '"Cabin", sans-serif',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '1px',
    marginLeft: '-5px',
  },

  numcards:
  {
    fontFamily: '"Cabin", sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.78px',
    color: '#898989',
  }

});



export default function NatcomCards()
{
  const classes = useStyles();
  const [natcoms, setNatcoms] = useState([]);

  const getNatcoms = async () => {
    let res, natcoms;
    try {
      res = await fetch("/rest/admin/natcoms");
      natcoms = await res.json();
      setNatcoms(natcoms);
      console.log('Got natcom data: ', natcoms);
    } catch (e) {
      return console.log(e);
    }

  };


  useEffect(() => {
    getNatcoms();
  });

  return (
     <div className={classes.root}>
       <div className={classes.numcards}>{natcoms.length} NATCOM ACCOUNTS</div>
       <Grid container className={classes.cardsection} spacing={4}>
         {natcoms.map((ncom) =>
           <Grid item>
             <NatcomCard {...ncom}/>
           </Grid>
          )}
        </Grid>
      </div>
  )
}




function ETHData({amtETH}: number)
{
  const classes = useStyles();

  if (amtETH !=null)
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

  if (amtBTC !=null)
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


export function NatcomCard(props)
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
        <Button className={classes.button} size="small" color="primary" onClick={handleOpen}>VIEW ACCOUNT DETAILS <ChevronRight/></Button>
      </Card>
      <NatcomModal open={modalopen} closefn={handleClose} details={props} />
    </div>
  );
}