import MyIncomes from './../pages/myIncomes';
import MyIncomesDetail from './../pages/myIncomesDetail';
import AccountManage from './../pages/accountManage';
import AddAccount from './../pages/addAccount';
import EditAccount from './../pages/editAccount';
import ReserveCode from './../pages/reserveCode';
import MyOrder from './../pages/myOrder';
import AutoCharge from './../pages/autoCharge';
import NoMatchOrder from './../pages/noMatchOrder';
import ApiDoc from './../pages/apiDoc';
import AppDownload from './../pages/appDownload';

import BasicInformation from './../pages/basicInformation';
import MyPackage from './../pages/myPackage';
import ChangePassword from './../pages/changePassword';
import SetAPI from './../pages/setAPI';
import InfoAPI from './../pages/infoAPI';
import TestAPI from './../pages/testAPI';
// import TemplatePage from './../pages/templatePage';
import Abstract from './../components/Abstract';
const children = [
    {
        path: 'incomes',
        name: '我的收入统计',
        iconClass: 'el-icon-goods',
        component: MyIncomes,
        showChildren: false, // 控制是否显示字路由
        meta: {
            requireAuth: true
        },
        children: [{
            path: 'detail',
            name: '收入明细',
            component: MyIncomesDetail
        }]
    }, {
        path: 'account',
        name: '收款账号管理',
        iconClass: 'el-icon-edit-outline',
        component: AccountManage,
        showChildren: false,
        meta: {
            requireAuth: true
        },
        children: [{
            path: 'add',
            name: '添加收款账号 ',
            component: AddAccount
        },{
            path: 'edit',
            name: '编辑收款账号 ',
            component: EditAccount
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
        showChildren: true,
        meta: {
            requireAuth: true
        },
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
        component: NoMatchOrder,
        meta: {
            requireAuth: true
        },
        showChildren: false
    }, {
        path: 'content',
        name: '账号管理',
        iconClass: 'el-icon-star-off',
        component: Abstract,
        showChildren: true,
        meta: {
            requireAuth: true
        },
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
        iconClass: 'el-icon-rank',
        component: ApiDoc,
        meta: {
            requireAuth: true
        },
        showChildren: false
    }, {
        path: 'app',
        name: 'app下载',
        iconClass: 'el-icon-download',
        component: AppDownload,
        meta: {
            requireAuth: true
        },
        showChildren: false
    }
];
export default children;