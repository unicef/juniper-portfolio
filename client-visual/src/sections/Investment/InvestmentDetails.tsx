import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
    investmentDetailsDot: {
        height: '428px',
        width: '428px',
        backgroundColor: '#ffd113',
        borderRadius: '50%',
        display: 'inline-block',
        marginTop:'177px',
        marginLeft:'1081px'
    },
    numberText:{
        textTransform: 'uppercase',
        fontFamily:'IBM Plex Sans',
        fontSize:'31px',
        fontWeight:'bold',
        fontStretch:'noraml',
        fontStyle:'normal',
        lineHeight:'1.19',
        letterSpacing:'normal',
        color:'#000'
    },
    plainText:{
        textTransform: 'uppercase',
        fontFamily:'Cabin',
        fontSize:'14px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'1.17px',
        color:'#000'
    },
    center: {
        margin: 'auto',
        width: '50%',
    }
}));

export const InvestmentDetails = () => {
    const classes = useStyles()
    return(
        <div style={{display:'inline-block'}}  className={classes.investmentDetailsDot}>
        <div className={classes.center}>
            <div style={{paddingTop:'112px'}}>
                <div className={classes.numberText}>08</div>
                <div className={classes.plainText}>our investments</div>
            </div>
            <div style={{paddingTop:'18px'}}>
                <div className={classes.numberText}>50 btc</div>
                <div className={classes.plainText}>bitcoin invested</div>
            </div>
            <div style={{paddingTop:'18px'}}>
                <div className={classes.numberText}>20000 eth</div>
                <div className={classes.plainText}>ether invested </div>
            </div>
        </div>
    </div>
    )
}