import React from 'react';
import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Landing } from './sections/Landing';
import { Investment } from './sections/Investment';
import { Fund } from './sections/Fund';
import { Transfer } from './sections/Transfer';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './ui';
import NavBar from './sections/NavBar/NavBar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const client = new ApolloClient({
    uri: '/api'
});


render(
    <ThemeProvider theme={theme}>
        <Router>
            <ApolloProvider client ={client}>
                <NavBar/>
                <Route exact path ='/' component={Landing} />
                <Route exact path ='/fund' component={Fund} />
                <Route exact path ='/transfer' component={Transfer} />
                <Route exact path ='/investments' component={Investment} />
            </ApolloProvider>
        </Router>
    </ThemeProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
