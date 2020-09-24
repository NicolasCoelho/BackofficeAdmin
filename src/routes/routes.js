import React from "react";
import { isAuthenticated } from "./auth";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "../pages/login";
import DashboardPage from "../pages/dashboard";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route exact path="/home" component={LoginPage} />
      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
