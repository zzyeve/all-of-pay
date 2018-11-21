import MyIncomes from './../pages/myIncomes';
import AccountManage from './../pages/accountManage';

import BasicInformation from './../pages/basicInformation';
import MyPackage from './../pages/myPackage';
import ChangePassword from './../pages/changePassword';
import SetAPI from './../pages/setAPI';
import InfoAPI from './../pages/infoAPI';
import TestAPI from './../pages/testAPI';

import TemplatePage from './../pages/templatePage';
import ManagePage from './../pages/managePage';
import RoleManage from './../pages/roleManage';
import PermissionSetting from './../pages/permissionSetting';
import Abstract from './../components/Abstract';
const children = [
    {
        path: 'incomes',
        name: '我的收入统计',
        iconClass: 'el-icon-setting',
        component: MyIncomes
    }, {
        path: 'account',
        name: '收款账号管理',
        iconClass: 'el-icon-message',
        component: Abstract,
        children: [{
            path: 'index',
            name: '收款账号管理 ',
            component: AccountManage,
            children: [{
                path: 'addAcount',
                name: '添加收款账号',
                component: TemplatePage
            }]
        }]
    }, {
        path: 'order',
        name: '订单管理',
        iconClass: 'el-icon-picture',
        component: Abstract,
        children: [
            {
                path: 'myOrder',
                name: '我的订单',
                component: BasicInformation
            }, {
                path: 'auto',
                name: '自动对账',
                component: ChangePassword
            }
        ]
    }, {
        path: 'noMatch',
        name: '无匹配订单',
        iconClass: 'el-icon-view',
        component: PermissionSetting
    }, {
        path: 'content ',
        name: '账号管理',
        iconClass: 'el-icon-star-off',
        component: Abstract,
        children: [
            {
                path: 'basicInfo',
                name: '基本信息',
                component: BasicInformation
            },{
                path: 'myPackage',
                name: '我的套餐',
                component: MyPackage
            },{
                path: 'changePwd',
                name: '修改密码',
                component: ChangePassword
            },{
                path: 'ApiParams',
                name: 'API参数设置',
                component: SetAPI
            },{
                path: 'ApiInfo',
                name: 'API接口信息',
                component: InfoAPI
            },{
                path: 'test',
                name: '测试接口',
                component: TestAPI
            }
        ]
    }, {
        path: 'api ',
        name: 'API接口文档',
        iconClass: 'el-icon-bell',
        component: TemplatePage
    }, {
        path: 'app',
        name: 'app下载',
        iconClass: 'el-icon-service',
        component: ManagePage
    }
];
export default children;