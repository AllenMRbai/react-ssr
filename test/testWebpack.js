const webpack = require("webpack");
const config = require("../build/webpack.server");

// without runner callback will return a compiler,
// so that we can invoke .run or .watch of compiler later
const compiler = webpack(config);

// compiler.watch({}, (err, stats) => {
//   console.log(typeof stats);
// });
