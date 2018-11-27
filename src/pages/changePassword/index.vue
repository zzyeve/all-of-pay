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

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

