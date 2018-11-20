<template>
    <div class="warpper">
        <aside class="aside">
            <div class="logo">
                AllOfPays
            </div>
            <div class="warpper-menu">
                <el-menu
                    :default-active="activeMenu"
                    active-text-color="#ccc"
                    background-color="#001529"
                    text-color="#fff"
                    class="warpper-menu-bar"
                    router>
                    <template v-for="(menu, index) in routes">
                        <el-submenu :key="index" :index="menu.name" v-if="menu.children && menu.children.length !==false">
                            <template slot="title">
                                <i :class="menu.iconClass"></i>
                                {{menu.name}}
                            </template>
                            <template v-for="(cRoute, cIndex) in menu.children">
                                <el-menu-item :key="cIndex" :index="cRoute.name" :route="cRoute">
                                    {{cRoute.name}}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                        <el-menu-item :key="index" :index="menu.name" :route="menu" v-else>
                            <i :class="menu.iconClass"></i>{{menu.name}}
                        </el-menu-item>
                    </template>
                </el-menu>
            </div>
        </aside>
        <div class="warpper-content">
            <div class="warpper-header">
                <img src="../assets/img/side.png">
                <div class="user-info">
                    <span class="user-name">
                        用户名：{{userName}}
                    </span>
                    <span class="login-out">
                        <img src="../assets/img/loginOut.png">
                        退出
                    </span>
                </div>
            </div>
            <div class="warpper-content-main">
                <router-view></router-view>
            </div>
        </div>
    </div>

</template>
<script>
import children from '../routes/children.js';
import RouterTab from './RouterTab.vue';
export default {
    name: 'home',
    data() {
        return {
            activeMenu: '',
            routes: children,
            userName: 'Admin'
        };
    },
    components: {
        RouterTab
    },
    methods: {
        getData() {
            // console.log(this.routes);
        }
    },
    created() {
        this.activeMenu = this.$route.name;
    },
    watch: {
        '$route'() { // 参数to和from
            this.activeMenu = this.$route.name;
        }
    }
};
</script>
<style lang="less" scoped>
</style>
