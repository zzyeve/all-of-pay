<template src="./index.html"></template>
<script>
import './index.less';
import VueQr from 'vue-qr';
export default {
  data () {
    return {
      qrCodeDialog: false,
      config: {
        value: '', // 显示的值、跳转的地址
        logo: '' // 中间logo的地址
      },
      labelPosition: 'right',
      formLabelAlign6: {
        money: '',
        payType: '1'
      },
      rules6: {
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        payType: [
          { required: true, message: '请选择支付类型', trigger: 'change' }
        ]
      }
    };
  },
  created () {

  },
  methods: {
    // 请求测试接口
    interfaceTest () {
      let params = {
        apiUid: this.$store.getters.apiUid,
        payType: this.formLabelAlign6.payType,
        amount: this.formLabelAlign6.money
      };
      this.$api.aopInterfaceTest(params).then(res => {
        console.log(res);
        if (res.resultCode === '0000') {
          this.$message.success('提交成功！');
          this.config.value = res.rqcodeUrl;
          this.qrCodeDialog = true; // 弹出相应的二维码图片
        } else {
          this.$message.warning(res.resultMsg);
        }
      });
    },

    // 点击支付测试按钮提交修改后的表单
    submitForm6 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.interfaceTest();
          this.$refs[formName].resetFields();
        } else {
          this.$message.warning('请填写内容');
          return false;
        }
      });
    }
  },
  components: {
    'vue-qr': VueQr
  }
};
</script>

