import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root:
  {
    width: '903px',
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
    marginLeft: '90px',
  },
  
});

export default function PriceBar() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardcontent}>
        <Typography className={classes.text} variant="body1" component="span">
          <span className={classes.textbold}>USD price </span>
          = Average price accross three cryptoexchanges, calculated at 12:01 p.m. (EST)
        </Typography>
              
        <Button className={classes.button} size="small" color="primary">MORE INFO</Button>
      </CardContent>
      
    </Card>
  );
}
