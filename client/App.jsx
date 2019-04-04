import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import Routes from "./routes/Routes.jsx";

class App extends Component {
  sayHello = () => {
    console.log("hello world");
  };

  render() {
    return (
      <Fragment>
        <div>
          <Link to="/">首页</Link>
          <br />
          <Link to="/detail">detail</Link>
          <br />
          <Link to="/testApi">api测试</Link>
        </div>
        <Routes />
      </Fragment>
    );
  }
}

export default App;

export const HotApp = hot(App);
