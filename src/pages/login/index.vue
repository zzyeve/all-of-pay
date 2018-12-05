<template src="./index.html"></template>
<script>
import './index.less';
import returnCitySN from 'returnCitySN';
export default {
    data() {
        return {
            dataList: [],
            checked: false,
            isLoginLoading: false,
            confirmPassword: '',
            imgUrl: '',
            form: {
                userName: '',
                password: '',
                userType: '1',
                latestLoginIp: '',
                captcharCode: ''
            },
            rules: {
                userName: [{
                    required: true, message: '请输入用户名', trigger: 'blur'
                }],
                password: [
                    {required: true, trigger: 'blur', message: '请输入密码'},
                    {min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur'}
                ],
                captcharCode:  [{
                    required: true, trigger: 'blur', message: '请输入验证码'
                }]
            }
        };
    },
    created() {
        this.form.latestLoginIp = returnCitySN.cip;
        this.refreshImg();
    },
    computed: {
        loginText() {
            if (this.isLoginLoading) return '登录中...';
            return '登录';
        }
    },
    methods: {
        // 登录按钮
        loginData() {
             this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoginLoading = true;
                    this.$api.userLogin(this.form).then(res => {
                        this.isLoginLoading = false;
                        if (res.resultCode === '0000') {
                            this.$message.success('登录成功');
                            this.$store.commit('set_login', true);
                            this.$store.commit('set_apiUid', res.apiUid);
                            window.location.href = '#/incomes';
                        } else {
                            this.$message.error(res.resultMsg);
                            this.refreshImg();
                        }
                    });
                } else {
                    this.$message.warning('请填写内容');
                }
            });
        },
        // 刷新验证码
        refreshImg() {
            this.imgUrl = this.$api.getCaptchar + '?t=' + Math.random();
        },
        // 回到首页
        goFirstPage() {
            window.location.href = '../index.html';
        },
        // 跳转注册
        goRegister() {
            window.location.href = '#/register';
        }
    }
};
</script>
