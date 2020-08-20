"use strict";


export default class Message {

    constructor(author, message) {
        this.author = author;
        this.content = message;
        this.date = new Date(Date.now());
    }

}
