import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

const RouterComponent: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Main />
            </Route>
            <Route path="/warehouses">
                <Warehouses />
            </Route>
            <Route path="/quotecontacts">
                <QuoteContacts />
            </Route>
            <Redirect path="*" to="/" />
        </Switch>
    )
};

const RouterExporter: React.FC = () => {
    return (
        <Router>
            <RouterComponent/>
        </Router>
    )
};

export default RouterExporter;