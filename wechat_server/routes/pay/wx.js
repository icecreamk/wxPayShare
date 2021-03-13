const express = require("express");
const request = require("request");
const memoryCache = require("memory-cache");
const config = require("./config");
const router = express.Router();

router.get("/test", function (req, res) {
  res.cookie("test1", "123", {
    maxAge: 60 * 1000,
  });
  res.json({
    code: 0,
    data: "test",
    message: "",
  });
});

// 用户授权重定向
router.get("/redirect", function (req, res) {
  const wxConfig = config.wx;
  const redirectUrl = req.query.url;
  const scope = req.query.scope;
  const callback = "http://m.kkk.com/api/wechat/getOpenId";
  memoryCache.put("redirectUrl", redirectUrl);
  const authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.appId}&redirect_uri=${callback}&response_type=code&scope=${scope}&state=STATE#wechat_redirec`;
  res.redirect(authorizeUrl);
});

// 根据code获取用户openId
router.get("/getOpenId", function (req, res) {
  const code = req.query.code;
  console.log("code", code);
  const wxConfig = config.wx;
  const tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.appId}&secret=${wxConfig.appSecret}&code=${code}&grant_type=authorization_code`;
  if (!code) {
    res.json({
      code: 1001,
      data: "",
      message: "当前未获取到授权code码",
    });
  } else {
    request.get(tokenUrl, function (err, response, body) {
      console.log("res", err, response.statusCode, body);
      if (!err && response.statusCode === 200) {
        const data = JSON.parse(body);
        console.log("body", body);
        const expire_time = 1000 * 60 * 1;
        console.log("expire_time", expire_time, data.openid);
        res.cookie("openId", data.openid, {
          maxAge: expire_time,
        });
        console.log("url", memoryCache.get("redirectUrl"));
        res.redirect(memoryCache.get("redirectUrl"));
      } else {
      }
    });
  }
});

module.exports = router;
