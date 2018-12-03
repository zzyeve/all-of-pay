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
                apiUid: '',
                pageSize: 10,
                pageNo: 1
            }
        };
    },
    created() {
        this.params.apiUid = this.$store.getters.apiUid;
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
        tableRowClassName() {
            return 'table-row-name';
        },
        tableCellClassName() {
            return 'table-cell-name';
        }
    }
};
</script>
