import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop:'100px'
    },
    imgFormat: {
        width: "1109px",
        height: "479px",
        objectFit: "contain"
    }
}))

export const FundingProcessImage = (props: any) => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            { 
            props.flag ?
                <img className={classes.imgFormat} src='./sample-transaction.png' alt='sample transaction' />
            : 
                <img className={classes.imgFormat} src='./Funding flow illustration.png' alt='sample transaction' />
            }
        </div>
    )
}