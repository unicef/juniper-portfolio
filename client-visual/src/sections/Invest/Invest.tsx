import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { SideDetails } from '../../common/SideDetails'
import { InvestmentMainText } from './InvestmentMainText'
import { InvestmentMainImage } from './InvestmentMainImage'
import { InvestmentObject } from './InvestmentObject'

const useStyles = makeStyles((theme: any) => ({
    top: {
        backgroundColor:'#0068ea',
        paddingLeft:'57px',
        paddingTop:'100px'
    }
}))
export const Invest = () => {
    const classes = useStyles()
    return(
        <div>
            <div className={classes.top}>
                <Grid container>
                    <Grid item xs={12} sm={2}>
                        <SideDetails firstNumber='03' firstLabel='investments'
                                     middleNumber='100 eth' middleLabel='ether invested'
                                     lastNumber='01 btc' lastLabel='bitcoin invested'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InvestmentMainText />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <InvestmentMainImage /> 
                    </Grid>
                </Grid>
            </div>
            <div>
                <InvestmentObject 
                    title={'Using Blockchain technology to inspire young people to become local changemakers'}
                    label1={'Startup'}
                    label2={'Funding Amount'}
                    label3={'Country'}
                    detail1={'Utopixar'}
                    detail2={'5,000 ETH'}
                    detail3={'Tunisia'}
                    button={'View Project'}
                    link={'lol'}
                    linkToImage={'./1.JPG'}
                    altDescription={''}
                    color={'#ffd113'}
                    fontColor={'#000'}
                />
                <InvestmentObject 
                    title={'Using Blockchain technology to inspire young people to become local changemakers'}
                    label1={'Startup'}
                    label2={'Funding Amount'}
                    label3={'Country'}
                    detail1={'Utopixar'}
                    detail2={'5,000 ETH'}
                    detail3={'Tunisia'}
                    button={'View Project'}
                    link={'lol'}
                    linkToImage={'2.jpg'}
                    altDescription={''}
                    color={'#0068ea'}
                    fontColor={'#fff'}
                />
            </div>
        </div>
    )
}