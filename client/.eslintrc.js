let isDev = process.env.NODE_ENV === "development";

module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  extends: ["airbnb", "prettier"],
  rules: {
    "react/require-default-props": [0],
    "no-console": [isDev ? 0 : 1]
  }
};
