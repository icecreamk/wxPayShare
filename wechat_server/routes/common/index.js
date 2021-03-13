// 微信接口统一封装处理
const request = require("request");
const config = require("./../pay/config");
const util = require("./../../util/util");
exports.getAccessToken = function (code) {
  const wxConfig = config.wx;
  const tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.appId}&secret=${wxConfig.appSecret}&code=${code}&grant_type=authorization_code`;
  return new Promise((resolve, reject) => {
    request.get(tokenUrl, function (err, response, body) {
      let result = util.handleResponse(err, response, body);
      // 这里resolve包含成功和失败的情况
      resolve(result);
    });
  });
};
