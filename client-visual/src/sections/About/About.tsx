import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { SideDetails } from '../../common/SideDetails'
import { AboutMainText } from './AboutMainText'

const useStyles = makeStyles((theme: any) => ({
    
    top: {
        backgroundColor: '#ffd113',
        paddingTop: '100px',
        paddingBottom: '100px',
    },
}))


export const About = () => {
    const classes = useStyles()
    return (
      <div>
        <div className={classes.top} style={{ paddingLeft: '14px', paddingRight: '14px'}}>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                    <SideDetails />
                    </Grid>
                    
                    <Grid item xs={12} sm={9}>
                        <AboutMainText />
                    </Grid>
                </Grid>

         </div>  

      </div>
    )
}