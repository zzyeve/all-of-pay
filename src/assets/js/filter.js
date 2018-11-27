import Vue from 'vue';
import moment from 'moment';
// 默认类型转换
Vue.filter('datetimeFormat', function (value) {
    return moment(value).format('YYYY-MM-DD HH:MM:SS');
});
// 支付类型转换
Vue.filter('payTypeSwitch', function (value) {
    switch (value) {
        case '0': return '支付宝';
        case '1': return '微信';
        default : return '';
    }

    return moment(value).format('YYYY-MM-DD HH:MM:SS');
});