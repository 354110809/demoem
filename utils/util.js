// 时间处理
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTime2 = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year].map(formatNumber).join('/') + '年' + [month].map(formatNumber).join('/') + '月' + [day].map(formatNumber).join('/') + '日';
}
const formatTime3 = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year].map(formatNumber).join('/') + '年' + [month].map(formatNumber).join('/') + '月' + [day].map(formatNumber).join('/') + '日' + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

const formatTime4 = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 获取屏幕尺寸
const getPagesize = () => {
    const pagesize = {
        pageWidth: null,
        pageHeight: null,
        pageScale: null
    };
    //获取屏幕宽高  
    wx.getSystemInfo({
        success: function (res) {
            pagesize.pageWidth = res.windowWidth;
            pagesize.pageHeight = res.windowHeight;
            pagesize.pageScale = res.windowHeight / res.windowWidth;//屏幕高宽比  
        }
    })
    return pagesize;
}

//手机号码格式校验(暂无172/173/174/175/179号段)
const patternPhoneNum = val => {
    const re = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    // console.log('validPhone ' + re.test(val));
    return re.test(val);
}

//身份证号验证
const identityID = val => {
    const re = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    // console.log('valididentityID ' + re.test(val));
    return re.test(val);
}
// 汉字字符验证
const ChineseVerification = val => {
    var re = /^[\u4e00-\u9fa5]+$/;
    return re.test(val)
}
// 随机生成六位数
const RandomNumber = () => {
    var oD = parseInt(Math.random() * (999999 - 100000 + 1) + 100000, 10);
    return oD;
}
// 计算当前日期n（AddDayCount）天之后的日期
const GetDateStr = AddDayCount => {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}
const randomNum = (minNum, maxNum) => {
    switch (2) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
} 
module.exports = {
    formatTime: formatTime,
    formatTime2: formatTime2,
    formatTime3: formatTime3,
    formatTime4: formatTime4,
    getPagesize: getPagesize,
    PhoneNum: patternPhoneNum,
    identityID: identityID,
    VerifyHanzi: ChineseVerification,
    RandomNumber: RandomNumber,
    randomNum: randomNum,
    GetDateStr: GetDateStr
}
