import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: null,
        password: null,
        server: null,
        detailNotification: false,
        messages: []
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
        },
        ADD_MESSAGE(state, message) {
            state.messages.push(message);
        },
    },
    actions: {
        setUsername(context, username) {
            context.commit('SET_USERNAME', username);
        },
        
        setPassword(context, password) {
            context.commit('SET_PASSWORD', password);
        },
        
        setServer(context, server) {
            context.commit('SET_SERVER', server);
        },
        
        resetPassword(context) {
            context.commit('RESET_PASSWORD');
        },
        
        toggleDetailNotification(context) {
            context.commit('TOGGLE_DETAIL_NOTIFICATION');
        },
    },
    modules: {
    }
});
