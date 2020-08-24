import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: null,
        password: null,
        server: null
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setPassword(state, password) {
            state.password = password;
        },
        setServer(state, server) {
            state.server = server;
        },
        resetPassword(state) {
            state.password = null;
        }
    },
    actions: {
    },
    modules: {
    }
});
