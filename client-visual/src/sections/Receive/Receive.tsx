import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

//import { SideDetails } from './SideDetails'
import { SideDetails } from '../../common/SideDetails'
import { MainText } from './MainText'
import { MainImage } from './MainImage'
import { BackgroundText } from './BackgroundText'
import { FundingProcess } from './FundingProcess'
import { ThankYouText } from './ThankYouText'
import { FundingProcessExplainer } from './FundingProcessExplainer'



const useStyles = makeStyles((theme: any) => ({
    top: {
        backgroundColor:'#0068ea',
        paddingTop:'100px',

    }
}));

export const Receive = () => {
    const classes = useStyles();

    return(
        <div> 
            <div className={classes.top} style={{paddingLeft: '14px', paddingRight:'14px', paddingBottom:'14px'}}>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <SideDetails firstNumber='01' firstLabel='donors'
                                     middleNumber='100 eth' middleLabel='ether received'
                                     lastNumber='01 btc' lastLabel='bitcoin received'/>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <MainText />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <MainImage /> 
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container>
                    <Grid item xs={12} sm={3}>

                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <BackgroundText />
                        <ThankYouText />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={3}>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FundingProcess />
                    </Grid>
                </Grid>
            </div>
            <div style={{paddingBottom:'100px'}}>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <FundingProcessExplainer />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}