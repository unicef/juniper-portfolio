import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
    donorDetailsDot: {
        height: '368px',
        width: '368px',
        backgroundColor: '#0068ea',
        borderRadius: '50%',
        display: 'inline-block',
        marginTop:'216px',
        marginLeft:'-63px'
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
        color:'#fff'
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
        color:'#fff'
    },
    center: {
        margin: 'auto',
        width: '50%',
        // textAlign: 'center'
    }
}));

export const DonorDetails = () => {
    const classes = useStyles();
    return (
        <div style={{display:'inline-block'}}  className={classes.donorDetailsDot}>
            <div className={classes.center}>
                <div style={{paddingTop:'75px'}}>
                    <div className={classes.numberText}>03</div>
                    <div className={classes.plainText}>our donors</div>
                </div>
                <div style={{paddingTop:'18px'}}>
                    <div className={classes.numberText}>90 btc</div>
                    <div className={classes.plainText}>bitcoin received</div>
                </div>
                <div style={{paddingTop:'18px'}}>
                    <div className={classes.numberText}>25000 eth</div>
                    <div className={classes.plainText}>ether received </div>
                </div>
            </div>
        </div>
    )
}