import React, {useState} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { ProgressBarMobile } from './ProgressBar'
import { TXTable } from './TXDetailsTable'






const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      
    },
    label: {
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
        paddingBottom: '10px',
    },
    header: {
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
        //marginTop: '28px'
        paddingTop: '15px',
        paddingBottom: '10px',
    },
    header2: {
        width: '71px',
        fontFamily: 'IBM Plex Sans',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.38',
        letterSpacing: 'normal',
        color: '#000',
        paddingLeft: '43px',
        paddingTop: '45px'
    },
 
    amount: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '31px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.19',
        letterSpacing: 'normal',
        color: '#000',
        textTransform: 'uppercase',
        paddingLeft: '25px',
        paddingTop: '30px',
    },

    amountlabel: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingLeft: '25px', 
        paddingBottom: '50px',
    },


}));


export const TransactionDetailsMobile = (props: any) => {
    const classes = useStyles()
    return (
        <div>
            <Grid container className={classes.root}>
                
                <Grid item xs={1} zeroMinWidth={true}>
                    <ProgressBarMobile type={props.transactionType}/>
                </Grid>
            
                <Grid item xs={11}>
                    <div className={classes.label}>{props.transactionType}</div>
                    <div className={classes.header}>{props.startingParty}</div>
                    <div className={classes.label}>{props.partyType1}</div>
            
        
                    <div className={classes.header2}>{props.middleParty}</div>
                    <div className={classes.label}>{props.partyType2}</div>
        
                    <div className={classes.header2}>{props.endParty}</div>
                    <div className={classes.label}>{props.partyType3}</div>
    
                </Grid >
                
                <Grid item xs={12}>
                    <div className={classes.amount}>{props.valueMoving}</div>
                    <div className={classes.amountlabel}>{props.valueType}</div>
                </Grid>
            
            </Grid>
            {/*<div>
                <ProgressBar type={props.transactionType} />
            </div>
                <TXDetails rows={props.TXTableRows} />
            */}
            
        </div>
    )
}





