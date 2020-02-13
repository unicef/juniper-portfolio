import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TransactionDetails } from './TransactionDetails'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#f3f3f3',
    }
}))

export const Transaction = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <TransactionDetails/>
        </div>
    )
}