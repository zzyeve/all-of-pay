<template src="./index.html"></template>
<script>
import './index.less';
export default {
    data() {
        return {
            loading: false,
            totalCount: 100,
            dataList: [],
            params: {
                account: '',
                price: '',
                rqcodeCount: '',
                concurrentCount: '',
                pageSize: 10,
                pageNo: 1
            },
            selectList: [{
                label: '全部',
                value: '0'
            },{
                label: '未满',
                value: '1'
            },{
                label: '全满',
                value: '2'
            }]
        };
    },
    created() {
        this.params.account = this.$route.query.account;
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.loading = true;
            this.$api.getAccountRqcodeInfo(this.params).then(res => {
                this.dataList = res.rqcodeInfoList;
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
