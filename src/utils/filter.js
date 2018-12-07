import Vue from 'vue';
import moment from 'moment';
// 默认类型转换
Vue.filter('datetimeFormat', function (value) {
    if (!value) {
        return '';
    } else {
        return moment(value).format('YYYY-MM-DD HH:MM:SS');
    }
});
// 支付类型转换
Vue.filter('payTypeSwitch', function (value) {
    switch (value) {
        case '0': return '支付宝';
        case '1': return '微信';
        default : return '';
    }
});
// 二维码状态
Vue.filter('reserveCodeStatus', function (value) {
    switch (value) {
        case '0': return '正常';
        case '1': return '缺少收款码';
        case '2': return '收款码生成中';
        default : return '';
    }
});
// 订单状态
Vue.filter('orderStatus', function (value) {
    switch (value) {
        case '0': return '已完成已通知';
        case '1': return '已完成未通知';
        case '2': return '已关闭';
        case '3': return '等待付款';
        default: return '';
    }
});
// 账户状态
Vue.filter('accountStatus', function (value) {
    switch (value) {
        case '0': return '开启';
        case '1': return '关闭';
        default: return '开启';
    }
});
