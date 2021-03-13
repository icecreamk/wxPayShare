const express = require("express");
const memoryCache = require("memory-cache");
const config = require("./config");
const router = express.Router();
const common = require("./../common");
const util = require("./../../util/util");
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
router.get("/getOpenId", async function (req, res) {
  const code = req.query.code;
  console.log("code", code);
  const wxConfig = config.wx;
  if (!code) {
    res.json(util.handleFail("当前未获取到授权code码"));
  } else {
    const result = await common.getAccessToken(code);
    if (result.code == 0) {
      const data = result.data;
      const expire_time = 1000 * 60 * 1;
      res.cookie("openId", data.openid, {
        maxAge: expire_time,
      });
      res.redirect(memoryCache.get("redirectUrl"));
    } else {
      res.json(result);
    }
  }
});

module.exports = router;
