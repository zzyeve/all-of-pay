<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data () {
    return {
      uidName: '535',
      tokenId: '62537382736hgfjkquwyeiq12944'
    };
  },
  created () {

  },
  methods: {
    // 请求用户重置token接口
    resetToken () {
      let params = {
        apiUid: this.$store.getters.apiUid
      };
      this.$api.tokenReset(params).then(res => {
        this.tokenId = res.result.token;
      });
    },

    // 点击重置Token按钮提交
    submitToken () {
      this.resetToken();
    }
  }
};
</script>

