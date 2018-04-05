// pages/comment/index.js
const config = require('../../constant/config.js');

//获取应用实例
const app = getApp();
const { API_URL } = config;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //当前登陆用户信息
    content:"", //评论内容
    to: '',  //评论发给谁
    user: '', //评论发起者
    type:0, //留言类型：0:评论，1是回复
    articleId:'',
    maxlength:240
  },

  // 文本输入框内容改变
  handleContentChange: function (e) {
    console.log(e.detail.value.length)
    if (e.detail.value.length <= this.data.maxlength) {
      this.setData({
        content: e.detail.value
      })
    }
  },

  // 发起评论
  publishComment:function(){
    const {articleId,content,to,user,type} = this.data;
    const commentData = {
      to,
      user,
      content,
      type,
      create_time: Date.parse(new Date()) / 1000
    }
    wx.request({
      url: `${API_URL}/${articleId}/comments`,
      method: 'POST',
      dataType: 'json',
      data: {
        ...commentData
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        const serverRes = res.data.data;
        console.log('评论发布成功',serverRes);
        wx.redirectTo({
          url: `../detail/index?id=${this.data.articleId}`
        })    
      },
      fail: (e) => {
        console.log('评论失败', e)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = app.globalData.userInfo;
    this.setData({
      userInfo,
      to:options.to,
      articleId:options.id,
      user:userInfo.nickName,
      type:options.type
    })
    console.log('评论页面', options, userInfo)    
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