<template src="./index.html"></template>
<script>
import './index.less';
export default {
    data() {
        return {
            loading: false,
            totalCount: 0,
            dataList: [],
            params: {
                apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d',
                pageSize: 10,
                pageNo: 1
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.loading = true;
            this.$api.getBalanceDetail(this.params).then(res => {
                this.dataList = res.balanceDetailList;
                this.totalCount = res.totalCount;
                this.loading = false;
            });
        },
        // 页码更改
        handleCurrentChange(val) {
            this.params.pageNo = val;
            this.getData();
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
