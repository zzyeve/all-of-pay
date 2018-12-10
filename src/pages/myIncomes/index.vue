<template src="./index.html"></template>
<script>
import './index.less';
import VueQr from 'vue-qr';
// import moment from 'moment';
let timer; // 计时器
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
            refreshPage: false,
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
    },
    methods: {
        // 获取用户信息接口
        getUserInfo() {
            this.$api.getUserInfo({apiUid: this.apiUid}).then(res => {
                this.userInfo = Object.assign({}, res.userInfoList[0]);
            });
        },
        // 支付弹窗关闭
        qrcodeClose() {
            this.selectTypeId = '';
            clearTimeout(timer);
            this.totalTime = 360;
            this.refreshPage = false;
        },
        // 请求用户充值是否成功
        queryOrderIsPaySuccess() {
            let params = {
                merchanOrderId: this.userRecharge.orderid
            };
            this.$api.queryOrderIsPaySuccess(params).then(res => {
                if (res.resultCode === '0000') {
                    this.$message.success('充值成功');
                    this.qrCodeDialog = false;
                    this.getUserInfo();
                }
            });
        },
        // 请求用户充值接口
        userRechargeMoney () {
            if (!this.selectTypeId) {
                this.$message.warning('请选择数据');
                return;
            }
            let params = {
                apiUid: this.$store.getters.apiUid,
                rechargeMoney: this.selectTypeId,
                rechargeType: '0'
            };
            this.$api.getUserRecharge(params).then(res => {
                // if (res.resultCode === '0000') {
                    this.dialogShow = false;
                    this.qrCodeDialog = true;
                    this.userRecharge = Object.assign({}, this.userRecharge, res);
                    this.setTime();
                // } else {
                //     this.$message.error(res.resultMsg);
                // }
            });
        },
        // 定时器
        setTime() {
            if (this.totalTime < 0) {
                this.refreshPage = true;
                clearTimeout(timer);
                return;
            }
            let day = parseInt(this.totalTime / 60 / 60 / 24);
            let hr = parseInt(this.totalTime / 60 / 60 % 24);
            let min = parseInt(this.totalTime / 60 % 60);
            let sec = parseInt(this.totalTime % 60);
            this.dateTime.day = day;
            this.dateTime.hour = hr > 9 ? hr : '0' + hr;
            this.dateTime.min = min > 9 ? min : '0' + min;
            this.dateTime.second = sec > 9 ? sec : '0' + sec;
            this.totalTime --;
            const that = this;
            timer = setTimeout(function() {
                that.setTime();
                that.queryOrderIsPaySuccess();
            }, 1000);
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