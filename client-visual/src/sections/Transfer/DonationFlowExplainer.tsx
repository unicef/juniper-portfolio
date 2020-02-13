import React, { useState } from 'react'
import { makeStyles, Theme} from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme ) => ({
    root: {
        marginLeft: '244px',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    titleStyle: {
        width:'55px',
        height:'18px',
        fontFamily:'Cabin',
        fontSize:'14px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'1.17px',
        color:'#000000',
        marginLeft:'10px'
    }, 
    boldedTextStyle: {

    },
    textStyle: {
        width:'342px',
        height:'81px',
        fontFamily:'IBM Plex Sans',
        fontSize:'16px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'1.69',
        color:'#000000'
    },
    circleStyle: {
        width:'20px',
        height:'20px',
        transform:
            'rotate(-360deg)',
        borderRadius: '50%',
        display:'inline-block'
    },
    widthOfBox: {
        width:'342px'
    },
    buttonActive: {
        width: '196px',
        height: '44px',
        borderRadius: '5px',
        backgroundColor: '#0068ea',
        fontFamily: 'Cabin',
        fontSize: '12px',
        fontWeight:'bold',
        letterSpacing: '1px',
        textAlign:'center',
        color:'#ffffff'
    },
    buttonInactive: {
        width: '196px',
        height: '44px',
        borderRadius: '5px',
        backgroundColor: '#cbcbcb',
        fontFamily: 'Cabin',
        fontSize: '12px',
        fontWeight:'bold',
        letterSpacing: '1px',
        textAlign:'center',
        color:'#777777'
    },
    title: {
        fontFamily: 'Cabin',
        fontSize: '28px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.64',
        letterSpacing:'normal',
        color:'#000000'
    },
    text: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '22px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.41',
        letterSpacing:'normal',
        color:'#000000'
    },
    boldedText: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '22px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.41',
        letterSpacing:'normal',
        color:'#0068ea'
    }
}))

export const DonationFlowExplainer = () => {
    const classes = useStyles()
    const [donorTitle] = useState('DONORS')
    const [unicefTitle] = useState('UNICEF')
    const [startUpTitle] = useState('STARTUPS')
    const [donorText, setDonorText] = useState(`A transaction of 10000 ETH initiated by a donor, Ethereum Foundation at 13:00 hours on 30th September.`)
    const [unicefText, setUnicefText] = useState('The crypto amount is received  at UNICEF France almost instantaneously and is sent to UNICEF HQ at 16:30 hours.')
    const [startUpText, setStartUpText] = useState('The money is moved to the starup at 17:00 hours on the same day. The movement of cryptocurrency takes 10x less time than traditional currencies.')
    const [fundFlowButtonClass, setFundFlowButtonClass] = useState(classes.buttonInactive)
    const [sampleTransactionsButtonClass, setSampleTransactionsButtonClass] = useState(classes.buttonActive)
    const [cryptoTrackerTitle] = useState('Crypto tracker')
    const [cryptoTracker1Text] = useState('Below is a simple tool that provides a snapshot of all transfers, from donor to startup. Each transaction progress is tracked and displayed realtime, providing absolute transparency. The validity of each transaction can be proved by from the ')
    const [cryptoTrackerBoldText] = useState('public blockchain')
    const [cryptoTracker2Text] = useState('. To check the validity, click on transaction details>public key of the relevant transaction.')

    const createBlock = (title: string, text: string, color: string, padding: string) => {
        return(
            <div style={{display: 'inline-block', height:'200px', verticalAlign: 'top', paddingLeft: padding+'px'}}>
                <div>
                    <span style={{backgroundColor:color}} className={classes.circleStyle}></span>
                    <span className={classes.titleStyle}>{title}</span><br/>
                </div>
                <div className={classes.widthOfBox} style={{width:'342px', marginTop:'7px'}}>
                    <div className={classes.textStyle}>{text}</div>
                </div>
            </div>
        )
    }

    const setFundingFlowText = () => {
        setDonorText('The CryptoFund is generously supported by individuals and organizations who want to contribute to the development of open-source software in UNICEF programme countries.')
        setUnicefText('Via a pooled fund, UNICEF Innovation evaluates potential companies and reviews criteria such as readiness of project, the strength of the team, and the problem being addressed to allocate funding and mentorship.')
        setStartUpText('Once a startup has been added to the UNICEF Innovation Fund portfolio, they have the option of receiving a portion of their funding in cryptocurrency, which enables fast and transparent transfers.')
    }
    const setSampleTransactionText = () => {
        setDonorText(`A transaction of 10000 ETH initiated by a donor, Ethereum Foundation at 13:00 hours on 30th September.`)
        setUnicefText('The crypto amount is received  at UNICEF France almost instantaneously and is sent to UNICEF HQ at 16:30 hours.')
        setStartUpText('The money is moved to the starup at 17:00 hours on the same day. The movement of cryptocurrency takes 10x less time than traditional currencies.')
    }
    const handleFundingFlowButtonClick = () => {
        setFundFlowButtonClass(classes.buttonActive)
        setSampleTransactionsButtonClass(classes.buttonInactive)
        setFundingFlowText()
    }
    const handleSampleTransactionButtonClick = () => {
        setFundFlowButtonClass(classes.buttonInactive)
        setSampleTransactionsButtonClass(classes.buttonActive)
        setSampleTransactionText()
    }
    const fundingFlowButton = () => {
        return(
            <Button className={fundFlowButtonClass} onClick={handleFundingFlowButtonClick}>
                Funding Flow
            </Button>
        )
    }
    const sampleTransactionsButton = () => {
        return(
            <Button className={sampleTransactionsButtonClass} onClick={handleSampleTransactionButtonClick}>
                Sample Transactions
            </Button>
        )
    }

    return (
        <div className={classes.root}>
            <div>
                {createBlock(donorTitle, donorText, '#0068ea', '0')}
                {createBlock(unicefTitle, unicefText, '#29c3ff', '37')}
                {createBlock(startUpTitle, startUpText, '#ffd113', '37')}
            </div>
            <div style={{paddingLeft:'280px', paddingBottom:'174px' }}>
                {fundingFlowButton()}
                {sampleTransactionsButton()}<br/>
            </div>
            <div style={{paddingLeft:'114px', paddingBottom:'146px'}}>
                <span className={classes.title}>{cryptoTrackerTitle}</span><br/>
                <div style={{width:'723px'}}>
                    <span className={classes.text}>{cryptoTracker1Text}</span>
                    <span className={classes.boldedText}>{cryptoTrackerBoldText}</span>
                    <span className={classes.text}>{cryptoTracker2Text}</span>
                </div>
            </div>
        </div>
    )
}