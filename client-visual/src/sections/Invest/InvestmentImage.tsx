import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '824px',
        paddingLeft:'358px'
    }
}))

export const InvestmentImage = (props: any) => {
    const classes = useStyles()
    return(
        <img className={classes.root} src={props.linkToImage} alt={props.altDescription}/>
    )
}