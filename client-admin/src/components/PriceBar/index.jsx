import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import priceIcon from "./priceIcon.svg";

const useStyles = makeStyles({
  root:
  {
    maxWidth: '903px',
    width: "100%",
    height: '77px',
    borderRadius: '5px',
    borderColor: '#daf5ff',
    backgroundColor: '#daf5ff',
    padding: '5px',
  },
    
  cardcontent:
  {
    paddingRight: '10px',
    paddingLeft: '10px',
  },
  

  text:
  {
    fontSize: '19px',
    color: '#000000',
    lineHeight: '27px',
    letterSpacing: 0,      
  },
  
  textbold: 
  {
    fontWeight: 700,
  },
  
  button:
  {
    fontFamily: 'Cabin',
    fontWeight: 'Bold',
    fontSize: '12px',
    letterSpacing: '1px',
    color: '#00aeef',
    marginLeft: '10px'
  },

  priceIcon:
  {
    paddingRight: '5px',
  }
  
});

export default function PriceBar() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardcontent}>
        <img src={priceIcon} className={classes.priceIcon} alt=''/>
        <Typography className={classes.text} variant="body1" component="span">
          <span className={classes.textbold}>USD price </span>
          = Average price across three cryptoexchanges, calculated at 12:01 p.m. (EST)
        </Typography>
              
        <Button className={classes.button} size="small" color="primary">MORE INFO</Button>
      </CardContent>
      
    </Card>
  );
}
