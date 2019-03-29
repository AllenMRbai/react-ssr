const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server');

const server = express();

const PORT = 8080;
const ENV = process.env.NODE_ENV;

server.use(express.json());
server.use(
  express.urlencoded({
    extended: true
  })
);
server.use(cookieParser());
server.use(
  session({
    secret: 'Allen_server@side-render',
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

if (ENV === 'production') {
  const serverEntry = require('../dist/server-entry').default;

  server.use('/public', express.static(path.resolve(__dirname, '../dist')));

  let templatePath = path.resolve(__dirname, '../dist/index.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  server.get('*', (req, res) => {
    const appString = ReactDOMServer.renderToString(serverEntry);
    res.send(template.replace('<!-- app -->', appString));
  });
} else if (ENV === 'development') {
  const devStatic = require('./util/dev-static');

  devStatic(server);
}

server.listen(PORT, () => {
  console.log('server is running at port ' + PORT);
});
