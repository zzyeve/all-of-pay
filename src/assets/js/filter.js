import Vue from 'vue';
import moment from 'moment';
// 默认类型转换
Vue.filter('datetimeFormat', function (value) {
    return moment(value).format('YYYY-MM-DD HH:MM:SS');
});