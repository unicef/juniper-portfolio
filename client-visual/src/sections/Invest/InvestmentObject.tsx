import React from 'react'
import { InvestmentImage } from './InvestmentImage'
import { InvestmentDetails } from './InvestmentDetails'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme:any) => ({
    root: {
        paddingTop:'150px',
        paddingBottom:'50px'
    }
}))

export const InvestmentObject = (props: any) => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <InvestmentImage
                linkToImage={props.linkToImage}
                altDescription={props.altDescription}
            />
            <InvestmentDetails
                title={props.title}
                label1={props.label1}
                label2={props.label2}
                label3={props.label3}
                detail1={props.detail1}
                detail2={props.detail2}
                detail3={props.detail3}
                button={props.button}
                link={props.link}
                fontColor={props.fontColor}
                color={props.color}
                linkToProof={props.linkToProof}
                linkToProject={props.linkToProject}
            />

        </div>
    )
}