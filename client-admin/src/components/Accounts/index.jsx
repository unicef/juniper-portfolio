import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Donors from "./Donors";
import Startups from "./Startups"
import AdminUsers from "./AdminUsers"
import Natcoms from "./Natcoms"
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        marginTop: '5em',
        boxShadow: 'none'
    },
    navigation: {
        backgroundColor: "#cbcbcb"
    },
    navTab: {
        fontSize: 20,
        fontWeight: 700,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 1,
        textAlign: 'center',
        color: '#393939',
        textTransform: 'uppercase'
    }
}));

const NavigationTabs = withStyles({
    indicator: {
        display: 'none',
        backgroundColor: 'transparent',
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const NavigationTab = withStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textTransform: 'uppercase',
        color: '#393939',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
            backgroundColor: '#ffffff',
            '&:hover': {
                backgroundColor: '#ffffff'
            }
        },

        '&:hover': {
            backgroundColor: 'rgba(0,0,0,.14)'
        }

    },
}))((props) => <Tab disableRipple {...props} />);

export default function Accounts() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.appBar}>
                <NavigationTabs value={value} variant="fullWidth" className={classes.navigation} onChange={handleChange} aria-label="simple tabs example">
                    <NavigationTab label="Startups" {...a11yProps(0)} />
                    <NavigationTab label="Donors" {...a11yProps(1)} />
                    <NavigationTab label="Natcoms" {...a11yProps(2)} />
                    <NavigationTab label="Admin Users" {...a11yProps(3)} />
                </NavigationTabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Startups />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Donors />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Natcoms />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AdminUsers />
            </TabPanel>
        </div>
    );
}
