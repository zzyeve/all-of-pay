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
        payType: ''
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
    // this.getData();
  },
  methods: {
    // 请求测试接口
    interfaceTest () {
      let params = {
        apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d',
        payType: this.formLabelAlign6.payType,
        amount: this.formLabelAlign6.money
      };
      let string = params;
      this.$api.aopInterfaceTest(string).then(res => {
        console.log(res.rqcodeUrl); // http:www.baidu.coom
        this.config.value = res.rqcodeUrl;
      });
    },

    // 点击支付测试按钮提交修改后的表单
    submitForm6 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.interfaceTest();
          this.$message.success('提交成功！');
          this.$refs[formName].resetFields();
          this.qrCodeDialog = true; // 弹出相应的二维码图片
        } else {
          this.$message.warning('error submit!');
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

