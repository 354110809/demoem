const app = getApp()
Component({
   data: {
      userType: 0,
      selected: 0,
      color: "#8a8a8a",
      selectedColor: "#d8367f",
      backgroundColor:"#fdfdfd",
      list:[{
            pagePath: "/tabbarPages/tabbarPage1/index",
            text: "初见",
            iconPath: "/images/tabbar/tabIcon1.png",
            selectedIconPath: "/images/tabbar/tabIcon1-select.png"
         },
         {
            pagePath: "/tabbarPages/tabbarPage2/index",
            text: "群聚",
            iconPath: "/images/tabbar/tabIcon2.png",
            selectedIconPath: "/images/tabbar/tabIcon2-select.png"
         },
         {
            pagePath: "/tabbarPages/tabbarPage3/index",
            text: "活动",
            iconPath: "/images/tabbar/tabIcon3.png",
            selectedIconPath: "/images/tabbar/tabIcon3-select.png"
         },
         {
            pagePath: "/tabbarPages/tabbarPage4/index",
            text: "我的",
            iconPath: "/images/tabbar/tabIcon4.png",
            selectedIconPath: "/images/tabbar/tabIcon4-select.png"
         }
      ],
   },
   ready: function () {
      // this.setTabberList()
   },
   attached() {},
   methods: {
      // 切换事件
      switchTab(e) {
         const data = e.currentTarget.dataset
         console.log(data)
         const url = data.item.pagePath

         // 未登录阻止进入tab页面名单
         let blockEntryNameLists = ['消息','我的'];
         if (!app.globalData.isLoginState && blockEntryNameLists.includes(data.item.text) ) {
            wx.showToast({
               title: '未登录',
               icon: 'none',
               success: function () {
                  wx.navigateTo({
                     url: '/pages/login/index',
                  })
               }
            })

            return;
         }
         this.setData({
            selected: data.index
         })
         
         wx.switchTab({
            url
         })
      }
   }
})