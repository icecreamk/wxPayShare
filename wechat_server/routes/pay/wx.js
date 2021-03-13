const express = require("express");
const memoryCache = require("memory-cache");
const config = require("./config");
const router = express.Router();
const createHash = require("create-hash");
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
  if (!code) {
    res.json(util.handleFail("当前未获取到授权code码"));
  } else {
    const result = await common.getAccessToken(code);
    if (result.code == 0) {
      const data = result.data;
      let expire_time = 1000 * 60 * 60 * 1;
      memoryCache.put("access_token", data.access_token, expire_time);
      memoryCache.put("openId", data.openid, expire_time);
      res.cookie("openId", data.openid, {
        maxAge: expire_time,
      });
      res.redirect(memoryCache.get("redirectUrl"));
    } else {
      res.json(result);
    }
  }
});

router.get("/getUserInfo", async function (req, res) {
  const access_token = memoryCache.get("access_token");
  const openId = memoryCache.get("openId");
  let result = await common.getUserInfo(access_token, openId);
  res.json(result);
});

router.get("/jssdk", async function (req, res) {
  const url = req.query.url;
  const wxConfig = config.wx;

  const result = await common.getToken();
  if (result.code == 0) {
    let token = result.data.access_token;
    memoryCache.put("token", token);
    const result2 = await common.getTicket(token);
    if (result2.code == 0) {
      const data = result2.data;
      const params = {
        noncestr: util.createNonceStr(),
        jsapi_ticket: data.ticket,
        timestamp: util.createTimeStamp(),
        url,
      };
      const str = util.raw(params);
      console.log("str:::" + JSON.stringify(params));
      const sign = createHash("sha1").update(str).digest("hex");
      res.json(
        util.handleSuc({
          appId: wxConfig.appId, // 必填，公众号的唯一标识
          timestamp: params.timestamp, // 必填，生成签名的时间戳
          nonceStr: params.noncestr, // 必填，生成签名的随机串
          signature: sign, // 必填，签名
          jsApiList: [
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareQZone",
            "chooseWXPay",
          ], // 必填，需要使用的JS接口列表
        })
      );
    }
  }
});

module.exports = router;
