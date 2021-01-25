import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Main from '../Routes/Main';
import Path from '../Routes/Path';

const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/path" exact>
        <Path />
      </Route>
      <Redirect path="*" to="/" />
    </Switch>
  );
};

const RouterExporter: React.FC = () => {
  return (
    <Router>
      <RouterComponent />
    </Router>
  );
};

export default RouterExporter;
