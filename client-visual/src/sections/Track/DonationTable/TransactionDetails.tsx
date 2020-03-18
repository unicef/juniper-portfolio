import React, {useState} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { ProgressBar } from './ProgressBar'
import { TXTable } from './TXDetailsTable'






const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: '837 px',
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
            <TXDetails rows={props.TXTableRows}/>
            
        </div>
    )
}




export const TXDetails = (props:any) =>
{
    const [expand, setExpand] = React.useState(false);

    const classes = useStyles();
  
    
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
                <TXTable rows={props.rows}/>
                <div style={{ color: '#0068ea', display: 'inline-block', verticalAlign: 'top' }} className={classes.txDetails}><ExpandLessIcon onClick={() => setExpand(!expand)} />Hide Transaction Details</div>
            </div>    
         )
    }

    
}
