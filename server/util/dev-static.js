const axios = require("axios");
const webpack = require("webpack");
const path = require("path");
const MemoryFileSystem = require("memory-fs");
const serverConfig = require("../../build/webpack.server");
const ReactDOMServer = require("react-dom/server");
const proxy = require("http-proxy-middleware");

const STATIC_HOST = "http://localhost:3000";

function getTemplate() {
  return axios.get(STATIC_HOST + "/public/index.html");
}

const compiler = webpack(serverConfig);
const mfs = new MemoryFileSystem();
const Module = module.constructor;
let serverBundle = null;

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
        let renderResult = ReactDOMServer.renderToString(serverBundle);
        res.send(template.replace("<!-- app -->", renderResult));
      })
      .catch(err => {
        console.error(err);
      });
  });
};
