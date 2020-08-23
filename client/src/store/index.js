import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        password: null
    },
    mutations: {
        setPassword(state, password) {
            state.password = password;
        },
        resetPassword(state) {
            state.password = null;
        }
    },
    actions: {
    },
    modules: {
    }
})
