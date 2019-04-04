import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider, useStaticRendering } from "mobx-react";

import App from "./App";
import { createStoreMap } from "./store";
import routes from "./routes/routes";

useStaticRendering(true);

export default function(url, context, stores) {
  return (
    <Provider {...stores}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
}

export { createStoreMap, routes };
