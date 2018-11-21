<template src="./index.html"></template>
<script>
import './index.less';
import Abstract from '../../components/Abstract.vue';
export default {
    mixins: [Abstract],
    data() {
        return {
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
    },
    methods: {
        getData() {
            console.log(123);
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
