<template src="./index.html"></template>
<script>
import './index.less';
import VueQr from 'vue-qr';
import {priceList} from '../../utils/selectList.js';
import Abstract from '../../components/Abstract.vue';
export default {
    mixins: [Abstract],
    data() {
        return {
            news: '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'+
                                '<html>'+
                                '<head>'
                                +'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'
                                +'<title>pay fail</title>'
                                +'</head>'
                                +'<body>'
                                +'<div></div>'
                                +'</body>'
                                +'</html>',

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
            qrCodeDialog: false,
            userInfo: {
                needAlarm: 'false',
                userBalance: '0'
            },
            config: {
                value: 'http:www.baidu.coom', // 显示的值、跳转的地址
                logo: '' // 中间logo的地址
            },
            selectTypeId: '',
            priceList: {...priceList}
        };
    },
    created() {
        this.apiUid = this.$store.getters.apiUid;
        this.getData();
        this.getUserInfo();
        // this.$store.getters.apiUid
        // this.fetchUserInfo();
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
            let params = {
                apiUid: this.$store.getters.apiUid,
                rechargeMoney: this.allData.rechargeMoney,
                rechargeType: '0'
            };
            this.$api.getUserRecharge(params).then(res => {
                console.log(res);
            });
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
            this.dialogShow = false;
            this.qrCodeDialog = true;
            this.userRechargeMoney();
        }
    },
    components: {
        'vue-qr': VueQr
    }
};
</script>