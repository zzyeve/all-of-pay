<template>
    <div class="warpper">
        <aside class="aside" :style="menuStyle">
            <div class="logo" :style="menuStyle">
                <img src="../assets/img/logo.png">
            </div>
            <div class="warpper-menu">
                <el-menu
                    :default-active="activeMenu"
                    active-text-color="#fff"
                    background-color="#001529"
                    text-color="#A6ADB4"
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
        <div class="warpper-content" :style="contentStyle">
            <div class="warpper-title" :style="titleStyle">
                <div class="warpper-header">
                    <img src="../assets/img/side.png" @click="clickMenu">
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
                <div class="warpper-breadcrumb">
                    <span v-for="(item, index) in breadcrumbs" :to="item" :key="index">
                        {{ item.name }}
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
            userName: 'Admin',
            menuShow: true,
            breadcrumbs: [],
            contentStyle: {
                marginLeft: '256px'
            },
            menuStyle: {
                left: 0
            },
            titleStyle: {
                left: '256px'
            }
        };
    },
    components: {
        RouterTab
    },
    methods: {
        getData() {
            // console.log(this.routes);
        },
        clickMenu() {
            this.menuShow = !this.menuShow;
            if (this.menuShow) {
                this.contentStyle.marginLeft = '256px';
                this.menuStyle.left = 0;
                this.titleStyle.left = '256px';
            } else {
                this.contentStyle.marginLeft = 0;
                this.menuStyle.left = '-256px';
                this.titleStyle.left = 0;
            }
        }
    },
    created() {
        this.activeMenu = this.$route.name;
        this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];
    },
    mounted() {
    },
    watch: {
        '$route'() { // 参数to和from
            this.activeMenu = this.$route.name;
            this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];
        }
    }
};
</script>
<style lang="less" scoped>
</style>
