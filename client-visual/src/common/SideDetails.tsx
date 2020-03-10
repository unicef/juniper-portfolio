import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    firstNumber: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '28px',
        fontWeight: 'bold',
        lineHeight: '1.32',
        color: '#fff'
    },
    firstLabel: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        letterSpacing:'1.17px',
        color: '#fff',
        textTransform:'uppercase'
    },
    middleNumber: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '28px',
        fontWeight: 'bold',
        lineHeight: '1.32',
        color: '#13e7ff',
        textTransform:'uppercase'
    },
    middleLabel: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        letterSpacing:'1.17px',
        color: '#13e7ff',
        textTransform:'uppercase'
    },
    lastNumber: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '28px',
        fontWeight: 'bold',
        lineHeight: '1.32',
        color: '#ffd113',
        textTransform:'uppercase'
    },
    lastLabel: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        letterSpacing:'1.17px',
        color: '#ffd113',
        textTransform:'uppercase'
    }
}))

export const SideDetails = (props: any) => {
    const classes = useStyles()

    return(
        <div>
            <div className={classes.firstNumber}>{props.firstNumber}</div>
            <div className={classes.firstLabel}>{props.firstLabel}</div>
            <div style={{ marginTop: '15px' }} className={classes.middleNumber}>{props.middleNumber}</div>
            <div className={classes.middleLabel}>{props.middleLabel}</div>
            <div style={{ marginTop: '15px' }} className={classes.lastNumber}>{props.lastNumber}</div>
            <div className={classes.lastLabel}>{props.lastLabel}</div>
        </div>
    )
}