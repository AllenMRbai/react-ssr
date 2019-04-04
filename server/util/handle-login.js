const axios = require("axios");
const router = require("express").Router();

const baseUrl = "https://cnodejs.org/api/v1";

router.post("/login", function(req, res, next) {
  console.log("登陆信息*************************************************");
  console.log(`${baseUrl}/accesstoken`);
  console.log(req.body.accessToken);

  axios
    .post(`${baseUrl}/accesstoken`, {
      accesstoken: req.body.accessToken
    })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        let { loginname, id, avatar_url: avatarUrl } = resp.data;
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: loginname,
          id: id,
          avatarUrl: avatarUrl
        };
        res.send({
          sucess: true,
          data: req.session.user
        });
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        });
      } else {
        next(err);
      }
    });
});

module.exports = router;
