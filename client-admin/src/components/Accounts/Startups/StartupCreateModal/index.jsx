import React, {useState} from 'react';
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

    const [name, setName] = useState("");


    const addStartup = async () => {
        const startup = {
          name,
        };
    
        let res, json;
        try {
          res = await fetch(`/rest/admin/startup`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({
              startup,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          json = await res.json();
        } catch (e) {
          return console.log(e);
        }
    
        setName("");
        console.log("Form submitted!")
        alert('Form submitted!')
      };
  
  
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
                    <form>
                        Name:
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} label="Startup name"></input>
                        <Button
              color="primary"
              variant="contained"
              disabled={false}
              className={classes.addNewWalletButton}
              onClick={addStartup}
            >
              Add Startup
            </Button>
                    </form>
             
            </div>
        </div>
        </Modal>
    )
    
};