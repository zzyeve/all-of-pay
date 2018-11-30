<template src="./index.html"></template>
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>  
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
            imgUrl: 'http://10.73.155.169:9842/aop_server/getCaptchar.action',
            form: {
                userName: '',
                password: '',
                userType: '1',
                latestLoginIp: '',
                captcharCode: ''
            },
            rules: {
                userName: [{
                    required: true, validator: checkUser, trigger: 'blur'
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
        console.log(returnCitySN["cip"]+','+returnCitySN["cname"]);
    },
    methods: {
        // 获取验证码接口
        // 登录按钮
        loginData() {

        },
        // 刷新验证码
        refreshImg() {
            this.imgUrl = 'http://10.73.155.169:9842/aop_server/getCaptchar.action?t=' + Math.random();
        },
        // 跳转注册
        goRegister() {
            window.location.href = '#/register';
        }
    }
};
</script>
