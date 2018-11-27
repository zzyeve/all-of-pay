<template src="./index.html"></template>
<script>
import './index.less';
import Abstract from '../../components/Abstract.vue';
export default {
    mixins: [Abstract],
    data() {
        return {
            allData: {
                incomeToday: '1111',
                incomeYesterday: '2222',
                incomeWeek: '4444',
                incomeMonth: '5555',
                orderToday: '22',
                orderYesterday: '3423',
                orderWeek: '234324',
                orderMonth: '34235'
            },
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
        this.getData();
        this.fetchUserInfo();
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
                apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d'
            };
            this.$api.getUserOrderMsg(params).then(res => {
                console.log(res);
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
