<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign4: {
        delayTime: ''
      },
      rules4: {
        delayTime: [
          { required: true, message: '二维码过期时间不能为空'},
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

