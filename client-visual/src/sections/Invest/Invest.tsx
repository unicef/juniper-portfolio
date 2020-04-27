import React from 'react'
import { Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { SideDetails } from '../../common/SideDetails'
import { InvestmentMainText } from './InvestmentMainText'
import { InvestmentMainImage } from './InvestmentMainImage'
import { InvestmentObject } from './InvestmentObject'
import json2mq from 'json2mq'

const useStyles = makeStyles((theme: any) => ({
    
    top: {
        backgroundColor:'#0068ea',
        paddingTop: '100px'
    }
}))
export const Invest = () => {
    const classes = useStyles()
    const matches = useMediaQuery(
        json2mq({
            minWidth: 800
        })
    )
    return(
        <div>
            <div className={classes.top} style={{paddingLeft: '14px', paddingRight:'14px'}}>
                <Grid container>
                    {
                        matches ? 
                        <Grid item xs={12} sm={3}>
                            <SideDetails firstNumber='03' firstLabel='investments'
                                        middleNumber='100 eth' middleLabel='ether invested'
                                        lastNumber='01 btc' lastLabel='bitcoin invested'/>
                        </Grid> : null
                    }
                    
                    <Grid item xs={12} sm={9}>
                        <InvestmentMainText />
                    </Grid>
                    {
                    matches ? 
                    null :
                    <Grid style={{paddingTop:'50px'}} item xs={12} sm={3}>
                            <SideDetails firstNumber='03' firstLabel='investments'
                                        middleNumber='100 eth' middleLabel='ether invested'
                                        lastNumber='01 btc' lastLabel='bitcoin invested'/>
                    </Grid>
                    }
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
                    detail2={'50 ETH / $7863.00'}
                    detail3={'Tunisia'}
                    button={'View Project'}
                    link={'Transaction Proof'}
                    linkToImage={'./SampleImageForInvestPage.png'}
                    altDescription={''}
                    color={'#ffd113'}
                    fontColor={'#000'}
                />
                <InvestmentObject 
                    title={'Making sensitive clinical data portable, safe and private'}
                    label1={'Startup'}
                    label2={'Funding Amount'}
                    label3={'Country'}
                    detail1={'Prescrypto'}
                    detail2={'1 BTC / $6868.79'}
                    detail3={'Mexico'}
                    button={'View Project'}
                    link={'Transaction Proof'}
                    linkToImage={'SampleImageForInvestPage2.png'}
                    altDescription={''}
                    color={'#0068ea'}
                    fontColor={'#fff'}
                />
                <InvestmentObject 
                    title={'Using Blockchain technology to inspire young people to become local changemakers'}
                    label1={'Startup'}
                    label2={'Funding Amount'}
                    label3={'Country'}
                    detail1={'Atix Labs'}
                    detail2={'50 ETH / $7863.00'}
                    detail3={'Argentina'}
                    button={'View Project'}
                    link={'Transaction Proof'}
                    linkToImage={'SampleImageForInvestPage2.png'}
                    altDescription={''}
                    color={'#ffd113'}
                    fontColor={'#000'}
                />                
            </div>

        </div>
    )
}