const axios = require("axios");
const webpack = require("webpack");
const path = require("path");
const MemoryFileSystem = require("memory-fs");
const serverConfig = require("../../build/webpack.server");
const ReactDOMServer = require("react-dom/server");
const proxy = require("http-proxy-middleware");
const { matchPath } = require("react-router-dom");
const serialize = require("serialize-javascript");
const ejs = require("ejs");

const STATIC_HOST = "http://localhost:3000";

function getTemplate() {
  return axios.get(STATIC_HOST + "/public/server.ejs");
}

function getStoreString(stores) {
  return serialize(
    Object.keys(stores).reduce((result, storeName) => {
      result[storeName] = stores[storeName].toJson();
      return result;
    }, {})
  );
}

const compiler = webpack(serverConfig);
const mfs = new MemoryFileSystem();
const Module = module.constructor;
let serverBundle = null;
let createStoreMap = null;
let routes = null;

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
  routes = m.exports.routes;
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
        let staticContext = {};
        let stores = createStoreMap ? createStoreMap() : {};
        let renderResult = "";

        if (serverBundle && routes) {
          let promises = [];

          // 遍历静态路由（该路由的实现不支持嵌套）；
          // 如果路由能匹配请求路径，进一步判断路由组件上有没静态方法 —— initialData；
          // 如果有该静态方法，则执行后将返回的Promise对象push到promises
          routes.forEach(route => {
            const match = matchPath(url, route.path);

            if (match) {
              let initialData = route.component.initialData;
              if (initialData && typeof initialData === "function") {
                promises.push(
                  Promise.resolve(initialData(match))
                    .then(res => {
                      return { id: route.path, res };
                    })
                    .catch(err => {
                      return { id: route.path, res: err };
                    })
                );
              }
            }
          });

          // 等待所有异步请求接口处理完毕，并将数据存储到staticContext.datas内
          // 路由组件构造函数内可以通过props.staticContext.datas获取数据
          Promise.all(promises)
            .then(resArr => {
              staticContext.datas = {};
              staticContext.initialState = {};
              resArr.forEach(data => {
                staticContext.datas[data.id] = data.res;
              });
            })
            .then(() => {
              let app = serverBundle(url, staticContext, stores);

              renderResult = ReactDOMServer.renderToString(app);

              let storeString = getStoreString(stores) || "{}";
              let StateString = serialize(staticContext.initialState);

              console.log("打印count");
              console.log(JSON.stringify(stores.appState.count));

              if (staticContext.url) {
                res.status(302).setHeader("Location", staticContext.url);
                res.end();
              } else {
                res.send(
                  ejs.render(template, {
                    appString: renderResult,
                    initialStore: storeString,
                    initialState: StateString
                  })
                );
              }
            });
        } else {
          res.send("webpack 打包中,请稍后重新刷新");
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
};
