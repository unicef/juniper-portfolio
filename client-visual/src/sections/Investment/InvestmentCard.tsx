import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    pathToImage: string,
    title: string,
    projectName: string,
    projectType: string,
    fundingAmount: string,
    country: string,
    color: string,
    fontColor:string
}

const useStyles = makeStyles((theme: any) => ({
    title: {
        width:'643px',
        height:'132px',
        fontFamily:'Cabin',
        fontSize:'36px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'normal',
        // color:'#fff',
        paddingLeft:'163px',
        paddingTop:'65px'
    },
    largeText: {
        width:'643px',
        height:'132px',
        fontFamily:'Cabin',
        fontSize:'31px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.19',
        letterSpacing:'normal',
        // color:'#fff'
    },
    smallText: {
        width:'643px',
        height:'132px',
        fontFamily:'Cabin',
        fontSize:'14px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'1.17px',
        // color:'#fff',
        textTransform:'uppercase'
    },
    box: {
        width: '903px',
        height: '496px',
        opacity: '0.84',
    },
    button: {
        width:'165px',
        height:'50px',
        borderRadius:'5px',
        backgroundColor:'#000',
        fontFamily:'Cabin',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'normal',
        letterSpacing:'1.17px',
        textAlign:'center',
        color:'#fff',
    },
    imgStyle: {
        width:'898px',
        height:'618px',
        paddingLeft: '358px'
    }
}));



export const InvestmentCard = (props: Props) => {
    const classes=useStyles()
    return(
        <div style={{ color: props.fontColor, paddingBottom:'220px'}}>
            <img className={classes.imgStyle} src={props.pathToImage} alt='project that received an investment' />
            <div style={{marginTop:'-448px', backgroundColor: props.color}} className={classes.box}>
                <div className={classes.title}>{ props.title }</div>
                <div>
                    <div style={{display:'inline-block', position:'absolute', paddingLeft:'163px', paddingTop:'25px'}} className={classes.smallText}>{ props.projectType }</div>
                    <div style={{display:'inline-block', position:'absolute', paddingLeft:'347px', paddingTop:'25px'}} className={classes.smallText}>Funding Amount</div>
                    <div style={{display:'inline-block', position:'absolute', paddingLeft:'557px', paddingTop:'25px'}} className={classes.smallText}>Country</div>
                </div>
                <div>
                    <div style={{display:'inline-block', position:'absolute', paddingLeft:'163px', paddingTop:'48px'}} className={classes.largeText}>{ props.projectName }</div>
                    <div style={{display:'inline-block', position:'absolute', paddingLeft:'347px', paddingTop:'48px'}} className={classes.largeText}>{ props.fundingAmount }</div>
                    <div style={{display:'inline-block', position:'absolute', paddingLeft:'557px', paddingTop:'48px'}} className={classes.largeText}>{ props.country }</div>
                </div>
                <div style={{
                    position:'absolute',
                    paddingLeft:'163px',
                    paddingTop:'140px',
                    display:'inline-block'
                }}>
                    <Button className={classes.button}>View Project</Button>
                </div>
                <div style={{
                    position:'absolute',
                    paddingLeft:'163px',
                    paddingTop:'216px',
                    display:'inline-block'
                }} className={classes.smallText}>Transaction Proof ></div>
            </div>
        </div>
    )
}