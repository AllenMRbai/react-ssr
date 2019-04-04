const axios = require("axios");

const baseUrl = "https://cnodejs.org/api/v1";

module.exports = function(req, res, next) {
  const { path } = req;
  const { user = {} } = req.session;
  const needAccessToken = req.query.needAccessToken;

  if (needAccessToken && !user.accessToken) {
    return res.status(401).json({ success: false, msg: "need login" });
  }

  let params = { ...req.query };
  let data = { ...req.body };

  console.log("代理请求信息*********************************************");
  console.log(req.method);
  console.log(`${baseUrl}${path}`);
  console.log(params);
  console.log({ ...req.body, accesstoken: user.accessToken });

  if (needAccessToken) {
    params.accesstoken = req.session.user.accessToken;
    data.accesstoken = req.session.user.accessToken;
  }

  axios({
    method: req.method,
    url: `${baseUrl}${path}`,
    params,
    data
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // }
  })
    .then(resp => {
      if (resp.status === 200) {
        res.json(resp.data);
      } else {
        res.status(resp.status).send(resp.data);
      }
    })
    .catch(err => {
      if (err.response) {
        res.status(500).send(err.response.data);
      } else {
        console.error(err);
        res.status(500).send({
          success: false,
          msg: "未知错误"
        });
      }
    });
};
