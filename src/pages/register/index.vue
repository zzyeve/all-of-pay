<template src="./index.html"></template>
<script>
import './index.less';
export default {
    data() {
        let checkUser = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
             if (!this.checkUserName(value)) {
                callback(new Error('用户名已存在'));
            } else {
                callback();
                // if (value < 18) {
                //     callback(new Error('必须年满18岁'));
                // } else {
                //     
                // }
            }
        };
        let checkPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            dataList: [],
            checked: false,
            confirmPassword: '',
            form: {
                userName: '',
                realName: '',
                wxAccount: '',
                password: '',
                confirmPassword: '',
                msisdn: ''
            },
            rules: {
                userName: [{
                    required: true, validator: checkUser, trigger: 'blur'
                }],
                realName: [{
                    required: true, trigger: 'blur', message: '请输入真实姓名'
                }],
                password: [{
                    required: true, trigger: 'blur', message: '请输入密码'
                    },{ min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' 
                }],
                confirmPassword: [{
                    required: true, validator: checkPassword, trigger: 'blur'
                }],
                wxAccount:  [{
                    required: true, trigger: 'blur', message: '请输入手机绑定微信号'
                }],
                msisdn:  [{
                    required: true, trigger: 'blur', message: '请输入紧急联系电话'
                }],
            }
        };
    },
    created() {
    },
    methods: {
        // 用户名校验是否重复接口
        checkUserName(userName) {
            let params = {
                userName: userName
            };
            this.$api.accountCheck(params).then(res => {
                console.log(res);
                return res.resultCode === '0000';
            });
        },
        // 立即注册按钮
        registerData() {
            if (!this.checked) {
                this.$message.warning('请阅读声明，并勾选按钮');
                return false;
            }
            let params = {
                userName: this.form.userName,
                realName: this.form.realName,
                wxAccount: this.form.wxAccount,
                password: this.form.password,
                msisdn: this.form.msisdn
            };
            this.$api.userRegister(params).then(res => {
                console.log(res);
            });
        },
        goLogin() {
            window.location.href = '#/login';
        }
    }
};
</script>
