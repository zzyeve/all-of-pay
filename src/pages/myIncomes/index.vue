<template src="./index.html"></template>
<script>
import './index.less';
import VueQr from 'vue-qr';
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
                orderMonth: '0'
            },
            apiUid: '',
            dialogShow: false,
            qrCodeDialog: false,
            config: {
                value: 'http:www.baidu.coom', // 显示的值、跳转的地址
                logo: '' // 中间logo的地址
            },
            selectType: {
                id: '',
                list: [{
                    value: 50,
                    label: 50.00
                },{
                    value: 100,
                    label: 100.00
                }]
            }
        };
    },
    created() {
        this.apiUid = this.$store.getters.apiUid;
        this.getData();
        // this.$store.getters.apiUid
    },
    methods: {
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
            // this.$router.push({
            //     path: '/detail'
            // });
            window.location.href = '#/incomes/detail';
        },





        // 点击支付宝充值按钮
        aliPay () {
            this.dialogShow = false;
            this.qrCodeDialog = true;
        }

    },
    components: {
        'vue-qr': VueQr
    }
};
</script>
