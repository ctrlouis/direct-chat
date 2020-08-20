"use strict";


import WebSocket from 'ws';

const webSocketPort = 5000;

const wss = new WebSocket.Server({ port: webSocketPort});
let websockets = [];

wss.on("connection", (ws) => {
    websockets.push(ws);

    ws.on("message", (message) => {
        websockets.forEach((otherWS) => {
            if (ws !== otherWS) otherWS.send(message);
        });
    });

    ws.on("close", () => {
        websockets = websockets.filter((otherWS) => {
            return ws !== otherWS;
        });
    });
});