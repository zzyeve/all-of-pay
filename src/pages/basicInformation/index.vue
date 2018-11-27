<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign1: {
        name: '',
        phone: '',
        wechat: '',
        qq: '',
        title: '',
        authority: '',
        announce: ''
      },
      rules1: {
        name: [
          { required: true, message: '请输入您的真实姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入您的电话号码', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '请输入您的微信号', trigger: 'blur' }
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

    // 请求用户基本信息修改接口
    updateUserInfo () {
      let params = {
        apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d',
        realName: this.formLabelAlign1.name,
        msisdn: this.formLabelAlign1.phone,
        weixinAccount: this.formLabelAlign1.wechat,
        qqAccount: this.formLabelAlign1.qq,
        pageSubtitle: this.formLabelAlign1.title,
        pageCopyright: this.formLabelAlign1.authority,
        balanceAlarm: this.formLabelAlign1.announce
      };
      let string = JSON.stringify(params);
      this.$api.changeUserInfo(string).then(res => {
        console.log(res);
      });
    },

    // 点击保存提交修改后的表单
    submitForm1 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUserInfo();
          this.$message.success('修改成功！');
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
