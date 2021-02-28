export default {
  wechatRedireact: `/wechat/redirect?url=${encodeURIComponent(
    "http://m.kkk.com/#/index"
  )}&scope=snsapi_userinfo`,
  wechatConfig: "/wechat/jssdk",
  getUserInfo: "/wechat/getUserInfo",
  payWallet: "/wechat/pay/payWallet",
};
