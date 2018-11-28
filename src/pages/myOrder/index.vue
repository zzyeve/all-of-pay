<template src="./index.html"></template>
<script>
import './index.less';
import {payTypeList, payStatusList} from '../../utils/selectList.js';
export default {
    data() {
        return {
            loading: false,
            totalCount: 0,
            dataList: [],
            params: {
                apiUid: '',
                orderNumber: '',
                realPrice: '',
                rqcodeMark: '',
                payFlow: '',
                createTime: '',
                payType: '',
                payStatus: '',
                pageNo: 1,
                pageSize: 10
            },
            payTypeList: {...payTypeList},
            payStatusList: {...payStatusList},
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
        this.params.apiUid = this.$store.getters.apiUid;
    },
    methods: {
        // 获取数据
        getData() {
            this.loading = true;
            this.$api.getUserOrderDetail(this.params).then(res => {
                this.loading = false;
                this.dataList = res.userOrderDetailList;
                this.totalCount = res.totalCount;
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
