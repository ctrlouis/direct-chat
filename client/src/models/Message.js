"use strict";

import CryptoJS from 'crypto-js';


export default class Message {

    constructor(content =null, author =null) {
        if (!content) {
            this.content = null;
            this.author = null;
            this.date = null;
            this.encrypted = null;
        } else {
            this.content = content;
            this.author = author;
            this.date = new Date(Date.now());
            this.encrypted = null;
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
        this.author = message.author;
        this.content = message.content;
        this.date = message.date;
        this.encrypted = encrypted;
    }

    toJson() {
        return JSON.stringify(this);
    }

}
