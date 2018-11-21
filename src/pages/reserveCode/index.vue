<template src="./index.html"></template>
<script>
import './index.less';
export default {
    data() {
        return {
            loading: false,
            totalSize: 100,
            dataList: [],
            params: {
                selectType: '',
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
            this.$api.fetchRoleManageList().then(res => {
                this.loading = false;
                this.dataList = res.dataList;
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
