import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      width:'837px',
      height:'245px',
      marginLeft:'114px'
    },
    transactionType: {
        fontFamily: 'Cabin',
        fontSize:'10px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'0.83px',
        color:'#000',
        textTransform: 'uppercase',
        paddingTop:'30px',
        paddingLeft:'75px',
    },
    startingParty: {
        width:'132px',
        fontFamily: 'IBM Plex Sans',
        fontSize:'26px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.15',
        letterSpacing:'normal',
        color:'#000',
        marginLeft: '43px',
        marginTop: '28px'
    },
    middleParty: {
        width:'71px',
        fontFamily: 'IBM Plex Sans',
        fontSize:'16px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.38',
        letterSpacing:'normal',
        color:'#000',
        paddingLeft:'83px',
        paddingTop:'30px'
    },
    endParty: {
        width:'71px',
        fontFamily: 'IBM Plex Sans',
        fontSize:'16px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.38',
        letterSpacing:'normal',
        color:'#000',
        paddingLeft:'83px',
        paddingTop:'30px'

    },
    partyType1: {
        width:'169px',
        fontFamily: 'Cabin',
        fontSize:'10px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'0.83px',
        color:'#000',
        textTransform: 'uppercase',
        paddingLeft:'43px'
    },
    partyType2: {
        fontFamily: 'Cabin',
        fontSize:'10px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'0.83px',
        color:'#000',
        textTransform: 'uppercase',
        paddingLeft:'83px',
        paddingTop:'6px'
    },
    partyType3: {
        fontFamily: 'Cabin',
        fontSize:'10px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'0.83px',
        color:'#000',
        textTransform: 'uppercase',
        paddingLeft:'83px',
        paddingTop:'6px'
    },
    valueMoving: {
        fontFamily: 'IBM Plex Sans',
        fontSize:'31px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.19',
        letterSpacing:'normal',
        color:'#000',
        textTransform: 'uppercase',
        paddingLeft:'66px',
        paddingTop:'40px'
    },
    valueType: {
        fontFamily: 'Cabin',
        fontSize:'10px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'0.83px',
        color:'#000',
        textTransform: 'uppercase',
        paddingLeft:'66px',
        paddingTop:'6px'
    },
    txDetails: {
        fontFamily: 'Cabin',
        fontSize:'10px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'0.83px',
        color:'#0068ea',
        textTransform: 'uppercase',
        paddingLeft: '43px',
        paddingTop: '30px'
    },
}))

export const TransactionDetails = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.transactionType}>Received</div>
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div className={classes.startingParty}>Ethereum Foundation</div>
                <div className={classes.partyType1}>Donor</div>
            </div>
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div className={classes.middleParty}>UNICEF France</div>
                <div className={classes.partyType2}>National Committee</div>
            </div>
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div className={classes.endParty}>UNICEF HQ</div>
                <div className={classes.partyType3}>Recipient</div>
            </div>
            <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div className={classes.valueMoving}>20,000 ETH</div>
                <div className={classes.valueType}>Crypto Received</div>
            </div>
            <div style={{color:'#0068ea', display:'inline-block', verticalAlign:'top' }} className={classes.txDetails}><ExpandMoreIcon />Show Transaction Details</div>
        </div>
    )
}