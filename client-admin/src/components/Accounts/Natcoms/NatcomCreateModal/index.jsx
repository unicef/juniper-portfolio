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

export function NatcomCreateModal(props) {
    const classes = useStyles();

  const [name, setName] = useState("");
  const [amtETH, setAmtETH] = useState("");
  const [amtBTC, setAmtBTC] = useState('');
  const [walletaddress, setWalletaddress] = useState('');


    const addNatcom = async () => {
        const natcom = {
          name,
          amtETH,
          amtBTC,
          walletaddress,
        };
    
        let res, json;
        try {
          res = await fetch(`/rest/admin/natcom`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({
              natcom,
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
        setAmtETH(0);
        setAmtBTC(0);
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
                    <div className={classes.title}>Create natcom account</div>
                    <form>
                        <TextField fullWidth InputProps={{ className: classes.textfield, }} InputLabelProps={{className: classes.label,}} value={name} onChange={(e) => { setName(e.target.value); }} label="NATCOM NAME" placeholder="Enter natcom name"  />
                        <TextField fullWidth InputProps={{ className: classes.textfield, }} InputLabelProps={{className: classes.label,}} value={walletaddress} onChange={(e) => { setWalletaddress(e.target.value); }} label="WALLET ADDRESS" placeholder="0x123456789" />
                        <TextField type="number" InputProps={{ className: classes.textfield, }} InputLabelProps={{className: classes.label,}} value={amtETH} onChange={(e) => { setAmtETH(e.target.value); }} label="AMOUNT" placeholder="Enter amount (ETH)"  />
                        <Button fullWidth color="primary" className={classes.submitbtn} onClick={addNatcom}>Add Natcom</Button>
                    </form>
             
            </div>
        </div>
        </Modal>
    )
    
};