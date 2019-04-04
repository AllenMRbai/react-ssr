import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";

export default function Routes() {
  return (
    <Fragment>
      <Switch>
        <Redirect from="/" exact to="/list" />
        {routes.map(route => {
          return (
            <Route
              path={route.path}
              component={route.component}
              key={route.path}
            />
          );
        })}
      </Switch>
    </Fragment>
  );
}
