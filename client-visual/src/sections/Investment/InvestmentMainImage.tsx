import React from 'react'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop:'59px',
        paddingleft:'358px'
    }
}));

export const InvestmentMainImage = () => {
    const classes = useStyles()
    
    return(
        <img className={classes.root} src='./Infographic:invest:mobile.png' alt='receive info' />
    )
}