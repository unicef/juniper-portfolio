import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginLeft: '244px'
    }
}))

export const DonationFlowDiagram = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {/* <h1>DonationFlowDiagram</h1> */}
            <img style={{width:'1109px'}} src={'./sample-transaction.png'} />
        </div>
    )
}