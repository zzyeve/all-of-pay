const actions = {
    set_login: ({commit}, data) => {
        commit('set_login', data);
    },
    set_username: ({commit}, data) => {
        commit('set_username', data);
    },
    set_apiUid: ({commit}, data) => {
        commit('set_apiUid', data);
    },
    set_info: ({commit}, data) => {
        commit('set_info', data);
    }
};
export default actions;