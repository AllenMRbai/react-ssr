const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const merge = require("webpack-merge");
const common = require("./webpack.common");

const isDev = process.env.NODE_ENV === "development";

const config = merge(common, {
  target: "web",
  entry: {
    app: path.resolve(__dirname, "../client/client-entry.jsx")
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

  config.output = {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist/"),
    publicPath: "/public/"
  };

  config.devServer = {
    host: "0.0.0.0",
    port: 3000,
    publicPath: "/public/",
    overlay: {
      errors: true
    },
    proxy: {
      "/api": "http://localhost:8080"
    },
    hot: true,
    historyApiFallback: {
      index: "/public/index.html"
    }
  };

  Array.prototype.push.apply(config.module.rules, [
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.(png|jpeg|jpg|gif|svg)/,
      use: "file-loader"
    }
  ]);

  Array.prototype.push.apply(config.plugins, [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../client/template.html"),
      favicon: path.resolve(__dirname, "../client/favicon.png")
    })
  ]);
} else {
  /***** 生产(production) *****/ // eslint-disable-line
  config.mode = "production";

  config.devtool = "source-map";

  config.output = {
    filename: "[name].[contentHash].js",
    path: path.resolve(__dirname, "../dist/"),
    publicPath: "/public/"
  };

  Array.prototype.push.apply(config.module.rules, [
    {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    },
    {
      test: /\.(png|jpeg|jpg|gif|svg)/,
      use: {
        loader: "url-loader",
        options: {
          limit: 1024,
          filename: "img/[name].[contentHash].[ext]"
        }
      }
    }
  ]);

  Array.prototype.push.apply(config.plugins, [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contentHash].css"
    }),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]);

  config.optimization = {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 80 * 1024,
      minChunks: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, chacheGroupKey) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendor_${packageName.replace("@", "")}`;
          }
        }
      }
    },
    minimizer: [
      new TerserWebpackPlugin({ sourceMap: true }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../client/template.html"),
        favicon: path.resolve(__dirname, "../client/favicon.png"),
        minify: {
          collapseWhitespace: true
        }
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  };
}

module.exports = config;
