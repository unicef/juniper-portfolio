import React from 'react';
import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Landing } from './sections/Landing';
import { Receive } from './sections/Receive';
import { Invest } from './sections/Invest';
import { Track } from './sections/Track';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './ui';
import NavBar from './sections/NavBar/NavBar';

import { BrowserRouter as Router, Route } from 'react-router-dom'

const client = new ApolloClient({
    uri: '/api'
});


render(
    <ThemeProvider theme={theme}>
        <Router>
            <ApolloProvider client ={client}>
                <NavBar/>
                <Route exact path ='/' component={Landing} />
                <Route exact path ='/receive' component={Receive} />
                <Route exact path='/invest' component={Invest} />
                <Route exact path ='/track' component={Track} />
            </ApolloProvider>
        </Router>
    </ThemeProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
