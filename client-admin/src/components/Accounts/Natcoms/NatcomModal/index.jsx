import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import CopyToClipboardBtn from '../../../../ui/CopyToClipboardBtn';


const useStyles = makeStyles({
    root:
    {
        width: '642px',
        margin: 'auto',
        backgroundColor: '#ffffff',
        outline: 0,
        fontFamily: '"Roboto", sans-serif',
        overflowY: 'auto',
        overflowX: 'hidden',
    },

    blue:
    {
        width: "100%",
        backgroundColor: '#daf5ff',
    },

    body:
    {
        padding: '36px 40px',
    },

    title:
    {
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '28px',
        letterSpacing: '0',
        paddingBottom: '30px'
    },

    large:
    { 
        fontSize: '18px',
        lineHeight: 1.33, 
    },


    waddr:
    {
        fontSize: '14px',
        lineHeight: '1.57',
        marginTop: '20px',
    },
    
    tiny:
    {
        fontFamily: '"Cabin", sans-serif',
        fontSize: '10px',
        letterSpacing: '0.83px',
        marginBottom: '20px',
    },

    currentvalue:
    {
        fontSize: '14px',
        lineHeight: '22px',
        color: '#898989',
    },


    largegrey:
    {

        fontFamily: '"Cabin", sans-serif',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: 2,
        letterSpacing: '0.78px',
        color: '#898989',
        marginBottom: '20px'
    }, 

    roboto19:
    {
        fontFamily: '"Roboto", sans-serif',
        fontSize: '19px',
        lineHeight: 1.42,
        color: '#000000'
  },
    
    closebtn:
    {
      position: 'absolute',
      top: 0,
      right:0,
    }


});

function ETHData({amtETH}: number)
{
const classes = useStyles();

  if (amtETH)
  {
    return (
      <Grid container spacing={5}>
        <Grid item>
          <div className={classes.large} style={{fontWeight: 'bold'}}>{amtETH} ETH</div>
          <div className={classes.tiny}>ETHER DONATED</div>
        </Grid>
        <Grid item>
          <div className={classes.large}>9823.50 USD</div>
          <div className={classes.tiny}>CURRENT VALUE</div>
        </Grid>
        <Grid item>
          <div className={classes.large}>9341.00 USD</div>
          <div className={classes.tiny}>VALUE AT RECEIPT</div>   
        </Grid>
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
      <Grid container spacing={5}>
          <Grid item>
              <div className={classes.large} style={{fontWeight: 'bold'}}>{amtBTC} BTC</div>
              <div className={classes.tiny}>BITCOIN DONATED</div>
        </Grid>
        <Grid item>
          <div className={classes.large}>6543.50 USD</div>
          <div className={classes.tiny}>CURRENT VALUE</div>
        </Grid>
        <Grid item>
          <div className={classes.large}>7002.00 USD</div>
          <div className={classes.tiny}>VALUE AT RECEIPT</div>   
        </Grid>
      </Grid>
  ) 
}
else
return (null)
}

export function NatcomModal(props) {
  const classes = useStyles();

  return (
      <Modal
        open={props.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.root}  
      >
          <div className={classes.root}>
              <div className={classes.blue}>
                <div className={classes.body}>
                  <div className={classes.title}>{props.details.name}</div>
                    <ETHData amtETH={props.details.amtETH}/>
                    <BTCData amtBTC={props.details.amtBTC} />
                    
            <div className={classes.waddr}>
              {props.details.walletaddress}
              <CopyToClipboardBtn data={props.details.walletaddress} />
            </div>
  
                  <div className={classes.tiny}>WALLET ADDRESS</div>
                  <div className={classes.currentvalue}>
                    <p style={{marginBottom: 0}}>
                      <span style={{ fontWeight: 'bold' }}>Current value</span>
                      = USD average accross three cryptoexchanges, calculated at 12:01 p.m. (EST)
                    </p>
                    <p style={{marginTop: 0}}>
                      <span style={{fontWeight:'bold'}}>Value at receipt</span>
                      = USD average accross three cryptoexchanges, calculated at 12:01 p.m. (EST) on the day of the transaction.
                    </p>
                 </div>
                </div>
              </div>

              <div className={classes.body}>
                  <div className={classes.largegrey}>Donation 1 details</div>
                  <div className={classes.roboto19}>March 29, 2020</div>
                  <div className={classes.tiny}>DONATION DATE</div>
              </div>
        
        <Button className={classes.closebtn} onClick={props.closefn}>X</Button>
             
      </div>
      
    </Modal>
  );
}
