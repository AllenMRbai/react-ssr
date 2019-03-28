const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".json", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: "babel-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: [path.resolve(__dirname, "../node_modules/")]
      }
    ]
  }
};
