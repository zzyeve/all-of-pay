<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data () {
    let validateDelayTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('二维码过期时间不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 120 || value > 600) {
            callback(new Error('过期时间必须设置在120-600秒之间'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      labelPosition: 'right',
      formLabelAlign4: {
        delayTime: ''
      },
      rules4: {
        delayTime: [
          { required: true, message: '二维码过期时间不能为空'},
          { type: 'number', message: '二维码过期时间必须为数字值'}
        ]
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

