<template src="./index.html"></template>
<script>
import './index.less';
import Abstract from '../../components/Abstract.vue';
export default {
    mixins: [Abstract],
    data() {
        return {
            loading: false,
            totalSize: 100,
            dataList: [],
            apiUid: '',
            dialogShow: false,
            params: {
                apiUid: '',
                payType: '',
                pageSize: '10',
                pageNo: '1'
            },
            selectList: [{
                label: '支付宝',
                value: '0'
            }, {
                label: '微信',
                value: '1'
            }]
        };
    },
    created() {
        this.getData();
        this.params.apiUid = this.$store.getters.apiUid;
    },
    methods: {
        // 获取数据
        getData() {
            this.loading = true;
            this.$api.getAccountAndOrderInfo(this.params).then(res => {
                console.log(res);
                this.loading = false;
                this.dataList = res.accountAndOrderList;
            });
        },
        // 页码更改
        handleCurrentChange(val) {
            this.params.pageNo = val;
            this.getData();
        },
        // 跳转新增收款账户
        goAddAcount() {
            window.location.href = '#/account/add';
        },
        // 跳转二维码管理
        goReserve() {
            window.location.href = '#/account/reserve';
        },
        selectChange(val) {
            console.log(val);
        },
        tableRowClassName() {
            return 'table-row-name';
        },
        tableCellClassName() {
            return 'table-cell-name';
        }
    }
};
</script>
