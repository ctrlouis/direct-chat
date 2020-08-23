"use strict";

import CryptoJS from 'crypto-js';


export default class Message {

    constructor(author =null, content =null, password =null) {
        if (!author || !content) {
            this.author = null;
            this.content = null;
            this.date = null;
            this.encrypted = null;
        } else if (!password) {
            this.author = author;
            this.content = content;
            this.date = new Date(Date.now());
            this.encrypted = null;
        } else {
            this.author = author;
            this.content = content;
            this.date = new Date(Date.now());
            this.encrypt(password);
        }
    }

    encrypt(secret) {
        const message = this.toJson();
        this.encrypted = CryptoJS.AES.encrypt(message, secret).toString();
    }
    
    decrypt(encrypted, secret) {
        const bytes = CryptoJS.AES.decrypt(encrypted, secret);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        const message = JSON.parse(originalText);
        console.log("decrypt", message);
        this.author = message.author;
        this.content = message.content;
        this.date = message.date;
        this.encrypted = encrypted;
    }

    toJson() {
        return JSON.stringify(this);
    }

}
