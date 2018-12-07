<template src="./index.html"></template>
<script>
import './index.less';
import Moment from 'moment';
export default {
  data () {
    let validateSelect1 = (rule, value, callback) => {
      let obj = {};
      obj = this.formOneLabelAlign.id;
      if (!('label' in obj)) {
        callback(new Error('请选择续费时长'));
      } else {
        callback();
      }
    };
    let validateSelect2 = (rule, value, callback) => {
      let obj = {};
      obj = this.formTwoLabelAlign.id;
      if (!('packageName' in obj)) {
        callback(new Error('请选择更改的套餐类型'));
      } else {
        callback();
      }
    };
    let validateSelect3 = (rule, value, callback) => {
      let obj = {};
      obj = this.formThreeLabelAlign.type;
      if (!('packageName' in obj)) {
        callback(new Error('请选择购买的套餐类型'));
      } else {
        callback();
      }
    };
    let validateSelect4 = (rule, value, callback) => {
      let obj = {};
      obj = this.formThreeLabelAlign.times;
      if (!('label' in obj)) {
        callback(new Error('请选择购买时长'));
      } else {
        callback();
      }
    };
    return {
      show: false,
      showLine: false,
      selectDisabled: true,
      warningWords: false,
      warningWords2: false,
      warningWords3: false,
      dialogFormOneVisible: false,
      dialogFormTwoVisible: false,
      dialogFormThreeVisible: false,
      havePurchase: false,
      notPurchase: false,
      labelPosition: 'right',
      formOneLabelAlign: {
        id: {},
        selectTime: {
          list: [
            {
              value: '选项1',
              label: '一个月',
              discount: 1,
              times: 1
            }, {
              value: '选项2',
              label: '6个月-8折',
              discount: 0.8,
              times: 6
            }, {
              value: '选项3',
              label: '1年-7折',
              discount: 0.7,
              times: 12
            }, {
              value: '选项4',
              label: '2年-6折',
              discount: 0.6,
              times: 24
            }, {
              value: '选项5',
              label: '3年-4折',
              discount: 0.4,
              times: 36
            }
          ]
        },
        password: ''
      },
      formTwoLabelAlign: {
        id: {},
        selectPackageList: [],
        password: ''
      },
      formThreeLabelAlign: {
        type: {},
        times: {},
        password: ''
      },
      packageInfo: {
        rate: '',
        beforePrice: '',
        currentPrice: '',
        priceDifferences: '',
        accountBalance: '',
        packageName: '',
        packageId: '',
        newPackageId: '',
        packagePrice: '',
        buyTimes: '',
        discount: '',
        startTime: '',
        endTime: '',
        currentTime: '',
        endTimeBuy: '',
        residueDays: ''
      },
      rules2_1: {
        id: [
          { required: true, validator: validateSelect1, trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      },
      rules2_2: {
        id: [
          { required: true, validator: validateSelect2, trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      },
      rules2_3: {
        type: [
          { required: true, validator: validateSelect3, trigger: 'change' }
        ],
        times: [
          { required: true, validator: validateSelect4, trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.queryPackageInfo();
    this.getUserPackageInformation();
    this.getUserInfo();
  },
  methods: {
    // 请求用户套餐信息查询接口
    getUserPackageInformation () {
      let params = {
        apiUid: this.$store.getters.apiUid
      };
      this.$api.getUserPackageInfo(params).then(res => {
        console.log(res);
        if (res.resultCode === '0000') {
          this.havePurchase = true;
          this.notPurchase = false;
          this.packageInfo.packageName = res.packageName;
          this.packageInfo.packageId = res.packageId;
          this.packageInfo.packagePrice = parseInt(res.packagePrice);
          this.packageInfo.startTime = res.packageSubscriptTime;
          this.packageInfo.endTime = res.packageExpiryTime;
          // 计算剩余天数
          let date = new Date();
          let currentTime = parseInt(date.getTime() / 1000); // 获取距离1970年1月1日00:00:00的毫秒数，并转换成秒数，通过parseInt转成整秒数；
          let residualTime = (res.packageExpiryTime / 1000) - currentTime; // res.packageExpiryTime是从后台获取的结束时间，单位是毫秒
          if ((residualTime / (24 * 3600)) > 0 && (residualTime / (24 * 3600)) < 1) {
            this.packageInfo.residueDays = '不足1天';
          } else {
            this.packageInfo.residueDays = Math.ceil(residualTime / (24 * 3600)) + '天'; // 剩余天数
          }
        } else {
          this.havePurchase = false;
          this.notPurchase = true;
          this.packageInfo.residueDays = '0天';
        }
      });
    },
    // 请求套餐信息查询接口
    queryPackageInfo () {
      let params = {
        packageId: this.packageInfo.packageId
      };
      this.$api.getPackageInfo(params).then(res => {
        if (res.resultCode === '0000') {
          this.formTwoLabelAlign.selectPackageList = res.packageInfoList;
        }
      });
    },
    // 请求用户更改/续订套餐接口
    changeOrDelayPackage (passwords, newId, subscript_amount, typeValue) {
      let params = {
        apiUid: this.$store.getters.apiUid,
        password: passwords,
        oldPackageId: this.packageInfo.packageId,
        newPackageId: newId,
        packageExpiryTime: Moment(this.packageInfo.endTime).format('YYYYMMDD HH:mm:ss'),
        subscriptAmount: subscript_amount,
        type: typeValue
      };
      this.$api.updateUserPackageInfo(params).then(res => {
        if (res.resultCode !== '0000') {
          this.$message.warning(res.resultMsg);
        } else {
          this.$message.success('提交成功！');
          this.getUserPackageInformation();
        }
      });
    },
    // 请求套餐订购接口
    purchasePackage () {
      let params = {
        apiUid: this.$store.getters.apiUid,
        password: this.formThreeLabelAlign.password,
        newPackageId: this.packageInfo.newPackageId,
        packageStartTime: Moment(this.packageInfo.currentTime).format('YYYYMMDD HH:mm:ss'),
        packageExpiryTime: Moment(this.packageInfo.endTimeBuy).format('YYYYMMDD HH:mm:ss'),
        subscriptAmount: this.packageInfo.currentPrice.substring(1),
        rate: String(this.packageInfo.rate)
      };
      this.$api.userSubscribuPackage(params).then(res => {
        console.log(res);
        if (res.resultCode !== '0000') {
          this.$message.warning(res.resultMsg);
        } else {
          this.$message.success(res.resultMsg);
          this.getUserPackageInformation();
        }
      });
    },
    // 请求用户基本信息查询接口来查找账户的余额
    getUserInfo () {
      let params = {
        apiUid: this.$store.getters.apiUid
      };
      this.$api.getUserInfo(params).then(res => {
        if (res.resultCode === '0000') {
          this.packageInfo.accountBalance = '¥' + res.userInfoList[0].userBalance;
        }
      });
    },
    // 点击续费弹出表单
    dialogFormOne () {
      this.dialogFormOneVisible = true;
    },
    // 点击更改套餐弹出表单
    dialogFormTwo () {
      this.dialogFormTwoVisible = true;
    },
    // 点击返回购买弹出表单
    dialogFormThree () {
      this.dialogFormThreeVisible = true;
      this.warningWords3 = false;
      let cdate = new Date().getTime();
      this.packageInfo.currentTime = Moment(cdate).format('YYYY-MM-DD HH:mm:ss');
    },
    // 续费时长改变时触发
    changeTime (value) {
      if (value) {
        this.packageInfo.beforePrice = '原价¥' + (this.packageInfo.packagePrice * value.times);
        this.packageInfo.currentPrice = '¥' + parseFloat(this.packageInfo.packagePrice * value.times * value.discount).toFixed(1);
        this.showLine = true;
        this.packageInfo.endTime = Moment(this.packageInfo.endTime).add(value.times, 'M');
        if (this.packageInfo.accountBalance < this.packageInfo.currentPrice) {
          this.warningWords = true;
        } else {
          this.warningWords = false;
        }
      } else {
        this.packageInfo.beforePrice = '';
        this.packageInfo.currentPrice = '';
      }
    },
    // 选购套餐类型发生改变时触发
    changePackage (value) {
      if (value) {
        this.show = true;
        this.packageInfo.newPackageId = value.packageId;
        if (value.packagePrice < this.packageInfo.packagePrice) {
          this.packageInfo.priceDifferences = '0';
        } else {
          this.packageInfo.priceDifferences = value.packagePrice - this.packageInfo.packagePrice;
          if (this.packageInfo.accountBalance < this.packageInfo.priceDifferences) {
            this.warningWords2 = true;
          } else {
            this.warningWords2 = false;
          }
        }
      } else {
        this.show = false;
      }
    },
    // 购买套餐表单里购买时长发生改变时触发
    changePurchaseTimes (value) {
      if (value) {
        this.packageInfo.buyTimes = value.times;
        this.packageInfo.discount = value.discount;
        this.packageInfo.endTimeBuy = Moment(this.packageInfo.currentTime).add(value.times, 'M');
        this.packageInfo.beforePrice = '原价¥' + (this.packageInfo.packagePrice * value.times);
        this.packageInfo.currentPrice = '¥' + parseFloat(this.packageInfo.packagePrice * value.times * value.discount).toFixed(1);
        this.showLine = true;
        if (Number(String(this.packageInfo.accountBalance).substring(1)) < Number(String(this.packageInfo.currentPrice).substring(1))) {
          this.warningWords3 = true;
        } else {
          this.warningWords3 = false;
        }
      } else {
        this.packageInfo.beforePrice = '';
        this.packageInfo.currentPrice = '';
      }
    },
    // 购买套餐表单里购买套餐类型发生改变时触发
    changePurchasePackageType (value) {
      if (value === '') {
        this.selectDisabled = true;
      } else {
        this.selectDisabled = false;
      }
      this.packageInfo.packagePrice = value.packagePrice;
      this.packageInfo.newPackageId = value.packageId;
      this.packageInfo.rate = value.packageInherentRate;
      if (this.packageInfo.buyTimes) {
        this.packageInfo.beforePrice = '原价¥' + (value.packagePrice * this.packageInfo.buyTimes);
        this.packageInfo.currentPrice = '¥' + parseFloat(value.packagePrice * this.packageInfo.buyTimes * this.packageInfo.discount).toFixed(1);
      }
    },
    // 弹出的续费表单里点击续费按钮提交
    submitDelayMoney (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeOrDelayPackage(this.formOneLabelAlign.password, this.packageInfo.packageId, this.packageInfo.currentPrice.substring(1), '0');
          this.onlyDelayMoney();
        } else {
          this.$message.warning('请填写内容');
          return false;
        }
      });
    },
    // 弹出的续费表单里点击取消按钮取消
    cancelDelayMoney () {
      this.onlyDelayMoney();
    },
    // 点击续费对话框关闭按钮
    closeDialogOne () {
      this.onlyDelayMoney();
    },
    // 弹出的更改套餐表单里点击改套餐按钮提交
    submitChangePackage (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeOrDelayPackage(this.formTwoLabelAlign.password, this.packageInfo.newPackageId, String(this.packageInfo.priceDifferences), '1');
          this.onlyChangePackage();
        } else {
          this.$message.warning('请填写内容');
          return false;
        }
      });
    },
    // 弹出的更改套餐表单里点击取消按钮取消
    cancelChangePackage () {
      this.onlyChangePackage();
    },
    // 点击更改套餐对话框关闭按钮
    closeDialogTwo () {
      this.onlyChangePackage();
    },
    // 弹出的购买套餐表单里点击购买按钮提交
    submitPurchase (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.purchasePackage();
          this.onlyDelayMoney();
        } else {
          this.$message.warning('请填写内容');
          return false;
        }
      });
    },
    // 弹出的购买套餐表单里点击取消按钮取消
    cancelPurchase () {
      this.onlyDelayMoney();
    },
    // 点击购买套餐对话框关闭按钮
    closeDialogThree () {
      this.onlyDelayMoney();
    },
    // 续费及套餐购买表单专属
    onlyDelayMoney () {
      if (this.$refs.formOneLabelAlign) {
        this.$refs.formOneLabelAlign.resetFields();
        this.dialogFormOneVisible = false;
      }
      if (this.$refs.formThreeLabelAlign) {
        this.$refs.formThreeLabelAlign.resetFields();
        this.packageInfo.packagePrice = '';
        this.selectDisabled = true;
        this.packageInfo.currentTime = '';
        this.packageInfo.endTimeBuy = '';
        this.dialogFormThreeVisible = false;
      }
      this.showLine = false;
      this.packageInfo.beforePrice = '';
      this.packageInfo.currentPrice = '';
    },
    // 更改套餐表单专属
    onlyChangePackage () {
      this.$refs.formTwoLabelAlign.resetFields();
      this.show = false;
      this.packageInfo.priceDifferences = '';
      this.dialogFormTwoVisible = false;
    }
  }
};
</script>
