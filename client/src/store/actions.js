const actions = {
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

    toggleDarkTheme(context) {
        context.commit('TOGGLE_DARK_THEME');
    },
}

export default actions;