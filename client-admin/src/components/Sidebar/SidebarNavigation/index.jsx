import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/Inbox';

const useStyles = makeStyles((theme) => ({
    navIcon: {
        color: "#ffffff",
    },
    navText: {
        fontSize: 12,
        fontWeight: 700,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 1,
        textAlign: 'left',
        color: '#ffffff',
        textTransform: 'uppercase',
    },
    navLink: {
        height: 55,
        paddingLeft: 20
    },
}));

const JuniperListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "#002452",
            "&:hover": {
                backgroundColor: "#002452"
            }
        },
        "&:hover": {
            backgroundColor: "rgba(0,0,0,.14)"
        }

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
            {
                [0, 1, 2, 3].map((navLink, index) => {
                    return (
                        <JuniperListItem
                            button
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                            className={classes.navLink}
                        >
                            <ListItemIcon>
                                <InboxIcon className={classes.navIcon} fontSize="large" />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography className={classes.navText}>Link Text</Typography>}
                            />
                        </JuniperListItem>
                    )
                })
            }

        </List >
    );
}




