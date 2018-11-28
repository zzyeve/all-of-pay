// 接口定义转为方法，调用请用this.$api + 方法名称
// 引入全局请求的方法axios
import axios from 'axios';
// 设置请求头可携带cookie
axios.defaults.withCredentials = false;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['Accept'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';



// 请求拦截器,主要截获全局请求数据
axios.interceptors.response.use(response => {
	console.log(response);
    if (response.status === 200) {
		return response.data;
    }
    return response.data;
    // // 200 非业务成功，也算失败
    // if (response.iamStatus !== undefined && response.iamStatus !== 0) {
    //     // message.error(response.message || '', 5);
    //     return Promise.reject(response.data);
    // } else {
    //     if (response.data.errors) {
    //         // message.error(getErrMsg(response.data.errors), 5);
    //         return false;
    //     }
    //     return response.data;
    // }
}, error => {
    return Promise.reject(error.response);
    // 非200错误
    // console.log(error.response.data.errors)
    // if (error.response.status === 499) {
    //     location.href = `${error.response.data.url.split('reffer=')[0]}reffer=${encodeURIComponent(location.href)}`
    // } else if (error.response.status === 403) {
    //     // message.error('您没有权限，请联系管理员添加！')
    // } else {
    //     // let errMsg = getErrMsg(error.response.data && error.response.data.errors)
    //     // message.error(errMsg, 5)
    //     const errors = error.response.data.errors
    //     if (errors) {
    //         Notification.error({ title: 'error', message: errors[0].message, position: 'bottom-right' })
    //     } else {
    //         Notification.error({ title: 'error', message: '出错了', position: 'bottom-right' })
    //     }
    // }
    // return Promise.reject(error.response.data);
});
// 后端本机服务器
// let base = 'http://10.73.155.168:8080/aop_server';
// 服务器地址
let base = 'http://10.73.155.169:9842/aop_server';
// let base = 'https://www.easy-mock.com/mock/5bc452d7c1ba694ea184ee49/api';

// 获取用户信息
export const getUserInfo = (params) => {
  return axios.post(`${base}/getUserInfo.action`, params).then(res => res);
};
// 用户收入订单信息查询--我的收入统计
export const getUserOrderMsg = (params) => {
  return axios.post(`${base}/getUserOrderMsg.action`, params).then(res => res);
};
// 用户余额明细查询--我的收入统计明细
export const getBalanceDetail = (params) => {
  return axios.post(`${base}/getBalanceDetail.action`, params).then(res => res);
};
// 用户充值
export const getUserRecharge = (params) => {
  return axios.post(`${base}/userRecharge`, params).then(res => res);
};
// 获取验证码
export const getCaptchar = (params) => {
  return axios.get(`${base}/getCaptchar.action`, {params: params}).then(res => res);
};
// 用户账户订单信息查询
export const getAccountAndOrderInfo = (params) => {
  return axios.post(`${base}/getAccountAndOrderInfo.action`, params).then(res => res);
};
// 用户账户添加---修改
export const addUserReceviceAccount = (params) => {
  return axios.post(`${base}/addUserReceviceAccount.action`, params).then(res => res);
};
// 用户账户删除
export const deleteUserAccount = (params) => {
  return axios.post(`${base}/deleteUserAccount.action`, params).then(res => res);
};

// 用户收款账户匹配模式修改
export const changeAccountMatchingmode = (params) => {
  return axios.post(`${base}/changeAccountMatchingmode.action`, params).then(res => res);
};
// 二维码查询
export const getAccountRqcodeInfo = (params) => {
  return axios.post(`${base}/getAccountRqcodeInfo.action`, params).then(res => res);
};
// 用户订单详细查询
export const getUserOrderDetail = (params) => {
  return axios.post(`${base}/getUserOrderDetail.action`, params).then(res => res);
};




// 账号管理模块--用户基本信息修改
export const changeUserInfo = (params) => {
  return axios.post(`${base}/updateUserInfo.action`, params).then(res => res);
};
// 账号管理模块--套餐信息查询
export const getPackageInfo = (params) => {
  return axios.post(`${base}/getPackageInfo.action`, params).then(res => res);
};
// 账号管理模块--用户套餐信息查询
export const getUserPackageInfo = (params) => {
  return axios.post(`${base}/getUserPackageInfo.action`, params).then(res => res);
};
// 账号管理模块--用户更改/续订套餐
export const updateUserPackageInfo = (params) => {
  return axios.post(`${base}/updateUserPackageInfo.action`, params).then(res => res);
};
// 账号管理模块--密码修改
export const changeUserPassword = (params) => {
  return axios.post(`${base}/changeUserPassword.action`, params).then(res => res);
};
// 账号管理模块--二维码过期时间修改
export const changeRqcodeExpiryTime = (params) => {
  return axios.post(`${base}/changeRqcodeExpiryTime.action`, params).then(res => res);
};
// 账号管理模块--测试接口
export const aopInterfaceTest = (params) => {
  return axios.post(`${base}/aopInterfaceTest.action`, params).then(res => res);
};


