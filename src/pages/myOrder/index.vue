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
                orderUid: '',
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
        resendMessage(row) {
            this.$confirm('是否要重发消息？', '重发消息提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    platformId: row.apiUid
                };
                this.$api.resendMessage(params).then(res => {
                    if (res.resultCode === "0000") {
                        this.$message.success('重发消息成功');
                    } else {
                        this.$message.error(res.resultMsg);
                    }
                });
            }).catch(() => {
                this.$message.info('已取消重发消息');
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
