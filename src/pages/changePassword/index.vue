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
          { validator: validateOldPass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        reinput: [
          { validator: validateReinput, trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    // this.getData();
  },
  methods: {
    // getData () {
      // console.log('1');
    // }

    // 请求用户密码修改接口
    updateUserPassword () {
      let params = {
        apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d',
        oldPassword: this.formLabelAlign3.oldPassword,
        newPassword: this.formLabelAlign3.newPassword
      };
      let string = JSON.stringify(params);
      this.$api.changeUserPassword(string).then(res => {
        console.log(res);
        if (res.resultCode != '0000') {
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
          this.$message.warning('error submit!');
          return false;
        }
      });
    }
  }
};
</script>

