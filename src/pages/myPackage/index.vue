<template src="./index.html"></template>
<script>
import './index.less';
import Moment from 'moment';
export default {
  data () {
    return {
      showLine: false,
      warningWords: false,
      warningWords2: false,
      dialogFormOneVisible: false,
      dialogFormTwoVisible: false,
      havePurchase: true,
      notPurchase: false,
      labelPosition: 'right',
      formOneLabelAlign: {
        id: '',
        selectTime: {
          list: [
            {
              value: '选项1',
              label: '一个月'
            }, {
              value: '选项2',
              label: '6个月-8折'
            }, {
              value: '选项3',
              label: '1年-7折'
            }, {
              value: '选项4',
              label: '2年-6折'
            }, {
              value: '选项5',
              label: '3年-4折'
            }
          ]
        },
        password: ''
      },
      formTwoLabelAlign: {
        id: '',
        selectPackage: {
          list: [
            {
              value: '选项1',
              label: '基础版套餐',
              disabled: false
            }, {
              value: '选项2',
              label: '高级版套餐',
              disabled: false
            }, {
              value: '选项3',
              label: '专业版套餐',
              disabled: false
            }
          ]
        },
        password: ''
      },
      packageInfo: {
        beforePrice: '',
        currentPrice: '',
        priceDifferences: '',
        accountBalance: '',
        packageName: '',
        packageId: '',
        newPackageId: '',
        packagePrice: '',
        startTime: '',
        endTime: '',
        residueDays: '',
        lowPackageId: '',
        lowPackagePrice: '',
        highPackageId: '',
        highPackagePrice: '',
        professionalPackageId: '',
        professionalPackagePrice: ''
      },
      rules2_1: {
        id: [
          { required: true, message: '请选择续费时长', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      },
      rules2_2: {
        id: [
          { required: true, message: '请选择套餐类型', trigger: 'change' }
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
          if (res.packageName === '') {
            this.havePurchase = false;
            this.notPurchase = true;
          } else {
            this.havePurchase = true;
            this.notPurchase = false;
          }
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
        console.log(res);
        this.packageInfo.lowPackageId = res.packageInfoList[1].packageId;
        this.packageInfo.lowPackagePrice = res.packageInfoList[1].packagePrice;
        this.packageInfo.highPackageId = res.packageInfoList[2].packageId;
        this.packageInfo.highPackagePrice = res.packageInfoList[2].packagePrice;
        this.packageInfo.professionalPackageId = res.packageInfoList[0].packageId;
        this.packageInfo.professionalPackagePrice = res.packageInfoList[0].packagePrice;
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
      console.log(string);
      this.$api.updateUserPackageInfo(params).then(res => {
        console.log(res);
        if (res.resultCode !== '0000') {
          this.$message.warning(res.resultMsg);
        } else {
          this.$message.success('提交成功！');
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
        console.log(res);
        this.packageInfo.accountBalance = '¥' + res.userInfoList[0].userBalance;
      });
    },
    // 点击续费弹出表单
    dialogFormOne () {
      this.dialogFormOneVisible = true;
    },
    // 续费时长改变时触发
    changeTime () {
      if (this.formOneLabelAlign.id === '选项1') {
        this.packageInfo.beforePrice = '原价¥' + this.packageInfo.packagePrice;
        this.packageInfo.currentPrice = '¥' + this.packageInfo.packagePrice;
        this.showLine = true;
        this.packageInfo.endTime = Moment(this.packageInfo.endTime).add(1, 'M');
        if (this.packageInfo.accountBalance < this.packageInfo.currentPrice) {
          this.warningWords = true;
        } else {
          this.warningWords = false;
        }
      } else if (this.formOneLabelAlign.id === '选项2') {
        this.packageInfo.beforePrice = '原价¥' + this.packageInfo.packagePrice * 6;
        this.packageInfo.currentPrice = '¥' + parseFloat(this.packageInfo.packagePrice * 6 * 0.8).toFixed(1);
        this.showLine = true;
        this.packageInfo.endTime = Moment(this.packageInfo.endTime).add(6, 'M');
        if (this.packageInfo.accountBalance < this.packageInfo.currentPrice) {
          this.warningWords = true;
        } else {
          this.warningWords = false;
        }
      } else if (this.formOneLabelAlign.id === '选项3') {
        this.packageInfo.beforePrice = '原价¥' + this.packageInfo.packagePrice * 12;
        this.packageInfo.currentPrice = '¥' + parseFloat(this.packageInfo.packagePrice * 12 * 0.7).toFixed(1);
        this.showLine = true;
        this.packageInfo.endTime = Moment(this.packageInfo.endTime).add(1, 'y');
        if (this.packageInfo.accountBalance < this.packageInfo.currentPrice) {
          this.warningWords = true;
        } else {
          this.warningWords = false;
        }
      } else if (this.formOneLabelAlign.id === '选项4') {
        this.packageInfo.beforePrice = '原价¥' + this.packageInfo.packagePrice * 24;
        this.packageInfo.currentPrice = '¥' + parseFloat(this.packageInfo.packagePrice * 24 * 0.6).toFixed(1);
        this.showLine = true;
        this.packageInfo.endTime = Moment(this.packageInfo.endTime).add(2, 'y');
        if (this.packageInfo.accountBalance < this.packageInfo.currentPrice) {
          this.warningWords = true;
        } else {
          this.warningWords = false;
        }
      } else if (this.formOneLabelAlign.id === '选项5') {
        this.packageInfo.beforePrice = '原价¥' + this.packageInfo.packagePrice * 36;
        this.packageInfo.currentPrice = '¥' + parseFloat(this.packageInfo.packagePrice * 36 * 0.4).toFixed(1);
        this.showLine = true;
        this.packageInfo.endTime = Moment(this.packageInfo.endTime).add(3, 'y');
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
    changePackage () {
      if (this.packageInfo.packageName === '低级版套餐') {
        if (this.formTwoLabelAlign.id === '选项2') {
          this.packageInfo.priceDifferences = this.packageInfo.highPackagePrice - this.packageInfo.lowPackagePrice;
          if (this.packageInfo.accountBalance < this.packageInfo.priceDifferences) {
            this.warningWords2 = true;
          } else {
            this.warningWords2 = false;
          }
        } else if (this.formTwoLabelAlign.id === '选项3') {
          this.packageInfo.priceDifferences = this.packageInfo.professionalPackagePrice - this.packageInfo.lowPackagePrice;
          if (this.packageInfo.accountBalance < this.packageInfo.priceDifferences) {
            this.warningWords2 = true;
          } else {
            this.warningWords2 = false;
          }
        }
      } else if (this.packageInfo.packageName === '高级版套餐') {
        if (this.formTwoLabelAlign.id === '选项1') {
          this.packageInfo.priceDifferences = '0';
        } else if (this.formTwoLabelAlign.id === '选项3') {
          this.packageInfo.priceDifferences = this.packageInfo.professionalPackagePrice - this.packageInfo.highPackagePrice;
          if (this.packageInfo.accountBalance < this.packageInfo.priceDifferences) {
            this.warningWords2 = true;
          } else {
            this.warningWords2 = false;
          }
        }
      } else if (this.packageInfo.packageName === '专业版套餐') {
        if (this.formTwoLabelAlign.id === '选项1') {
          this.packageInfo.priceDifferences = '0';
        } else if (this.formTwoLabelAlign.id === '选项2') {
          this.packageInfo.priceDifferences = '0';
        }
      }
    },
    // 点击更改套餐弹出表单
    dialogFormTwo () {
      this.dialogFormTwoVisible = true;
      if (this.packageInfo.packageName === '低级版套餐') {
        this.formTwoLabelAlign.selectPackage.list[0].disabled = true;
      } else if (this.packageInfo.packageName === '高级版套餐') {
        this.formTwoLabelAlign.selectPackage.list[1].disabled = true;
      } else if (this.packageInfo.packageName === '专业版套餐') {
        this.formTwoLabelAlign.selectPackage.list[2].disabled = true;
      }
    },
    // 弹出的续费表单里点击续费按钮提交
    submitDelayMoney (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeOrDelayPackage(this.formOneLabelAlign.password, this.packageInfo.packageId, this.packageInfo.currentPrice.substring(1), '0');
          this.$refs[formName].resetFields();
          this.showLine = false;
          this.packageInfo.beforePrice = '';
          this.packageInfo.currentPrice = '';
          this.dialogFormOneVisible = false;
        } else {
          this.$message.warning('请填写内容');
          return false;
        }
      });
    },
    // 弹出的续费表单里点击取消按钮取消
    cancelDelayMoney (formName) {
      this.$refs[formName].resetFields();
      this.showLine = false;
      this.packageInfo.beforePrice = '';
      this.packageInfo.currentPrice = '';
      this.dialogFormOneVisible = false;
    },
    // 弹出的更改套餐表单里点击改套餐按钮提交
    submitChangePackage (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.packageInfo.packageName === '低级版套餐') {
            if (this.formTwoLabelAlign.id === '选项2') {
              this.changeOrDelayPackage(this.formTwoLabelAlign.password, this.packageInfo.highPackageId, String(this.packageInfo.priceDifferences), '1');
            } else if (this.formTwoLabelAlign.id === '选项3') {
              this.changeOrDelayPackage(this.formTwoLabelAlign.password, this.packageInfo.professionalPackageId, String(this.packageInfo.priceDifferences), '1');
            }
          } else if (this.packageInfo.packageName === '高级版套餐') {
            if (this.formTwoLabelAlign.id === '选项1') {
              this.changeOrDelayPackage(this.formTwoLabelAlign.password, this.packageInfo.lowPackageId, String(this.packageInfo.priceDifferences), '1');
            } else if (this.formTwoLabelAlign.id === '选项3') {
              this.changeOrDelayPackage(this.formTwoLabelAlign.password, this.packageInfo.professionalPackageId, String(this.packageInfo.priceDifferences), '1');
            }
          } else if (this.packageInfo.packageName === '专业版套餐') {
            if (this.formTwoLabelAlign.id === '选项1') {
              this.changeOrDelayPackage(this.formTwoLabelAlign.password, this.packageInfo.lowPackageId, String(this.packageInfo.priceDifferences), '1');
            } else if (this.formTwoLabelAlign.id === '选项2') {
              this.changeOrDelayPackage(this.formTwoLabelAlign.password, this.packageInfo.highPackageId, String(this.packageInfo.priceDifferences), '1');
            }
          }

          this.$refs[formName].resetFields();
          this.packageInfo.priceDifferences = '';
          this.dialogFormTwoVisible = false;
        } else {
          this.$message.warning('请填写内容');
          return false;
        }
      });
    },
    // 弹出的更改套餐表单里点击取消按钮取消
    cancelChangePackage (formName) {
      this.$refs[formName].resetFields();
      this.packageInfo.priceDifferences = '';
      this.dialogFormTwoVisible = false;
    },
    // 点击续费对话框关闭按钮
    closeDialogOne (formName) {
      this.$refs[formName].resetFields();
    },
    // 点击更改套餐对话框关闭按钮
    closeDialogTwo (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
