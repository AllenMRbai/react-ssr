const path = require("path");

const merge = require("webpack-merge");
const common = require("./webpack.common");

const isDev = process.env.NODE_ENV === "development";

const config = merge(common, {
  target: "node",
  entry: {
    app: path.resolve(__dirname, "../client/server-entry.jsx")
  },
  output: {
    filename: "server-entry.js",
    path: path.resolve(__dirname, "../dist/"),
    publicPath: "/public/",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: []
  },
  plugins: []
});

if (isDev) {
  /***** 开发(development) *****/ // eslint-disable-line
  config.mode = "development";

  config.devtool = "cheap-eval-source-map";
} else {
  /***** 生产(production) *****/ // eslint-disable-line
  config.mode = "production";
}

module.exports = config;
