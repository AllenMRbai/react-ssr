import React, { Component, Fragment } from "react";
import { hot } from "react-hot-loader/root";
import { Link } from "react-router-dom";

import Base from "./layout/Base";

@hot
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

        <Base />
      </Fragment>
    );
  }
}

export default App;
