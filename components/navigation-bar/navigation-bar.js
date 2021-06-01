// components/navigation-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{type:String}
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBack:false,
  },
  attached: function(){
    var self = this;
    //动态计算导航栏尺寸
    var isSupport = !!wx.getMenuButtonBoundingClientRect;
    var rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    wx.getSystemInfo({
      success: (res) => {
        var ios = !!(res.system.toLowerCase().search('ios') + 1);
        var statusBarHeight = res.statusBarHeight;
        var topBarHeight = ios ? (44 + statusBarHeight) : (48 + statusBarHeight);
        console.log(isSupport ? 'width:' + rect.left + 'px' : '',)
        self.setData({
          statusBarHeight,
          topBarHeight,
          innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
          nnerPaddingRight: isSupport ? 'padding-right:' + (res.windowWidth - rect.left) + 'px' : '',
          leftWidth: isSupport ? 'width:' + (res.windowWidth - rect.left) + 'px' : ''
        })
      },
    })
    //back箭头处理的显示
    var pages=getCurrentPages()      
    if(pages.length>1){
      self.setData({showBack:true})
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      wx.navigateBack({
        delta: 1,
      })
    },
    home(){
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})