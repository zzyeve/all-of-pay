import MyIncomes from './../pages/myIncomes';
import AccountManage from './../pages/accountManage';
import AddAccount from './../pages/addAccount';
import ReserveCode from './../pages/reserveCode';
import MyOrder from './../pages/myOrder';
import AutoCharge from './../pages/autoCharge';
import NoMatchOrder from './../pages/noMatchOrder';

import BasicInformation from './../pages/basicInformation';
import MyPackage from './../pages/myPackage';

import JudgeInformationPage from './../pages/judgeInformationPage';

import TemplatePage from './../pages/templatePage';
import ManagePage from './../pages/managePage';
import RoleManage from './../pages/roleManage';
import Abstract from './../components/Abstract';
const children = [
    {
        path: 'incomes',
        name: '我的收入统计',
        iconClass: 'el-icon-goods',
        component: MyIncomes
    }, {
        path: 'account',
        name: '收款账号管理',
        iconClass: 'el-icon-edit-outline',
        component: Abstract,
        children: [{
            path: 'index',
            name: '收款账号管理 ',
            component: AccountManage
        },{
            path: 'add',
            name: '添加收款账号 ',
            component: AddAccount
        },{
            path: 'reserve',
            name: '储备二维码管理 ',
            component: ReserveCode
        }]
    }, {
        path: 'order',
        name: '订单管理',
        iconClass: 'el-icon-date',
        component: Abstract,
        children: [
            {
                path: 'myOrder',
                name: '我的订单',
                component: MyOrder
            }, {
                path: 'auto',
                name: '自动对账',
                component: AutoCharge
            }
        ]
    }, {
        path: 'noMatch',
        name: '无匹配订单',
        iconClass: 'el-icon-tickets',
        component: NoMatchOrder
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
                component: BasicInformation
            },{
                path: 'ApiParams',
                name: 'API参数设置',
                component: RoleManage
            },{
                path: 'ApiInfo',
                name: 'API接口信息',
                component: JudgeInformationPage
            },{
                path: 'test',
                name: '测试接口',
                component: RoleManage
            }
        ]
    }, {
        path: 'api ',
        name: 'API接口文档',
        iconClass: 'el-icon-rank',
        component: TemplatePage
    }, {
        path: 'app',
        name: 'app下载',
        iconClass: 'el-icon-download',
        component: ManagePage
    }
];
export default children;