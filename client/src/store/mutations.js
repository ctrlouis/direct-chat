const mutations = {
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
    TOGGLE_DARK_THEME(state, boolean) {
        state.darkTheme = boolean;
    }
}

export default mutations;