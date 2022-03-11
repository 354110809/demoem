var app = getApp();
Component({
    /* 开启全局样式设置 */
    options: {
        addGlobalClass: true,
    },

    /* 组件的属性列表 */
    properties: {
        swiperObject: Object
    },

    /* 组件的初始数据 */
    data: {
        
    },
    /* 组件的方法列表 */
    methods: {
        bindchange(e) {
            var swiperObject = this.data.swiperObject
            swiperObject.swiperIndex = e.detail.current
            this.setData({
                swiperObject: swiperObject
            })
        },
        // 查看详情
        goToDetail (e) {
    

        }
    },
    

})