import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuPopper from "../../molecules/MenuPopper";
import EditIcon from "../../atoms/Icons/EditIcon";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import ContainedButton from "../../atoms/Button/Contained";
import TextButton from "../../atoms/Button/TextIcon";
import WalletProgress from "../../molecules/WalletProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
  },
  toolbar: {
    height: 50,
    minHeight: 50,
  },
  logo: {
    width: 200,
    height: 30,
    justifyContent: "middle",
    verticalAlign: "middle",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  popper: {
    marginTop: 8,
    padding: 30,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  avatar: {
    width: 70,
    height: 70,
    margin: "0 auto",
    fontSize: 24,
    color: theme.palette.primary.dark,
    fontWeight: 700,
    lineHeight: 1.75,
    backgroundColor: theme.palette.primary.light,
  },
  filledButton: {
    width: 176,
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: "#f28080",
    },
  },
  username: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 16,
    fontWeight: 700,
    color: "#000000",
    textAlign: "center",
    marginBottom: 0,
  },
  department: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 16,
    fontWeight: 500,
    color: "#000000",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 8,
  },
  editButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: theme.palette.primary.main,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 8,
    "& .MuiButton-startIcon": {
      marginRight: 0,
      paddingTop: 8,
      "& svg": {
        fontSize: 24,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.textButtonHover,
    },
  },
  buttonBox: {
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function TopBar(props) {
  const classes = useStyles();

  const logout = async () => {
    try {
      await fetch("/rest/logout");
    } catch (e) {
      console.log(e);
    }

    window.location.reload();
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <img className={classes.logo} src={props.logoUrl} alt="UNICEF" />
        </div>
        {props.updatingWallets && <WalletProgress />}
        <MenuPopper
          placement={"bottom"}
          button={
            <TextButton
              type={"dark"}
              endIcon={<ExpandMoreIcon />}
              style={{ color: "#ffffff" }}
            >
              {props.user.firstName} {props.user.lastName}
            </TextButton>
          }
        >
          <div className={classes.popper}>
            <Avatar src={props.user.picture} className={classes.avatar}>
              {props.user
                ? props.user.firstName
                  ? props.user.firstName.charAt(0)
                  : ""
                : ""}{" "}
              {props.user
                ? props.user.lastName
                  ? props.user.lastName.charAt(0)
                  : ""
                : ""}
            </Avatar>
            <h3 className={classes.username}>
              {props.user.firstName} {props.user.lastName}
            </h3>
            <h4 className={classes.department}>{props.user.department}</h4>
            <div className={classes.buttonBox}>
              <Link to={"/admin/settings"} className={classes.link}>
                <TextButton
                  startIcon={
                    <EditIcon fontSize="large" style={{ marginTop: 8 }} />
                  }
                  onClick={() => {
                    props.setPageIndex(4);
                  }}
                >
                  Edit Profile Info
                </TextButton>
              </Link>
            </div>
            <div className={classes.buttonBox}>
              <ContainedButton
                className={classes.filledButton}
                variant="contained"
                color="inherit"
                onClick={logout}
                style={{
                  marginTop: 19,
                  paddingLeft: 15,
                  backgroundColor: "#f28080",
                }}
              >
                Sign Out
              </ContainedButton>
            </div>
          </div>
        </MenuPopper>
      </Toolbar>
    </AppBar>
  );
}
