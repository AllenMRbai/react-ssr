import React from "react";
import ReactDom from "react-dom";
import App from "./layouts/App";

function render(Component) {
  ReactDom.render(<Component />, document.getElementById("root"));
}

render(App);
