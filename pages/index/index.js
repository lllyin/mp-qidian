//index.js
const config = require('../../constant/config.js');
const util = require('../../utils/util.js');

//获取应用实例
const app = getApp()
const {API_URL} = config;


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    articles:[], //服务器文章列表
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getArticles: function () {
    wx.request({
      url: API_URL,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        const serverArticles = res.data.data;
        const articles = serverArticles.map(val=>{
          return {
            ...val,
            create_time: util.formatTime(new Date(val.create_time*1000))
          }
        })
        this.setData({
          articles
        })
        console.log('服务器数据', res.data.data)        
      }
    })
  },
  onLoad: function () {
    // this.getArticles();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    console.log('home show');
    this.getArticles()
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },
})
