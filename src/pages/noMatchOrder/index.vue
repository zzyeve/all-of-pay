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
            },
            selectType: {
                id: '',
                list: [{
                    label: '类型1',
                    value: 'val1'
                }, {
                    label: '类2',
                    value: 'val2'
                }]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
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
