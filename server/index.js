const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const server = express();
const router = express.Router();

let port = 8080;

server.use(express.json());
server.use(express.urlencoded());
server.use(cookieParser());
server.use(
  session({
    secret: "Allen_server@side-render",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

router.get("/", (req, res, next) => {
  req.session.name = "allen";
  res.json({
    name: "allen",
    age: 27
  });
});

server.use("/", router);

server.listen(port, () => {
  console.log("server is running at port " + port);
});
