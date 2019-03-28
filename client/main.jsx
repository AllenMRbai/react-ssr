import React from "react";
import ReactDom from "react-dom";
import App from "./App";

function render(Component) {
  ReactDom.render(<Component />, document.getElementById("root"));
}

render(App);
