import React from 'react'
import { InvestmentCard } from './InvestmentCard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
    table: {
        marginTop: '187px'
    }
}));



export const InvestmentTable = () => {
    const classes = useStyles()

    return(
        <div className={classes.table}>
            <InvestmentCard
                pathToImage='./2.jpg'
                title='Using blockchain technology to inspire young people to become local changemakers'
                projectName='Utopixar'
                projectType='Startup'
                fundingAmount='5,000 ETH'
                country='Tunisia'
                color='#ffd113'
                fontColor='#000'
            />
            <InvestmentCard
                pathToImage='./1.jpg'
                title='Using blockchain technology to inspire young people to become local changemakers'
                projectName='Utopixar'
                projectType='Startup'
                fundingAmount='5,000 ETH'
                country='Tunisia'
                color='#0068ea'
                fontColor='#fff'
            />

        </div>
    )
}