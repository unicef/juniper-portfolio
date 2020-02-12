import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
    transferText: {
        width: '723px',
        height: '132px',
        fontFamily: 'Cabin',
        fontSize: '32px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.44',
        letterSpacing: 'normal',
        color: '#000000',
    },
    fundingProcessTitle: {
        width: '242px',
        height: '46px',
        fontFamily: 'Cabin',
        fontSize: '28px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.44',
        letterSpacing: 'normal',
        color: '#000000',
    },
    fundingProcessText1: {
        width: '723px',
        height: '204px',
        fontFamily: 'IBM Plex Sans',
        fontSize: '22px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.55',
        letterSpacing: 'normal',
        color: '#000000',
    },
    fundingProcessText2: {
        width: '723px',
        height: '204px',
        fontFamily: 'IBM Plex Sans',
        fontSize: '22px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.55',
        letterSpacing: 'normal',
        color: '#0068ea',
    },
    fundingProcessText3: {
        width: '723px',
        height: '204px',
        fontFamily: 'IBM Plex Sans',
        fontSize: '22px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.55',
        letterSpacing: 'normal',
        color: '#000000',
    }
}));

export const TransferText = () => {
const classes = useStyles()
    const [transferText] = useState('The CryptoFund aspires to create visibility for the donor and the public, adding a layer of transparent accounting to the donations ecosystem by deploying cryptocurrency.')
    const [fundingProcessTitle] = useState('Our funding process')
    const [fundingProcessText1] = useState('UNICEF Ventures has established a process enabling the Innovation Fund to receive cryptocurrency donations via four official UNICEF fundraising entities, also known as ')
    const [fundingProcessText2] = useState('National Committees')
    const [fundingProcessText3] = useState(' (NatComs). Through these four National Committees - Australia, France, New Zealand and the United States - donors are able to invest in the Innovation Fund using cryptocurrency.')

    return (
        <div>
            <span className={classes.transferText}>{transferText}</span><br/>
            <span className={classes.fundingProcessTitle}>{fundingProcessTitle}</span><br/>
            <span className={classes.fundingProcessText1}>{fundingProcessText1}</span>
            <span className={classes.fundingProcessText2}>{fundingProcessText2}</span>
            <span className={classes.fundingProcessText3}>{fundingProcessText3}</span>
        </div>
    )
    /*
        This section will have the text and visuals required to explain the transfer process
        In addition to the aforementioned, there will also be a table that will display
        the funds coming in and out of UNICEF; this will pull information from the graphql API
        
    */
}