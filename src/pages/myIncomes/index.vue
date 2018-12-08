<template src="./index.html"></template>
<script>
import './index.less';
import VueQr from 'vue-qr';
// import moment from 'moment';
import {priceList} from '../../utils/selectList.js';
import Abstract from '../../components/Abstract.vue';
export default {
    mixins: [Abstract],
    data() {
        return {
            allData: {
                incomeToday: '0',
                incomeYesterday: '0',
                incomeWeek: '0',
                incomeMonth: '0',
                orderToday: '0',
                orderYesterday: '0',
                orderWeek: '0',
                orderMonth: '0',
                rechargeMoney: ''
            },
            apiUid: '',
            dialogShow: false,
            returnPage: '',
            qrCodeDialog: false,
            userInfo: {
                needAlarm: 'false',
                userBalance: '0'
            },
            // config: {
            //     value: '', // 显示的值、跳转的地址
            //     logo: '' // 中间logo的地址
            // },
            userRecharge: {
                istype: '',
                orderid: '',
                price: '',
                qrcodeurl: '',
                logo: ''
            },
            totalTime: 360,
            dateTime: {
                day: '',
                hour: '',
                min: '',
                second: ''
            },
            selectTypeId: '',
            priceList: {...priceList}
        };
    },
    created() {
        this.apiUid = this.$store.getters.apiUid;
        this.getData();
        this.getUserInfo();
        // this.setTime(360);
    },
    methods: {
        // 获取用户信息接口
        getUserInfo() {
            this.$api.getUserInfo({apiUid: this.apiUid}).then(res => {
                this.userInfo = Object.assign({}, res.userInfoList[0]);
            });
        },
        // 请求用户充值接口
        userRechargeMoney () {
            if (!this.allData.rechargeMoney) {
                this.$message.warning('请选择数据');
                return;
            }
            let params = {
                apiUid: this.$store.getters.apiUid,
                rechargeMoney: this.allData.rechargeMoney,
                rechargeType: '0'
            };
            this.$api.getUserRecharge(params).then(res => {
                this.dialogShow = false;
                this.qrCodeDialog = true;
                this.userRecharge = Object.assign({}, this.userRecharge, res);
            });

        },
        setTime() {
            // let _that = this;
            // // let timer = setInterval(function() {
            // if (dataTime > 0) {
            //     _that.dateTime.day = Math.floor(dataTime / (60 * 60 * 24));
            //     _that.dateTime.hour = Math.floor(dataTime / (60 * 60)) - (_that.dateTime.day * 24);
            //     _that.dateTime.min = Math.floor(dataTime / 60) - (_that.dateTime.day * 24 * 60) - (_that.dateTime.hour * 60);
            //     _that.dateTime.second = Math.floor(dataTime) - (_that.dateTime.day * 24 * 60 * 60) - (_that.dateTime.hour * 60 * 60) - (_that.dateTime.min * 60);
            // }
            // if (_that.dateTime.min <= 9) _that.dateTime.min = '0' + _that.dateTime.min;
            // if (_that.dateTime.second <= 9) _that.dateTime.second = '0' + _that.dateTime.second;
            // dataTime --;
            // console.log(this.dateTime);
        },
        // 获取数据
        getData() {
            let params = {
                apiUid: this.apiUid
            };
            this.$api.getUserOrderMsg(params).then(res => {
                let allData = {};
                res.orderInfoList.forEach(item => {
                    allData = Object.assign(allData, item);
                });
                this.allData = allData;
            });
        },
        // 跳转到明细页
        goDetail() {
            window.location.href = '#/incomes/detail';
        },
        // 监听选择充值金额
        selectMoney () {
            this.allData.rechargeMoney = this.selectTypeId;
        },
        // 点击支付宝充值按钮
        aliPay () {
            this.userRechargeMoney();
        }
    },
    components: {
        'vue-qr': VueQr
    }
};
</script>