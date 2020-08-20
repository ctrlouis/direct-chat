import express from "express";
import * as http from "http";
import WebSocket from "ws";

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


// const expressPort = 3000;
// const websocketPort = 5000;
// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ port: websocketPort, server });
// 
// let websockets = [];
// 
// wss.on("connection", (ws) => {
//     websockets.push(ws);
// 
//     ws.on("message", (message) => {
//         websockets.forEach(function (otherWS) {
//             if (ws !== otherWS) {
//                 otherWS.send(message);
//             }
//         })
//     })
// 
//     ws.on("close", () => {
//         websockets = websockets.filter(function (otherWS) {
//             return ws !== otherWS;
//         })
//     })
// })
// 
// 
// app.listen(expressPort, () => {
//     console.log(`Server up and running at localhost:${expressPort}`)
//     console.log(`Websocket server available at localhost:${websocketPort}`)
// });