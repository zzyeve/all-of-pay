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
                password: '',
                userType: '',
                latestLoginIp: '',
                captcharCode: ''
            },
            rules: {
                userName: [{
                    required: true, validator: checkUser, trigger: 'blur'
                }],
                realName: [{
                    required: true, trigger: 'blur', message: '请输入真实姓名'
                }],
                password: [
                    {required: true, trigger: 'blur', message: '请输入密码'},
                    {min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur'}
                ],
                confirmPassword: [{
                    required: true, validator: checkPassword, trigger: 'blur'
                }],
                wxAccount:  [{
                    required: true, trigger: 'blur', message: '请输入手机绑定微信号'
                }],
                msisdn:  [{
                    required: true, trigger: 'blur', message: '请输入紧急联系电话'
                }]
            }
        };
    },
    created() {
        this.getCaptchar();
    },
    methods: {
        // 获取验证码接口
        getCaptchar() {
            this.$api.getCaptchar().then(res => {
                console.log(res);
            });
        },
        // 登录按钮
        loginData() {

        },
        // 跳转注册
        goLogin() {
            window.location.href = '#/login';
        }
    }
};
</script>
