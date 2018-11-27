const getters = {
    isLogin(state) {
        if (!state.isLogin) {
            state.isLogin = window.sessionStorage.getItem('isLogin'); // 从sessionStorage中读取状态
        }
        return state.isLogin;
    },
    username(state) {
        if (!state.username) {
            state.username = window.sessionStorage.getItem('username');
        }
        return state.username;
    },
    apiUid(state) {
        if (!state.apiUid) {
            state.apiUid = window.sessionStorage.getItem('apiUid');
        }
        return state.apiUid;
    }
};
export default getters;