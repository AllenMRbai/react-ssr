import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import TopicList from "../views/TopicList";
import TopicDetail from "../views/TopicDetail";

export default function Base() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/list" />} />
        <Route path="/list" component={TopicList} />
        <Route path="/detail" component={TopicDetail} />
      </Switch>
    </Fragment>
  );
}
