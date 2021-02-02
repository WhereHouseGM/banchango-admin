import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Main from '../Routes/Main';
import Path from '../Routes/Path';
import Warehouses from '../Routes/Warehouses';
import TokenValidator from '../components/Common/TokenValidator';
import EditData from '../Routes/Warehouses/Edit';
import Estimates from '../Routes/Estimates';

const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <TokenValidator>
          <Main />
        </TokenValidator>
      </Route>
      <Route path="/path" exact>
        <TokenValidator>
          <Path />
        </TokenValidator>
      </Route>
      <Route path="/warehouses/:warehouseStatus" exact={true}>
        <TokenValidator>
          <Warehouses />
        </TokenValidator>
      </Route>
      <Route path="/warehouses/edit/data/:warehouseId">
        <TokenValidator>
          <EditData />
        </TokenValidator>
      </Route>
      <Route path="/estimates/:estimateStatus" exact={true}>
        <TokenValidator>
          <Estimates />
        </TokenValidator>
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
