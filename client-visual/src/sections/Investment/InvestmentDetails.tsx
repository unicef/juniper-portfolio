import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme:any) => ({
    root: {
        width: '903px',
        height: '496px',
        opacity: '0.84',
        marginTop:'-300px'
    },
    title: {
        paddingLeft:'170px',
        paddingTop:"65px",
        width: '643px',
        height: '132px',
        fontFamily: 'Cabin',
        fontSize: '36px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
    },
    label1: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
        textTransform:'uppercase'
    },
    label2: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
        textTransform:'uppercase'
    },
    label3: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
        textTransform:'uppercase'
    },
    detail1: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '31px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.19',
        letterSpacing: 'normal',
    },
    detail2: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '31px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.19',
        letterSpacing: 'normal',
    },
    detail3: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '31px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.19',
        letterSpacing: 'normal',
    },
    button: {
        textTransform:'uppercase',
        backgroundColor:'black',
        color:'#fff',
        width: '165px',
        height: '50px',
        borderRadius: '5px',
        fontFamily:'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
    },
    link: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
        textTransform:'uppercase'
    }
}))


export const InvestmentDetails = (props: any) => {
    const classes = useStyles()
    return(
        <div style={{backgroundColor: props.color, color: props.fontColor}}className={classes.root}>
            <Grid container>
                <Grid item>
                    <div className={classes.title}>{props.title}</div>
                </Grid>
            </Grid>
            <Grid container style={{paddingLeft:'170px', paddingTop:'25px'}}>
                <Grid item>
                    <div className={classes.label1}>{props.label1}</div>
                </Grid>
                <Grid item>
                    <div style={{paddingLeft:'117px'}} className={classes.label2}>{props.label2}</div>
                </Grid>
                <Grid item>
                    <div style={{paddingLeft:'71px'}} className={classes.label3}>{props.label3}</div>
                </Grid>
            </Grid>
            <Grid container style={{paddingLeft:'170px', paddingTop:'5px'}}>
                <Grid item>
                    <div className={classes.detail1}>{props.detail1}</div>
                </Grid>
                <Grid item>
                    <div style={{paddingLeft:'60px'}} className={classes.detail2}>{props.detail2}</div>
                </Grid>
                <Grid item>
                    <div style={{paddingLeft:'60px'}} className={classes.detail3}>{props.detail3}</div>
                </Grid>
            </Grid>
            <Grid container style={{paddingLeft:'170px', paddingTop:'50px'}}>
                <Grid item>
                    <Button className={classes.button}>{props.button}</Button>
                </Grid>
            </Grid>
            <Grid container style={{paddingLeft:'170px', paddingTop:'15px'}}>
                <Grid item>
                    <div className={classes.link}>Transaction Proof</div>
                </Grid>
            </Grid>
        </div>
    )
}