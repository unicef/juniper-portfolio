import React, {useState} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { ProgressBar } from './ProgressBar'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';




const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: '837px',
        //height: '245px',
        height: 'auto',
        marginLeft: '114px',
        marginBottom: '50px',
        paddingBottom: '30px'
      
    },
    transactionType: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingTop: '30px',
        paddingLeft: '75px',
    },
    startingParty: {
        width: '132px',
        fontFamily: 'IBM Plex Sans',
        fontSize: '26px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.15',
        letterSpacing: 'normal',
        color: '#000',
        marginLeft: '43px',
        marginTop: '28px'
    },
    middleParty: {
        width: '71px',
        fontFamily: 'IBM Plex Sans',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.38',
        letterSpacing: 'normal',
        color: '#000',
        paddingLeft: '83px',
        paddingTop: '30px'
    },
    endParty: {
        width: '71px',
        fontFamily: 'IBM Plex Sans',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.38',
        letterSpacing: 'normal',
        color: '#000',
        paddingLeft: '83px',
        paddingTop: '30px'

    },
    partyType1: {
        width: '169px',
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingLeft: '43px'
    },
    partyType2: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingLeft: '83px',
        paddingTop: '6px'
    },
    partyType3: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingLeft: '83px',
        paddingTop: '6px'
    },
    valueMoving: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '31px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.19',
        letterSpacing: 'normal',
        color: '#000',
        textTransform: 'uppercase',
        paddingLeft: '66px',
        paddingTop: '40px'
    },
    valueType: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingLeft: '66px',
        paddingTop: '6px'
    },
    txDetails: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#0068ea',
        textTransform: 'uppercase',
        paddingLeft: '38px',
        paddingTop: '0px'
    },
    txDetailsHeader: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingLeft: '43px',
        paddingTop: '6px',
    },

    txSeparrator:
    {
        color: '#ffffff',
        paddingLeft: '66px',
        paddingTop: '6px',
        width: '837px',
    },

    txtable: {
        marginLeft: '16px'
    },

    tableheader: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingTop: '5px',
        borderBottom: 'none',
    },

    txtablecell:
    {
        borderBottom: 'none',
    },


}));

export const TransactionDetails = (props: any) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {/* <div className={classes.transactionType}>Received</div> */}
            <div className={classes.transactionType}>{props.transactionType}</div>
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div className={classes.startingParty}>{props.startingParty}</div>
                <div className={classes.partyType1}>{props.partyType1}</div>
            </div>
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div className={classes.middleParty}>{props.middleParty}</div>
                <div className={classes.partyType2}>{props.partyType2}</div>
            </div>
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div className={classes.endParty}>{props.endParty}</div>
                <div className={classes.partyType3}>{props.partyType3}</div>
            </div>
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div className={classes.valueMoving}>{props.valueMoving}</div>
                <div className={classes.valueType}>{props.valueType}</div>
            </div>
            <div>
                <ProgressBar type={props.transactionType} />
            </div>
            <TXDetails />
            
        </div>
    )
}


/* TX Details table*/

function createData(from: string, recipient:string, amount:string, time:string, txhash:string) {
    return { from, recipient, amount, time, txhash };
  }
  
  const rows = [
    createData('UNICEF France', 'UNICEF HQ', '10,000 ETH', 'Today at 17:09' , 'jk67445klc788rejaqdfgh...'),
    createData('Coinscene', 'UNICEF France', '10,000 ETH', 'Today at 15:49', '0x36c874d0218cdc790...'),
  ];
  
export const TXTable = () =>
{
    const classes = useStyles();
    return (
        <TableContainer className={classes.txtable}>
          <Table className={classes.txtable} size="small" aria-label="a dense table">
                <TableHead>
              <TableRow>
                <TableCell className={classes.tableheader} align= "left">From</TableCell>
                <TableCell className={classes.tableheader} align="left">Recipient</TableCell>
                <TableCell className={classes.tableheader} align="left">Amount</TableCell>
                <TableCell className={classes.tableheader} align="left">Time</TableCell>
                <TableCell  className={classes.tableheader}align="left">Transaction Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.from}>
                  <TableCell className={classes.txtablecell} component="th" scope="row">
                    {row.from}
                  </TableCell>
                  <TableCell className={classes.txtablecell} align="left">{row.recipient}</TableCell>
                  <TableCell className={classes.txtablecell} align="left">{row.amount}</TableCell>
                  <TableCell className={classes.txtablecell} align="left">{row.time}</TableCell>
                  <TableCell className={classes.txtablecell} align="left">{row.txhash}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    
}


export const TXDetails = () =>
{
    const [expand, setExpand] = React.useState(false);

    const classes = useStyles()
  
    
    if (expand == false)
    {
     return(<div style={{ color: '#0068ea', display: 'inline-block', verticalAlign: 'top' }} className={classes.txDetails}><ExpandMoreIcon onClick={() => setExpand(!expand)}/>Show Transaction Details</div>)     
    }
    else
    {
        return (
            <div >

                <div className={classes.txDetailsHeader}>TRANSACTION DETAILS
                <hr></hr>
                </div> 
                <TXTable />
                <div style={{ color: '#0068ea', display: 'inline-block', verticalAlign: 'top' }} className={classes.txDetails}><ExpandLessIcon onClick={() => setExpand(!expand)} />Hide Transaction Details</div>
            </div>    
         )
    }

    
}
