<template src="./index.html"></template>
<script>
import './index.less';
export default {
  data () {
    return {
      dialogFormOneVisible: false,
      dialogFormTwoVisible: false,
      havePurchase: true,
      notPurchase: false,
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
            label: '基础版套餐'
          }, {
            value: '选项2',
            label: '高级版套餐'
          }, {
            value: '选项3',
            label: '专业版套餐'
          }
        ]
      },
      packageInfo: {
        packageName: '',
        packageId: 'AOP_5fb32426aeb24e5aa71627dd9294193d',
        packagePrice: '',
        startTime: '',
        endTime: ''
      }
    };
  },
  created () {
    this.getUserPackageInformation();
    this.queryPackageInfo();
  },
  methods: {
    // 请求用户套餐信息查询接口
    getUserPackageInformation () {
      let params = {
        apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d'
      };
      let string = JSON.stringify(params);
      this.$api.getUserPackageInfo(string).then(res => {
        console.log(res.packageId);
        if (res.packageName === '') {
          this.havePurchase = false;
          this.notPurchase = true;
        } else {
          this.havePurchase = true;
          this.notPurchase = false;
        }
        this.packageInfo.packageName = res.packageName;
        this.packageInfo.packageId = res.packageId;
        this.packageInfo.packagePrice = res.packagePrice;
        this.packageInfo.startTime = res.packageSubscriptTime;
        this.packageInfo.endTime = res.packageExpiryTime;
      });
    },

    // 请求套餐信息查询接口
    queryPackageInfo () {
      let params = {
        packageId: this.packageInfo.packageId
      };
      let string = JSON.stringify(params);
      this.$api.getPackageInfo(string).then(res => {
        console.log(res);
      });
    },

    // 请求用户余额明细查询接口
    getBalanceDetail () {
      let params = {
        apiUid: 'AOP_5fb32426aeb24e5aa71627dd9294193d'
      };
      let string = JSON.stringify(params);
      this.$api.getBalanceDetail(string).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

