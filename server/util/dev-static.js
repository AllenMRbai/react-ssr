const axios = require("axios");
const webpack = require("webpack");
const path = require("path");
const MemoryFileSystem = require("memory-fs");
const serverConfig = require("../../build/webpack.server");
const ReactDOMServer = require("react-dom/server");
const proxy = require("http-proxy-middleware");
const bootstrapper = require("react-async-bootstrapper");

const STATIC_HOST = "http://localhost:3000";

function getTemplate() {
  return axios.get(STATIC_HOST + "/public/index.html");
}

const compiler = webpack(serverConfig);
const mfs = new MemoryFileSystem();
const Module = module.constructor;
let serverBundle = null;
let createStoreMap = null;

compiler.outputFileSystem = mfs;

compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  let bundlePath = path.resolve(
    serverConfig.output.path,
    serverConfig.output.filename
  );
  let m = new Module();
  let bundle = mfs.readFileSync(bundlePath, "utf-8");
  m._compile(bundle, "server-entry.js");
  serverBundle = m.exports.default;
  createStoreMap = m.exports.createStoreMap;
});

module.exports = function(server) {
  server.use(
    "/public",
    proxy({
      target: STATIC_HOST
    })
  );

  server.use("*", (req, res) => {
    getTemplate()
      .then(response => {
        let template = response.data;
        let url = req.originalUrl;
        let context = {};
        let stores = createStoreMap ? createStoreMap() : {};
        let renderResult = "";

        if (serverBundle) {
          let app = serverBundle(url, context, stores);

          bootstrapper(app).then(() => {
            renderResult = ReactDOMServer.renderToString(app);

            console.log("打印count");
            console.log(JSON.stringify(stores.appState.count));

            if (context.url) {
              res.status(302).setHeader("Location", context.url);
              res.end();
            } else {
              res.send(template.replace("<!-- app -->", renderResult));
            }
          });
        } else {
          res.send(template);
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
};
