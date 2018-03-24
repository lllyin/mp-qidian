// pages/publish/index.js
const config = require('../../constant/config.js');

//获取应用实例
const app = getApp()
const { API_URL } = config;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:'',
    author: 'lyin', 
  },
  // toast：成功提示
  openToast: function () {
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 3000
    });
  },
  // toast:加载中
  openLoading: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 3000
    });
  },
  // 文本输入框内容改变
  handleContentChange:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  // 文本输入框完成
  handleContentConfirm:(content)=>{
    console.log(content2);
  },
  // 发布文章
  publishArticle:function(){
    const articleData = {
      title:this.data.title,
      content:this.data.content,
      author: this.data.author,
      create_time: Date.parse(new Date())/1000
    };
    if(!articleData.content){
      return;
    }
    console.log('提交的数据', articleData);    
    wx.request({
      url: API_URL,
      method:'POST',
      dataType:'json',
      data:{
        ...articleData
      },
      fail:(e)=>{
        console.log('提交文章失败',e)
      },
      success:(e)=>{
        console.log('提交文章成功', e);
        this.openToast();
        this.setData({
          title: '',
          content: '',
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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