<template src="./index.html"></template>
<script>
import './index.less';
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
        // this.fetchUserInfo();
    },
    methods: {
        // 获取用户信息
        fetchUserInfo() {
            let params = {
                apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d'
            };
            let string = JSON.stringify(params);
            this.$api.getUserInfo(string).then(res => {
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
            // this.$router.push({
            //     path: '/detail'
            // });
            window.location.href = '#/incomes/detail';
        }
    }
};
</script>
