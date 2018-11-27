const mutations = {
    set_login(state, data) {
        state.isLogin = data;
        window.sessionStorage.setItem('isLogin', data);
    },
    set_username(state, data) {
        state.username = data;
        window.sessionStorage.setItem('username', data);
    },
    set_info(state, data) {
        state.info = data;
    }

};
export default mutations;