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
    this.getUserInformation();
  },
  methods: {
    // 请求用户基本信息查询接口
    getUserInformation () {
      let params = {
        apiUid: this.$store.getters.apiUid
      };
      this.$api.getUserInfo(params).then(res => {
        if (res.resultCode === '0000') {
          this.formLabelAlign1.name = res.userInfoList[0].realName;
          this.formLabelAlign1.phone = res.userInfoList[0].msisdn;
          this.formLabelAlign1.wechat = res.userInfoList[0].weixinAccount;
          this.formLabelAlign1.qq = res.userInfoList[0].qqNumber;
          this.formLabelAlign1.title = res.userInfoList[0].pageSubtitle;
          this.formLabelAlign1.authority = res.userInfoList[0].pageCopyright;
          this.formLabelAlign1.announce = res.userInfoList[0].balanceAlarm;
        } else {
          this.$message.warning(res.resultMsg);
        }
      });
    },

    // 请求用户基本信息修改接口
    updateUserInfo () {
      let params = {
        apiUid: this.$store.getters.apiUid,
        realName: this.formLabelAlign1.name,
        msisdn: this.formLabelAlign1.phone,
        weixinAccount: this.formLabelAlign1.wechat,
        qqAccount: this.formLabelAlign1.qq,
        pageSubtitle: this.formLabelAlign1.title,
        pageCopyright: this.formLabelAlign1.authority,
        balanceAlarm: this.formLabelAlign1.announce
      };
      this.$api.changeUserInfo(params).then(res => {
        if (res.resultCode === '0000') {
          this.$message.success('修改成功！');
          this.getUserInformation();
        } else {
          this.$message.warning(res.resultMsg);
        }
      });
    },

    // 点击保存提交修改后的表单
    submitForm1 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUserInfo();
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
