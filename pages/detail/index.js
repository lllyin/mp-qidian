// pages/detail/index.js
const config = require('../../constant/config.js');
const util = require('../../utils/util.js');

const app = getApp()
const { API_URL } = config;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:{}
    
  },

  //跳转动评论页面
  jumpToComment: function (e) {
    const id = e.currentTarget.id;  //记录ID
    const replyTo = e.currentTarget.dataset.to;  //评论给谁
    const type = e.currentTarget.dataset.type;//留言类型：0:评论，1是回复
    if (replyTo === this.data.userInfo.nickName && parseInt(type,10) === 1){
      console.log('你不能回复自己');
      this.openActionSheet();
    }else{
      wx.redirectTo({
        url: `../comment/index?id=${id}&to=${replyTo}&type=${type}`
      })
    }
    console.log("记录e info", e,replyTo,this.data.userInfo.nickName);    
  },

  // 弹出式菜单，采用小程序原生的actionsheet
  openActionSheet:function() {
    wx.showActionSheet({
      itemList: ['删除(开发中，仅展示)'],
      itemColor:"#e44445",
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },

  /**
   * 获取文章详情
   */
  getArticle:function(id){
    wx.request({
      url: API_URL+ '/' + id ,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        const serverArticles = res.data.data;
        const articles = serverArticles.map(val => {
          return {
            ...val,
            create_time: util.formatTime(new Date(val.create_time * 1000))
          }
        })
        this.setData({
          article:articles[0]
        })
        console.log('服务器数据', res.data.data,this)        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('article id',options.id)
    this.getArticle(options.id);
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})