import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/Chat.vue'
import Connect from '../views/Connect.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Connect',
        component: Connect
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat
    },
];

const router = new VueRouter({ routes });

export default router;
