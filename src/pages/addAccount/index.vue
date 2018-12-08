<template src="./index.html"></template>
<script>
import moment from 'moment';
import { payTypeList } from "../../utils/selectList.js";
import './index.less';
export default {
	data() {
		let checkAccountSort = (rule, value, callback) => {
			if (value === '') {
				callback();
				 // 如果没值的时候默认不校验，输入值的时候再进行校验
			} else if (!/^([1-9]\d|\d)$/.test(value)) {
                callback(new Error('请输入一个0-99整数'));
            } else {
                callback();
            }
		};
		let checkAccountWeight = (rule, value, callback) => {
			if (value === '') {
				callback();
			} else if (!/^([1-9]\d|\d)$/.test(value)) {
                callback(new Error('请输入一个0-99整数'));
            } else {
                callback();
            }
		};
		return {
			params: {
				apiUid: '',
				payId: '',
				userName: '',
				payType: '0',
				receviceAccount: '',
				remark: '',
				accountSort: '',
				accountWeight: '',
				realTimeGateway: '',
				timeLimitStart: '',
				timerLimitEnd: '',
				accountAmountLimit: '',
				accountStatus: '0',
				addOrUpdate: '0' // 0--代表添加 1--代表修改
			},
			isDisabled: true,
			selectList: {...payTypeList},
			rules: {
				receviceAccount: [
					{ required: true, message: '请输入收款账户', trigger: 'blur' }
				],
				payId: [
					{ required: true, message: '请输入支付ID', trigger: 'blur' }
				],
				userName: [
					{ required: true, message: '请输入支付名称', trigger: 'blur' }
				],
				accountSort: [
					{ required: false, validator: checkAccountWeight, trigger: 'blur' }
				],
				accountWeight: [
					{ required: false, validator: checkAccountSort, trigger: 'blur' }
				]
			}
		};
	},
	created() {
		this.params.apiUid = this.$store.getters.apiUid;
	},
	methods: {
		// 保存按钮
		saveData() {
			// console.log(this.params.timeLimitStart);
			// console.log(this.params.timerLimitEnd);
			this.$refs.params.validate((valid) => {
				if (valid) {
					this.params.timeLimitStart = this.params.timeLimitStart ? moment(this.params.timeLimitStart).format('YYYYMMDD HH:mm:ss') : '';
					this.params.timerLimitEnd = this.params.timerLimitEnd ? moment(this.params.timerLimitEnd).format('YYYYMMDD HH:mm:ss') : '';
					this.$api.addUserReceviceAccount(this.params).then(res => {
						if (res.resultCode === '0000') {
							this.$message.success("新增成功");
							setTimeout(function() {
								window.location.href = '#/account';
							}, 2000);
						} else {
							this.$message.error(res.resultMsg);
						}
					});
				} else {
					this.$message.warning('请填写内容');
				}
			});
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
