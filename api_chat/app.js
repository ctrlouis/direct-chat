"use strict";


/**
 * import generate
 * by express-generator
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

/**
 * import perso
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as http from 'http';
import WebSocket from 'ws';

import indexRouter from './routes/indexRouter.js';


const expressPort = 3000;
const webSocketPort = 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));


/**
 * express server
 * start here
 */
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: webSocketPort, server});
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

/**
 * middlewares set
 * by express-generator
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/**
 * import generate
 * by express-generator
 */
app.use(bodyParser({
    extended: false
}));
app.use(cors());
app.options('*', cors());

app.use('/', indexRouter);

app.listen(expressPort, () => {
    console.log("Server up and running at localhost: " + expressPort);
});
