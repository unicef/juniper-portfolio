import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root:
    {
        margin: 'auto',
        backgroundColor: '#ffffff',
        outline: 0,
        fontFamily: '"Roboto", sans-serif',
        overflowY: 'auto',
        overflowX: 'hidden'
    },

    container:
    {
        width: '50%',
        margin: '40px auto',
        
    },

    
    title:
    {
        fontFamily: '"Roboto", sans serif',
        fontSize: '28px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 1,
        letterSpacing: 'normal',
        color: '#000000',
        textAlign: 'center',
        padding: '20px 0px'
    },


    closebtn:
    {
      position: 'absolute',
      top: 0,
      right:0,
    },
});

export function StartupCreateModal(props) {
    const classes = useStyles();
  
  
    return (
        <Modal
        open={props.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description" 
        >
         <div className={classes.root} >
            <Button className={classes.closebtn} onClick={props.closefn}>X</Button>
                <div className={classes.container}>
                    <div className={classes.title}>Create startup account</div>
               hello! Form goes here
             
            </div>
        </div>
        </Modal>
    )
    
};