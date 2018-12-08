<template src="./index.html"></template>
<script>
import moment from "moment";
import "./index.less";
import { payTypeList } from "../../utils/selectList.js";
export default {
	data() {
		return {
			params: {
				apiUid: "",
				payType: "",
				payId: '',
				userName: '',
				disabled: '',
				receviceAccount: "",
				remark: "",
				accountSort: "",
				accountWeight: "",
				realTimeGateway: "",
				timeLimitStart: "",
				timerLimitEnd: "",
				accountAmountLimit: "",
				accountStatus: "0",
				addOrUpdate: "1" // 0--代表添加 1--代表修改
			},
			selectList: {...payTypeList},
			rules: {
				receviceAccount: [
					{ required: true, message: "请输入收款账户", trigger: "blur" }
				],
				accountSort: [
					{ required: false, trigger: "blur" },
					{
						validator: (rule, value, callback) => {
						if (/^([0-9]\d|\d)$/.test(value) === false) {
							callback(new Error("请输入一个0-99整数"));
							this.params.accountSort = value.replace(2, '');
						}
						},
						trigger: "blur"
					}
				],
				accountWeight: [
					{ required: false, trigger: "blur" },
					{
						validator: (rule, value, callback) => {
						if (/^([0-9]\d|\d)$/.test(value) === false) {
							callback(new Error("请输入一个0-99整数"));
						}
						},
						trigger: "blur"
					}
				]
			}
		};
	},
  	created() {
		let params = JSON.parse(window.sessionStorage.getItem('accountDetail'));
		for (let item in this.params) {
			if (params[item] !== undefined) {
				this.params[item] = params[item] + '';
			} else {
				this.params[item] = '';
			}
		}
		this.params.apiUid = this.$store.getters.apiUid;
		this.params.addOrUpdate = '1';
	},
  	methods: {
		// 保存按钮
		saveData() {
			this.params.timeLimitStart = this.params.timeLimitStart ? moment(this.params.timeLimitStart).format('YYYYMMDD HH:mm:ss') : '';
			this.params.timerLimitEnd = this.params.timerLimitEnd ? moment(this.params.timerLimitEnd).format('YYYYMMDD HH:mm:ss') : '';
			this.$api.addUserReceviceAccount(this.params).then(res => {
				if (res.resultCode === "0000") {
					this.$message.success("编辑成功");
					setTimeout(function() {
						window.location.href = '#/account';
					}, 2000);
				} else {
					this.$message.error(res.resultMsg);
				}
			});
		},
		tableRowClassName() {
			return "table-row-name";
		},
		tableCellClassName() {
			return "table-cell-name";
		}
	}
};
</script>
