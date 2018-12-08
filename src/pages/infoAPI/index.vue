<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data () {
    return {
      uidName: this.$store.getters.apiUid,
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
        if (res.resultCode === '0000') {
          this.tokenId = res.result.token;
          this.$message.success('重置成功！');
        } else {
          this.$message.warning(res.resultMsg);
        }
      });
    },

    // 点击重置Token按钮提交
    submitToken () {
      this.resetToken();
    }
  }
};
</script>

