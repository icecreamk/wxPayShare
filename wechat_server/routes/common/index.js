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
exports.getUserInfo = function (access_token, openId) {
  let userinfo = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openId}&lang=zh_CN`;
  return new Promise((resolve, reject) => {
    request.get(userinfo, function (err, response, body) {
      let result = util.handleResponse(err, response, body);
      resolve(result);
    });
  });
};
// 获取基础接口的Token
exports.getToken = function () {
  const wxConfig = config.wx;

  let token = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.appId}&secret=${wxConfig.appSecret}`;
  return new Promise((resolve, reject) => {
    request.get(token, function (err, response, body) {
      console.log(response);
      let result = util.handleResponse(err, response, body);
      resolve(result);
    });
  });
};

// 根据Token获取Ticket(密钥)
exports.getTicket = function (token) {
  let tokenUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
  return new Promise((resolve, reject) => {
    request.get(tokenUrl, function (err, response, body) {
      let result = util.handleResponse(err, response, body);
      resolve(result);
    });
  });
};
