import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Button } from '@material-ui/core'

const useStyles = makeStyles((theme: any) => ({
    root: {
        maxWidth: '100%',
        paddingTop:'100px',
        paddingLeft:'14px'
    },
    selectionCriteriaTitle: {
        fontFamily: 'Cabin',
        fontSize: '28px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.32',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: '#000'
    },
    selectionCriteriaButton: {
        marginTop: '25px',
        width: '195px',
        height: '50px',
        borderRadius: '5px',
        backgroundColor: '#0068ea'
    },
    selectionCriteriaButtonText: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
        textAlign: 'center',
        color: '#ffffff'
    }
}))

export const SelectionCriteria = (props: any) => {
    const classes = useStyles()
    const [selectionCriteriaTitle] = React.useState('You can read more about our selection criteria here')
    return(
        <div className={classes.root}>
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12} md={12}>
                    <span className={classes.selectionCriteriaTitle}>{selectionCriteriaTitle}</span>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Button href='/about' className={classes.selectionCriteriaButton}>
                        <span className={classes.selectionCriteriaButtonText}>Selection Criteria</span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}