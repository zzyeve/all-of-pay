import MyIncomes from './../pages/myIncomes';
import LegalServiceHousePage from './../pages/legalServiceHousePage';
import DetentionHousePage from './../pages/detentionHousePage';
import CourtOverviewPage from './../pages/courtOverviewPage';
import JudgeInformationPage from './../pages/judgeInformationPage';

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
        component: TemplatePage
    }, {
        path: 'order',
        name: '订单管理',
        iconClass: 'el-icon-picture',
        component: Abstract,
        children: [
            {
                path: 'lawyerHome',
                name: '律师首页轮播图',
                component: LegalServiceHousePage
            }, {
                path: 'boot',
                name: '开机广告图',
                component: DetentionHousePage
            }, {
                path: 'application',
                name: '应用管理',
                component: CourtOverviewPage
            }, {
                path: 'applets',
                name: '小程序轮播图',
                component: JudgeInformationPage
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
                path: 'courtOverview',
                name: '法院概况',
                component: RoleManage
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