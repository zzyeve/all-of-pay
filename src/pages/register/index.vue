<template src="./index.html"></template>
<script>
import './index.less';
import Abstract from "../../components/Abstract.vue";
export default {
    mixins: [Abstract],
    data() {
        // 密码重复校验
        let checkPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        // 密码重复校验
        let checkNumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入紧急联系电话'));
            } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        };
        // 用户名重复校验
        let checkUserName = (rule, value, callback) => {
            let that = this;
            let params = {
                userName: value
            };
            that.$api.accountCheck(params).then(res => {
                if (res.resultCode === '0000') {
                    callback();
                } else {
                    callback(new Error('用户名已存在'));
                }
            });
        };
        return {
            dataList: [],
            checked: false,
            checkName: false,
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
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur'}
                    ,{
                    required: true, validator: checkUserName, trigger: 'blur'
                }],
                realName: [{
                    required: true, trigger: 'blur', message: '请输入真实姓名'
                }],
                password: [{
                    required: true, trigger: 'blur', message: '请输入密码'
                },
                {min: 6, max: 15, message: '长度在6到15个字符', trigger:'blur' }
                ],
                confirmPassword: [{
                    required: true, validator: checkPassword, trigger: 'blur'
                }],
                wxAccount: [{
                    required: true, trigger: 'blur', message: '请输入手机绑定微信号'
                }],
                msisdn: [{
                    required: true, trigger: 'blur', validator: checkNumber
                }]
            }
        };
    },
    created() {
    },
    methods: {
        // 立即注册按钮
        registerData() {
             this.$refs.form.validate((valid) => {
                if (valid) {
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
                        if (res.resultCode === '0000') {
                            this.$message.success('注册成功,请登录');
                            setTimeout(function() {
                                window.location.href = '#/login';
                            }, 2000);
                        } else {
                            this.$message.error(res.rseultMsg);
                        }
                    });
                } else {
                    this.$message.warning('请填写内容');
                }
            });
        },
        // 回到首页
        goFirstPage() {
            window.location.href = '../index.html';
        },
        // 跳转登录
        goLogin() {
            window.location.href = '#/login';
        }
    }
};
</script>
