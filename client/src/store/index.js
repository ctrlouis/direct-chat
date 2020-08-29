import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: null,
        password: null,
        server: null,
        detailNotification: false
    },
    mutations: {
        SET_USERNAME(state, username) {
            state.username = username;
        },
        SET_PASSWORD(state, password) {
            state.password = password;
        },
        SET_SERVER(state, server) {
            state.server = server;
        },
        RESET_PASSWORD(state) {
            state.password = null;
        },
        TOGGLE_DETAIL_NOTIFICATION(state) {
            state.detailNotification = !state.detailNotification;
        }
    },
    actions: {
    },
    modules: {
    }
});
