import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
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
        fontFamily: '"Roboto", sans-serif',
        fontSize: '28px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 1,
        letterSpacing: 'normal',
        color: '#000000',
        textAlign: 'center',
        padding: '20px 0px'
  },
    
  textfield:
  {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '19px',
    lineHeight: '27px',
    marginBottom: "20px",
  },

  label:
  {
    fontFamily: '"Cabin", sans-serif',
    fontSize: '10px',
    letterSpacing: '0.83px',
    fontWeight: 500,
    color: "#000000",
    },
  


    closebtn:
    {
      position: 'absolute',
      top: 0,
      right:0,
  },
    
    submitbtn:
    {
      backgroundColor: "#00aeef",
      color: '#ffffff',
      fontFamily: 'Cabin',
      fontWeight: 'Bold',
      fontSize: '12px',
      letterSpacing: '1px',
      margin: '30px 0px',
      padding: '10px',

    }
});

export function StartupCreateModal(props) {
    const classes = useStyles();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [link, setLink] = useState('');
  const [walletaddress, setWalletaddress] = useState('');


    const addStartup = async () => {
        const startup = {
          name,
          tagline,
          link,
          walletaddress,
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
        setTagline('');
        setLink('');
        setWalletaddress('');
        console.log("Form submitted!");
        alert('Form submitted!');
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
                        <TextField fullWidth InputProps={{ className: classes.textfield, }} InputLabelProps={{className: classes.label,}} value={name} onChange={(e) => { setName(e.target.value); }} label="STARTUP NAME" placeholder="Enter startup name"  />
                        <TextField fullWidth InputProps={{ className: classes.textfield, }} InputLabelProps={{className: classes.label,}} value={tagline} onChange={(e) => { setTagline(e.target.value); }} label="TAGLINE" placeholder="Brief description (up to 100 characters)" />
                        <TextField fullWidth InputProps={{ className: classes.textfield, }} InputLabelProps={{className: classes.label,}} value={link} onChange={(e) => { setLink(e.target.value); }} label="EXTERNAL WEBLINK" placeholder="Link to startup" />
                        <TextField fullWidth InputProps={{ className: classes.textfield, }} InputLabelProps={{className: classes.label,}} value={walletaddress} onChange={(e) => { setWalletaddress(e.target.value); }} label="WALLET ADDRESS" placeholder="0x123456789" />
                        <Button fullWidth color="primary" className={classes.submitbtn} onClick={addStartup}>Add Startup</Button>
                    </form>
             
            </div>
        </div>
        </Modal>
    )
    
};