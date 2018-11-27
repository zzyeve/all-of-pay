const actions = {
    set_login: ({commit}, data) => {
        commit('set_login', data);
    },
    set_username: ({commit}, data) => {
        commit('set_username', data);
    }
};
export default actions;