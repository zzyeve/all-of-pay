<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data () {
    return {
      dialogFormOneVisible: false,
      dialogFormTwoVisible: false,
      labelPosition: 'right',
      formOneLabelAlign: {
        password: ''
      },
      formTwoLabelAlign: {
        password: ''
      },
      selectTime: {
        id: '',
        list: [
          {
            value: '选项1',
            label: '选项111'
          }, {
            value: '选项2',
            label: '选项222'
          }, {
            value: '选项3',
            label: '选项333'
          }
        ]
      },
      selectPackage: {
        id: '',
        list: [
          {
            value: '选项1',
            label: '选项111'
          }, {
            value: '选项2',
            label: '选项222'
          }, {
            value: '选项3',
            label: '选项333'
          }
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

