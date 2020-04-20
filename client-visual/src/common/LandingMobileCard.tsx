import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { HorizontalBar } from './HorizontalBar'

const useStyles = makeStyles({
    root: {
        // paddingTop:'90px'
    },
    title: {
        fontFamily: 'Cabin',
        fontSize: '82px',
        fontWeight:'bold',
        fontStretch:'normal',
        lineHeight:'0.46',
        letterSpacing:'normal',
        color: '#fff',
        paddingLeft: '-5px',
        paddingBottom:'37px'
    },
    img: {
        width:'200px',
        paddingTop:'58px'
    },
    text: {
        fontFamily:'IBM Plex Sans',
        fontSize: '16px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle: 'normal',
        lineHeight:'1.44',
        letterSpacing:'normal',
    },
    hb: {
      marginTop: '-13px',
    },
});
export const LandingMobileCard = (props: any) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container>
                    <Grid item xs={11}>
                        <span className={classes.title}><a href={props.link} style={{color: 'inherit', textDecoration:'inherit'}}>{props.title}</a></span>
                    </Grid>
                    <Grid item xs={1}>
                        <a href={props.link}><img alt='arrow' src='Arrow_white.svg' /></a>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <div className={classes.text} style={{color: props.colorOne, paddingTop:'37px'}}>
                            {props.lineOne}
                        </div>
                        <div className={classes.text} style={{color: props.colorTwo}}>
                            {props.lineTwo}
                        </div>
                        <div className={classes.text} style={{color: props.colorThree}}>
                            {props.lineThree}
                        </div>
                    </Grid>
                    <Grid item xs={4}><img className={classes.img} src={props.imageLink} alt='ratio of crypto pie chart' /></Grid>
                </Grid>
            </Grid>
            <div className = {classes.hb}> <HorizontalBar /></div>
        </div>
    )
}