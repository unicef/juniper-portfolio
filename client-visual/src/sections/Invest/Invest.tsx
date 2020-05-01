import React from 'react'
import { Grid, useMediaQuery} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { SideDetails } from '../../common/SideDetails'
import { InvestmentMainText } from './InvestmentMainText'
import { InvestmentMainImage } from './InvestmentMainImage'
import { InvestmentObject } from './InvestmentObject'
import json2mq from 'json2mq'
import { SelectionCriteria } from './SelectionCriteria'

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
                            <SideDetails style={{paddingBottom:'50px'}} firstNumber='03' firstLabel='investments'
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
                    {/* <Grid item xs={12} sm={9}>
                        <InvestmentMainText />
                    </Grid> */}
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
                    detail1={'Atix Labs'}
                    detail2={'1 BTC'}
                    detail3={'Argentina'}
                    button={'View Project'}
                    link={'Transaction Proof'}
                    linkToProof={'https://btc4.trezor.io/tx/001ef6f14df3b63f872c4cbdf7d3f36a15330eb9b9db4983f6c3b6d9093a8924'}
                    linkToImage={'./Atix.png'}
                    altDescription={''}
                    color={'#ffd113'}
                    fontColor={'#000'}
                    linkToProject={'https://www.unicef.org/innovation/FundGraduate/Atixlabs'}
                />
                <SelectionCriteria />
                <InvestmentObject 
                    title={'Using Blockchain technology to inspire young people to become local changemakers'}
                    label1={'Startup'}
                    label2={'Funding Amount'}
                    label3={'Country'}
                    detail1={'Prescrypto'}
                    detail2={'49.5 ETH'}
                    detail3={'Mexico'}
                    button={'View Project'}
                    link={'Transaction Proof'}
                    linkToProof={'https://etherscan.io/tx/0x63b15553266e673f73315b93f9914a92d8208dfe8fa1d01dc119d156dc33d622'}
                    linkToImage={'Prescrypto.png'}
                    altDescription={''}
                    color={'#0068ea'}
                    fontColor={'#fff'}
                    linkToProject={'https://www.unicef.org/innovation/fundgraduate/Prescrypto'}
                />
                <InvestmentObject 
                    title={'Using Blockchain technology to inspire young people to become local changemakers'}
                    label1={'Startup'}
                    label2={'Funding Amount'}
                    label3={'Country'}
                    detail1={'Utopixar'}
                    detail2={'49.5 ETH'}
                    detail3={'Tunisia'}
                    button={'View Project'}
                    link={'Transaction Proof'}
                    linkToProof={'https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0'}
                    linkToImage={'./Utopixar.png'}
                    altDescription={''}
                    color={'#ffd113'}
                    fontColor={'#000'}
                    linkToProject={'https://www.unicef.org/innovation/fundgraduate/Coinsence'}
                />
            </div>

        </div>
    )
}