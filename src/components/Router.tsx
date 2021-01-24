import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

const RouterComponent: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <div>HI</div>
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