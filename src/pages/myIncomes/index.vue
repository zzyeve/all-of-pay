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
        // this.$store.getters.apiUid
        // this.fetchUserInfo();
    },
    methods: {
        // 请求用户充值接口
        userRechargeMoney () {
            let params = {
                apiUid: this.$store.getters.apiUid,
                rechargeMoney: this.allData.rechargeMoney,
                rechargeType: '0'
            };
            let string = params;
            this.$api.getUserRecharge(string).then(res => {
                console.log(res);
                if (res.resultCode !== '0000') {
                    this.$message.warning(res.resultMsg);
                } else {
                    this.$message.success(res.resultMsg);
                    this.config.value = res.rqcodeUrl;
                }
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