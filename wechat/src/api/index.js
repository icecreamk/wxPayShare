export default {
  wechatRedireact: `/api/wechat/redirect?url=${encodeURIComponent(
    "http://m.kkk.com/#/index"
  )}&scope=snsapi_userinfo`,
  wechatConfig: "/api/wechat/jssdk",
  getUserInfo: "/api/wechat/getUserInfo",
  payWallet: "/api/wechat/pay/payWallet",
};
