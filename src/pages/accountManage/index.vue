<template src="./index.html"></template>
<script>
import "./index.less";
import Abstract from "../../components/Abstract.vue";
import { payTypeList, modeList, wayList } from "../../utils/selectList.js";
export default {
	mixins: [Abstract],
	data() {
		return {
			loading: false,
			totalCount: 100,
			dataList: [],
			apiUid: "",
			dialogShow: false,
			params: {
				apiUid: "",
				payType: "",
				pageSize: 10,
				pageNo: 1
			},
			matchParams: {
				apiUid: "",
				matchingMode: "0",
				pollingWay: "0"
			},
			selectList: { ...payTypeList },
			modeList: { ...modeList },
			wayList: { ...wayList }
		};
	},
	created() {
		this.getData();
		this.params.apiUid = this.$store.getters.apiUid;
		this.matchParams.apiUid = this.$store.getters.apiUid;
	},
	mounted() {
			this.getData();
	},
	methods: {
		// 获取数据
		getData() {
			this.loading = true;
			this.$api.getAccountAndOrderInfo(this.params).then(res => {
				this.loading = false;
				this.totalCount = res.totalCount;
				this.dataList = res.accountAndOrderList;
			});
		},
		// 收款账户匹配---弹窗保存按钮
		saveData() {
			this.$api.changeAccountMatchingmode(this.matchParams).then(res => {
				if (res.resultCode === "0000") {
					this.$message.success("修改成功");
					this.dialogShow = false;
				} else {
					this.$message.error(res.resultMsg);
				}
			});
		},
		// 删除按钮
		deleteAccount(row) {
			this.$confirm("是否删除此条数据？", "删除提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				let params = {
					receviceAccount: row.receviceAccount,
					apiUid: this.params.apiUid
				};
				this.$api.deleteUserAccount(params).then(res => {
					if (res.resultCode === "0000") {
					this.$message.success("删除成功");
					this.getData();
					} else {
					this.$message.error(res.resultMsg);
					}
				});
			}).catch(() => {
				this.$message.info("已取消删除");
			});
		},
		// 页码更改
		handleCurrentChange(val) {
			this.params.pageNo = val;
			this.getData();
		},
		// 跳转编辑收款账户
		goEdit(row) {
			let accountDetail = JSON.stringify(row);
			window.sessionStorage.setItem("accountDetail", accountDetail);
			window.location.href = "#/account/edit";
		},
		// 跳转新增收款账户
		goAddAcount() {
			window.location.href = "#/account/add";
		},
		// 跳转二维码管理
		goReserve(row) {
			window.location.href = "#/account/reserve?account=" + row.receviceAccount;
		},
		tableRowClassName() {
			return "table-row-name";
		},
		tableCellClassName() {
			return "table-cell-name";
		}
	},
	watch: {
		'$route'() {
			this.getData();
		}
	}
};
</script>
