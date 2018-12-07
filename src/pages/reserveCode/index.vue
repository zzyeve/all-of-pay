<template src="./index.html"></template>
<script>
import './index.less';
import {currentList, payTypeList} from '../../utils/selectList.js';
export default {
    data() {
        return {
            loading: false,
            totalCount: 100,
            account: '',
            dataList: [],
            selectionList: [],
            params: {
                account: this.account,
                price: '',
                rqcodeCount: '',
                concurrentCount: '',
                pageSize: 10,
                pageNo: 1
            },
            addForm: {
                account: this.account,
                rqcodePriceRange: '',
                rqcodeIncreasing: ''
            },
            createCodeParams: {
                apiUid: '',
                account: this.account,
                createCount: '',
                payType: '0',
                rqcodePriceList: []
            },
            firstRange: '',
            lastRange: '',
            dialogShow: false,
            selectList: {...currentList},
            // 批量生成二维码
            createCodeShow: false,
            payList: {...payTypeList}
        };
    },
    created() {
        this.account = this.$route.query.account;
        this.params.account = this.$route.query.account;
        this.addForm.account = this.$route.query.account;
        this.createCodeParams.account = this.$route.query.account;
        this.createCodeParams.apiUid = this.$store.getters.apiUid;
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
        // 单个删除按钮
        deleteSingleCode(row) {
            let arr = [];
            arr.push({rqcodePrice: row.rqcodePrice});
            this.selectionList = arr;
            this.deleteCode();
        },
        // 批量删除
        deleteCode() {
            if (!this.selectionList.length) {
                this.$message.warning('请先勾选数据');
                return false;
            }
            this.$confirm('是否删除？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    account:  this.account,
                    rqcodePriceList: this.selectionList
                };
                this.$api.deleteAccountRqcode(params).then(res => {
                    if (res.resultCode === "0000") {
                        this.$message.success('删除成功');
                        this.getData();
                    } else {
                        this.$message.error(res.resultMsg);
                    }
                });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        // 批量二维码--打开弹窗
        createCode() {
            if (this.selectionList.length) {
                this.createCodeShow = true;
                // this.createCodeParams.rqcodePriceList = this.selectionList;
            } else {
                this.$message.warning('请先勾选数据');
            }
        },
        // 删除二维码
        deleteQRCode(row) {
            this.$confirm('是否删除二维码？', '二维码删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let arr = [];
                arr.push({rqcodePrice: row.rqcodePrice});
                let params = {
                    account:  this.account,
                    rqcodePriceList: arr
                };
                this.$api.deleteRqcode(params).then(res => {
                    if (res.resultCode === "0000") {
                        this.$message.success('删除成功');
                        this.getData();
                    } else {
                        this.$message.error(res.resultMsg);
                    }
                });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        // 生成收款码按钮
        createSingleCode(row) {
            this.createCodeShow = true;
            let arr = [];
            arr.push({rqcodePrice: row.rqcodePrice});
            this.selectionList = arr;
        },
        // 生成二维码确定按钮
        saveCreateCode() {
            let patern = /^[1-9]\d{0,3}|1000$/;
            if (!patern.test(this.createCodeParams.createCount)) {
                this.$message.warning('请输入1-1000的数字');
                return false;
            }
            this.createCodeParams.rqcodePriceList = this.selectionList;
            this.$api.rqcodeCreate(this.createCodeParams).then(res => {
                if (res.resultCode === '0000') {
                    this.$message.success('生成二维码成功');
                    this.createCodeShow = false;
                } else {
                    this.$message.error(res.resultMsg);
                }
            });
        },
        // 新增金额--保存按钮
        saveData() {
            let patern = /^[1-9]\d{0,3}|1000$/;
            if (!this.firstRange || !this.lastRange || !this.addForm.rqcodeIncreasing) {
                this.$message.error('请填写内容');
                return;
            } else if (patern.test(this.firstRange) && patern.test(this.lastRange)) {
                this.addForm.rqcodePriceRange = this.firstRange + '-' + this.lastRange;
                this.$api.addRqcodePrice(this.addForm).then(res => {
                    if (res.resultCode === '0000') {
                        this.$message.success('新增成功');
                        this.dialogShow = false;
                        this.getData();
                    } else {
                        this.$message.error(res.resultMsg);
                    }
                });
            } else {
                this.$message.error('请输入1-1000的数字');
            }
        },
        // 勾选改变
        handleSelectionChange(val) {
            let arr = [];
            val.forEach(item =>{
                arr.push({rqcodePrice: item.rqcodePrice});
            });
            this.selectionList = arr;
        },
        // 是否勾选
        selectable(row) {
            return row.status !== '2'; // 收款状态为验证码生成中禁用
            // if (row.status === '2') {
            //     return false;
            // } else {
            //     return true;
            // }
        },
        // 页码更改
        handleCurrentChange(val) {
            this.params.pageNo = val;
            this.getData();
        },
        closeDialog() {
            this.$refs.codeTable.clearSelection();
            this.selectionList = [];
            this.createCodeParams.createCount = '';
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
