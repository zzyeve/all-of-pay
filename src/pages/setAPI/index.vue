<template src="./index.html"></template>
<script>
import "./index.less";
export default {
  data () {
    let validateDelayTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('二维码过期时间不能为空'));
      } else {
        if (value < 120 || value > 600) {
          callback(new Error('过期时间必须设置在120-600秒之间'));
        } else {
          callback();
        }
      }
    };
    return {
      labelPosition: "right",
      apiUid: '',
      formLabelAlign4: {
        delayTime: ""
      },
      rules4: {
        delayTime: [
          { validator: validateDelayTime, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.apiUid = this.$store.getters.apiUid;
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息接口
    getUserInfo () {
      this.$api.getUserInfo({apiUid: this.apiUid}).then(res => {
        this.formLabelAlign4.delayTime = res.userInfoList[0].qrcodeExpiryTime;
      });
    },

    // 请求用户二维码失效时间更改接口
    updateRqcodeExpiryTime () {
      let params = {
        apiUid: this.$store.getters.apiUid,
        rqcodeExpiryTime: this.formLabelAlign4.delayTime
      };
      this.$api.changeRqcodeExpiryTime(params).then(res => {
        if (res.resultCode === '0000') {
          this.$message.success(res.resultMsg);
        } else {
          this.$message.warning(res.resultMsg);
        }
      });
    },

    // 点击保存提交修改后的表单
    submitForm4 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateRqcodeExpiryTime();
          this.$refs[formName].resetFields();
        } else {
          this.$message.warning('请填写内容');
          return false;
        }
      });
    }
  }
};
</script>

