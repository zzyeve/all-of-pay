<template>
    <div class="login">
        <div class="login-header">
            AllOfPays 管理系统
        </div>
        <div class="login-content">
            <div class="login-form">
                <div class="login-title">
                    登录
                </div>
                <el-form size="large" :inline="true" label-width="60px">
                    <el-form-item label="用户名">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button type="warning" @click="login">{{btnText}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="login-footer">
            Copyright &#169; 2017-2018. AllofPays Inc. All rights reserved
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bol: true,
            isBtnLoading: false
        };
    },
    computed: {
        btnText() {
            if (this.isBtnLoading) return '努力登录中...';
            return '登录';
        }
    },
    methods: {
        // 登录
        login() {
            this.isBtnLoading = true;
            this.$api.fetchLogin().then(res => {
                this.isBtnLoading = false;
                this.$message.success('登录成功');
                this.$store.dispatch('set_username', res.data.userName);
                this.$store.dispatch('set_login', true);
                window.location.href = '#/incomes';
            });
        }
    }
};
</script>
<style lang="less" scoped>
    .login {
        height: 100%; background: #F7F7F7; position: relative; min-height: 800px;
        overflow: hidden;
        .login-header {
            position: fixed; top: 0; left: 0; right: 0;
            z-index: 999;
            height: 88px; background: #fff;
            font-size: 28px; line-height: 88px;
        }
        .login-content {
            margin-top: 88px; height: 100%;
            margin-bottom: 37px;
            overflow: scroll;
            .login-form {
                background: #fff;
                text-align: center;
                width: 564px; height: 456px;
                padding: 29px 102px;
                margin: 120px auto;
                .login-title {
                    font-size: 36px; color: #FF9700;
                    text-align: center;
                    margin-bottom: 40px;
                }
                .el-input, .el-button {
                    width: 240px;
                }
            }
        }
        .login-footer {
            height: 37px; line-height: 37px; text-align: center;
            position: fixed; bottom: 0; left: 0; right: 0;
            background: #2A2A2A; color: #9B9B9B;
        }
    }
</style>

