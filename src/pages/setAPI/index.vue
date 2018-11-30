<template src="./index.html"></template>
<script>
import "./index.less";
export default {
  data () {
    let validateDelayTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('二维码过期时间不能为空'));
      }

        // if (!Number.isInteger(value)) {
        //   callback(new Error('请输入数字值'));
        // } else {
          if (value < 120 || value > 600) {
            callback(new Error('过期时间必须设置在120-600秒之间'));
          } else {
            callback();
          }
        // }

    };
    return {
      labelPosition: "right",
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
    // this.getData();
  },
  methods: {
    // getData () {
    // console.log('1');
    // }

    // 请求用户二维码失效时间更改接口
    updateRqcodeExpiryTime () {
      let params = {
        apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d',
        rqcodeExpiryTime: this.formLabelAlign4.delayTime
      };
      let string = params;
      this.$api.changeRqcodeExpiryTime(string).then(res => {
        console.log(res);
      });
    },

    // 点击保存提交修改后的表单
    submitForm4 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateRqcodeExpiryTime();
          this.$message.success('二维码过期时间修改成功！');
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

