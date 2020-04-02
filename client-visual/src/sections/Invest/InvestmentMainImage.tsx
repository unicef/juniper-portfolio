import React from 'react'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop:'60px',
        width: '20%',
        paddingLeft: '40px',
        marginBottom: '-2px',
    }
}));

export const InvestmentMainImage = () => {
    const classes = useStyles()
    
    return(
        <img className={classes.root} src='./Invest_illustration.svg' alt='invest info' />
    )
}