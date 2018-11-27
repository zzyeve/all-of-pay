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
        if (this.formLabelAlign.reinput !== '') {
          this.$refs.formLabelAlign.validateField('reinput');
        }
        callback();
      }
    };

    let validateReinput = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.formLabelAlign.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      formLabelAlign: {
        oldPassword: '',
        newPassword: '',
        reinput: ''
      },
      rules: {

      }
    };
  },
  created () {
    // this.getData();
  },
  metods: {
    // getData () {
      // console.log('1');
    // }
  }
};
</script>

