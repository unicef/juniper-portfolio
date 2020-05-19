import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/Inbox';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SettingsIcon from '@material-ui/icons/Settings';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navIcon: {
        fontSize: '4em',
        color: "#4d4d4d",
    },
    navIconSelected: {
        fontSize: '4em',
        color: "#00aeef",
    },
    navText: {
        fontSize: 12,
        fontWeight: 700,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 1,
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    navLink: {
        height: 55,
        paddingLeft: 20,
        color: '#4d4d4d',
    },
    link: {
        textDecoration: 'none'
    }
}));

const JuniperListItem = withStyles({
    root: {
        "&$selected": {
            color: "#00aeef",
            backgroundColor: "#ffffff",
            "&:hover": {

            }
        },
        "&:hover": {}
    },
    selected: {}
})(ListItem);

export default function SelectedListItem() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List component="nav" aria-label="Sidebar Navigation">
            <Link to={'/transactions'} className={classes.link}>
                <JuniperListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    className={classes.navLink}
                >
                    <ListItemIcon>
                        <SyncAltIcon className={selectedIndex === 0 ? classes.navIconSelected : classes.navIcon} fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography className={classes.navText}>Transactions</Typography>}
                    />
                </JuniperListItem>
            </Link>
            <Link to={'/wallets'} className={classes.link}>
                <JuniperListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                    className={classes.navLink}
                >
                    <ListItemIcon>
                        <AccountBalanceWalletIcon className={selectedIndex === 1 ? classes.navIconSelected : classes.navIcon} fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography className={classes.navText}>My Wallets</Typography>}
                    />
                </JuniperListItem>
            </Link>
            <Link to={'/profiles'} className={classes.link}>
                <JuniperListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    className={classes.navLink}
                >
                    <ListItemIcon>
                        <AccountBoxIcon className={selectedIndex === 2 ? classes.navIconSelected : classes.navIcon} fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography className={classes.navText}>Profiles</Typography>}
                    />
                </JuniperListItem>
            </Link>
            <Link to={'/tracker'} className={classes.link}>
                <JuniperListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                    className={classes.navLink}
                >
                    <ListItemIcon>
                        <EqualizerIcon className={selectedIndex === 3 ? classes.navIconSelected : classes.navIcon} fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography className={classes.navText}>Price Tracker</Typography>}
                    />
                </JuniperListItem>
            </Link>
            <Link to={'/settings'} className={classes.link}>
                <JuniperListItem
                    button
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                    className={classes.navLink}
                >
                    <ListItemIcon>
                        <SettingsIcon className={selectedIndex === 4 ? classes.navIconSelected : classes.navIcon} fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography className={classes.navText}>Settings</Typography>}
                    />
                </JuniperListItem>
            </Link>
        </List >
    );
}



