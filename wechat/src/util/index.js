import wx from "weixin-js-sdk";

export default {
  getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
  },
  initShareInfo() {
    const shareInfo = {
      title: "标题",
      desc: "简介",
      link: "http://m.kkk.com/#/index",
      imgUrl: "",
    };
    wx.onMenuShareAppMessage(shareInfo);
    wx.onMenuShareTimeline(shareInfo);
    wx.onMenuShareQQ(shareInfo);
    wx.onMenuShareQZone(shareInfo);
  },
};
