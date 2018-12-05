<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data () {
    let validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        callback();
      }
    };

    let validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.formLabelAlign3.reinput !== '') {
          this.$refs.formLabelAlign3.validateField('reinput');
        }
        callback();
      }
    };

    let validateReinput = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.formLabelAlign3.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      formLabelAlign3: {
        oldPassword: '',
        newPassword: '',
        reinput: ''
      },
      rules3: {
        oldPassword: [
          { validator: validateOldPass, trigger: 'blur', required: true }
        ],
        newPassword: [
          { validator: validateNewPass, trigger: 'blur', required: true }
        ],
        reinput: [
          { validator: validateReinput, trigger: 'blur', required: true }
        ]
      }
    };
  },
  created () {

  },
  methods: {
    // 请求用户密码修改接口
    updateUserPassword () {
      let params = {
        apiUid: this.$store.getters.apiUid,
        oldPassword: this.formLabelAlign3.oldPassword,
        newPassword: this.formLabelAlign3.newPassword
      };
      this.$api.changeUserPassword(params).then(res => {
        if (res.resultCode !== '0000') {
          this.$message.warning(res.resultMsg);
        } else {
          this.$message.success('密码修改成功！');
        }
      });
    },

    // 点击确认提交修改后的表单
    submitForm3 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUserPassword();
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

