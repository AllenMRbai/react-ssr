import React from "react";
import ReactDom from "react-dom";
import App from "./App";

function render(Component) {
  ReactDom.hydrate(<Component />, document.getElementById("root"));
}

render(App);
