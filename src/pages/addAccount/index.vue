<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data() {
    return {
      params: {
        apiUid: '',
        payType: '',
        receviceAccount: '',
        remark: '',
        accountSort: '',
        accountWeight: '',
        realTimeGateway: '',
        timeLimitStart: '',
        timerLimitEnd: '',
        accountAmountLimit: '',
        accountStatus: '0',
        addOrUpdate: 0 // 0--代表添加 1--代表修改
      },
      rules: {
        receviceAccount: [
          { required: true, message: '请输入收款账户', trigger: 'blur' }
        ],
        accountSort: [
            { required: false, trigger: 'blur'},
            {
                validator: (rule, value, callback) => {
                    if (/^([1-9]\d|\d)$/.test(value) === false) {
                        callback(new Error('请输入一个0-99整数'));
                    }
                },
                trigger: 'change'
            }
        ],
        accountWeight: [
            { required: false, trigger: 'blur'},
            {
                validator: (rule, value, callback) => {
                    if (/^([1-9]\d|\d)$/.test(value) === false) {
                        callback(new Error('请输入一个0-99整数'));
                    }
                },
                trigger: 'change'
            }
        ]
      },
      selectList: [
        {
          label: '支付宝',
          value: '0'
        },
        {
          label: '微信',
          value: '1'
        }
      ]
    };
  },
  created() {
      this.params.apiUid = this.$store.getters.apiUid;
  },
  methods: {
    // 保存按钮
    saveData() {
        let paramsStr = JSON.parse(this.params);
        this.$api.addUserReceviceAccount(paramsStr).then(res => {
            console.log(res);
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
