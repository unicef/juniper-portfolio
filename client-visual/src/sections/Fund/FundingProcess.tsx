import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop:'120px',
    },
    fundingProcessTitle: {
        width:'728px',
        fontFamily:'Cabin',
        fontSize:'28px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.64',
        letterSpacing:'normal',
        color:'#000'
    },
    fundingProcessText: {
        width:'728px',
        fontFamily:'IBM Plex Sans',
        fontSize:'22px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.55',
        letterSpacing:'normal',
        color:'#000'
    },
}));

export const FundingProcess = () => {
    const classes = useStyles()
    const [fundingProcessTitle] = useState(
        "Our funding process"
    )
    const [fundingProcessText] = useState(
        'UNICEF Ventures has established a process enabling the Innovation Fund to receive cryptocurrency donations via four official UNICEF fundraising entities, also known as National Committees (NatComs). Through these four National Committees - Australia, France, New Zealand and the United States - donors are able to invest in the Innovation Fund using cryptocurrency'
    )
    return(
        <div className={classes.root}>
            <div className={classes.fundingProcessTitle}>{fundingProcessTitle}</div>
            <div className={classes.fundingProcessText}>{fundingProcessText}</div>
        </div>
    )
}