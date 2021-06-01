// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    page: 1,
    pageSize: 5,
    arrayNumber: [],
    number: [1, 2, 3, 4, 5],
    hasMoreData:true,
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },
  onShow() {
    //模拟list
    this.fn()
  },
  fn() {
    const {number,pageSize,page,arrayNumber} = this.data;
    if (number.length < pageSize) {
      this.setData({
        hasMoreData: false,
        arrayNumber: [...arrayNumber, number].flat()
      })
    } else {
      this.setData({
        hasMoreData: true,
        page: (page + 1),
        arrayNumber: [...arrayNumber, number].flat()
      })
    }
    setTimeout(wx.stopPullDownRefresh,1000)
  },
  //下拉刷新测试
  onPullDownRefresh() {
    setTimeout(wx.stopPullDownRefresh, 1000)
    if (this.data.hasMoreData) {
      this.fn('')
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none',
        duration: 2000
      })
    }
  }
})